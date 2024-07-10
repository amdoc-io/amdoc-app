import { ChangeEvent, useEffect, useState } from "react";
import { OutlinedButton } from "../actions/OutlinedButton";
import { PrimaryButton } from "../actions/PrimaryButton";
import Select from "../actions/Select";
import { Input } from "../forms/Input";
import Modal from "../layout/Modal";
import { Countries } from "../pages/config/BusinessConfig";
import { isValidated } from "../utils/ValidationUtils";
import { DocAccount, Organization } from "../model/AccountModel";
import { useDispatch, useSelector } from "react-redux";
import {
  getOrganizationsByEmail,
  saveInfrastructure,
  saveOrganization,
} from "../utils/AccountFetchUtils";
import { setOrganizations } from "../features/auth/authSlice";

export const CreateOrgModal = (props: {
  open?: boolean;
  setOpen?: (value: boolean) => void;
}) => {
  const dispatch = useDispatch();

  const account: DocAccount = useSelector((state: any) => state.auth.account);
  const authToken: string = useSelector((state: any) => state.auth.token);

  const { open, setOpen = () => {} } = props;

  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [errorData, setErrorData] = useState<{
    [key: string]: any;
  }>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setFormData({});
    setErrorData({});
  }, [open]);

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
      const saveOrgRes = await saveOrganization(authToken, organization);
      if (!saveOrgRes.error) {
        const savedInfraRes = await saveInfrastructure(authToken, {
          email: account.email,
          organizationId: organization.id,
        });
        if (savedInfraRes) {
          const res = await getOrganizationsByEmail(
            authToken,
            account.email || ""
          );
          if (res.organizations.length > 0) {
            dispatch(setOrganizations(res.organizations));
          }
          setOpen(false);
        }
      } else {
        if ((saveOrgRes.error?.message || "").includes("already existed")) {
          setErrorData((prev) => ({
            ...prev,
            name: "Organization already existed",
          }));
        }
      }
    }

    setLoading(false);
  };

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title="Create a new organization"
      action={
        <>
          <div>
            <PrimaryButton loading={loading} onClick={handleSubmit}>
              Create
            </PrimaryButton>
          </div>
          <div>
            <OutlinedButton onClick={() => setOpen(false)}>
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
  );
};
