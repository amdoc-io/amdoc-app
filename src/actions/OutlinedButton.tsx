import { ReactNode } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const OutlinedButton = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { icon?: ReactNode; loading?: boolean }
) => {
  const { icon, loading = false } = props;

  return (
    <button
      {...props}
      className={`outlined-button flex items-center gap-2 ${props.className}`}
    >
      {loading && <AiOutlineLoading3Quarters className="loading" />}
      {icon && !loading && icon}
      {props.children}
    </button>
  );
};
