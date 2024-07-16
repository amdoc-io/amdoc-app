import { useCallback, useEffect, useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import {
  RxCalendar,
  RxCheck,
  RxChevronLeft,
  RxChevronRight,
  RxCross1,
} from "react-icons/rx";
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
        <div className="flex flex-col gap-4">
          <div className="border border-gray-300 rounded-md overflow-hidden">
            <div className="p-4 grid grid-cols-1 xl:grid-cols-8 gap-4 xl:gap-12 bg-gray-100/80 font-medium">
              <div className="col-span-3">ID</div>
              <div className="col-span-3">Process</div>
              <div className="col-span-2">Updated</div>
            </div>
            {deployments.length === 0 && (
              <div className="p-4 text-center text-description border-t border-gray-300">
                There are no deployments at the moment.
              </div>
            )}
            <ul>
              {deployments
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime()
                )
                .map((deployment, i) => (
                  <li
                    key={i}
                    className={`p-4 grid grid-cols-1 xl:grid-cols-8 gap-4 xl:gap-12 border-t border-gray-300`}
                  >
                    <div className="flex items-start break-all gap-2 col-span-3">
                      <div className="mt-1">
                        {
                          StatusIcon[
                            deployment.status as keyof typeof StatusIcon
                          ]
                        }
                      </div>
                      <a
                        href="/"
                        className="font-medium hover:opacity-60 transition-all duration-300"
                      >
                        {deployment.id}
                      </a>
                    </div>

                    <ul className="space-y-4 col-span-3">
                      {deployment.processes.map((process, j) => (
                        <li
                          key={`${i}-${j}`}
                          className="flex items-start gap-2"
                        >
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

                    <div className="flex items-start gap-2 col-span-2">
                      <div className="mt-[2px]">
                        <RxCalendar />
                      </div>
                      {getTimeAgo(deployment.updatedAt || deployment.createdAt)}
                    </div>
                  </li>
                ))}
            </ul>
          </div>

          <div className="flex font-medium justify-center">
            <div className="flex items-center gap-4">
              <div className="text-[20px] cursor-pointer opacity-30">
                <RxChevronLeft />
              </div>
              <div className="border border-transparent hover:border-gray-200 transition-all duration-300 h-8 w-8 flex justify-center items-center rounded-md cursor-pointer">
                1
              </div>
              <div className="text-[20px] cursor-pointer">
                <RxChevronRight />
              </div>
            </div>
          </div>
        </div>
      </DocFormContainer>
    </ContentContainer>
  );
};
