import { ChangeEvent, FormEvent, useState } from "react";
import { Checkbox } from "../../actions/Checkbox";
import { Link } from "../../actions/Link";
import { PrimaryButton } from "../../actions/PrimaryButton";
import Select from "../../actions/Select";
import { Input } from "../../forms/Input";
import { AuthBrandingContainer } from "../../layout/AuthBrandingContainer";
import { DocAccount } from "../../model/AccountModel";
import { useDispatch, useSelector } from "react-redux";
import {
  UpdateAccountRequest,
  updateAccount,
} from "../../utils/AccountFetchUtils";
import { useNavigate } from "react-router-dom";
import { setAccount, setSetupCompleted } from "../../features/auth/authSlice";
import { isValidated } from "../../utils/ValidationUtils";
import { CompanySizeOptions } from "../config/BusinessConfig";

export const CompleteSetupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account: DocAccount = useSelector((state: any) => state.auth.account);
  const authToken: string = useSelector((state: any) => state.auth.token);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [errorData, setErrorData] = useState<{ [key: string]: any }>({});
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

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const validation = {
      organization: formData["organization"]
        ? undefined
        : "Missing organization input",
      companySize: formData["companySize"]
        ? undefined
        : "Missing company size input",
      jobTitle: formData["jobTitle"] ? undefined : "Missing job title input",
    };

    setErrorData((prev) => ({
      ...prev,
      ...validation,
    }));

    if (isValidated(validation)) {
      const request: UpdateAccountRequest = {
        account: {
          ...formData,
          isNewsSubscribed: formData["isNewsSubscribed"],
          email: account.email,
          isSetupComplete: true,
        },
      };

      const res = await updateAccount(authToken, request);
      if (res) {
        dispatch(setSetupCompleted(res.account.isSetupComplete));
        dispatch(setAccount(res.account));
        setLoading(false);
        navigate("/add-organization");
      }
    }

    setLoading(false);
  };

  return (
    <AuthBrandingContainer>
      <div className="text-center mb-6 flex flex-col gap-2 w-full">
        <p className="font-semibold text-2xl">Tell us a bit about yourself</p>

        <p className="text-gray-600 text-sm">
          To get the most out of your experience
        </p>
      </div>

      <form className="w-full flex flex-col gap-8" onSubmit={handleSubmit}>
        <Input
          label="Company name"
          name="organization"
          value={formData["organization"]}
          error={errorData["organization"]}
          onChange={handleInputChange}
          placeholder="Enter your company name"
          required
        />

        <Select
          label="Company size"
          required
          value={formData["companySize"]}
          error={errorData["companySize"]}
          onChange={handleInputChange}
          options={CompanySizeOptions}
          placeholder="Select your company size"
        />

        <Input
          label="Company website"
          placeholder="Enter your company website"
          name="companyWebsite"
          value={formData["companyWebsite"]}
          onChange={handleInputChange}
        />

        <Input
          label="Job title"
          placeholder="Enter your job title"
          name="jobTitle"
          required
          value={formData["jobTitle"]}
          error={errorData["jobTitle"]}
          onChange={handleInputChange}
        />

        <Checkbox
          name="isNewsSubscribed"
          checked={formData["isNewsSubscribed"]}
          onChange={handleInputChange}
        >
          Send me information about iGendoc products, events, and promotions.
          See{" "}
          <Link href="/" target="_blank">
            Privacy Policy
          </Link>
        </Checkbox>

        <PrimaryButton loading={loading} type="submit">
          Submit
        </PrimaryButton>
      </form>
    </AuthBrandingContainer>
  );
};
