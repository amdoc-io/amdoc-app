import { ReactNode } from "react";
import { RxCheck, RxPause } from "react-icons/rx";

export interface Step {
  title?: ReactNode;
  description?: ReactNode;
  onClick?: () => void;
  postCompletion?: ReactNode;
  isCompleted?: boolean;
}

export const Steps = (props: {
  value?: number;
  className?: string;
  steps?: Step[];
  onChange?: (value: number) => void;
  heading?: ReactNode;
}) => {
  const {
    value = -1,
    className = "",
    steps = [],
    onChange = () => {},
    heading,
  } = props;

  const getSpanOuterClassName = (i: number) => {
    if (value === i) {
      return "bg-gray-700/15";
    }
    if (value > i) {
      return "bg-gray-700";
    }

    return "";
  };

  const getSpanInnerClassName = (i: number) => {
    if (value === i) {
      return "bg-black";
    }
    if (value > i) {
      return "bg-transparent";
    }

    return "step-span";
  };

  return (
    <ul
      className={`flex flex-col w-full border border-gray-200 rounded-lg ${className}`}
    >
      <div className="p-4">{heading}</div>
      {steps.map((step, i) => (
        <li
          key={i}
          className="flex overflow-hidden flex-col border-t border-t-gray-200 p-4 bg-gray-100/50"
        >
          <div
            className="flex items-start gap-3 cursor-pointer step-hover w-full"
            onClick={() => {
              onChange(i);
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
                <div
                  className={`${
                    value > i ? "block" : "hidden"
                  } absolute text-[12px]`}
                >
                  {step.isCompleted ? <RxCheck /> : <RxPause />}
                </div>
              </span>
            </span>

            <div
              className={`-mt-[1px] text-sm font-medium transition-all duration-300 w-full ${
                value >= i ? "text-gray-700" : "step-paragraph"
              }`}
            >
              {step.title}
            </div>
          </div>

          <div
            className={`text-description mt-4 transition-all duration-300 pl-7 text-sm z-10 ${
              value === i ? "opacity-100" : "h-0 opacity-0"
            }`}
          >
            {step.description}
          </div>

          {step.postCompletion && (
            <div
              className={`${
                value > i ? "block" : "hidden"
              } text-description pl-7 text-sm z-10`}
            >
              {step.isCompleted ? (
                step.postCompletion
              ) : (
                <p>You haven't completed this step!</p>
              )}
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};
