import { useDispatch } from "react-redux";
import { ReduxActionType } from "../model/ReduxModel";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({ type: ReduxActionType.logout });
    navigate("/");
  };

  return (
    <header className="fixed justify-between h-16 top-0 left-0 right-0 flex items-center border-b border-b-gray-200 px-4 lg:px-8 py-4 z-50 backdrop-blur-lg">
      <a href="/">Amdoc</a>

      <button onClick={handleLogout}>Log out</button>
    </header>
  );
};
