import {
  RxCheckCircled,
  RxCrossCircled,
  RxExclamationTriangle,
  RxInfoCircled,
} from "react-icons/rx";

const variantMapping = {
  info: {
    className: "text-blue-700 bg-blue-50",
    icon: <RxInfoCircled />,
  },
  default: {
    className: "text-gray-700 bg-gray-50",
    icon: <RxInfoCircled />,
  },
  success: {
    className: "text-green-700 bg-green-50",
    icon: <RxCheckCircled />,
  },
  error: {
    className: "text-red-700 bg-red-50",
    icon: <RxCrossCircled />,
  },
  warning: {
    className: "text-yellow-700 bg-yellow-50",
    icon: <RxExclamationTriangle />,
  },
};

export const Alert = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > & {
    variant?: "info" | "default";
  }
) => {
  const { className, children, variant = "default", ...restProps } = props;
  return (
    <div
      {...restProps}
      className={`px-4 py-3 leading-normal flex gap-4 rounded-lg ${variantMapping[variant].className} ${className}`}
      role="alert"
    >
      <div className="mt-[3px]">{variantMapping[variant].icon}</div>
      {children}
    </div>
  );
};
