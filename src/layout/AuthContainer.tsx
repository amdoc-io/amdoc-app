import { ReactNode } from "react";

export const AuthContainer = (props: { children?: ReactNode }) => {
  return (
    <div className="h-full grid grid-cols-1 lg:grid-cols-2 p-2 gap-2 bg-[#f7f7f8]">
      <div className="h-full  hidden lg:block rounded-2xl relative overflow-hidden">
        <img
          alt="auth-bg"
          src="https://framerusercontent.com/images/RY0SJJzHYjZTeYJR7ESPymafTuc.jpg?scale-down-to=4096"
          className="h-full object-cover object-center"
        />

        <div className="absolute mix-blend-color overflow-hidden bg-[#5921b2] inset-0" />
      </div>

      <div className="flex flex-col items-center rounded-2xl border border-gray-200 w-full px-12 lg:px-32 py-12 gap-4 bg-white">
        {props.children}
      </div>
    </div>
  );
};
