import { useCallback, useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { RxGithubLogo } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { OutlinedButton } from "../actions/OutlinedButton";
import { getGithubAppJWT } from "../utils/AccountFetchUtils";
import {
  InstallationToken,
  getGithubAccessToken,
  getGithubAuthenticatedUser,
  getGithubInstallationAccessTokens,
} from "../utils/GithubFetchUtils";
import {
  setGithubInstallationToken,
  setGithubOAuthAccessToken,
  setGithubUser,
} from "../features/auth/authSlice";

export const ConnectGitProvider = (props: { onComplete?: () => void }) => {
  const { onComplete = () => {} } = props;

  const location = useLocation();
  const dispatch = useDispatch();
  const authToken: string = useSelector((state: any) => state.auth.token);
  const githubInstallationToken: InstallationToken = useSelector(
    (state: any) => state.auth.githubInstallationToken
  );
  const searchParams = new URLSearchParams(location.search);
  const installationId = searchParams.get("installation_id");
  const code = searchParams.get("code");

  const [githubLoading, setGithubLoading] = useState<boolean>(false);
  const [setupCompleted, setSetupCompleted] = useState<boolean>(false);

  const handleGithubSuccessInstallation = useCallback(async () => {
    if (installationId && code && !setupCompleted) {
      setGithubLoading(true);

      const jwt = await getGithubAppJWT(authToken);
      const githubInstallationToken = await getGithubInstallationAccessTokens(
        jwt,
        installationId
      );
      const githubOAuthAccessToken = await getGithubAccessToken(code);
      const githubUser = await getGithubAuthenticatedUser(
        githubOAuthAccessToken?.accessToken || ""
      );

      dispatch(setGithubOAuthAccessToken(githubOAuthAccessToken));
      dispatch(setGithubUser(githubUser));
      dispatch(setGithubInstallationToken(githubInstallationToken));

      onComplete();
      setSetupCompleted(true);
      setGithubLoading(false);
    }
  }, [installationId, onComplete, setupCompleted, authToken, dispatch, code]);

  useEffect(() => {
    if (
      githubInstallationToken &&
      githubInstallationToken.token &&
      !setupCompleted
    ) {
      onComplete();
      setSetupCompleted(true);
    }
  }, [githubInstallationToken, onComplete, setupCompleted]);

  useEffect(() => {
    handleGithubSuccessInstallation();
  }, [handleGithubSuccessInstallation]);

  const handleGithubConnect = async () => {
    window.location.href = "https://github.com/apps/amdoc-io/installations/new";
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <p>Deploy your application using one of the following providers:</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <OutlinedButton
          loading={githubLoading}
          icon={<RxGithubLogo />}
          onClick={handleGithubConnect}
          suffix={
            setupCompleted && <FaCheckCircle className="text-green-500" />
          }
        >
          Github
        </OutlinedButton>
      </div>
    </div>
  );
};
