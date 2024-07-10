import { useCallback, useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { RxDownload } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { OutlinedButton } from "../actions/OutlinedButton";
import { setInfrastructure } from "../features/onboard/onboardSlice";
import { StepContainer } from "../layout/StepContainer";
import { GitInstallationToken, Infrastructure } from "../model/AccountModel";
import {
  getGithubAppJWT,
  saveInfrastructure,
} from "../utils/AccountFetchUtils";
import {
  getGithubAppInstallations,
  getGithubInstallationAccessTokens,
} from "../utils/GithubFetchUtils";
import { mapInstallationToken } from "../utils/TokenUtils";

export const ConnectGitProvider = (props: { onComplete?: () => void }) => {
  const { onComplete = () => {} } = props;

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authToken: string = useSelector((state: any) => state.auth.token);
  const infrastructure: Infrastructure = useSelector(
    (state: any) => state.onboard.infrastructure
  );
  const { gitInstallationToken, id: infraId } = infrastructure;
  const searchParams = new URLSearchParams(location.search);
  const installationId = searchParams.get("installation_id");
  const refreshToken = searchParams.get("refresh_token");

  const [githubLoading, setGithubLoading] = useState<boolean>(false);
  const [setupCompleted, setSetupCompleted] = useState<boolean>(false);

  const handleGithubSuccessInstallation = useCallback(async () => {
    if (installationId && (!setupCompleted || refreshToken)) {
      setGithubLoading(true);

      const jwt = await getGithubAppJWT(authToken);
      const githubInstallationToken = await getGithubInstallationAccessTokens(
        jwt,
        installationId
      );
      if (githubInstallationToken) {
        const gitInstallationToken: GitInstallationToken = mapInstallationToken(
          githubInstallationToken
        );
        const savedInfraRes = await saveInfrastructure(authToken, {
          id: infraId,
          gitInstallationToken: gitInstallationToken,
          gitInstallationId: installationId,
        });
        if (savedInfraRes) {
          dispatch(setInfrastructure(savedInfraRes.infrastructure));
          onComplete();
          setSetupCompleted(true);
          setGithubLoading(false);
          navigate("/");
        }
      }
    }
  }, [
    installationId,
    onComplete,
    setupCompleted,
    authToken,
    dispatch,
    navigate,
    refreshToken,
    infraId,
  ]);

  useEffect(() => {
    if (gitInstallationToken && gitInstallationToken.token && !setupCompleted) {
      onComplete();
      setSetupCompleted(true);
    }
  }, [gitInstallationToken, onComplete, setupCompleted]);

  useEffect(() => {
    handleGithubSuccessInstallation();
  }, [handleGithubSuccessInstallation]);

  const handleGithubConnect = async () => {
    setGithubLoading(true);

    const jwt = await getGithubAppJWT(authToken);
    const installations = await getGithubAppInstallations(jwt);
    const installation = installations.find(
      (installation) =>
        installation.app_id.toString() === process.env.REACT_APP_GITHUB_APP_ID
    );
    if (installation) {
      const searchParams = new URLSearchParams(location.search);
      const installationId = installation.id.toString();
      searchParams.set("installation_id", installationId);
      searchParams.set(
        "refresh_token",
        Math.floor(10000 + Math.random() * 90000).toString()
      );
      setGithubLoading(false);
      navigate(`/?${searchParams}`);
    } else {
      setGithubLoading(false);
      window.location.href =
        "https://github.com/apps/igendoc/installations/new";
    }
  };

  return (
    <StepContainer>
      <p>Your resources will be managed within an application</p>

      <div className="flex">
        <OutlinedButton
          loading={githubLoading}
          onClick={handleGithubConnect}
          icon={<RxDownload />}
          suffix={
            setupCompleted && <FaCheckCircle className="text-green-500" />
          }
        >
          Install application
        </OutlinedButton>
      </div>
    </StepContainer>
  );
};
