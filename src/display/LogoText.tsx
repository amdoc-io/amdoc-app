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
      className={`font-semibold flex items-center gap-[3px] ${className}`}
    >
      i
      <div className="text-black text-inherit">
        <LogoSvg />
      </div>
      endoc
    </div>
  );
};
