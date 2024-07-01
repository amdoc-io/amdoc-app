import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";
import { MdArrowOutward } from "react-icons/md";

export const LinkButton = (
  props: DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > & { showIcon?: boolean }
) => {
  return (
    <a
      {...props}
      className={`link-button flex items-center gap-2 rounded-full bg-sky-300 py-2 px-4 text-sm font-semibold text-slate-900 hover:bg-sky-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 active:bg-sky-500 transition-all duration-300 ${props.className}`}
    >
      {props.children}

      {props.showIcon && (
        <div className="link-button-icon transition-all ease-in-out duration-300 text-lg">
          <MdArrowOutward />
        </div>
      )}
    </a>
  );
};
