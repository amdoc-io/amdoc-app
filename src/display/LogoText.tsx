import { LogoSvg } from "../svg/LogoSvg";

export const LogoText = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) => {
  const { className, ...restProps } = props;

  return (
    <div
      {...restProps}
      className={`font-semibold flex items-center gap-3 ${className}`}
    >
      <div className="text-black text-inherit">
        <LogoSvg />
      </div>
      iGendoc
    </div>
  );
};
