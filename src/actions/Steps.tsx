import { useEffect, useState } from "react";
import { RxCheck } from "react-icons/rx";

export const Steps = (props: {
  value?: number;
  className?: string;
  steps?: any[];
  onChange?: (value: number) => void;
}) => {
  const { value = -1, className = "", steps = [], onChange = () => {} } = props;

  const [current, setCurrent] = useState<number>(value);

  useEffect(() => {
    setCurrent(value);
  }, [value]);

  const getSpanOuterClassName = (i: number) => {
    if (current === i) {
      return "bg-primary/20";
    }
    if (current > i) {
      return "bg-primary";
    }

    return "";
  };

  const getSpanInnerClassName = (i: number) => {
    if (current === i) {
      return "bg-primary";
    }
    if (current > i) {
      return "bg-transparent";
    }

    return "step-span";
  };

  return (
    <ul className={`flex flex-col gap-6 ${className}`}>
      {steps.map((step, i) => (
        <li key={i} className="flex overflow-hidden">
          <div
            className="flex items-start gap-3 cursor-pointer step-hover"
            onClick={() => {
              onChange(i);
              setCurrent(i);
              if (step.onClick && typeof step.onClick === "function") {
                step.onClick();
              }
            }}
          >
            <span
              className={`p-1 flex justify-center items-center rounded-full ${getSpanOuterClassName(
                i
              )}`}
            >
              <span
                className={`z-10 h-2 w-2 flex justify-center items-center text-white rounded-full ${getSpanInnerClassName(
                  i
                )}`}
              >
                <RxCheck
                  className={`${
                    current > i ? "block" : "hidden"
                  } absolute text-[12px]`}
                />
              </span>
            </span>

            <div
              className={`-mt-[1px] text-sm font-medium transition-all duration-300 ${
                current >= i ? "text-primary" : "step-paragraph"
              }`}
            >
              {step.title}
              <div
                className={`text-gray-500 mt-4 transition-all duration-300 ${
                  current === i ? "opacity-100" : "h-0 opacity-0"
                }`}
              >
                {step.description}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};
