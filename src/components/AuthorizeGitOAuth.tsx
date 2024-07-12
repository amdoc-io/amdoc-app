import { useCallback, useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { RxLockClosed, RxLockOpen1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { OutlinedButton } from "../actions/OutlinedButton";
import { setInfrastructure } from "../features/onboard/onboardSlice";
import { StepContainer } from "../layout/StepContainer";
import { Infrastructure } from "../model/AccountModel";
import { saveInfrastructure } from "../utils/AccountFetchUtils";
import {
  getGithubAccessToken,
  getGithubAuthenticatedUser,
} from "../utils/GithubFetchUtils";

export const AuthorizeGitOAuth = (props: { onComplete?: () => void }) => {
  const { onComplete = () => {} } = props;
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  const authToken: string = useSelector((state: any) => state.auth.token);
  const infrastructure: Infrastructure = useSelector(
    (state: any) => state.onboard.infrastructure
  );
  const { gitProvider, gitOauthToken, id: infraId } = infrastructure;
  const [githubLoading, setGithubLoading] = useState<boolean>(false);

  const handleAuthorizeGithub = () => {
    setGithubLoading(true);
    window.location.href = `https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID}`;
  };

  const handleGithubSuccessAuthorize = useCallback(async () => {
    if (code) {
      if (!gitOauthToken || !gitOauthToken.accessToken) {
        setGithubLoading(true);

        const githubAccessToken = await getGithubAccessToken(code);
        const githubUser = await getGithubAuthenticatedUser(
          githubAccessToken?.accessToken || ""
        );

        const savedInfraRes = await saveInfrastructure(authToken, {
          id: infraId,
          gitOauthToken: githubAccessToken,
          githubUser: githubUser,
        });
        if (savedInfraRes) {
          dispatch(setInfrastructure(savedInfraRes.infrastructure));
        }

        setGithubLoading(false);
        onComplete();
        navigate("/");
      } else {
        onComplete();
        navigate("/");
      }
    }
  }, [code, dispatch, gitOauthToken, navigate, infraId, authToken, onComplete]);

  const handleGithubErrorAuthorize = useCallback(async () => {
    if (error) {
      if (error === "access_denied") {
      }
    }
  }, [error]);

  useEffect(() => {
    handleGithubSuccessAuthorize();
  }, [handleGithubSuccessAuthorize]);

  useEffect(() => {
    handleGithubErrorAuthorize();
  }, [handleGithubErrorAuthorize]);

  return (
    <StepContainer>
      <p>Authorize with OAuth to gain access to your profile information</p>

      <div className="flex">
        <OutlinedButton
          loading={githubLoading}
          icon={
            gitOauthToken && gitOauthToken.accessToken ? (
              <RxLockOpen1 />
            ) : (
              <RxLockClosed />
            )
          }
          onClick={handleAuthorizeGithub}
          suffix={
            gitOauthToken &&
            gitOauthToken.accessToken && (
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
