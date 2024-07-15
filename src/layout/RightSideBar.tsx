import { useEffect, useState } from "react";
import { Paragraph } from "../display/Paragraph";
import { useLocation } from "react-router-dom";
import { scrollToHash } from "../display/Heading";

export const RightSideBar = () => {
  const location = useLocation();

  const [h2Texts, setH2Texts] = useState<string[]>([]);
  const [isSticky, setIsSticky] = useState<boolean>(false);
  const [initialLoaded, setInitialLoaded] = useState<boolean>(true);

  useEffect(() => {
    if (initialLoaded) {
      setInitialLoaded(false);
      setTimeout(() => scrollToHash(location), 200);
    } else {
      scrollToHash(location);
    }
  }, [location, initialLoaded]);

  useEffect(() => {
    const handleScroll = () => {
      const shouldStick = window.scrollY > 0;
      console.log(window.scrollY, isSticky);
      setIsSticky(shouldStick);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isSticky]);

  useEffect(() => {
    const h2Elements = document.querySelectorAll("h2");
    const h2TextsArray = Array.from(h2Elements)
      .map((h2) => h2.textContent || "")
      .filter((text) => text);
    setH2Texts(h2TextsArray);
  }, [location]);

  return (
    <div className="w-[500px] mt-16 hidden xl:block pr-4 text-sm">
      <div
        className="border rounded-md p-6 top-[100px] flex flex-col gap-4 transition-all transform duration-300 ease-in-out"
        style={{ position: isSticky ? "sticky" : "static" }}
      >
        <Paragraph className="font-medium !text-black">On this page</Paragraph>
        <ul className="relative space-y-6">
          {h2Texts.map((text, index) => (
            <li key={index} className="ml-6 relative">
              <a
                href={`#${encodeURIComponent(text)}`}
                className="hover:opacity-50 transition-all duration-300"
              >
                {text}
              </a>
              <div className="h-2 w-2 bg-gray-200 z-10 rounded-full absolute -left-7 top-1" />
            </li>
          ))}
          <div className="absolute -top-4 bottom-4 -left-[0.5px] w-px bg-gray-200" />
        </ul>
      </div>
    </div>
  );
};
