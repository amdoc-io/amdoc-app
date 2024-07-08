import axios from "axios";
import {
  AIM_CREATE_GIT_CLIENT_WEB_APP_ENDPOINT,
  AIM_GET_GITHUB_APP_JWT_PROXY_ENDPOINT,
  AIM_UPDATE_ACCOUNT_ENDPOINT,
  AIM_UPDATE_NETLIFY_SITE_ENDPOINT,
} from "../endpoints/AIMEndpoint";
import { createHeader } from "./FetchUtils";
import { DocAccount } from "../model/AccountModel";

export interface UpdateAccountRequest {
  account: DocAccount;
}

export interface UpdateAccountResponse {
  account: DocAccount;
}

export const getGithubAppJWT = async (authToken: string) => {
  return await axios
    .get(`${AIM_GET_GITHUB_APP_JWT_PROXY_ENDPOINT}`, createHeader(authToken))
    .then((res) => res.data)
    .catch((err) => undefined);
};

export const createGitClientWebRepo = async (
  authToken: string,
  name: string,
  owner: string
) => {
  return axios
    .post(
      `${AIM_CREATE_GIT_CLIENT_WEB_APP_ENDPOINT}`,
      { name, owner },
      createHeader(authToken)
    )
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return undefined;
    });
};

export const updateNetlifySite = async (authToken: string, site: any) => {
  return axios
    .post(
      `${AIM_UPDATE_NETLIFY_SITE_ENDPOINT}`,
      { ...site },
      createHeader(authToken)
    )
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return undefined;
    });
};

export const updateAccount = async (
  authToken: string,
  request: UpdateAccountRequest
) => {
  return await axios
    .post(AIM_UPDATE_ACCOUNT_ENDPOINT, request, createHeader(authToken))
    .then((res) => res.data as UpdateAccountResponse)
    .catch((err) => {
      console.error(err);
      return undefined;
    });
};
