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
  position?: "left" | "right";
  variant?: "blank" | "default";
}) {
  const {
    options = [],
    showIcon,
    onChange = () => {},
    variant = "default",
  } = props;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="flex items-center">
        <MenuButton
          className={`inline-flex justify-between items-center w-full rounded-md text-sm text-gray-900 ring-inset ring-gray-300 ${
            variant === "blank"
              ? "ring-0 py-0 px-0 gap-x-0 hover:bg-transparent bg-transparent shadow-none"
              : "bg-white hover:bg-gray-50 gap-x-1.5 px-3 py-2 ring-1 shadow-sm"
          }`}
        >
          <div className="flex items-center gap-2">{props.children}</div>
          {showIcon && <MdKeyboardArrowDown />}
        </MenuButton>
      </div>

      <MenuItems
        transition
        className={`absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in ${
          props.position === "left" ? "left-0" : "right-0"
        }`}
      >
        <div className="py-1">
          {options.map((option, i) => (
            <MenuItem key={i}>
              {({ focus }) => (
                <div
                  onClick={() => {
                    if (option.onClick) {
                      option.onClick();
                    } else {
                      onChange(option.value);
                    }
                  }}
                  className={classNames(
                    focus ? "bg-gray-100 text-gray-900" : "text-gray-700",
                    "flex items-center gap-2 px-4 py-2 text-sm cursor-pointer"
                  )}
                >
                  {option.icon}
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
