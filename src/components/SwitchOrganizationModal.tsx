import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrganization } from "../features/auth/authSlice";
import { setInfrastructure } from "../features/onboard/onboardSlice";
import Modal from "../layout/Modal";
import { Organization } from "../model/AccountModel";
import {
  getDocSettingsByOrgId,
  getInfrastructureByOrganizationId,
} from "../utils/AccountFetchUtils";
import { ProgressBar } from "../display/ProgressBar";
import { setDocSettings } from "../features/settings/docSettingsSlice";

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
    docSettings: false,
  });

  const fetchInfrastructure = useCallback(async () => {
    if (selectedOrg?.id && authToken) {
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
        }, 100);
      }
    }
  }, [selectedOrg, authToken, dispatch]);

  const fetchDocSettings = useCallback(async () => {
    if (selectedOrg?.id && authToken) {
      const settings = await getDocSettingsByOrgId(authToken, selectedOrg.id);
      if (settings) {
        dispatch(setDocSettings(settings));
        setTimeout(() => {
          setCompletion((prev) => ({
            ...prev,
            docSettings: true,
          }));
        }, 200);
      }
    }
  }, [selectedOrg, dispatch, authToken]);

  useEffect(() => {
    if (Object.values(completion).every((value) => value) && open) {
      setTimeout(() => {
        setOpen(false);
      }, 200);
    }
  }, [completion, open, setOpen]);

  useEffect(() => {
    fetchInfrastructure();
  }, [fetchInfrastructure]);

  useEffect(() => {
    fetchDocSettings();
  }, [fetchDocSettings]);

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
