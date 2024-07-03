import axios from "axios";
import { AIM_GET_GITHUB_APP_JWT_PROXY_ENDPOINT } from "../endpoints/AIMEndpoint";
import { createHeader } from "./FetchUtils";

export const getGithubAppJWT = async (authToken: string) => {
  return await axios
    .get(`${AIM_GET_GITHUB_APP_JWT_PROXY_ENDPOINT}`, createHeader(authToken))
    .then((res) => res.data)
    .catch((err) => undefined);
};