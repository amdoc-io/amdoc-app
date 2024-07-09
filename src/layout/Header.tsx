import { ChangeEvent, useState } from "react";
import { IoBusinessOutline } from "react-icons/io5";
import { RxExit, RxPlus } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DropdownButton, { DropdownOption } from "../actions/DropdownButton";
import { OutlinedButton } from "../actions/OutlinedButton";
import { PrimaryButton } from "../actions/PrimaryButton";
import Select from "../actions/Select";
import { setOrganization, setOrganizations } from "../features/auth/authSlice";
import { Input } from "../forms/Input";
import { DocAccount, Organization } from "../model/AccountModel";
import { ReduxActionType } from "../model/ReduxModel";
import { Countries } from "../pages/config/BusinessConfig";
import {
  getOrganizationsByEmail,
  saveOrganization,
} from "../utils/AccountFetchUtils";
import { isValidated } from "../utils/ValidationUtils";
import Modal from "./Modal";

export const Header = () => {
  const account: DocAccount = useSelector((state: any) => state.auth.account);
  const authToken: string = useSelector((state: any) => state.auth.token);
  const organizations: Organization[] = useSelector(
    (state: any) => state.auth.organizations
  );
  const organization: Organization = useSelector(
    (state: any) => state.auth.organization
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [errorData, setErrorData] = useState<{
    [key: string]: any;
  }>({});
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = () => {
    dispatch({ type: ReduxActionType.logout });
    navigate("/");
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { name, value, type, checked },
    } = event;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    setLoading(true);

    const validation = {
      name: formData["name"] ? undefined : "Missing organization name input",
      country: formData["country"] ? undefined : "Missing country input",
    };

    setErrorData((prev) => ({
      ...prev,
      ...validation,
    }));

    if (isValidated(validation)) {
      const organization: Organization = {
        ...formData,
        email: account.email,
      };
      await saveOrganization(authToken, organization);
      const res = await getOrganizationsByEmail(authToken, account.email || "");
      dispatch(setOrganizations(res.organizations));
      setModalOpen(false);
    }

    setLoading(false);
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
                    icon: <IoBusinessOutline />,
                  } as DropdownOption)
              ),
              {
                label: "Create new organization",
                value: "create-org",
                onClick: () => setModalOpen(true),
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
      <Modal
        open={modalOpen}
        setOpen={setModalOpen}
        title="Create a new organization"
        action={
          <>
            <div>
              <PrimaryButton loading={loading} onClick={handleSubmit}>
                Create
              </PrimaryButton>
            </div>
            <div>
              <OutlinedButton onClick={() => setModalOpen(false)}>
                Cancel
              </OutlinedButton>
            </div>
          </>
        }
      >
        <form className="w-full flex flex-col gap-4">
          <Input
            label="Organization"
            name="name"
            value={formData["name"]}
            error={errorData["name"]}
            onChange={handleInputChange}
            placeholder="Enter an organization name"
            note="Your organization is a workspace where you can invite members, collaborate, and manage resources with your team. You can update this name at any time"
            required
          />
          <Select
            label="Country of operation"
            placeholder="Select a country"
            required
            options={Countries}
            value={formData["country"]}
            error={errorData["country"]}
            onChange={(value) =>
              setFormData((prev) => ({
                ...prev,
                country: value,
              }))
            }
          />
        </form>
      </Modal>
    </>
  );
};
