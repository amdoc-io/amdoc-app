import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInfrastructure } from "../features/onboard/onboardSlice";
import { setDocSettings } from "../features/settings/docSettingsSlice";
import { GitInstallationToken, Infrastructure } from "../model/AccountModel";
import {
  getDocSettingsByOrgId,
  getGithubAppJWT,
  saveInfrastructure,
} from "../utils/AccountFetchUtils";
import { getGithubInstallationAccessTokens } from "../utils/GithubFetchUtils";
import { isTokenValid, mapInstallationToken } from "../utils/TokenUtils";

export const OutletWrapper = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => {
  const dispatch = useDispatch();
  const authToken: string = useSelector((state: any) => state.auth.token);
  const infrastructure: Infrastructure = useSelector(
    (state: any) => state.onboard.infrastructure
  );

  const { currentStep = -1, gitProvider, gitInstallationId } = infrastructure;

  const shouldRotate = useCallback((): boolean => {
    if (!authToken || !gitInstallationId) {
      return false;
    }

    if (gitProvider !== "GitHub") {
      return false;
    }

    if (
      !isNaN(currentStep) &&
      currentStep > 2 &&
      !infrastructure.gitInstallationToken
    ) {
      return true;
    }

    if (!infrastructure.gitInstallationToken) {
      return true;
    }

    const { token, expiresAt } = infrastructure.gitInstallationToken;

    if (!token || !expiresAt) {
      return true;
    }
    return !isTokenValid(expiresAt);
  }, [infrastructure, authToken, gitInstallationId, gitProvider, currentStep]);

  const rotateGithubInstallationToken = useCallback(async () => {
    if (shouldRotate()) {
      const jwt = await getGithubAppJWT(authToken);
      const githubToken = await getGithubInstallationAccessTokens(
        jwt,
        gitInstallationId || ""
      );
      if (githubToken) {
        const gitInstallationToken: GitInstallationToken =
          mapInstallationToken(githubToken);
        const savingInfra: Infrastructure = {
          id: infrastructure.id,
          gitInstallationToken: gitInstallationToken,
        };
        const savedInfraRes = await saveInfrastructure(authToken, savingInfra);
        if (savedInfraRes) {
          dispatch(setInfrastructure(savedInfraRes.infrastructure));
        }
      }
    }
  }, [authToken, gitInstallationId, dispatch, shouldRotate, infrastructure]);

  // const fetchInfrastructure = useCallback(async () => {
  //   setTimeout(async () => {
  //     if (authToken && organization?.id) {
  //       const res = await getInfrastructureByOrganizationId(
  //         authToken,
  //         organization.id
  //       );
  //       if (res) {
  //         dispatch(setInfrastructure(res.infrastructure));
  //       }
  //     }
  //   }, 5000);
  // }, [organization, authToken, dispatch]);

  const fetchDocSettings = useCallback(async () => {
    if (infrastructure?.organizationId && authToken) {
      const settings = await getDocSettingsByOrgId(
        authToken,
        infrastructure.organizationId
      );
      if (settings) {
        dispatch(setDocSettings(settings));
      }
    }
  }, [infrastructure, dispatch, authToken]);

  useEffect(() => {
    rotateGithubInstallationToken();
  }, [rotateGithubInstallationToken]);

  useEffect(() => {
    fetchDocSettings();
  }, [fetchDocSettings]);

  return <div {...props} />;
};
