import { useSelector } from "react-redux";
import { DocAccount } from "../model/AccountModel";

export const AccountAvatar = () => {
  const account: DocAccount = useSelector((state: any) => state.auth.account);

  return (
    <div className="flex items-center gap-2">
      {account?.profileImageUrl ? (
        <img
          alt="account"
          src={account.profileImageUrl}
          className="h-6 w-6 rounded-full"
        />
      ) : (
        <div className="h-6 w-6 rounded-full flex justify-center items-center bg-primary font-medium text-white">
          {account.firstName?.[0]}
        </div>
      )}
      <p>{`${account.firstName} ${account.lastName}`}</p>
    </div>
  );
};
