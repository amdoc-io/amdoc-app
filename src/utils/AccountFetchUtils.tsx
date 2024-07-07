import axios from "axios";
import {
  AIM_CREATE_GIT_CLIENT_WEB_APP_ENDPOINT,
  AIM_GET_GITHUB_APP_JWT_PROXY_ENDPOINT,
  AIM_UPDATE_NETLIFY_SITE,
} from "../endpoints/AIMEndpoint";
import { createHeader } from "./FetchUtils";

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
    .post(`${AIM_UPDATE_NETLIFY_SITE}`, { ...site }, createHeader(authToken))
    .then((res) => res.data)
    .catch((err) => {
      console.error(err);
      return undefined;
    });
};
