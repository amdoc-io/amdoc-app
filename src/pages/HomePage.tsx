import { useState } from "react";
import { Steps } from "../actions/Steps";
import { ConnectGitProvider } from "../components/ConnectGitProvider";
import { Heading } from "../display/Heading";
import { Paragraph } from "../display/Paragraph";
import { SetupInitialDoc } from "../components/SetupInitialDoc";
import { ChooseGitProvider } from "../components/ChooseGitProvider";
import { AuthorizeGitOAuth } from "../components/AuthorizeGitOAuth";

export const HomePage = () => {
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
              },
              {
                title: "Authorize with OAuth",
                description: (
                  <AuthorizeGitOAuth onComplete={() => setCurrentStep(2)} />
                ),
              },
              {
                title: "Connect to Git provider",
                description: (
                  <ConnectGitProvider onComplete={() => setCurrentStep(3)} />
                ),
              },
              {
                title: "Set up your initial doc",
                description: (
                  <SetupInitialDoc onComplete={() => setCurrentStep(4)} />
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
