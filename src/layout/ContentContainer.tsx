export const ContentContainer = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => {
  const { className, ...restProps } = props;

  return (
    <div {...restProps} className={`flex flex-col gap-12 py-6 ${className}`} />
  );
};
