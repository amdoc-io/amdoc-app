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
    ...restProps
  } = props;

  return (
    <button
      {...restProps}
      className={`button bg-primary border-primary/90 hover:bg-primary/80 flex items-center gap-2 ${className}`}
    >
      {loading && <AiOutlineLoading3Quarters className="loading" />}
      {icon && !loading && <div className="text-inherit">{icon}</div>}
      {children}
      {suffix && <div className="text-inherit">{suffix}</div>}
    </button>
  );
};
