import { useState } from "react";
import { Fragment } from "react/jsx-runtime";
import { SideBarMenu } from "./SideBarMenu";
import { Cross as Hamburger } from "hamburger-react";

export const MobileSideBar = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  return (
    <Fragment>
      <div className="block lg:hidden absolute top-4 right-4">
        <div className="cursor-pointer">
          <Hamburger
            size={24}
            toggled={menuOpen}
            toggle={setMenuOpen}
            direction="right"
          />
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
