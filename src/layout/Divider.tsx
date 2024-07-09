export const Divider = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => {
  const { className, ...restProps } = props;

  return (
    <div
      className={`my-4 w-full h-px bg-gray-200/70 ${className}`}
      {...restProps}
    />
  );
};
