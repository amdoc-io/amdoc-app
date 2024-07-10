import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { RxPencil2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "../actions/Checkbox";
import { Link } from "../actions/Link";
import { OutlinedButton } from "../actions/OutlinedButton";
import { setInfrastructure } from "../features/onboard/onboardSlice";
import { Input } from "../forms/Input";
import { Card } from "../layout/Card";
import { StepContainer } from "../layout/StepContainer";
import { DocAccount, Infrastructure } from "../model/AccountModel";
import { saveInfrastructure } from "../utils/AccountFetchUtils";
import { createRepoFromTemplate } from "../utils/GithubFetchUtils";
import { titleCaseToSnakeCase } from "../utils/StringUtils";

export const SetupInitialDoc = (props: { onComplete?: () => void }) => {
  const dispatch = useDispatch();

  const { onComplete = () => {} } = props;

  const githubUser: any = useSelector((state: any) => state.auth.githubUser);
  const account: DocAccount = useSelector((state: any) => state.auth.account);

  const authToken: string = useSelector((state: any) => state.auth.token);
  const infrastructure: Infrastructure = useSelector(
    (state: any) => state.onboard.infrastructure
  );
  const { docInitialRepo, gitInstallationToken } = infrastructure;

  const [createDocLoading, setCreateDocLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ [key: string]: any }>({
    repoName: "docs",
  });
  const [setupCompleted, setSetupCompleted] = useState<boolean>(false);
  const [repoCreationError, setRepoCreationError] = useState<string>();

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
      target: { name, value, type, checked },
    } = event;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const saveDocRepo = async (repo: string) => {
    const savedInfraRes = await saveInfrastructure(authToken, {
      id: infrastructure.id,
      docInitialRepo: repo,
    });
    if (savedInfraRes) {
      dispatch(setInfrastructure(savedInfraRes.infrastructure));
    }
  };

  const handleCreateDoc = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setCreateDocLoading(true);

    if (formData.existingRepoAcknowledged && repoCreationError) {
      onComplete();
      saveDocRepo(formData.repoName.toString());
    } else {
      if (gitInstallationToken) {
        const res = await createRepoFromTemplate(
          gitInstallationToken.token,
          githubUser.login,
          formData.repoName.toString()
        );

        if (res) {
          if (res.status === "422" && res.message?.includes("already exists")) {
            setRepoCreationError(res.message);
          } else {
            if (repoCreationError) {
              setRepoCreationError(undefined);
            }
            onComplete();
            saveDocRepo(formData.repoName.toString());
          }
        }
      }
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
        className="flex flex-col items-start gap-4 w-full"
      >
        <Card className="lg:max-w-[600px]">
          <Input
            placeholder="Enter a repo name"
            name="repoName"
            value={formData["repoName"]}
            label="Repository"
            onChange={handleInputChange}
            error={repoCreationError}
            note={
              <div>
                The repository name will serve as the default subdomain for your
                documentation website {"("}e.g., https://{formData["repoName"]}
                .igendoc.com
                {")"}
              </div>
            }
          />

          {repoCreationError &&
            repoCreationError.includes("already exists") && (
              <Checkbox
                className="mt-2 text-xs font-normal"
                inputClassName="!h-4 !w-4"
                name="existingRepoAcknowledged"
                value={formData["existingRepoAcknowledged"]}
                onChange={handleInputChange}
              >
                Acknowledge that the existing repository,{" "}
                <Link
                  href={`${githubUser?.html_url}/${formData["repoName"]}`}
                  target="_blank"
                >
                  {formData["repoName"]}
                </Link>
                , can be used to generate your documentation website
              </Checkbox>
            )}
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
