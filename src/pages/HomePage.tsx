import { Steps } from "../actions/Steps";
import { ConnectGitProvider } from "../components/ConnectGitProvider";
import { Heading } from "../display/Heading";
import { Paragraph } from "../display/Paragraph";

export const HomePage = () => {
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
            className="mt-2"
            steps={[
              {
                title: "Connect to Git provider",
                description: <ConnectGitProvider />,
              },
              {
                title: "Set up your initial doc",
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
