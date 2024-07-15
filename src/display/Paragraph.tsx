export const Paragraph = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >
) => {
  const { children, className = "", ...restProps } = props;
  return (
    <p {...restProps} className={`text-sm text-[#737373] ${className}`}>
      {children}
    </p>
  );
};
