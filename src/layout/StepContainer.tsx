export const StepContainer = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => {
  const { children, className, ...restProps } = props;
  return (
    <div
      className={`flex flex-col items-start gap-2 w-full ${className}`}
      {...restProps}
    >
      {children}
    </div>
  );
};
