import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Input } from "../../forms/Input";
import { UploadAvatar } from "../../forms/UploadAvatar";
import { ContentContainer } from "../../layout/ContentContainer";
import { DocFormContainer } from "../../layout/DocFormContainer";
import { DocAccount } from "../../model/AccountModel";
import {
  handleInputBlur,
  handleInputChange,
  handleInputDrop,
} from "../../utils/FormUtils";
import { RxLink2 } from "react-icons/rx";
import Select from "../../actions/Select";
import { CompanySizeOptions } from "../config/BusinessConfig";

export const ProfilePage = () => {
  const account: DocAccount = useSelector((state: any) => state.auth.account);

  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      ...account,
    }));
  }, [account]);

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
    </ContentContainer>
  );
};
