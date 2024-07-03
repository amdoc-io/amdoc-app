import { useState } from "react";
import { RxPencil2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { OutlinedButton } from "../actions/OutlinedButton";
import {
  InstallationToken,
  createRepoFromTemplate,
} from "../utils/GithubFetchUtils";

export const SetupInitialDoc = (props: { onComplete?: () => void }) => {
  const { onComplete = () => {} } = props;

  const [createDocLoading, setCreateDocLoading] = useState<boolean>(false);

  const githubInstallationToken: InstallationToken = useSelector(
    (state: any) => state.auth.githubInstallationToken
  );

  const handleCreateDoc = async () => {
    setCreateDocLoading(true);

    await createRepoFromTemplate(githubInstallationToken.token);

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
