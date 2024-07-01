import { ReactNode } from "react";

export const ElevatedButton = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > & { icon?: ReactNode }
) => {
  return (
    <button
      {...props}
      className={`flex items-center justify-center gap-1 transition-all duration-300 bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400/30 rounded-md shadow ${props.className}`}
    >
      {props.icon && props.icon}
      {props.children}
    </button>
  );
};
