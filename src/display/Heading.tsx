import { Location } from "react-router-dom";

export const scrollToHash = (location: Location) => {
  const hash = location.hash.slice(1);

  if (hash) {
    const element = document.getElementById(hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
};

export const Heading = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > & {
    level?: 1 | 2 | 3 | 4 | 5;
    showDivider?: boolean;
  }
) => {
  const { level, className, children, showDivider, ...restProps } = props;

  const renderContent = () => {
    if (level === 1) {
      return (
        <h1
          className={`text-[28px] lg:text-[40px] leading-7 lg:leading-[56px] font-semibold`}
        >
          {children}
        </h1>
      );
    }

    if (level === 2) {
      return (
        <h2 className={`text-[20px] leading-6 font-medium`}>{children}</h2>
      );
    }

    if (level === 3) {
      return (
        <h3 className={`text-[16px] leading-6 font-medium`}>{children}</h3>
      );
    }

    return <p>{children}</p>;
  };

  return (
    <div
      {...restProps}
      className={`${showDivider ? "border-b pb-4" : ""} ${className}`}
      id={encodeURIComponent(children as string)}
    >
      {renderContent()}
    </div>
  );
};
