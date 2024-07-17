import { useEffect, useState } from "react";
import { RxLink2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "../../actions/Checkbox";
import { Link } from "../../actions/Link";
import { PrimaryButton } from "../../actions/PrimaryButton";
import Select from "../../actions/Select";
import { setAccount } from "../../features/auth/authSlice";
import { Input } from "../../forms/Input";
import { UploadAvatar } from "../../forms/UploadAvatar";
import { ContentContainer } from "../../layout/ContentContainer";
import { DocFormContainer } from "../../layout/DocFormContainer";
import { DocAccount } from "../../model/AccountModel";
import { updateAccount } from "../../utils/AccountFetchUtils";
import {
  handleInputBlur,
  handleInputChange,
  handleInputDrop,
} from "../../utils/FormUtils";
import { CompanySizeOptions } from "../config/BusinessConfig";

export const ProfilePage = () => {
  const dispatch = useDispatch();
  const account: DocAccount = useSelector((state: any) => state.auth.account);
  const authToken: string = useSelector((state: any) => state.auth.token);

  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      ...account,
    }));
  }, [account]);

  const handleSaveChanges = async () => {
    setLoading(true);

    const res = await updateAccount(authToken, {
      account: {
        ...formData,
      },
    });
    if (res) {
      dispatch(setAccount(res.account));
    }

    setLoading(false);
  };

  return (
    <ContentContainer>
      <DocFormContainer title="Profile Settings">
        <Input name="email" label="Email" disabled value={formData["email"]} />
        <Input
          name="firstName"
          label="First Name"
          value={formData["firstName"]}
          onChange={(e) => handleInputChange(e, setFormData)}
        />

        <Input
          name="lastName"
          label="Last Name"
          value={formData["lastName"]}
          onChange={(e) => handleInputChange(e, setFormData)}
        />

        <UploadAvatar
          label="Profile Picture"
          name="profileImg"
          value={formData["profileImg"]}
          onChange={(e) => handleInputChange(e, setFormData)}
          existingUrl={formData["profileImageUrl"]}
          onDrop={(e) => handleInputDrop(e, setFormData)}
          note={
            <ul className="list-disc ml-3">
              <li>Suggested image dimensions: 1024 x 1024</li>
              <li>File must be less than 10 MB</li>
              <li>Supports JPG, JPEG, and PNG</li>
            </ul>
          }
        />
      </DocFormContainer>

      <DocFormContainer title="Demographic Settings">
        <Input
          label="Job Title"
          placeholder="Enter your job title"
          name="jobTitle"
          value={formData["jobTitle"]}
          onChange={(e) => handleInputChange(e, setFormData)}
        />

        <Input
          name="organization"
          label="Company Name"
          value={formData["organization"]}
          onChange={(e) => handleInputChange(e, setFormData)}
        />

        <Select
          name="companySize"
          label="Company Size"
          value={formData["companySize"]}
          onChange={(e) => handleInputChange(e, setFormData)}
          options={CompanySizeOptions}
        />

        <Input
          name="companyWebsite"
          label="Company Site"
          value={formData["companyWebsite"]}
          leading={<RxLink2 />}
          onChange={(e) => handleInputChange(e, setFormData)}
          onBlur={(e) => handleInputBlur(e, setFormData)}
        />
      </DocFormContainer>

      <DocFormContainer title="Subscription Settings">
        <Checkbox
          name="isNewsSubscribed"
          checked={formData["isNewsSubscribed"]}
          onChange={(e) => handleInputChange(e, setFormData)}
        >
          Send me information about iGendoc products, events, and promotions.
          See{" "}
          <Link href="/" target="_blank">
            Privacy Policy
          </Link>
        </Checkbox>
      </DocFormContainer>

      <div className="flex">
        <div className="flex">
          <PrimaryButton onClick={handleSaveChanges} loading={loading}>
            Save Changes
          </PrimaryButton>
        </div>
      </div>
    </ContentContainer>
  );
};
