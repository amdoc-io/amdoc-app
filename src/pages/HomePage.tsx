import { useCallback, useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "../actions/Link";
import { Steps } from "../actions/Steps";
import { AuthorizeGitOAuth } from "../components/AuthorizeGitOAuth";
import { ChooseGitProvider } from "../components/ChooseGitProvider";
import { ConnectGitProvider } from "../components/ConnectGitProvider";
import { SetupInitialDoc } from "../components/SetupInitialDoc";
import { Heading } from "../display/Heading";
import { Paragraph } from "../display/Paragraph";
import { WebDisplay } from "../display/WebDisplay";
import { setInfrastructure } from "../features/onboard/onboardSlice";
import { ContentContainer } from "../layout/ContentContainer";
import { Infrastructure } from "../model/AccountModel";
import {
  createGitClientWebRepo,
  saveInfrastructure,
  updateNetlifySite,
} from "../utils/AccountFetchUtils";

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
  } = infrastructure || {};

  const githubUser: any = useSelector((state: any) => state.auth.githubUser);

  const [createClientWebLoading, setCreateClientWebLoading] =
    useState<boolean>(false);

  const createClientWeb = useCallback(async () => {
    if (docInitialRepo && githubUser && !docInitialWebsite) {
      setCreateClientWebLoading(true);
      const site = await createGitClientWebRepo(
        authToken,
        docInitialRepo,
        githubUser.login
      );

      if (site) {
        setTimeout(async () => {
          const updatedSite = await updateNetlifySite(authToken, site);
          if (updatedSite) {
            const savedInfraRes = await saveInfrastructure(authToken, {
              id: infraId,
              docInitialWebsite: `https://${docInitialRepo}.igendoc.com`,
            });
            if (savedInfraRes) {
              dispatch(setInfrastructure(savedInfraRes.infrastructure));
            }
          }
        }, 30000);
      }

      setTimeout(() => {
        setCreateClientWebLoading(false);
      }, 90000);
    }
  }, [
    docInitialRepo,
    authToken,
    githubUser,
    dispatch,
    docInitialWebsite,
    infraId,
  ]);

  const updateStep = async (value: number) => {
    const res = await saveInfrastructure(authToken, {
      id: infraId,
      currentStep: value,
    });
    if (res) {
      dispatch(setInfrastructure(res.infrastructure));
    }
  };

  useEffect(() => {
    createClientWeb();
  }, [createClientWeb]);

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
            value={currentStep || -1}
            onChange={(value) => updateStep(value)}
            className="my-2"
            steps={[
              {
                title: "Choose a Git provider",
                description: (
                  <ChooseGitProvider onComplete={() => updateStep(1)} />
                ),
                isCompleted: gitProvider !== undefined,
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
                isCompleted: gitOauthToken !== undefined,
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
                isCompleted: docInitialRepo !== undefined,
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
                  createClientWebLoading ? "flex items-center gap-2" : ""
                }`}
              >
                {createClientWebLoading ? (
                  <>
                    <AiOutlineLoading3Quarters className="animate-spin text-inherit" />
                    Your {docInitialRepo} documentation website is being
                    prepared. Ready in less than 2 minutes.
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
              {!createClientWebLoading && (
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
