import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { RiGoogleLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "../../actions/Link";
import { OutlinedButton } from "../../actions/OutlinedButton";
import { AIM_SIGN_IN_ENDPOINT } from "../../endpoints/AIMEndpoint";
import { login } from "../../features/auth/authSlice";
import { AuthContainer } from "../../layout/AuthContainer";
import { AuthType, SignInResponse } from "../../model/AccountModel";
import {
  getLinkedInAccessToken,
  getOrganizationsByEmail,
} from "../../utils/AccountFetchUtils";
import { getGithubAccessToken } from "../../utils/GithubFetchUtils";
import { PrimaryButton } from "../../actions/PrimaryButton";

export const LoginPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const code = searchParams.get("code");
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);
  const [githubLoading, setGithubLoading] = useState<boolean>(false);
  const [linkedInLoading, setLinkedInLoading] = useState<boolean>(false);

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
        let nextRoute = "/prepare-application";
        if (signInResponse?.account?.isSetupComplete) {
          const res = await getOrganizationsByEmail(
            signInResponse.authToken,
            signInResponse.account?.email || ""
          );
          if (res.organizations.length === 0) {
            nextRoute = "/add-organization";
          }
        } else {
          nextRoute = "/complete-setup";
        }
        dispatch(
          login({
            account: signInResponse.account,
            token: signInResponse.authToken,
            signedInAt: signInResponse.createdAt,
          })
        );
        navigate(nextRoute);
      }
      callback();
    },
    [dispatch, navigate]
  );

  const handleLinkedInSuccessSignIn = useCallback(async () => {
    if (location.pathname.endsWith("linkedin") && code) {
      setLinkedInLoading(true);

      const linkedInAccessToken = await getLinkedInAccessToken(code);
      if (linkedInAccessToken) {
        const formData = {
          authType: AuthType.LINKEDIN,
          accessToken: linkedInAccessToken?.accessToken,
        };

        handleSystemSignIn(formData, () => setLinkedInLoading(false));
      }

      setLinkedInLoading(false);
    }
  }, [location, code, handleSystemSignIn]);

  const handleGithubSuccessSignIn = useCallback(async () => {
    if (location.pathname.endsWith("github") && code) {
      setGithubLoading(true);

      const githubAccessToken = await getGithubAccessToken(code);

      if (githubAccessToken) {
        const formData = {
          authType: AuthType.GITHUB,
          accessToken: githubAccessToken?.accessToken,
        };

        handleSystemSignIn(formData, () => setGithubLoading(false));
      }
    }
  }, [code, handleSystemSignIn, location]);

  useEffect(() => {
    handleLinkedInSuccessSignIn();
  }, [handleLinkedInSuccessSignIn]);

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

  const handleLinkedInLogin = () => {
    const params = new URLSearchParams();
    params.set("response_type", "code");
    params.set(
      "client_id",
      process.env.REACT_APP_LINKEDIN_OAUTH_CLIENT_ID as string
    );
    params.set(
      "redirect_uri",
      process.env.REACT_APP_PROD_OAUTH_REDIRECT_URL as string
    );
    params.set("scope", "profile email");
    window.location.href = `https://www.linkedin.com/oauth/v2/authorization?${params}`;
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

      <PrimaryButton
        loading={githubLoading}
        icon={<FaGithub />}
        onClick={handleGithubLogin}
        className="!bg-black !border-none hover:!bg-black/80"
      >
        Sign in with Github
      </PrimaryButton>

      <PrimaryButton
        icon={<FaLinkedin />}
        loading={linkedInLoading}
        onClick={handleLinkedInLogin}
        className="!bg-linkedin !border-none hover:!bg-linkedin/80"
      >
        Sign in with LinkedIn
      </PrimaryButton>

      <p className="text-sm text-gray-600">
        By signing in, you agree to our <Link href="/">Terms of Service</Link>
      </p>
    </AuthContainer>
  );
};
