import { ReactNode } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const PrimaryButton = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { icon?: ReactNode; loading?: boolean; suffix?: ReactNode }
) => {
  const {
    icon,
    loading = false,
    className,
    children,
    suffix,
    disabled,
    ...restProps
  } = props;

  return (
    <button
      {...restProps}
      className={`button bg-primary border-primary/90 flex items-center gap-2 ${
        disabled ? "!cursor-not-allowed opacity-65" : "hover:bg-primary/80"
      } ${className}`}
    >
      {loading && <AiOutlineLoading3Quarters className="animate-spin" />}
      {icon && !loading && <div className="text-inherit">{icon}</div>}
      {children}
      {suffix && <div className="text-inherit">{suffix}</div>}
    </button>
  );
};
