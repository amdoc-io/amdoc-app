import { ReactNode } from "react";
import { LogoText } from "../display/LogoText";

export const AuthContainer = (props: {
  children?: ReactNode;
  className?: string;
}) => {
  const { className = "" } = props;

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-2 p-2 gap-2 bg-[#f7f7f8]">
      <div className="h-full  hidden lg:block rounded-2xl relative overflow-hidden">
        <img
          alt="auth-bg"
          src="https://framerusercontent.com/images/RY0SJJzHYjZTeYJR7ESPymafTuc.jpg?scale-down-to=4096"
          className="h-full w-full object-cover object-center"
        />

        <div className="absolute mix-blend-color overflow-hidden bg-primary inset-0" />
      </div>

      <div
        className={`rounded-2xl border border-gray-200 px-12 lg:px-32 py-12 bg-white ${className}`}
      >
        <div className="max-w-screen-md ml-auto mr-auto gap-4 flex flex-col items-center w-full">
          <LogoText className="mb-4 text-xl" />

          {props.children}
        </div>
      </div>
    </div>
  );
};
