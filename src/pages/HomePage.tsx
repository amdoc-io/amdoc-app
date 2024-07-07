import { useDispatch, useSelector } from "react-redux";
import { Steps } from "../actions/Steps";
import { AuthorizeGitOAuth } from "../components/AuthorizeGitOAuth";
import { ChooseGitProvider } from "../components/ChooseGitProvider";
import { ConnectGitProvider } from "../components/ConnectGitProvider";
import { SetupInitialDoc } from "../components/SetupInitialDoc";
import { Heading } from "../display/Heading";
import { Paragraph } from "../display/Paragraph";
import { setClientWeb, setCurrentStep } from "../features/onboard/onboardSlice";
import { GithubAccessToken } from "../model/AuthModel";
import { InstallationToken } from "../utils/GithubFetchUtils";
import { Link } from "../actions/Link";
import { useCallback, useEffect, useState } from "react";
import { createGitClientWebRepo } from "../utils/AccountFetchUtils";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const HomePage = () => {
  const dispatch = useDispatch();
  const authToken: string = useSelector((state: any) => state.auth.token);
  const gitProvider: string = useSelector(
    (state: any) => state.onboard.gitProvider
  );
  const githubOAuthAccessToken: GithubAccessToken = useSelector(
    (state: any) => state.onboard.githubOAuthAccessToken
  );
  const githubInstallationToken: InstallationToken = useSelector(
    (state: any) => state.onboard.githubInstallationToken
  );
  const docInitialRepo: string = useSelector(
    (state: any) => state.onboard.docInitialRepo
  );
  const currentStep: number = useSelector(
    (state: any) => state.onboard.currentStep
  );
  const clientWeb: string = useSelector(
    (state: any) => state.onboard.clientWeb
  );
  const githubUser: any = useSelector((state: any) => state.auth.githubUser);

  const [createClientWebLoading, setCreateClientWebLoading] =
    useState<boolean>(false);

  const createClientWeb = useCallback(async () => {
    if (docInitialRepo && githubUser && !clientWeb) {
      setCreateClientWebLoading(true);
      const isCreated = await createGitClientWebRepo(
        authToken,
        docInitialRepo,
        githubUser.login
      );

      if (isCreated) {
        dispatch(setClientWeb(`https://${docInitialRepo}.igendoc.com`));
      }

      setTimeout(() => {
        setCreateClientWebLoading(false);
      }, 60000);
    }
  }, [docInitialRepo, authToken, githubUser, dispatch, clientWeb]);

  useEffect(() => {
    createClientWeb();
  }, [createClientWeb]);

  return (
    <div>
      <Heading level={1}>Home</Heading>

      <div className="flex flex-col gap-12 py-6">
        <Paragraph>Welcome to iGendoc!</Paragraph>

        <div className="flex flex-col gap-4">
          <Heading level={2}>Getting Started</Heading>
          <Paragraph>
            To begin automating your documentation with iGendoc, follow the
            steps below.
          </Paragraph>
          <Steps
            value={currentStep}
            onChange={(value) => dispatch(setCurrentStep(value))}
            className="my-2"
            steps={[
              {
                title: "Choose a Git provider",
                description: (
                  <ChooseGitProvider
                    onComplete={() => dispatch(setCurrentStep(1))}
                  />
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
                  <AuthorizeGitOAuth
                    onComplete={() => dispatch(setCurrentStep(2))}
                  />
                ),
                isCompleted: githubOAuthAccessToken !== undefined,
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
                  <ConnectGitProvider
                    onComplete={() => dispatch(setCurrentStep(3))}
                  />
                ),
                isCompleted: !!(
                  githubInstallationToken && githubInstallationToken.token
                ),
                postCompletion: `You have successfully installed the ${gitProvider} application!`,
              },
              {
                title: "Set up your initial doc",
                description: (
                  <SetupInitialDoc
                    onComplete={() => dispatch(setCurrentStep(4))}
                  />
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
                      {docInitialRepo}
                    </Link>
                  </p>
                ),
              },
            ]}
          />

          {docInitialRepo && (
            <Paragraph className="flex items-center gap-2">
              {createClientWebLoading && (
                <AiOutlineLoading3Quarters className="animate-spin" />
              )}
              Your documentation website:
              <a
                className="link"
                href={`https://${docInitialRepo}.igendoc.com`}
                target="_blank"
                rel="noreferrer"
              >{`${docInitialRepo}`}</a>
            </Paragraph>
          )}
        </div>
      </div>
    </div>
  );
};
