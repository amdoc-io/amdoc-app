export const Card = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => {
  const { className, ...restProps } = props;

  return (
    <div
      {...restProps}
      className={`flex flex-col rounded-md shadow-sm p-4 ring-1 ring-inset ring-gray-300 ${className}`}
    />
  );
};
