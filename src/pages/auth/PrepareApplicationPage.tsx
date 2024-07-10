import { useCallback, useEffect, useState } from "react";
import { AuthBrandingContainer } from "../../layout/AuthBrandingContainer";
import { ProgressBar } from "../../display/ProgressBar";
import {
  getInfrastructureByOrganizationId,
  getOrganizationsByEmail,
  saveInfrastructure,
} from "../../utils/AccountFetchUtils";
import { useDispatch, useSelector } from "react-redux";
import {
  DocAccount,
  Infrastructure,
  Organization,
} from "../../model/AccountModel";
import {
  setOrganization,
  setOrganizations,
  setPrepareCompleted,
} from "../../features/auth/authSlice";
import { setInfrastructure } from "../../features/onboard/onboardSlice";
import { useNavigate } from "react-router-dom";

export const PrepareApplicationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const authToken: string = useSelector((state: any) => state.auth.token);
  const account: DocAccount = useSelector((state: any) => state.auth.account);
  const organizations: Organization[] = useSelector(
    (state: any) => state.auth.organizations
  );
  const organization: Organization = useSelector(
    (state: any) => state.auth.organization
  );
  const infrastructure: Infrastructure = useSelector(
    (state: any) => state.onboard.infrastructure
  );

  const [completion, setCompletion] = useState<{ [key: string]: Boolean }>({
    organizations: false,
    organization: false,
    infrastructure: false,
  });

  const fetchOrganizations = useCallback(async () => {
    if (authToken && account && (organizations.length === 0 || !organization)) {
      const res = await getOrganizationsByEmail(authToken, account.email || "");
      if (res.organizations.length > 0) {
        dispatch(setOrganizations(res.organizations));
        dispatch(setOrganization(res.organizations[0]));
        setCompletion((prev) => ({
          ...prev,
          organizations: true,
          organization: true,
        }));
      }
    }
  }, [authToken, account, dispatch, organizations, organization]);

  const fetchInfrastructure = useCallback(async () => {
    if (authToken && organization && account && !infrastructure) {
      const res = await getInfrastructureByOrganizationId(
        authToken,
        organization.id || ""
      );
      if (res) {
        dispatch(setInfrastructure(res.infrastructure));
      } else {
        const savedRes = await saveInfrastructure(authToken, {
          email: account.email || "",
          organizationId: organization.id || "",
        });
        if (savedRes) {
          dispatch(setInfrastructure(savedRes.infrastructure));
        }
      }
    }
  }, [authToken, organization, account, dispatch, infrastructure]);

  useEffect(() => {
    if (organization && !completion["organization"]) {
      setTimeout(() => {
        setCompletion((prev) => ({
          ...prev,
          organization: true,
        }));
      }, 500);
    }
  }, [organization, completion]);

  useEffect(() => {
    if (organizations.length > 0 && !completion["organizations"]) {
      setTimeout(() => {
        setCompletion((prev) => ({
          ...prev,
          organizations: true,
        }));
      }, 1000);
    }
  }, [organizations, completion]);

  useEffect(() => {
    if (infrastructure && !completion["infrastructure"]) {
      setTimeout(() => {
        setCompletion((prev) => ({
          ...prev,
          infrastructure: true,
        }));
      }, 1500);
    }
  }, [infrastructure, completion]);

  useEffect(() => {
    if (Object.values(completion).every((value) => value)) {
      setTimeout(() => {
        dispatch(setPrepareCompleted(true));
        navigate("/");
      }, 500);
    }
  }, [completion, navigate, dispatch]);

  useEffect(() => {
    fetchOrganizations();
  }, [fetchOrganizations]);

  useEffect(() => {
    fetchInfrastructure();
  }, [fetchInfrastructure]);

  return (
    <AuthBrandingContainer className="flex justify-center items-center">
      <p className="mb-6">Hang tight! We're preparing your application...</p>

      <ProgressBar
        value={
          (Object.values(completion).filter((completed) => completed).length /
            Object.keys(completion).length) *
          100
        }
      />
    </AuthBrandingContainer>
  );
};
