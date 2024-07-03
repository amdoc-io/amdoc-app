import axios from "axios";
import { AIM_GET_GITHUB_ACCESS_TOKEN_PROXY_ENDPOINT } from "../endpoints/AIMEndpoint";
import { GithubAccessToken } from "../model/AuthModel";
import { createHeader } from "./FetchUtils";
export interface Permissions {
  metadata: string;
  pull_requests: string;
  repository_projects: string;
}

export interface InstallationToken {
  token: string;
  expires_at: string;
  permissions: Permissions;
  repository_selection: string;
}

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

export const getGithubAuthenticatedApp = async (jwt: string) => {
  return await axios
    .get("https://api.github.com/app", createHeader(jwt))
    .then((res) => res.data)
    .catch((err) => undefined);
};

export const getGithubInstallationAccessTokens = async (
  jwt: string,
  installationId: string
) => {
  return await axios
    .post(
      `https://api.github.com/app/installations/${installationId}/access_tokens`,
      {},
      createHeader(jwt)
    )
    .then((res) => res.data as InstallationToken)
    .catch((err) => undefined);
};

export const createRepoFromTemplate = async (token: string) => {
  return await axios
    .post(
      "https://api.github.com/repos/amdoc-io/amdoc-template/generate",
      {
        name: "amdoc",
        description: "This is your starter Amdoc documentation",
      },
      createHeader(token)
    )
    .then((res) => res.data)
    .catch((err) => undefined);
};
