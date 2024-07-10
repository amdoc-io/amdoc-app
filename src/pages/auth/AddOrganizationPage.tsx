import { ChangeEvent, FormEvent, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PrimaryButton } from "../../actions/PrimaryButton";
import Select from "../../actions/Select";
import { Input } from "../../forms/Input";
import { AuthBrandingContainer } from "../../layout/AuthBrandingContainer";
import { DocAccount, Organization } from "../../model/AccountModel";
import { saveOrganization } from "../../utils/AccountFetchUtils";
import { isValidated } from "../../utils/ValidationUtils";
import { Countries } from "../config/BusinessConfig";

export const AddOrganizationPage = () => {
  const navigate = useNavigate();

  const account: DocAccount = useSelector((state: any) => state.auth.account);
  const authToken: string = useSelector((state: any) => state.auth.token);

  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [errorData, setErrorData] = useState<{
    [key: string]: any;
  }>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value, type, checked },
    } = event;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const validation = {
      name: formData["name"] ? undefined : "Missing organization name input",
      country: formData["country"] ? undefined : "Missing country input",
    };

    setErrorData((prev) => ({
      ...prev,
      ...validation,
    }));

    if (isValidated(validation)) {
      const organization: Organization = {
        ...formData,
        email: account.email,
      };
      const saveOrgRes = await saveOrganization(authToken, organization);
      if (saveOrgRes) {
        navigate("/prepare-application");
      }
    }

    setLoading(false);
  };

  return (
    <AuthBrandingContainer>
      <div className="text-center mb-6 flex flex-col gap-2 w-full">
        <p className="font-semibold text-2xl">Add your organization</p>

        <p className="text-gray-600 text-sm">
          To manage your documentation within the team
        </p>
      </div>

      <form className="w-full flex flex-col gap-8" onSubmit={handleSubmit}>
        <Input
          label="Organization"
          name="name"
          value={formData["name"]}
          error={errorData["name"]}
          onChange={handleInputChange}
          placeholder="Enter an organization name"
          note="Your organization is a workspace where you can invite members, collaborate, and manage resources with your team. You can update this name at any time"
          required
        />
        <Select
          label="Country of operation"
          placeholder="Select a country"
          required
          options={Countries}
          value={formData["country"]}
          error={errorData["country"]}
          onChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              country: value,
            }))
          }
        />
        <PrimaryButton loading={loading} type="submit">
          Submit
        </PrimaryButton>
      </form>
    </AuthBrandingContainer>
  );
};
