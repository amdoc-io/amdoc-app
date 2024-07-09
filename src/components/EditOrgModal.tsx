import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OutlinedButton } from "../actions/OutlinedButton";
import { PrimaryButton } from "../actions/PrimaryButton";
import { setOrganizations } from "../features/auth/authSlice";
import { Input } from "../forms/Input";
import Modal from "../layout/Modal";
import { DocAccount, Organization } from "../model/AccountModel";
import {
  getOrganizationsByEmail,
  saveOrganization,
} from "../utils/AccountFetchUtils";
import { isValidated } from "../utils/ValidationUtils";

export const EditOrgModal = (props: {
  open?: boolean;
  setOpen?: (value: boolean) => void;
  editingOrg?: Organization;
}) => {
  const dispatch = useDispatch();

  const account: DocAccount = useSelector((state: any) => state.auth.account);
  const authToken: string = useSelector((state: any) => state.auth.token);

  const { open, setOpen = () => {}, editingOrg } = props;

  const [formData, setFormData] = useState<{ [key: string]: any }>({});
  const [errorData, setErrorData] = useState<{
    [key: string]: any;
  }>({});
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (editingOrg) {
      setFormData((prev) => ({
        ...prev,
        name: editingOrg.name,
      }));
    }
  }, [editingOrg]);

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
    };

    setErrorData((prev) => ({
      ...prev,
      ...validation,
    }));

    if (isValidated(validation)) {
      if (editingOrg) {
        const organization: Organization = {
          ...formData,
          id: editingOrg.id,
        };
        await saveOrganization(authToken, organization);
        const res = await getOrganizationsByEmail(
          authToken,
          account.email || ""
        );
        dispatch(setOrganizations(res.organizations));
      }
      setOpen(false);
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
              Edit
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
      </form>
    </Modal>
  );
};
