import { ReactNode } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const OutlinedButton = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { icon?: ReactNode; loading?: boolean }
) => {
  const { icon, loading = false, className, children, ...restProps } = props;

  return (
    <button
      {...restProps}
      className={`outlined-button flex items-center gap-2 ${className}`}
    >
      {loading && <AiOutlineLoading3Quarters className="loading" />}
      {icon && !loading && icon}
      {children}
    </button>
  );
};
