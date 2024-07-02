import { useState } from "react";
import { RxCross1, RxHamburgerMenu } from "react-icons/rx";
import { Fragment } from "react/jsx-runtime";
import { SideBarMenu } from "./SideBarMenu";

export const MobileSideBar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <Fragment>
      <div className="block lg:hidden absolute top-4 right-4">
        <div
          className="cursor-pointer text-[24px]"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <RxCross1 /> : <RxHamburgerMenu />}
        </div>
      </div>

      {menuOpen && (
        <div className="absolute top-14 bg-white left-0 right-0 p-4">
          <SideBarMenu />
        </div>
      )}
    </Fragment>
  );
};
