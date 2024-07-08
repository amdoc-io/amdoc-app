export const WebDisplay = (
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > & { url?: string }
) => {
  const { className, url, ...restProps } = props;

  if (!url) {
    return null;
  }

  return (
    <div
      {...restProps}
      className={`p-2 lg:p-3 bg-gray-200/30 rounded-lg cursor-pointer flex justify-center items-center ${className}`}
      onClick={() => window.open(url, "_blank")}
    >
      <img
        alt="webpage"
        src={`https://api.apiflash.com/v1/urltoimage?access_key=${process.env.REACT_APP_SCREENSHOT_API_KEY}&wait_until=page_loaded&url=${url}`}
        className="rounded-lg h-full w-full"
      />
    </div>
  );
};
