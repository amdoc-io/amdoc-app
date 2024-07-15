import { AiOutlineExperiment } from "react-icons/ai";
import { FaRegCreditCard } from "react-icons/fa6";
import { RxPerson } from "react-icons/rx";
import { TbUsersGroup } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { OutlinedButton } from "../actions/OutlinedButton";
import { DocFormContainer } from "../layout/DocFormContainer";
import { ContentContainer } from "../layout/ContentContainer";

const menu = [
  {
    icon: <RxPerson />,
    label: "Profile",
    href: "/settings/profile",
  },
  {
    icon: <TbUsersGroup />,
    label: "Team",
    href: "/",
    disabled: true,
  },
  {
    icon: <FaRegCreditCard />,
    label: "Billing",
    href: "/",
    disabled: true,
  },
  {
    icon: <AiOutlineExperiment />,
    label: "Beta Features",
    href: "/",
    disabled: true,
  },
];

export const SettingsPage = () => {
  const navigate = useNavigate();
  return (
    <ContentContainer>
      <DocFormContainer title="Settings">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-8">
          {menu.map((item, i) => (
            <OutlinedButton
              key={i}
              icon={item.icon}
              disabled={item.disabled}
              onClick={() => navigate(item.href)}
              className="h-[140px]"
            >
              {item.label}
            </OutlinedButton>
          ))}
        </div>
      </DocFormContainer>
    </ContentContainer>
  );
};
