import axios from "axios";
import {
  AIM_CREATE_GIT_CLIENT_WEB_APP_ENDPOINT,
  AIM_GET_GITHUB_APP_JWT_PROXY_ENDPOINT,
  AIM_GET_ORGANIZATIONS_BY_EMAIL_ENDPOINT,
  AIM_SAVE_ORGANIZATION_ENDPOINT,
  AIM_UPDATE_ACCOUNT_ENDPOINT,
  AIM_UPDATE_NETLIFY_SITE_ENDPOINT,
} from "../endpoints/AIMEndpoint";
import { createHeader } from "./FetchUtils";
import { DocAccount, Organization } from "../model/AccountModel";

export interface UpdateAccountRequest {
  account: DocAccount;
}

export interface UpdateAccountResponse {
  account: DocAccount;
}

export interface SaveOrganizationResponse {
  organization: Organization;
}

export interface GetOrganizationsByEmailResponse {
  organizations: Organization[];
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

export const saveOrganization = async (
  authToken: string,
  organization: Organization
) => {
  return await axios
    .post(
      AIM_SAVE_ORGANIZATION_ENDPOINT,
      { organization },
      createHeader(authToken)
    )
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return {
        error: {
          message: err.response?.data?.message,
        },
      };
    });
};

export const getOrganizationsByEmail = async (
  authToken: string,
  email: string
) => {
  return await axios
    .get(
      `${AIM_GET_ORGANIZATIONS_BY_EMAIL_ENDPOINT}?email=${email}`,
      createHeader(authToken)
    )
    .then((res) => res.data as GetOrganizationsByEmailResponse)
    .catch((err) => {
      console.error(err);
      return {
        organizations: [],
      } as GetOrganizationsByEmailResponse;
    });
};
