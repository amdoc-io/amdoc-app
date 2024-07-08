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
      className={`cursor-pointer hover:text-secondary/60 text-secondary transition-all duration-300 ${className}`}
    >
      {children}
    </a>
  );
};
