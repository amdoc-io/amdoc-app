import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ReactNode, useMemo } from "react";
import { RxCaretSort, RxCrossCircled } from "react-icons/rx";
import { classNames } from "./DropdownButton";
import useBottomRectReached from "./ScrollObserver";

export interface SelectOption {
  label?: string;
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
  error?: ReactNode;
}) {
  const {
    options = [],
    showIcon = true,
    value,
    onChange = () => {},
    placeholder,
    label,
    id,
    required,
    error,
  } = props;

  const [ref, isBottomRectReached] = useBottomRectReached();

  const selectedOption = useMemo(
    () => options.find((option) => option.value === value),
    [options, value]
  );

  const getLabel = () => {
    const currentLabel = selectedOption?.label;
    if (currentLabel) {
      return currentLabel;
    }
    return <span className="text-placeholder">{placeholder}</span>;
  };

  const isSelected = (option: SelectOption) => {
    return option.value === value;
  };

  const optionSort = (o1: SelectOption, o2: SelectOption) => {
    return (o1.label || "").localeCompare(o2.label || "");
  };

  return (
    <Menu
      ref={ref}
      as="div"
      className="relative inline-block text-left transition-all duration-300 flex flex-col gap-2"
    >
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-description"
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
          {showIcon && <RxCaretSort />}
        </MenuButton>
      </div>

      <MenuItems
        transition
        className={`absolute z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in left-0 right-0 overflow-auto max-h-[200px] ${
          isBottomRectReached ? "bottom-12" : "top-[70px]"
        }`}
      >
        <div className="py-1">
          {options.sort(optionSort).map((option, i) => (
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
                    focus || isSelected(option)
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-700",
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

      {error && (
        <div className="text-xs font-normal text-red-500 inline-flex gap-2 items-start">
          <RxCrossCircled className="mt-[2px]" />
          {error}
        </div>
      )}
    </Menu>
  );
}
