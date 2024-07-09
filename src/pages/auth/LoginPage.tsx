import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FaGithub } from "react-icons/fa";
import { RiGoogleLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { OutlinedButton } from "../../actions/OutlinedButton";
import { AIM_SIGN_IN_ENDPOINT } from "../../endpoints/AIMEndpoint";
import { login, setOrganizations } from "../../features/auth/authSlice";
import { AuthContainer } from "../../layout/AuthContainer";
import { AuthType, SignInResponse } from "../../model/AccountModel";
import { getGithubAccessToken } from "../../utils/GithubFetchUtils";
import { Link } from "../../actions/Link";
import { getOrganizationsByEmail } from "../../utils/AccountFetchUtils";

export const LoginPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [githubLoading, setGithubLoading] = useState<boolean>(false);

  const handleSystemSignIn = useCallback(
    async (formData: any, callback: () => void) => {
      const signInResponse = await axios
        .post(AIM_SIGN_IN_ENDPOINT, formData)
        .then((res) => res.data as SignInResponse)
        .catch((err) => {
          console.error(err);
          return undefined;
        });

      if (signInResponse) {
        dispatch(
          login({
            account: signInResponse.account,
            token: signInResponse.authToken,
            signedInAt: signInResponse.createdAt,
          })
        );
        callback();
        if (signInResponse?.account?.isSetupComplete) {
          const res = await getOrganizationsByEmail(
            signInResponse.authToken,
            signInResponse.account?.email || ""
          );
          if (res.organizations.length === 0) {
            navigate("/add-organization");
          } else {
            dispatch(setOrganizations(res.organizations));
            navigate("/");
          }
        } else {
          navigate("/complete-setup");
        }
      }
    },
    [dispatch, navigate]
  );

  const handleGithubSuccessSignIn = useCallback(async () => {
    if (code) {
      setGithubLoading(true);

      const githubAccessToken = await getGithubAccessToken(code);

      const formData = {
        authType: AuthType.GITHUB,
        accessToken: githubAccessToken?.accessToken,
      };

      handleSystemSignIn(formData, () => setGithubLoading(false));
    }
  }, [code, handleSystemSignIn]);

  useEffect(() => {
    handleGithubSuccessSignIn();
  }, [handleGithubSuccessSignIn]);

  const handleGoogleSuccessSignIn = async (
    tokenResponse: Omit<
      TokenResponse,
      "error" | "error_description" | "error_uri"
    >
  ) => {
    const res = await axios
      .get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenResponse.access_token}`
      )
      .then((res) => res.data);
    const credentials = {
      email: res["email"],
      firstName: res["given_name"],
      lastName: res["family_name"],
      isEmailVerified: res["email_verified"],
      accessToken: tokenResponse.access_token,
    };

    const formData = {
      ...credentials,
      authType: AuthType.GOOGLE,
    };

    handleSystemSignIn(formData, () => setGoogleLoading(false));
  };

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: handleGoogleSuccessSignIn,
    onError: () => {
      console.log("Login Failed");
      setGoogleLoading(false);
    },
    onNonOAuthError: () => {
      setGoogleLoading(false);
    },
  });

  const handleGithubLogin = () => {
    window.location.href = `https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID}`;
  };

  return (
    <AuthContainer>
      <div className="text-center mb-6 flex flex-col gap-2 w-full">
        <p className="font-semibold text-2xl">Log in to your account</p>

        <p className="text-gray-600 text-sm">
          To get started with automating documentation
        </p>
      </div>

      <OutlinedButton
        loading={googleLoading}
        icon={<RiGoogleLine />}
        onClick={() => {
          setGoogleLoading(true);
          handleGoogleLogin();
        }}
      >
        Sign in with Google
      </OutlinedButton>

      <OutlinedButton
        loading={githubLoading}
        icon={<FaGithub />}
        onClick={handleGithubLogin}
        className="!bg-black !text-white !border-none hover:!bg-black/85"
      >
        Sign in with Github
      </OutlinedButton>

      <p className="text-sm text-gray-600">
        By signing in, you agree to our <Link href="/">Terms of Service</Link>
      </p>
    </AuthContainer>
  );
};
