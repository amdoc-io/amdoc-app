import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInfrastructure } from "../features/onboard/onboardSlice";
import { GitInstallationToken, Infrastructure } from "../model/AccountModel";
import {
  getGithubAppJWT,
  saveInfrastructure,
} from "../utils/AccountFetchUtils";
import {
  getGithubAuthenticatedUser,
  getGithubInstallationAccessTokens,
} from "../utils/GithubFetchUtils";
import { isTokenValid, mapInstallationToken } from "../utils/TokenUtils";
import { setGithubUser } from "../features/auth/authSlice";

export const OutletWrapper = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => {
  const dispatch = useDispatch();
  const authToken: string = useSelector((state: any) => state.auth.token);
  const infrastructure: Infrastructure = useSelector(
    (state: any) => state.onboard.infrastructure
  );

  const currentStep: number = useSelector(
    (state: any) => state.onboard.currentStep
  );
  const gitProvider: string = useSelector(
    (state: any) => state.onboard.gitProvider
  );
  const githubInstallationId: string = useSelector(
    (state: any) => state.onboard.githubInstallationId
  );

  const shouldRotate = useCallback((): boolean => {
    if (!authToken || !githubInstallationId) {
      return false;
    }

    if (gitProvider !== "GitHub") {
      return false;
    }

    if (currentStep > 2 && !infrastructure.gitInstallationToken) {
      return true;
    }

    if (!infrastructure.gitInstallationToken) {
      return true;
    }

    const { token, expiresAt } = infrastructure.gitInstallationToken;

    if (!token || !expiresAt) {
      return true;
    }

    return !isTokenValid(expiresAt);
  }, [
    infrastructure,
    authToken,
    githubInstallationId,
    gitProvider,
    currentStep,
  ]);

  const rotateGithubInstallationToken = useCallback(async () => {
    if (shouldRotate()) {
      const jwt = await getGithubAppJWT(authToken);
      const githubToken = await getGithubInstallationAccessTokens(
        jwt,
        githubInstallationId
      );
      if (githubToken) {
        const gitInstallationToken: GitInstallationToken =
          mapInstallationToken(githubToken);
        const savingInfra: Infrastructure = {
          id: infrastructure.id,
          gitInstallationToken: gitInstallationToken,
        };
        const savedInfraRes = await saveInfrastructure(authToken, savingInfra);
        if (savedInfraRes) {
          dispatch(setInfrastructure(savedInfraRes.infrastructure));
        }
      }
    }
  }, [authToken, githubInstallationId, dispatch, shouldRotate, infrastructure]);

  const fetchGithubUser = useCallback(async () => {
    if (infrastructure && infrastructure.gitOauthToken) {
      const githubUser = await getGithubAuthenticatedUser(
        infrastructure.gitOauthToken.accessToken
      );
      dispatch(setGithubUser(githubUser));
    }
  }, [infrastructure, dispatch]);

  useEffect(() => {
    fetchGithubUser();
  }, [fetchGithubUser]);

  useEffect(() => {
    rotateGithubInstallationToken();
  }, [rotateGithubInstallationToken]);

  return <div {...props} />;
};
