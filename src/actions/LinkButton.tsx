export const LinkButton = (
  props: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  const { children, className, ...restProps } = props;

  return (
    <div className="group">
      <button {...restProps} className={`relative ${className}`}>
        {children}
        <div className="absolute bottom-0 left-0 h-px bg-gray-900 transition-all duration-300 w-0 group-hover:w-full" />
      </button>
    </div>
  );
};
