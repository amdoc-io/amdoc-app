import { ReactNode } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const OutlinedButton = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & {
    icon?: ReactNode;
    loading?: boolean;
    suffix?: ReactNode;
    disabled?: boolean;
  }
) => {
  const {
    icon,
    loading = false,
    className,
    children,
    suffix,
    disabled,
    onClick,
    ...restProps
  } = props;

  return (
    <button
      {...restProps}
      onClick={disabled ? undefined : onClick}
      className={`outlined-button flex items-center gap-2 ${
        disabled
          ? "!text-gray-400 !cursor-not-allowed hover:!border-[#E0E0E6]"
          : ""
      } ${className}`}
    >
      {loading && <AiOutlineLoading3Quarters className="loading" />}
      {icon && !loading && <div className="text-inherit">{icon}</div>}
      {children}
      {suffix && <div className="text-inherit">{suffix}</div>}
    </button>
  );
};
