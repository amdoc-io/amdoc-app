import { ReactNode, useState } from "react";

export const RadioCard = (props: {
  value?: boolean;
  onChange?: (value: boolean) => void;
  children?: ReactNode;
}) => {
  const { value = false, onChange = () => {}, children } = props;

  const [active, setActive] = useState<boolean>(value);

  return (
    <div
      className={`flex flex-col gap-4 w-full rounded-lg border p-4 cursor-pointer transition-all duration-300 ${
        active ? "border-primary bg-primary/5" : "border-gray-300"
      }`}
      onClick={() => {
        onChange(!active);
        setActive(!active);
      }}
    >
      <div className="flex items-center gap-4">
        <span
          className={`h-4 w-4 border transition-all duration-300 flex justify-center items-center rounded-full ${
            active ? "bg-primary border-primary" : "bg-white border-gray-300"
          }`}
        >
          <span
            className={`h-2 w-2 bg-white rounded-full ${
              active ? "block" : "hidden"
            }`}
          />
        </span>

        <p className="flex items-center gap-2">{children}</p>
      </div>
    </div>
  );
};
