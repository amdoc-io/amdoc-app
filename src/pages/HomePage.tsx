import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "../actions/Link";
import { Steps } from "../actions/Steps";
import { AuthorizeGitOAuth } from "../components/AuthorizeGitOAuth";
import { ChooseGitProvider } from "../components/ChooseGitProvider";
import { ConnectGitProvider } from "../components/ConnectGitProvider";
import { SetupInitialDoc } from "../components/SetupInitialDoc";
import { Heading } from "../display/Heading";
import { Paragraph } from "../display/Paragraph";
import { ProgressBar } from "../display/ProgressBar";
import { WebDisplay } from "../display/WebDisplay";
import { setInfrastructure } from "../features/onboard/onboardSlice";
import { ContentContainer } from "../layout/ContentContainer";
import { Infrastructure } from "../model/AccountModel";
import { saveInfrastructure } from "../utils/AccountFetchUtils";

export const HomePage = () => {
  const dispatch = useDispatch();
  const authToken: string = useSelector((state: any) => state.auth.token);
  const infrastructure: Infrastructure = useSelector(
    (state: any) => state.onboard.infrastructure
  );
  const {
    gitProvider,
    gitInstallationToken,
    gitOauthToken,
    docInitialRepo,
    docInitialWebsite,
    currentStep,
    id: infraId,
    docInitialWebsiteCreatedAt,
  } = infrastructure || {};

  const githubUser: any = useSelector((state: any) => state.auth.githubUser);

  const docInitialWebsiteCreationPeriod = useMemo(() => {
    if (docInitialWebsiteCreatedAt) {
      const createdAt = new Date(docInitialWebsiteCreatedAt);
      const now = new Date();
      const differenceInMilliseconds = now.getTime() - createdAt.getTime();
      const differenceInSeconds = differenceInMilliseconds / 1000;
      return Math.min(90, differenceInSeconds);
    }
    return -1;
  }, [docInitialWebsiteCreatedAt]);

  const docInitialWebsiteCreationLoading = useMemo(
    () =>
      docInitialWebsiteCreationPeriod >= 0 &&
      docInitialWebsiteCreationPeriod < 90,
    [docInitialWebsiteCreationPeriod]
  );

  const updateStep = async (value: number) => {
    const res = await saveInfrastructure(authToken, {
      id: infraId,
      currentStep: value,
    });
    if (res) {
      dispatch(setInfrastructure(res.infrastructure));
    }
  };

  return (
    <div>
      <Heading level={1}>Home</Heading>

      <ContentContainer>
        <Paragraph>Welcome to iGendoc!</Paragraph>

        <div className="flex flex-col gap-4">
          <Heading level={2}>Getting Started</Heading>
          <Paragraph>
            To begin automating your documentation with iGendoc, follow the
            steps below.
          </Paragraph>
          <Steps
            value={currentStep === null ? -1 : currentStep}
            onChange={(value) => updateStep(value)}
            className="my-2"
            steps={[
              {
                title: "Choose a Git provider",
                description: (
                  <ChooseGitProvider onComplete={() => updateStep(1)} />
                ),
                isCompleted: gitProvider !== undefined && gitProvider !== null,
                postCompletion: (
                  <p>
                    You have successfully selected{" "}
                    <span className="text-gray-900">{gitProvider}</span> as your
                    Git provider!
                  </p>
                ),
              },
              {
                title: "Authorize with OAuth",
                description: (
                  <AuthorizeGitOAuth onComplete={() => updateStep(2)} />
                ),
                isCompleted:
                  gitOauthToken !== undefined && gitOauthToken !== null,
                postCompletion: (
                  <p>
                    You have successfully authorized using {gitProvider} OAuth
                    as{" "}
                    <Link href={githubUser?.html_url} target="_blank">
                      {githubUser?.login}
                    </Link>
                    !
                  </p>
                ),
              },
              {
                title: "Connect to Git provider",
                description: (
                  <ConnectGitProvider onComplete={() => updateStep(3)} />
                ),
                isCompleted: !!(
                  gitInstallationToken && gitInstallationToken.token
                ),
                postCompletion: `You have successfully installed the ${gitProvider} application!`,
              },
              {
                title: "Set up your initial doc",
                description: (
                  <SetupInitialDoc onComplete={() => updateStep(4)} />
                ),
                isCompleted:
                  docInitialRepo !== undefined && docInitialRepo !== null,
                postCompletion: (
                  <p>
                    You have successfully set up your initial documentation!
                    Access your repo:{" "}
                    <Link
                      href={`${githubUser?.html_url}/${docInitialRepo}`}
                      target="_blank"
                    >
                      {`${githubUser?.login}/${docInitialRepo}`}
                    </Link>
                  </p>
                ),
              },
            ]}
          />

          {docInitialRepo && (
            <>
              <Paragraph
                className={`${
                  docInitialWebsiteCreationLoading
                    ? "flex items-center gap-2"
                    : ""
                }`}
              >
                {docInitialWebsiteCreationLoading ? (
                  <>
                    Your {docInitialRepo} documentation website is being
                    prepared. Ready in less than 2 minutes.
                    <ProgressBar value={docInitialWebsiteCreationPeriod / 90} />
                  </>
                ) : (
                  <>
                    Your documentation website:{" "}
                    <Link
                      href={docInitialWebsite}
                      target="_blank"
                      rel="noreferrer"
                    >{`${docInitialRepo}.igendoc.com`}</Link>
                  </>
                )}
              </Paragraph>
              {!docInitialWebsiteCreationLoading && (
                <Paragraph className="italic">
                  If the website is not ready, wait a few minutes and refresh.
                </Paragraph>
              )}

              {docInitialWebsite && (
                <WebDisplay url={docInitialWebsite} className="mt-4" />
              )}
            </>
          )}
        </div>
      </ContentContainer>
    </div>
  );
};
