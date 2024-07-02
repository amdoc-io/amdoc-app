import axios from "axios";
import { AIM_GET_GITHUB_ACCESS_TOKEN_PROXY_ENDPOINT } from "../endpoints/AIMEndpoint";
import { GithubAccessToken } from "../model/AuthModel";

export const getGithubAccessToken = async (code: string) => {
  return await axios
    .get(`${AIM_GET_GITHUB_ACCESS_TOKEN_PROXY_ENDPOINT}?code=${code}`)
    .then((res) => {
      const data = res.data;
      return {
        accessToken: data.access_token,
        expiresIn: data.expires_in,
        refreshToken: data.refresh_token,
        refreshTokenExpiresIn: data.refresh_token_expires_in,
        scope: data.scope,
        tokenType: data.token_type,
      } as GithubAccessToken;
    })
    .catch((err) => undefined);
};
