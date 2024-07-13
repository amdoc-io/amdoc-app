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
      className={`outlined-button flex text-black flex-col gap-4 rounded-md p-4 border border-gray-300 cursor-pointer bg-white transition-all duration-300`}
      onClick={() => onChange(value)}
    >
      <div className="flex items-center relative gap-4">
        <FaCheckCircle
          className={`text-green-500 text-[16px] absolute right-0 top-0 ${
            active ? "block" : "hidden"
          }`}
        />

        <div className="flex flex-col gap-2 justify-center !items-start w-full">
          {children}
        </div>
      </div>
    </div>
  );
};
