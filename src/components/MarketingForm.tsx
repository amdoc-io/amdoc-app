import { ChangeEvent } from "react";
import { Input } from "../forms/Input";
import { DocFormContainer } from "../layout/DocFormContainer";
import { transformDomain } from "../utils/TransformUtils";
import { RxLink2 } from "react-icons/rx";
import { TbHandClick } from "react-icons/tb";

export const MarketingForm = (props: {
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
    <DocFormContainer title="Marketing">
      <Input
        placeholder="Start your free trial"
        onChange={handleInputChange}
        name="callToActionName"
        leading={<TbHandClick />}
        label="CTA Name"
        value={formData["callToActionName"]}
        note="Instruction to lead your customers to sign up for your product"
      />

      <Input
        placeholder="Link to your sign up page"
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        name="callToActionUrl"
        leading={<RxLink2 />}
        label="CTA URL"
        value={formData["callToActionUrl"]}
        note="The full call-to-action URL to where your customers can sign up for your product"
      />
    </DocFormContainer>
  );
};
