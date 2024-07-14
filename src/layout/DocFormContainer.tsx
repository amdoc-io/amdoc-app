import { ReactNode } from "react";
import { Heading } from "../display/Heading";

export const DocFormContainer = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement & {
      title?: ReactNode;
    }
  >
) => {
  const { className, children, title, ...restProps } = props;
  return (
    <div {...restProps} className={`flex flex-col gap-8 ${className}`}>
      <Heading level={2} showDivider>
        {title}
      </Heading>
      <div className="flex flex-col gap-8">{children}</div>
    </div>
  );
};
