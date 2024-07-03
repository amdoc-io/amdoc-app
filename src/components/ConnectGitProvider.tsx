import { useCallback, useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { RxDownload } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { OutlinedButton } from "../actions/OutlinedButton";
import {
  setGithubInstallationId,
  setGithubInstallationToken,
} from "../features/onboard/onboardSlice";
import { StepContainer } from "../layout/StepContainer";
import { getGithubAppJWT } from "../utils/AccountFetchUtils";
import {
  InstallationToken,
  getGithubAppInstallations,
  getGithubInstallationAccessTokens,
} from "../utils/GithubFetchUtils";

export const ConnectGitProvider = (props: { onComplete?: () => void }) => {
  const { onComplete = () => {} } = props;

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authToken: string = useSelector((state: any) => state.auth.token);
  const githubInstallationToken: InstallationToken = useSelector(
    (state: any) => state.onboard.githubInstallationToken
  );
  const searchParams = new URLSearchParams(location.search);
  const installationId = searchParams.get("installation_id");

  const [githubLoading, setGithubLoading] = useState<boolean>(false);
  const [setupCompleted, setSetupCompleted] = useState<boolean>(false);

  const handleGithubSuccessInstallation = useCallback(async () => {
    if (installationId && !setupCompleted) {
      setGithubLoading(true);

      dispatch(setGithubInstallationId(installationId));

      const jwt = await getGithubAppJWT(authToken);
      const githubInstallationToken = await getGithubInstallationAccessTokens(
        jwt,
        installationId
      );

      dispatch(setGithubInstallationToken(githubInstallationToken));

      onComplete();
      setSetupCompleted(true);
      setGithubLoading(false);
      navigate("/");
    }
  }, [
    installationId,
    onComplete,
    setupCompleted,
    authToken,
    dispatch,
    navigate,
  ]);

  useEffect(() => {
    if (
      githubInstallationToken &&
      githubInstallationToken.token &&
      !setupCompleted
    ) {
      onComplete();
      setSetupCompleted(true);
    }
  }, [githubInstallationToken, onComplete, setupCompleted]);

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
      setGithubLoading(false);
      navigate(`/?${searchParams}`);
    } else {
      setGithubLoading(false);
      window.location.href =
        "https://github.com/apps/amdoc-io/installations/new";
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
