import { useDispatch, useSelector } from "react-redux";
import { ReduxActionType } from "../model/ReduxModel";
import { useNavigate } from "react-router-dom";
import { DocAccount } from "../model/AccountModel";
import DropdownButton from "../actions/DropdownButton";
import { RxExit } from "react-icons/rx";

export const Header = () => {
  const account: DocAccount = useSelector((state: any) => state.auth.account);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: ReduxActionType.logout });
    navigate("/");
  };

  return (
    <header className="fixed h-16 top-0 left-0 right-0 border-b border-b-gray-200 py-4 z-50 backdrop-blur-lg flex items-center">
      <div className="max-w-screen-2xl ml-auto mr-auto flex items-center justify-between px-4 lg:px-8 w-full">
        <a href="/">Amdoc</a>

        <DropdownButton
          variant="blank"
          options={[
            {
              label: "Log out",
              value: "logout",
              onClick: handleLogout,
              icon: <RxExit />,
            },
          ]}
        >
          <img
            alt="test"
            src={account.profileImageUrl}
            className="h-6 w-6 rounded-full"
          />
          <p>{`${account.firstName} ${account.lastName}`}</p>
        </DropdownButton>
      </div>
    </header>
  );
};
