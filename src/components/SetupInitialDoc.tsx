import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { RxPencil2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { OutlinedButton } from "../actions/OutlinedButton";
import { setDocInitialRepo } from "../features/onboard/onboardSlice";
import { Input } from "../forms/Input";
import { Card } from "../layout/Card";
import { StepContainer } from "../layout/StepContainer";
import {
  InstallationToken,
  createRepoFromTemplate,
} from "../utils/GithubFetchUtils";
import { DocAccount } from "../model/AccountModel";
import { titleCaseToSnakeCase } from "../utils/StringUtils";

export const SetupInitialDoc = (props: { onComplete?: () => void }) => {
  const dispatch = useDispatch();

  const { onComplete = () => {} } = props;

  const githubUser: any = useSelector((state: any) => state.auth.githubUser);
  const account: DocAccount = useSelector((state: any) => state.auth.account);
  const docInitialRepo: string = useSelector(
    (state: any) => state.onboard.docInitialRepo
  );
  const githubInstallationToken: InstallationToken = useSelector(
    (state: any) => state.onboard.githubInstallationToken
  );

  const [createDocLoading, setCreateDocLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ [key: string]: any }>({
    repoName: "docs",
  });
  const [setupCompleted, setSetupCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (account?.organization) {
      const repoName = titleCaseToSnakeCase(account.organization.toLowerCase());
      setFormData((prev) => ({
        ...prev,
        repoName: repoName,
      }));
    }
  }, [account]);

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
      dispatch(setDocInitialRepo(formValues.repoName.toString()));
    }

    setCreateDocLoading(false);
  };

  useEffect(() => {
    if (docInitialRepo && !setupCompleted) {
      onComplete();
      setSetupCompleted(true);
    }
  }, [docInitialRepo, setupCompleted, onComplete]);

  return (
    <StepContainer>
      <p>
        Create a documentation project from a default template on your behalf
      </p>

      <form
        onSubmit={handleCreateDoc}
        className="flex flex-col items-start gap-4"
      >
        <Card>
          <Input
            placeholder="Enter a repo name"
            className="min-w-72 lg:min-w-96"
            name="repoName"
            value={formData["repoName"]}
            label="Repository"
            onChange={handleInputChange}
          />
        </Card>

        <div className="flex">
          <OutlinedButton
            type="submit"
            loading={createDocLoading}
            icon={<RxPencil2 />}
          >
            Create an initial doc
          </OutlinedButton>
        </div>
      </form>
    </StepContainer>
  );
};
