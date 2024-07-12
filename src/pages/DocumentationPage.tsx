import {
  IoEarthOutline,
  IoFolderOpenOutline,
  IoGitBranchOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { RxExternalLink, RxGlobe, RxPencil2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { Link } from "../actions/Link";
import { OutlinedButton } from "../actions/OutlinedButton";
import { Heading } from "../display/Heading";
import { Paragraph } from "../display/Paragraph";
import { WebDisplay } from "../display/WebDisplay";
import { ContentContainer } from "../layout/ContentContainer";
import { Infrastructure } from "../model/AccountModel";

export const DocumentationPage = () => {
  const infrastructure: Infrastructure = useSelector(
    (state: any) => state.onboard.infrastructure
  );

  return (
    <div>
      <Heading level={1}>Documentation</Heading>

      <ContentContainer>
        {infrastructure.docInitialRepo &&
          infrastructure.githubUser &&
          infrastructure.docInitialWebsite && (
            <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row-dense gap-8 mt-4">
              <WebDisplay url={infrastructure.docInitialWebsite} className="" />
              <div className="flex flex-col gap-2 *:text-sm">
                <Paragraph className="inline-flex gap-1 items-center">
                  <IoPersonOutline />
                  Owner:{" "}
                  <Link
                    href={infrastructure.githubUser?.html_url}
                    target="_blank"
                    className="text-black break-all"
                  >
                    {infrastructure.githubUser?.login}
                  </Link>
                </Paragraph>

                <Paragraph className="inline-flex gap-1 items-center">
                  <IoFolderOpenOutline /> Repository:{" "}
                  <Link
                    className="break-all"
                    href={`${infrastructure.githubUser?.html_url}/${infrastructure.docInitialRepo}`}
                    target="_blank"
                  >
                    {infrastructure.docInitialRepo}
                  </Link>
                </Paragraph>

                <Paragraph className="inline-flex gap-1 items-center">
                  <IoGitBranchOutline />
                  Branch:{" "}
                  <Link
                    className="break-all"
                    href={`${infrastructure.githubUser?.html_url}/${infrastructure.docInitialRepo}/tree/main`}
                    target="_blank"
                  >
                    main
                  </Link>
                </Paragraph>

                <Paragraph className="inline-flex gap-1 items-center">
                  <IoEarthOutline />
                  Domain:{" "}
                  <Link
                    href={infrastructure.docInitialWebsite}
                    target="_blank"
                    className="break-all"
                  >
                    {`${infrastructure.docInitialRepo}.igendoc.com`}
                  </Link>
                </Paragraph>

                <div className="flex flex-wrap gap-2 mt-2">
                  <div>
                    <OutlinedButton
                      icon={<RxExternalLink />}
                      onClick={() =>
                        window.open(infrastructure.docInitialWebsite, "_blank")
                      }
                    >
                      View
                    </OutlinedButton>
                  </div>
                  <div>
                    <OutlinedButton disabled icon={<RxPencil2 />}>
                      Edit
                    </OutlinedButton>
                  </div>

                  <div>
                    <OutlinedButton disabled icon={<RxGlobe />}>
                      Set domain
                    </OutlinedButton>
                  </div>
                </div>
              </div>
            </div>
          )}
      </ContentContainer>
    </div>
  );
};
