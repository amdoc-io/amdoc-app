import { ReactNode, useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import DropdownButton from "../actions/DropdownButton";
import { useLocation } from "react-router-dom";

const defaultSections = [
  {
    label: "Introduction",
    children: [
      { label: "Getting started", href: "/" },
      { label: "Installation", href: "/" },
    ],
  },
  {
    label: "Core concepts",
    children: [
      {
        label: "Understanding concept",
        href: "/",
      },
    ],
  },
];

export const SideBar = () => {
  const location = useLocation();
  const firstPage = "Getting started";
  const [sections, setSections] = useState<any[]>([]);

  useEffect(() => {
    setSections(defaultSections);
  }, []);

  const isCurrentPage = (item: any) => {
    const id = encodeURIComponent(item.label);
    return (
      location.pathname === id ||
      (location.pathname === "/" && item.label === firstPage)
    );
  };

  const renderItems = (items: any[], depth: number): ReactNode => {
    return (
      <ul
        className={`${
          depth > 0
            ? "mt-2 space-y-2 border-l-2 border-slate-100 lg:mt-4 lg:space-y-4 lg:border-slate-200 dark:border-slate-800"
            : "space-y-9"
        } `}
      >
        {items.map((item, i) =>
          (item.children || []).length > 0 ? (
            <li
              key={`${i}-${item.label}`}
              className={`${depth > 0 ? "ml-3.5" : ""}`}
            >
              <h2 className="font-display font-medium text-slate-900 dark:text-white">
                {item.label}
              </h2>
              <li>{renderItems(item.children, depth + 1)}</li>
            </li>
          ) : (
            <li key={`${i}-${item.label}`} className="relative">
              <a
                href={item.href}
                className={`block transition-all duration-300 w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-1/2 before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full font-semibold text-sky-500 before:bg-sky-500 break-all ${
                  !isCurrentPage(item)
                    ? "text-slate-500 font-normal before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300"
                    : ""
                }`}
              >
                {item.label}
              </a>
            </li>
          )
        )}
      </ul>
    );
  };

  return (
    <div className="bg-slate-50 flex-col w-[25vw] 2xl:w-[35vw] hidden lg:flex">
      <div className="h-full py-20 px-12 flex justify-end relative">
        <nav className="text-base lg:text-sm w-[300px]">
          <div className="flex flex-col gap-4">
            <DropdownButton
              showIcon
              options={[
                {
                  label: "Section",
                  value: "section",
                },
              ]}
            >
              <MdAdd /> Add
            </DropdownButton>
            {renderItems(sections, 0)}
          </div>
        </nav>
      </div>
    </div>
  );
};
