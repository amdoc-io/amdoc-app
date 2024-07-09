export const Heading = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > & {
    level?: 1 | 2 | 3 | 4 | 5;
  }
) => {
  const { level, className, children, ...restProps } = props;

  if (level === 1) {
    return (
      <h1
        {...restProps}
        className={`text-[28px] lg:text-[40px] leading-7 lg:leading-[56px] font-semibold ${className}`}
      >
        {children}
      </h1>
    );
  }

  if (level === 2) {
    return (
      <h2
        {...restProps}
        className={`text-[20px] leading-6 font-medium ${className}`}
      >
        {children}
      </h2>
    );
  }

  if (level === 3) {
    return (
      <h3
        {...restProps}
        className={`text-[16px] leading-6 font-medium ${className}`}
      >
        {children}
      </h3>
    );
  }

  return (
    <p {...restProps} className={`${className}`}>
      {children}
    </p>
  );
};
