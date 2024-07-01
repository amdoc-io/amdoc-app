import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ReactNode } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export default function DropdownButton(props: {
  children?: ReactNode;
  options?: any[];
  showIcon?: boolean;
  onChange?: (value: string) => void;
}) {
  const { options = [], showIcon, onChange = () => {} } = props;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex justify-between items-center w-full gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
          <div className="flex items-center gap-2">{props.children}</div>
          {showIcon && <MdKeyboardArrowDown />}
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          {options.map((option, i) => (
            <MenuItem key={i}>
              {({ focus }) => (
                <div
                  onClick={() => onChange(option.value)}
                  className={classNames(
                    focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "block px-4 py-2 text-sm"
                  )}
                >
                  {option.label}
                </div>
              )}
            </MenuItem>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}
