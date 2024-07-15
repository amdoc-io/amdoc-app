import { SideBarMenu } from "./SideBarMenu";

export const SideBar = () => {
  return (
    <div className="lg:fixed h-full hidden lg:flex justify-end border-r overflow-auto">
      <div className="flex flex-col py-20">
        <nav className="text-base lg:text-sm">
          <SideBarMenu />
        </nav>
      </div>
    </div>
  );
};
