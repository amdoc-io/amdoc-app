import { useState } from "react";
import { IoBusinessOutline } from "react-icons/io5";
import { RxExit, RxPlus } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DropdownButton, { DropdownOption } from "../actions/DropdownButton";
import { LinkButton } from "../actions/LinkButton";
import { CreateOrgModal } from "../components/CreateOrgModal";
import { setOrganization } from "../features/auth/authSlice";
import { DocAccount, Organization } from "../model/AccountModel";
import { ReduxActionType } from "../model/ReduxModel";
import { EditOrgModal } from "../components/EditOrgModal";

export const Header = () => {
  const account: DocAccount = useSelector((state: any) => state.auth.account);
  const organizations: Organization[] = useSelector(
    (state: any) => state.auth.organizations
  );
  const organization: Organization = useSelector(
    (state: any) => state.auth.organization
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [createOrgModalOpen, setCreateOrgModalOpen] = useState<boolean>(false);
  const [editOrgModalOpen, setEditOrgModalOpen] = useState<boolean>(false);
  const [editingOrg, setEditingOrg] = useState<Organization>();

  const handleLogout = () => {
    dispatch({ type: ReduxActionType.logout });
    navigate("/");
  };

  return (
    <>
      <header className="fixed h-16 top-0 left-0 right-0 border-b border-b-gray-200 py-4 z-10 backdrop-blur-lg flex items-center">
        <div className="max-w-screen-2xl ml-auto mr-auto flex items-center justify-between px-4 lg:px-8 w-full">
          <DropdownButton
            value={organization.id}
            showIcon
            variant="blank"
            position="left"
            onChange={(value) =>
              dispatch(
                setOrganization(organizations.find((org) => org.id === value))
              )
            }
            itemClassName="!w-72"
            options={[
              ...organizations.map(
                (org) =>
                  ({
                    label: org.name,
                    value: org.id,
                    suffix: (
                      <LinkButton
                        onClick={() => {
                          setEditingOrg(org);
                          setEditOrgModalOpen(true);
                        }}
                      >
                        Edit
                      </LinkButton>
                    ),
                    icon: <IoBusinessOutline />,
                  } as DropdownOption)
              ),
              {
                label: "Create new organization",
                value: "create-org",
                onClick: () => setCreateOrgModalOpen(true),
                icon: <RxPlus />,
                divider: true,
                iconPosition: "right",
                className: "justify-between",
              },
            ]}
          >
            <IoBusinessOutline />
            <p>{organization.name}</p>
          </DropdownButton>

          <DropdownButton
            variant="blank"
            startDecorator={
              <p>
                Signed in as{" "}
                <span className="font-medium">{account.email}</span>
              </p>
            }
            options={[
              {
                divider: true,
                label: "Log out",
                value: "logout",
                onClick: handleLogout,
                icon: <RxExit />,
              },
            ]}
          >
            <img
              alt="account"
              src={account.profileImageUrl}
              className="h-6 w-6 rounded-full"
            />
            <p>{`${account.firstName} ${account.lastName}`}</p>
          </DropdownButton>
        </div>
      </header>
      <EditOrgModal
        open={editOrgModalOpen}
        setOpen={setEditOrgModalOpen}
        editingOrg={editingOrg}
      />
      <CreateOrgModal
        open={createOrgModalOpen}
        setOpen={setCreateOrgModalOpen}
      />
    </>
  );
};
