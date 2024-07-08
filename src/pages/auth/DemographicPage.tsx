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

export const DemographicPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const account: DocAccount = useSelector((state: any) => state.auth.account);
  const authToken: string = useSelector((state: any) => state.auth.token);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const request: UpdateAccountRequest = {
      account: {
        ...formData,
        isNewsSubscribed: formData["isNewsSubscribed"] === "on" ? true : false,
        email: account.email,
        isSetupComplete: true,
      },
    };

    const res = await updateAccount(authToken, request);
    if (res) {
      dispatch(setSetupCompleted(res.account.isSetupComplete));
      dispatch(setAccount(res.account));
      setLoading(false);
      navigate("/");
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
          onChange={handleInputChange}
          placeholder="Enter your company name"
          required
        />

        <Select
          label="Company size"
          required
          value={formData["companySize"]}
          onChange={(value) =>
            setFormData((prev) => ({ ...prev, companySize: value }))
          }
          options={[
            {
              label: "1 - 10",
              value: "FROM_1_TO_10",
            },
            {
              label: "11 - 50",
              value: "FROM_11_TO_50",
            },
            {
              label: "51 - 200",
              value: "FROM_51_TO_200",
            },
            {
              label: "201 - 500",
              value: "FROM_201_TO_500",
            },
            {
              label: "501 - 1000",
              value: "FROM_501_TO_1000",
            },
            {
              label: "1001+",
              value: "FROM_1001_TO_INFINITY",
            },
          ]}
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
