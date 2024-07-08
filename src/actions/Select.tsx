import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ReactNode } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { classNames } from "./DropdownButton";

export interface SelectOption {
  label?: ReactNode;
  value?: string;
  icon?: ReactNode;
  onClick?: () => void;
}

export default function Select(props: {
  children?: ReactNode;
  options?: SelectOption[];
  showIcon?: boolean;
  onChange?: (value: string | undefined) => void;
  placeholder?: string;
  label?: string;
  id?: string;
  value?: string;
  required?: boolean;
}) {
  const {
    options = [],
    showIcon,
    value,
    onChange = () => {},
    placeholder,
    label,
    id,
    required,
  } = props;

  const getLabel = () => {
    const currentLabel = options.find(
      (option) => option.value === value
    )?.label;
    if (currentLabel) {
      return currentLabel;
    }
    return <span className="text-placeholder">{placeholder}</span>;
  };

  return (
    <Menu as="div" className="relative inline-block text-left">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-description mb-2"
        >
          {`${label}${required ? " *" : ""}`}
        </label>
      )}

      <div className="flex items-center">
        <MenuButton
          id={id}
          className={`inline-flex justify-between items-center w-full gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50`}
        >
          <div className="flex items-center gap-2">{getLabel()}</div>
          {showIcon && <MdKeyboardArrowDown />}
        </MenuButton>
      </div>

      <MenuItems
        transition
        className={`absolute z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in left-0 right-0`}
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
