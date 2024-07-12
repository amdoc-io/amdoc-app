import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInfrastructure } from "../features/onboard/onboardSlice";
import {
  GitInstallationToken,
  Infrastructure,
  Organization,
} from "../model/AccountModel";
import {
  getGithubAppJWT,
  getInfrastructureByOrganizationId,
  saveInfrastructure,
} from "../utils/AccountFetchUtils";
import { getGithubInstallationAccessTokens } from "../utils/GithubFetchUtils";
import { isTokenValid, mapInstallationToken } from "../utils/TokenUtils";

export const OutletWrapper = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => {
  const dispatch = useDispatch();
  const authToken: string = useSelector((state: any) => state.auth.token);
  const organization: Organization = useSelector(
    (state: any) => state.auth.organization
  );
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

  const fetchInfrastructure = useCallback(async () => {
    setTimeout(async () => {
      if (authToken && organization?.id) {
        const res = await getInfrastructureByOrganizationId(
          authToken,
          organization.id
        );
        if (res) {
          dispatch(setInfrastructure(res.infrastructure));
        }
      }
    }, 5000);
  }, [organization, authToken, dispatch]);

  useEffect(() => {
    fetchInfrastructure();
  }, [fetchInfrastructure]);

  useEffect(() => {
    rotateGithubInstallationToken();
  }, [rotateGithubInstallationToken]);

  return <div {...props} />;
};
