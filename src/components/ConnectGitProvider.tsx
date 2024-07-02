import { useCallback, useEffect, useState } from "react";
import { RxGithubLogo } from "react-icons/rx";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { OutlinedButton } from "../actions/OutlinedButton";
import { setGithubAccessToken } from "../features/auth/authSlice";
import { getGithubAccessToken } from "../utils/GithubFetchUtils";

export const ConnectGitProvider = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");

  const [githubLoading, setGithubLoading] = useState<boolean>(false);

  const handleGithubSuccessSignIn = useCallback(async () => {
    if (code) {
      setGithubLoading(true);

      const githubAccessToken = await getGithubAccessToken(code);
      dispatch(setGithubAccessToken(githubAccessToken));

      setGithubLoading(false);
    }
  }, [code, dispatch]);

  useEffect(() => {
    handleGithubSuccessSignIn();
  }, [handleGithubSuccessSignIn]);

  const handleGithubConnect = async () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_APP_CLIENT_ID}`;
  };

  return (
    <div className="grid grid-cols-4 gap-4">
      <OutlinedButton
        loading={githubLoading}
        icon={<RxGithubLogo />}
        onClick={handleGithubConnect}
      >
        Github
      </OutlinedButton>
    </div>
  );
};
