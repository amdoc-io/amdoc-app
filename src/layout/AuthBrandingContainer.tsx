import { ReactNode } from "react";
import { LogoText } from "../display/LogoText";

export const AuthBrandingContainer = (props: {
  children?: ReactNode;
  className?: string;
}) => {
  const { className = "" } = props;

  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-3 p-2 gap-2 bg-[#f7f7f8]">
      <div className="h-full hidden lg:grid grid-cols-1 gap-4 rounded-2xl overflow-hidden bg-primary p-12 text-white">
        <div className="flex items-start">
          <LogoText className="text-3xl" />
        </div>

        <div className="font-bold text-[56px] w-[250px] flex items-end">
          Generate beautiful docs with us.
        </div>
      </div>

      <div
        className={`rounded-2xl col-span-2 border border-gray-200 px-12 lg:px-32 py-12 bg-white ${className}`}
      >
        <div className="max-w-screen-md ml-auto mr-auto gap-4 flex flex-col items-center w-full">
          {props.children}
        </div>
      </div>
    </div>
  );
};
