import { Link } from "../actions/Link";
import { Heading } from "../display/Heading";
import { Paragraph } from "../display/Paragraph";
import { WebDisplay } from "../display/WebDisplay";
import { useSelector } from "react-redux";
import { ContentContainer } from "../layout/ContentContainer";
import { OutlinedButton } from "../actions/OutlinedButton";
import { RxExternalLink, RxGlobe, RxPencil2 } from "react-icons/rx";

export const DocumentationPage = () => {
  const docInitialRepo: string = useSelector(
    (state: any) => state.onboard.docInitialRepo
  );
  const clientWeb: string = useSelector(
    (state: any) => state.onboard.clientWeb
  );
  const githubUser: any = useSelector((state: any) => state.auth.githubUser);

  return (
    <div>
      <Heading level={1}>Documentation</Heading>

      <ContentContainer>
        {clientWeb && githubUser && docInitialRepo && (
          <div className="grid grid-cols-1 lg:grid-cols-2 grid-flow-row-dense gap-8 mt-4">
            <WebDisplay url={clientWeb} className="" />
            <div className="flex flex-col gap-2">
              <Paragraph>
                Owner:{" "}
                <Link
                  href={githubUser?.html_url}
                  target="_blank"
                  className="text-black"
                >
                  {githubUser?.login}
                </Link>
              </Paragraph>

              <Paragraph>
                Git Repository:{" "}
                <Link
                  href={`${githubUser?.html_url}/${docInitialRepo}`}
                  target="_blank"
                  className="text-black"
                >
                  {docInitialRepo}
                </Link>
              </Paragraph>

              <Paragraph>
                Branch: <span className="text-black">main</span>
              </Paragraph>

              <Paragraph>
                Website:{" "}
                <Link href={clientWeb} target="_blank" className="text-black">
                  {`${docInitialRepo}.igendoc.com`}
                </Link>
              </Paragraph>

              <div className="flex flex-wrap gap-2 mt-2">
                <div>
                  <OutlinedButton
                    icon={<RxExternalLink />}
                    onClick={() => window.open(clientWeb, "_blank")}
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
