import { ReactNode } from "react";
import { FaCheckCircle } from "react-icons/fa";

export const RadioCard = (props: {
  active?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  children?: ReactNode;
}) => {
  const { active = false, value = "", onChange = () => {}, children } = props;

  return (
    <div
      className={`flex flex-col gap-4 w-full rounded-lg border p-4 cursor-pointer transition-all duration-300 ${
        active ? "border-primary" : "border-gray-300"
      }`}
      onClick={() => onChange(value)}
    >
      <div className="flex items-center relative gap-4">
        <FaCheckCircle
          className={`text-primary text-[16px] absolute right-0 top-0 ${
            active ? "block" : "hidden"
          }`}
        />

        <div className="flex flex-col gap-2 justify-center w-full">
          {children}
        </div>
      </div>
    </div>
  );
};
