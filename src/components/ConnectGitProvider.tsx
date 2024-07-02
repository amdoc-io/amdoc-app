import { useCallback, useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { RxGithubLogo } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { OutlinedButton } from "../actions/OutlinedButton";
import { setGithubAccessToken } from "../features/auth/authSlice";
import { GithubAccessToken } from "../model/AuthModel";
import { getGithubAccessToken } from "../utils/GithubFetchUtils";

export const ConnectGitProvider = (props: { onComplete?: () => void }) => {
  const { onComplete = () => {} } = props;

  const location = useLocation();
  const dispatch = useDispatch();
  const githubAccessToken: GithubAccessToken = useSelector(
    (state: any) => state.auth.githubAccessToken
  );
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");

  const [githubLoading, setGithubLoading] = useState<boolean>(false);
  const [setupCompleted, setSetupCompleted] = useState<boolean>(false);

  const handleGithubSuccessAuthorization = useCallback(async () => {
    if (code && !setupCompleted) {
      setGithubLoading(true);

      const githubAccessToken = await getGithubAccessToken(code);
      dispatch(setGithubAccessToken(githubAccessToken));

      setGithubLoading(false);

      onComplete();
      setSetupCompleted(true);
    }
  }, [code, dispatch, onComplete, setupCompleted]);

  useEffect(() => {
    if (githubAccessToken && githubAccessToken.accessToken && !setupCompleted) {
      onComplete();
      setSetupCompleted(true);
    }
  }, [githubAccessToken, onComplete, setupCompleted]);

  useEffect(() => {
    handleGithubSuccessAuthorization();
  }, [handleGithubSuccessAuthorization]);

  const handleGithubConnect = async () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_APP_CLIENT_ID}`;
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
