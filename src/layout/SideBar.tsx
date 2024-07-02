import { SideBarMenu } from "./SideBarMenu";

export const SideBar = () => {
  return (
    <div className="flex-col hidden lg:flex">
      <div className="h-full py-20 px-8 flex justify-end relative">
        <nav className="text-base lg:text-sm">
          <SideBarMenu />
        </nav>
      </div>
    </div>
  );
};
