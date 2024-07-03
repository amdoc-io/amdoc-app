import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  InstallationToken,
  getGithubInstallationAccessTokens,
} from "../utils/GithubFetchUtils";
import { getGithubAppJWT } from "../utils/AccountFetchUtils";
import { isTokenValid } from "../utils/TokenUtils";
import { setGithubInstallationToken } from "../features/onboard/onboardSlice";

export const OutletWrapper = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => {
  const dispatch = useDispatch();
  const authToken: string = useSelector((state: any) => state.auth.token);
  const githubInstallationToken: InstallationToken = useSelector(
    (state: any) => state.onboard.githubInstallationToken
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

    if (currentStep > 2 && !githubInstallationToken) {
      return true;
    }

    const { token, expires_at } = githubInstallationToken;

    if (!token || !expires_at) {
      return true;
    }

    return !isTokenValid(expires_at);
  }, [
    githubInstallationToken,
    authToken,
    githubInstallationId,
    gitProvider,
    currentStep,
  ]);

  const rotateGithubInstallationToken = useCallback(async () => {
    if (shouldRotate()) {
      const jwt = await getGithubAppJWT(authToken);
      const githubInstallationToken = await getGithubInstallationAccessTokens(
        jwt,
        githubInstallationId
      );
      dispatch(setGithubInstallationToken(githubInstallationToken));
    }
  }, [authToken, githubInstallationId, dispatch, shouldRotate]);

  useEffect(() => {
    rotateGithubInstallationToken();
  }, [rotateGithubInstallationToken]);

  return <div {...props} />;
};
