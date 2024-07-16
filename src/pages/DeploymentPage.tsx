import { useCallback, useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { RxCalendar, RxCheck, RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { ContentContainer } from "../layout/ContentContainer";
import { DocFormContainer } from "../layout/DocFormContainer";
import {
  DeploymentStatus,
  DocDeployment,
  Organization,
} from "../model/AccountModel";
import { getDeploymentsByOrgId } from "../utils/AccountFetchUtils";
import { getTimeAgo } from "../utils/DateUtils";

const ProcessStatusIcon = {
  [DeploymentStatus.FAILED]: <RxCross1 className="text-red-500" />,
  [DeploymentStatus.SUCCESSFUL]: <RxCheck className="text-green-500" />,
};

const StatusIcon = {
  [DeploymentStatus.FAILED]: <FaTimesCircle className="text-red-500" />,
  [DeploymentStatus.SUCCESSFUL]: <FaCheckCircle className="text-green-500" />,
};

export const DeploymentPage = () => {
  const authToken: string = useSelector((state: any) => state.auth.token);
  const organization: Organization = useSelector(
    (state: any) => state.auth.organization
  );
  const [deployments, setDeployments] = useState<DocDeployment[]>([]);

  const fetchDeployments = useCallback(async () => {
    if (authToken && organization) {
      const res = await getDeploymentsByOrgId(authToken, organization.id || "");
      if (res) {
        setDeployments(res.docDeployments || []);
      }
    }
  }, [authToken, organization]);

  useEffect(() => {
    fetchDeployments();
  }, [fetchDeployments]);

  return (
    <ContentContainer className="text-sm">
      <DocFormContainer title="Deployment">
        <ul>
          {deployments.map((deployment, i) => (
            <li
              key={i}
              className={`py-12 border-b grid grid-cols-1 xl:grid-cols-3 gap-4 xl:gap-12`}
            >
              <div className="flex items-start break-all gap-2">
                <div className="mt-1">
                  {StatusIcon[deployment.status as keyof typeof StatusIcon]}
                </div>
                <a
                  href="/"
                  className="font-medium hover:opacity-60 transition-all duration-300"
                >
                  {deployment.id}
                </a>
              </div>

              <ul className="space-y-4">
                {deployment.processes.map((process, j) => (
                  <li key={`${i}-${j}`} className="flex items-start gap-2">
                    <div className="mt-[2px]">
                      {
                        ProcessStatusIcon[
                          process.status as keyof typeof StatusIcon
                        ]
                      }
                    </div>
                    {process.process}
                  </li>
                ))}
              </ul>

              <div className="flex items-start gap-2">
                <div className="mt-[2px]">
                  <RxCalendar />
                </div>
                {getTimeAgo(deployment.updatedAt || deployment.createdAt)}
              </div>
            </li>
          ))}
        </ul>
      </DocFormContainer>
    </ContentContainer>
  );
};
