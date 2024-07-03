export const Link = (
  props: React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >
) => {
  const { className, children, ...restProps } = props;

  return (
    <a
      {...restProps}
      className={`underline cursor-pointer hover:text-gray-900 transition-all duration-300 ${className}`}
    >
      {children}
    </a>
  );
};
