import { AnchorHTMLAttributes, DetailedHTMLProps } from "react";

export const SecondaryLinkButton = (
  props: DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
) => {
  return (
    <a
      {...props}
      className={`rounded-full bg-slate-800 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-400 transition-all duration-300 ${props.className}`}
    >
      {props.children}
    </a>
  );
};
