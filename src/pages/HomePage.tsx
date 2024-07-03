import { useState } from "react";
import { Steps } from "../actions/Steps";
import { ConnectGitProvider } from "../components/ConnectGitProvider";
import { Heading } from "../display/Heading";
import { Paragraph } from "../display/Paragraph";
import { SetupInitialDoc } from "../components/SetupInitialDoc";
import { ChooseGitProvider } from "../components/ChooseGitProvider";
import { AuthorizeGitOAuth } from "../components/AuthorizeGitOAuth";
import { useSelector } from "react-redux";

export const HomePage = () => {
  const gitProvider: string = useSelector(
    (state: any) => state.onboard.gitProvider
  );

  const [currentStep, setCurrentStep] = useState<number>(-1);

  return (
    <div>
      <Heading level={1}>Home</Heading>

      <div className="flex flex-col gap-12 py-6">
        <Paragraph>Welcome to Amdoc!</Paragraph>

        <div className="flex flex-col gap-4">
          <Heading level={2}>Getting Started</Heading>
          <Paragraph>
            To begin automating your documentation with Amdoc, follow the steps
            below.
          </Paragraph>
          <Steps
            value={currentStep}
            onChange={setCurrentStep}
            className="mt-2"
            steps={[
              {
                title: "Choose a Git provider",
                description: (
                  <ChooseGitProvider onComplete={() => setCurrentStep(1)} />
                ),
                postCompletion: `You have successfully selected ${gitProvider} as your Git provider!`,
              },
              {
                title: "Authorize with OAuth",
                description: (
                  <AuthorizeGitOAuth onComplete={() => setCurrentStep(2)} />
                ),
                postCompletion: `You have successfully authorized using ${gitProvider} OAuth!`,
              },
              {
                title: "Connect to Git provider",
                description: (
                  <ConnectGitProvider onComplete={() => setCurrentStep(3)} />
                ),
                postCompletion: `You have successfully installed the ${gitProvider} application!`,
              },
              {
                title: "Set up your initial doc",
                description: (
                  <SetupInitialDoc onComplete={() => setCurrentStep(4)} />
                ),
                postCompletion: `You have successfully set up your initial documentation!`,
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
