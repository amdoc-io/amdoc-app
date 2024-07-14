import { ChangeEvent } from "react";
import { ColorPicker } from "../forms/ColorPicker";
import { DocFormContainer } from "../layout/DocFormContainer";
import { Input } from "../forms/Input";
import { RxLink2 } from "react-icons/rx";
import { transformDomain } from "../utils/TransformUtils";

export const ThemeForm = (props: {
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
        label="Homepage URL"
        name="homepageUrl"
        value={formData["homepageUrl"]}
        leading={<RxLink2 />}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        placeholder="Link to your homepage"
        note="The full URL to your application homepage"
      />

      <ColorPicker
        label="Color"
        name="themeColor"
        value={formData["themeColor"]}
        onChange={handleInputChange}
      />
    </DocFormContainer>
  );
};
