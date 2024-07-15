import { ChangeEvent, useState } from "react";
import { RxEnvelopeClosed } from "react-icons/rx";
import { Input } from "../forms/Input";
import { DocFormContainer } from "../layout/DocFormContainer";
import { socialMediaDomains, transformDomain } from "../utils/TransformUtils";

export const ContactInformationForm = (props: {
  formData?: { [key: string]: any };
  setFormData?: React.Dispatch<
    React.SetStateAction<{
      [key: string]: any;
    }>
  >;
}) => {
  const { formData = {}, setFormData = () => {} } = props;
  const [errorData, setErrorData] = useState<(string | undefined)[]>(
    new Array(Object.keys(socialMediaDomains).length).fill(undefined)
  );

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
    links[i] = value;
    setFormData((prev) => ({
      ...prev,
      [name]: links,
    }));
  };

  const handleSocialLinksBlur = (
    event: ChangeEvent<HTMLInputElement>,
    i: number,
    item: any
  ) => {
    const {
      target: { name, value },
    } = event;
    const links = [...formData[name]];
    links[i] = transformDomain(value) || "";
    const errors = [...errorData];
    if (value) {
      if (!links[i].includes(item.domain)) {
        errors[i] = `Your ${item.name} profile URL is invalid`;
        setErrorData(errors);
      } else {
        if (errors[i]) {
          errors[i] = undefined;
          setErrorData(errors);
        }
      }
    } else {
      if (errors[i]) {
        errors[i] = undefined;
        setErrorData(errors);
      }
    }
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
        label="Get in Touch Email"
        value={formData["infoEmail"]}
        note="The email address for general inquiries"
      />

      <Input
        placeholder="support@company.com"
        onChange={handleInputChange}
        name="supportEmail"
        leading={<RxEnvelopeClosed />}
        label="Support Email"
        value={formData["supportEmail"]}
        note="The email address for support inquiries"
      />

      <Input
        placeholder="career@company.com"
        onChange={handleInputChange}
        name="careerEmail"
        leading={<RxEnvelopeClosed />}
        label="Career Email"
        value={formData["careerEmail"]}
        note="The email address for career inquiries"
      />

      <div className="flex flex-col gap-4">
        {Object.values(socialMediaDomains)
          .sort((a, b) => a.order - b.order)
          .map((item, i) => (
            <Input
              key={i}
              placeholder={item.placeholder || "Link to social profile"}
              onChange={(e) => handleSocialLinksChange(e, i)}
              name="socialLinks"
              onBlur={(e) => handleSocialLinksBlur(e, i, item)}
              leading={item.icon}
              label={i === 0 ? "Social Profile URL" : undefined}
              value={formData["socialLinks"]?.[i]}
              note={`The full URL to your ${item.name} profile`}
              error={errorData?.[i]}
            />
          ))}
      </div>
    </DocFormContainer>
  );
};
