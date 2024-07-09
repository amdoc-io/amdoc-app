import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ReactNode } from "react";
import { RxCaretSort } from "react-icons/rx";
import { Divider } from "../layout/Divider";

export const classNames = (...classes: string[]) => {
  return classes.filter(Boolean).join(" ");
};

export interface DropdownOption {
  label?: string;
  icon?: ReactNode;
  onClick?: () => void;
  value?: string;
  divider?: boolean;
  iconPosition?: "left" | "right";
  className?: string;
  suffix?: ReactNode;
}

export default function DropdownButton(props: {
  children?: ReactNode;
  options?: DropdownOption[];
  showIcon?: boolean;
  onChange?: (value: string | undefined) => void;
  position?: "left" | "right";
  variant?: "blank" | "default";
  itemClassName?: string;
  value?: string;
  startDecorator?: ReactNode;
}) {
  const {
    options = [],
    showIcon,
    onChange = () => {},
    variant = "default",
    itemClassName = "",
    value,
    startDecorator,
  } = props;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="flex items-center">
        <MenuButton
          className={`inline-flex justify-between items-center transition-all duration-300 gap-x-1.5 w-full px-4 py-2 rounded-md text-sm text-gray-900 ring-inset ring-gray-300 ${
            variant === "blank"
              ? "ring-0 hover:bg-gray-200/40 bg-transparent shadow-none"
              : "bg-white hover:bg-gray-50 ring-1 shadow-sm"
          }`}
        >
          <div className="flex items-center gap-2">{props.children}</div>
          {showIcon && <RxCaretSort />}
        </MenuButton>
      </div>

      <MenuItems
        transition
        className={`absolute z-10 mt-2 w-56 ${itemClassName} origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in ${
          props.position === "left" ? "left-0" : "right-0"
        }`}
      >
        <div className="py-1 text-sm">
          {startDecorator && <div className="px-4 py-2">{startDecorator}</div>}
          {options.map((option, i) => (
            <div key={i} className="relative">
              {option.divider && <Divider className="my-1" />}
              <MenuItem>
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
                      focus || (value && option.value === value)
                        ? "bg-gray-100 text-gray-900"
                        : "text-gray-700",
                      `flex items-center gap-2 px-4 py-2 cursor-pointer ${
                        option.className || ""
                      }`
                    )}
                  >
                    {!option.iconPosition || option.iconPosition === "left"
                      ? option.icon
                      : null}
                    {option.label}
                    {option.iconPosition && option.iconPosition === "right"
                      ? option.icon
                      : null}
                  </div>
                )}
              </MenuItem>

              {option.suffix && (
                <div className="absolute right-4 top-2 z-20">
                  {option.suffix}
                </div>
              )}
            </div>
          ))}
        </div>
      </MenuItems>
    </Menu>
  );
}
