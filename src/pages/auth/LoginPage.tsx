import { OutlinedButton } from "../../actions/OutlinedButton";
import { AuthContainer } from "../../layout/AuthContainer";
import { RiGoogleLine } from "react-icons/ri";
import { FaGithub } from "react-icons/fa";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useState } from "react";
import { AuthType } from "../../model/AccountModel";
import axios from "axios";
import { AIM_SIGN_IN_ENDPOINT } from "../../endpoints/AIMEndpoint";

export const LoginPage = () => {
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

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

    const systemSignIn = await axios
      .post(AIM_SIGN_IN_ENDPOINT, formData)
      .then((res) => res.data)
      .catch((err) => {
        console.error(err);
      });

    console.log(systemSignIn);

    setGoogleLoading(false);
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
    window.location.href = `https://github.com/login/oauth/authorize?scope=user&client_id=${process.env.REACT_APP_GITHUB_OAUTH_CLIENT_ID}&redirect_uri=${process.env.REACT_APP_GITHUB_OAUTH_CALLBACK_URL}`;
  };

  return (
    <AuthContainer>
      <p className="mb-8">Amdoc</p>

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
        icon={<FaGithub />}
        onClick={handleGithubLogin}
        className="!bg-black !text-white !border-none hover:!bg-black/85"
      >
        Sign in with Github
      </OutlinedButton>
    </AuthContainer>
  );
};
