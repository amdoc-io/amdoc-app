export const ProgressBar = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > & {
    value?: number;
  }
) => {
  const { className, value = 0, ...restProps } = props;
  return (
    <div
      {...restProps}
      className={`h-2 w-full rounded-md bg-neutral-200 dark:bg-neutral-600 ${className}`}
    >
      <div
        className="h-2 bg-primary rounded-md transition-all duration-300"
        style={{
          width: `${value}%`,
        }}
      ></div>
    </div>
  );
};
