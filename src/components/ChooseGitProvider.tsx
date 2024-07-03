import { useEffect, useState } from "react";
import { RxGithubLogo } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { RadioCard } from "../actions/RadioCard";
import { setGitProvider } from "../features/onboard/onboardSlice";
import { StepContainer } from "../layout/StepContainer";

export const ChooseGitProvider = (props: { onComplete?: () => void }) => {
  const { onComplete = () => {} } = props;
  const [setupCompleted, setSetupCompleted] = useState<boolean>(false);

  const dispatch = useDispatch();
  const gitProvider: string = useSelector(
    (state: any) => state.onboard.gitProvider
  );

  useEffect(() => {
    if (gitProvider && !setupCompleted) {
      onComplete();
      setSetupCompleted(true);
    }
  }, [gitProvider, onComplete, setupCompleted]);

  return (
    <StepContainer>
      <p>Choose one of the following providers to deploy your application</p>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <RadioCard
          active={gitProvider === "GitHub"}
          value="GitHub"
          onChange={(value) => dispatch(setGitProvider(value))}
        >
          <RxGithubLogo /> GitHub
        </RadioCard>
      </div>
    </StepContainer>
  );
};
