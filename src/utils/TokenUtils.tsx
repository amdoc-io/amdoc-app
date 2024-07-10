import { GitInstallationToken } from "../model/AccountModel";
import { InstallationToken } from "./GithubFetchUtils";

export const isTokenValid = (expiresAt: string): boolean => {
  const expiresAtDate = new Date(expiresAt);
  const nowMinusOneMinute = new Date(Date.now() - 60 * 1000);

  return expiresAtDate > nowMinusOneMinute;
};

export const mapInstallationToken = (
  response: InstallationToken
): GitInstallationToken => {
  return {
    token: response?.token,
    expiresAt: response?.expires_at,
    permissions: {
      metadata: response?.permissions?.metadata,
      pullRequests: response?.permissions?.pull_requests,
      repositoryProjects: response?.permissions?.repository_projects,
    },
    repositorySelection: response?.repository_selection,
  } as GitInstallationToken;
};
