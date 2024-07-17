import { ReactNode } from "react";
import { RxCrossCircled } from "react-icons/rx";

export const Input = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & {
    leading?: ReactNode;
    label?: string;
    required?: boolean;
    note?: ReactNode;
    error?: ReactNode;
  }
) => {
  const {
    leading,
    id,
    label,
    className = "",
    required,
    note,
    error,
    ...restProps
  } = props;

  return (
    <div className={`sm:col-span-4 w-full gap-2 flex flex-col ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-description"
        >
          {`${label}${required ? " *" : ""}`}
        </label>
      )}
      <div>
        <div
          className={`flex transition-all duration-300 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-1 focus-within:ring-inset focus-within:ring-gray-600 ${
            props.disabled ? "bg-gray-100" : ""
          }`}
        >
          {leading && (
            <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
              {leading}
            </span>
          )}
          <input
            {...restProps}
            type="text"
            id={id}
            className={`block focus:outline-none flex-1 border-0 bg-transparent py-1.5 ${
              props.disabled ? "text-gray-500" : "text-gray-900"
            } placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 px-2`}
          />
        </div>
      </div>
      {note && (
        <div className="text-xs font-normal text-description">{note}</div>
      )}
      {error && (
        <div className="text-xs font-normal text-red-500 inline-flex gap-2 items-start">
          <RxCrossCircled className="mt-[2px]" />
          {error}
        </div>
      )}
    </div>
  );
};
