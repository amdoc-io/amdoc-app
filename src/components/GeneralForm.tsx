import { ChangeEvent } from "react";
import { ColorPicker } from "../forms/ColorPicker";
import { DocFormContainer } from "../layout/DocFormContainer";
import { Input } from "../forms/Input";
import { RxLink2 } from "react-icons/rx";
import { transformDomain } from "../utils/TransformUtils";
import { HiOutlineBuildingOffice } from "react-icons/hi2";

export const GeneralForm = (props: {
  formData?: { [key: string]: any };
  setFormData?: React.Dispatch<
    React.SetStateAction<{
      [key: string]: any;
    }>
  >;
}) => {
  const { formData = {}, setFormData = () => {} } = props;

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value, type, checked },
    } = event;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleInputBlur = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value },
    } = event;

    setFormData((prev) => ({
      ...prev,
      [name]: transformDomain(value),
    }));
  };

  return (
    <DocFormContainer title="General">
      <Input
        label="Brand Name"
        name="brandName"
        value={formData["brandName"]}
        leading={<HiOutlineBuildingOffice />}
        onChange={handleInputChange}
        placeholder="Enter your brand name"
        note="The brand associated with this documentation"
      />

      <ColorPicker
        label="Color"
        name="brandColor"
        value={formData["brandColor"]}
        onChange={handleInputChange}
        note="Your website branding color"
      />

      <Input
        label="Homepage URL"
        name="homepageUrl"
        value={formData["homepageUrl"]}
        leading={<RxLink2 />}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        placeholder="Link to your homepage"
        note="The full URL to your application homepage"
      />

      <Input
        label="Privacy Policy URL"
        name="privacyPolicyUrl"
        value={formData["privacyPolicyUrl"]}
        leading={<RxLink2 />}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        placeholder="Link to your privacy policy"
        note="The full URL to your privacy policy"
      />
    </DocFormContainer>
  );
};
