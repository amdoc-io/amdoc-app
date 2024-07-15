import { RxArrowRight, RxGithubLogo } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { RadioCard } from "../actions/RadioCard";
import { setInfrastructure } from "../features/onboard/onboardSlice";
import { StepContainer } from "../layout/StepContainer";
import { Infrastructure } from "../model/AccountModel";
import { saveInfrastructure } from "../utils/AccountFetchUtils";
import { TextButton } from "../actions/TextButton";

export const ChooseGitProvider = (props: { onComplete?: () => void }) => {
  const { onComplete = () => {} } = props;
  const dispatch = useDispatch();
  const authToken: string = useSelector((state: any) => state.auth.token);
  const infrastructure: Infrastructure = useSelector(
    (state: any) => state.onboard.infrastructure
  );
  const { gitProvider } = infrastructure;

  const saveGitProvider = async (value: string) => {
    if (value === gitProvider) {
      onComplete();
      return;
    }

    const res = await saveInfrastructure(authToken, {
      id: infrastructure.id,
      gitProvider: value,
    });
    if (res) {
      dispatch(setInfrastructure(res.infrastructure));
      onComplete();
    }
  };

  return (
    <StepContainer>
      <p>Choose one of the following providers to deploy your application.</p>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-2 w-full relative">
        <RadioCard
          active={gitProvider === "GitHub"}
          value="GitHub"
          onChange={saveGitProvider}
        >
          GitHub
          <div className="text-[40px]">
            <RxGithubLogo />
          </div>
        </RadioCard>
      </div>

      <div className="flex mt-2">
        <TextButton
          type="button"
          onClick={onComplete}
          suffix={<RxArrowRight />}
        >
          Mark as complete
        </TextButton>
      </div>
    </StepContainer>
  );
};
