export const Input = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > & {
    prefix?: string;
    label?: string;
  }
) => {
  const { prefix, id, label, className = "", ...restProps } = props;
  return (
    <div className={`sm:col-span-4 w-full ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium leading-6 text-description"
        >
          {label}
        </label>
      )}
      <div className="mt-2">
        <div className="flex transition-all duration-300 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-1 focus-within:ring-inset focus-within:ring-gray-600">
          {prefix && (
            <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
              {prefix}
            </span>
          )}
          <input
            {...restProps}
            type="text"
            id={id}
            className={`block focus:outline-none flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 ${
              !prefix ? "pl-2" : "pl-1"
            }`}
          />
        </div>
      </div>
    </div>
  );
};
