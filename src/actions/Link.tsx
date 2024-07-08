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
      className={`cursor-pointer hover:text-black/60 text-black transition-all duration-300 break-all ${className}`}
    >
      {children}
    </a>
  );
};
