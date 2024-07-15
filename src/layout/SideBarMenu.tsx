import {
  RxBarChart,
  RxFileText,
  RxGear,
  RxGlobe,
  RxHome,
} from "react-icons/rx";
import { useLocation } from "react-router-dom";

const firstPageAllowList = {
  "/": true,
  "/github": true,
};

const menu = [
  { label: "Home", href: "/", icon: <RxHome /> },
  {
    label: "Documentation",
    href: "/documentation",
    icon: <RxFileText />,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: <RxBarChart />,
  },
  {
    label: "Domain",
    href: "/domain",
    icon: <RxGlobe />,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: <RxGear />,
  },
];

export const SideBarMenu = () => {
  const location = useLocation();

  const isCurrentPage = (item: any) => {
    const parts = location.pathname.split("/");
    return (
      `/${parts[1]}` === item.href ||
      (location.pathname in firstPageAllowList && item.label === menu[0].label)
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <ul>
        {menu.map((item, i) => (
          <li key={i}>
            <a
              href={item.href}
              className={`flex items-center gap-3 px-4 min-w-[250px] py-2 transition-all duration-300 ${
                isCurrentPage(item)
                  ? "bg-primary text-white"
                  : "hover:bg-gray-300/30"
              }`}
            >
              {item.icon}
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
