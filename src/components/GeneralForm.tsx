import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { RxLink2 } from "react-icons/rx";
import { ColorPicker } from "../forms/ColorPicker";
import { Input } from "../forms/Input";
import { UploadAvatar } from "../forms/UploadAvatar";
import { DocFormContainer } from "../layout/DocFormContainer";
import {
  handleInputBlur,
  handleInputChange,
  handleInputDrop,
} from "../utils/FormUtils";

export const GeneralForm = (props: {
  formData?: { [key: string]: any };
  setFormData?: React.Dispatch<
    React.SetStateAction<{
      [key: string]: any;
    }>
  >;
}) => {
  const { formData = {}, setFormData = () => {} } = props;

  return (
    <DocFormContainer title="General">
      <Input
        label="Brand Name"
        name="brandName"
        value={formData["brandName"]}
        leading={<HiOutlineBuildingOffice />}
        onChange={(e) => handleInputChange(e, setFormData)}
        placeholder="Enter your brand name"
        note="The brand associated with this documentation"
      />

      <UploadAvatar
        label="Logo"
        name="logoImg"
        value={formData["logoImg"]}
        existingUrl={formData["logoUrl"]}
        onChange={(e) => handleInputChange(e, setFormData)}
        onDrop={(e) => handleInputDrop(e, setFormData)}
        note={
          <ul className="list-disc ml-3">
            <li>Suggested image dimensions: 1024 x 1024</li>
            <li>File must be less than 10 MB</li>
            <li>Supports JPG, JPEG, and PNG</li>
          </ul>
        }
      />

      <ColorPicker
        label="Color"
        name="brandColor"
        value={formData["brandColor"]}
        onChange={(e) => handleInputChange(e, setFormData)}
        note="Your website branding color"
      />

      <Input
        label="Homepage URL"
        name="homepageUrl"
        value={formData["homepageUrl"]}
        leading={<RxLink2 />}
        onChange={(e) => handleInputChange(e, setFormData)}
        onBlur={(e) => handleInputBlur(e, setFormData)}
        placeholder="Link to your homepage"
        note="The full URL to your application homepage"
      />

      <Input
        label="Privacy Policy URL"
        name="privacyPolicyUrl"
        value={formData["privacyPolicyUrl"]}
        leading={<RxLink2 />}
        onChange={(e) => handleInputChange(e, setFormData)}
        onBlur={(e) => handleInputBlur(e, setFormData)}
        placeholder="Link to your privacy policy"
        note="The full URL to your privacy policy"
      />
    </DocFormContainer>
  );
};
