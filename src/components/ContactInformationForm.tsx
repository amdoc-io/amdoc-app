import { ChangeEvent } from "react";
import { RxEnvelopeClosed } from "react-icons/rx";
import { Input } from "../forms/Input";
import { DocFormContainer } from "../layout/DocFormContainer";
import { transformDomain } from "../utils/TransformUtils";

export const ContactInformationForm = (props: {
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

  const handleSocialLinksChange = (
    event: ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const {
      target: { name, value },
    } = event;
    const links = [...formData[name]];
    links[i] = { ...links[i], href: value };
    setFormData((prev) => ({
      ...prev,
      [name]: links,
    }));
  };

  const handleSocialLinksBlur = (
    event: ChangeEvent<HTMLInputElement>,
    i: number
  ) => {
    const {
      target: { name, value },
    } = event;
    const links = [...formData[name]];
    links[i] = {
      ...links[i],
      href: transformDomain(value),
    };
    setFormData((prev) => ({
      ...prev,
      [name]: links,
    }));
  };

  return (
    <DocFormContainer title="Contact Information">
      <Input
        placeholder="info@company.com"
        onChange={handleInputChange}
        name="infoEmail"
        leading={<RxEnvelopeClosed />}
        label="Get in touch"
        value={formData["infoEmail"]}
        note="The email address for general inquiries"
      />

      <Input
        placeholder="support@company.com"
        onChange={handleInputChange}
        name="supportEmail"
        leading={<RxEnvelopeClosed />}
        label="Contact support"
        value={formData["supportEmail"]}
        note="The email address for customer support"
      />

      <Input
        placeholder="career@company.com"
        onChange={handleInputChange}
        name="careerEmail"
        leading={<RxEnvelopeClosed />}
        label="Career"
        value={formData["careerEmail"]}
        note="The email address for career opportunities"
      />

      <div className="flex flex-col gap-4">
        {formData["socialLinks"].map((item: any, i: number) => (
          <Input
            key={i}
            placeholder={item.placeholder || "Link to social profile"}
            onChange={(e) => handleSocialLinksChange(e, i)}
            name="socialLinks"
            onBlur={(e) => handleSocialLinksBlur(e, i)}
            leading={item.icon}
            label={i === 0 ? "Social link" : undefined}
            value={item.href}
            note={`Link to your ${item.name} profile`}
          />
        ))}
      </div>
    </DocFormContainer>
  );
};
