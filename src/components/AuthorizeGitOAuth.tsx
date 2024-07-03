import { useCallback, useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { RxLockClosed, RxLockOpen1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { OutlinedButton } from "../actions/OutlinedButton";
import { setGithubUser } from "../features/auth/authSlice";
import { setGithubOAuthAccessToken } from "../features/onboard/onboardSlice";
import { StepContainer } from "../layout/StepContainer";
import { GithubAccessToken } from "../model/AuthModel";
import {
  getGithubAccessToken,
  getGithubAuthenticatedUser,
} from "../utils/GithubFetchUtils";

export const AuthorizeGitOAuth = (props: { onComplete?: () => void }) => {
  const { onComplete = () => {} } = props;
  const location = useLocation();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");
  const githubOAuthAccessToken: GithubAccessToken = useSelector(
    (state: any) => state.onboard.githubOAuthAccessToken
  );
  const gitProvider: string = useSelector(
    (state: any) => state.onboard.gitProvider
  );
  const [setupCompleted, setSetupCompleted] = useState<boolean>(false);
  const [githubLoading, setGithubLoading] = useState<boolean>(false);

  const handleAuthorizeGithub = () => {
    window.location.href = `https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID}`;
  };

  const handleGithubSuccessAuthorize = useCallback(async () => {
    if (
      code &&
      (!githubOAuthAccessToken || !githubOAuthAccessToken.accessToken)
    ) {
      setGithubLoading(true);

      const githubAccessToken = await getGithubAccessToken(code);
      const githubUser = await getGithubAuthenticatedUser(
        githubAccessToken?.accessToken || ""
      );

      dispatch(setGithubUser(githubUser));
      dispatch(setGithubOAuthAccessToken(githubAccessToken));

      setGithubLoading(false);
    }
  }, [code, dispatch, githubOAuthAccessToken]);

  useEffect(() => {
    handleGithubSuccessAuthorize();
  }, [handleGithubSuccessAuthorize]);

  useEffect(() => {
    if (
      githubOAuthAccessToken &&
      githubOAuthAccessToken.accessToken &&
      !setupCompleted
    ) {
      onComplete();
      setSetupCompleted(true);
    }
  }, [onComplete, githubOAuthAccessToken, setupCompleted]);

  return (
    <StepContainer>
      <p>Authorize with OAuth to gain access to your profile information</p>

      <div className="flex">
        <OutlinedButton
          loading={githubLoading}
          icon={
            githubOAuthAccessToken && githubOAuthAccessToken.accessToken ? (
              <RxLockOpen1 />
            ) : (
              <RxLockClosed />
            )
          }
          onClick={handleAuthorizeGithub}
          suffix={
            githubOAuthAccessToken &&
            githubOAuthAccessToken.accessToken && (
              <FaCheckCircle className="text-green-500" />
            )
          }
        >
          Authorize with {gitProvider}
        </OutlinedButton>
      </div>
    </StepContainer>
  );
};
