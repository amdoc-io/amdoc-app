import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrganization } from "../features/auth/authSlice";
import { setInfrastructure } from "../features/onboard/onboardSlice";
import Modal from "../layout/Modal";
import { Organization } from "../model/AccountModel";
import { getInfrastructureByOrganizationId } from "../utils/AccountFetchUtils";
import { ProgressBar } from "../display/ProgressBar";

export const SwitchOrganizationModal = (props: {
  open?: boolean;
  setOpen?: (value: boolean) => void;
  selectedOrg?: Organization;
}) => {
  const { open, setOpen = () => {}, selectedOrg } = props;

  const dispatch = useDispatch();

  const authToken: string = useSelector((state: any) => state.auth.token);
  const [completion, setCompletion] = useState<{ [key: string]: Boolean }>({
    infrastructure: false,
  });

  const fetchInfrastructure = useCallback(async () => {
    console.log(selectedOrg);
    if (selectedOrg?.id) {
      const res = await getInfrastructureByOrganizationId(
        authToken,
        selectedOrg.id
      );
      if (res) {
        dispatch(setOrganization(selectedOrg));
        dispatch(setInfrastructure(res.infrastructure));
        setTimeout(() => {
          setCompletion((prev) => ({
            ...prev,
            infrastructure: true,
          }));
        }, 500);
      }
    }
  }, [selectedOrg, authToken, dispatch]);

  useEffect(() => {
    if (open) {
      setCompletion({
        infrastructure: false,
      });
    }
  }, [open]);

  useEffect(() => {
    if (Object.values(completion).every((value) => value) && open) {
      setTimeout(() => {
        setOpen(false);
      }, 500);
    }
  }, [completion, open, setOpen]);

  useEffect(() => {
    fetchInfrastructure();
  }, [fetchInfrastructure]);

  return (
    <Modal open={open} setOpen={setOpen} title="Switch organization">
      <p className="mb-4">Hang tight! We're preparing your application...</p>

      <ProgressBar
        value={
          (Object.values(completion).filter((completed) => completed).length /
            Object.keys(completion).length) *
          100
        }
      />
    </Modal>
  );
};
