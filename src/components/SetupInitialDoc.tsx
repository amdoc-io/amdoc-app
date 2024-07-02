import { OutlinedButton } from "../actions/OutlinedButton";
import { RxPencil2 } from "react-icons/rx";
import { GithubAccessToken } from "../model/AuthModel";
import { useSelector } from "react-redux";
import { createRepoFromTemplate } from "../utils/GithubFetchUtils";
import { useState } from "react";

export const SetupInitialDoc = (props: { onComplete?: () => void }) => {
  const { onComplete = () => {} } = props;

  const [createDocLoading, setCreateDocLoading] = useState<boolean>(false);

  const githubAccessToken: GithubAccessToken = useSelector(
    (state: any) => state.auth.githubAccessToken
  );

  const handleCreateDoc = async () => {
    setCreateDocLoading(true);

    await createRepoFromTemplate(githubAccessToken.accessToken);

    onComplete();

    setCreateDocLoading(false);
  };

  return (
    <div className="flex flex-col gap-2 items-start w-full">
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
    </div>
  );
};
