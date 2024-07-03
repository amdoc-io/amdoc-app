import { ChangeEvent, FormEvent, useState } from "react";
import { RxPencil2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { OutlinedButton } from "../actions/OutlinedButton";
import { Input } from "../forms/Input";
import { StepContainer } from "../layout/StepContainer";
import {
  InstallationToken,
  createRepoFromTemplate,
} from "../utils/GithubFetchUtils";

export const SetupInitialDoc = (props: { onComplete?: () => void }) => {
  const githubUser: any = useSelector((state: any) => state.auth.githubUser);
  console.log(githubUser);

  const { onComplete = () => {} } = props;

  const [createDocLoading, setCreateDocLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ [key: string]: any }>({
    repoName: "amdoc-documentation",
  });

  const githubInstallationToken: InstallationToken = useSelector(
    (state: any) => state.onboard.githubInstallationToken
  );

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreateDoc = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setCreateDocLoading(true);

    const formData = new FormData(event.currentTarget);
    const formValues = Object.fromEntries(formData.entries());

    const res = await createRepoFromTemplate(
      githubInstallationToken.token,
      githubUser.login,
      formValues.repoName.toString()
    );

    if (res) {
      onComplete();
    }

    setCreateDocLoading(false);
  };

  return (
    <StepContainer>
      <p>
        Create a documentation project from a default template on your behalf
      </p>

      <form onSubmit={handleCreateDoc}>
        <div className="flex">
          <Input
            placeholder="Enter a repo name"
            className="min-w-72 lg:min-w-96"
            name="repoName"
            value={formData["repoName"]}
            label="Repository"
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col items-start mt-4">
          <div className="flex">
            <OutlinedButton
              type="submit"
              loading={createDocLoading}
              icon={<RxPencil2 />}
            >
              Create an initial doc
            </OutlinedButton>
          </div>
        </div>
      </form>
    </StepContainer>
  );
};
