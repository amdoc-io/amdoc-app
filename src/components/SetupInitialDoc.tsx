import { useState } from "react";
import { RxPencil2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { OutlinedButton } from "../actions/OutlinedButton";
import { StepContainer } from "../layout/StepContainer";
import { GithubAccessToken } from "../model/AuthModel";
import { createRepoFromTemplate } from "../utils/GithubFetchUtils";

export const SetupInitialDoc = (props: { onComplete?: () => void }) => {
  const githubUser: any = useSelector((state: any) => state.auth.githubUser);

  const { onComplete = () => {} } = props;

  const [createDocLoading, setCreateDocLoading] = useState<boolean>(false);

  const githubOAuthAccessToken: GithubAccessToken = useSelector(
    (state: any) => state.auth.githubOAuthAccessToken
  );
  const handleCreateDoc = async () => {
    setCreateDocLoading(true);
    await createRepoFromTemplate(
      githubOAuthAccessToken.accessToken,
      githubUser.login
    );

    onComplete();

    setCreateDocLoading(false);
  };

  return (
    <StepContainer>
      <p>Create a documentation project from a default template</p>
      <div className="flex">
        <OutlinedButton
          loading={createDocLoading}
          icon={<RxPencil2 />}
          onClick={handleCreateDoc}
        >
          Create an initial doc
        </OutlinedButton>
      </div>
    </StepContainer>
  );
};
