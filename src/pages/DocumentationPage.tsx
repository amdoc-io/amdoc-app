import { useEffect, useState } from "react";
import {
  IoEarthOutline,
  IoFolderOpenOutline,
  IoGitBranchOutline,
  IoPersonOutline,
} from "react-icons/io5";
import { RxExternalLink, RxGlobe, RxPencil2 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "../actions/Link";
import { OutlinedButton } from "../actions/OutlinedButton";
import { PrimaryButton } from "../actions/PrimaryButton";
import { ContactInformationForm } from "../components/ContactInformationForm";
import { GeneralForm } from "../components/GeneralForm";
import { MarketingForm } from "../components/MarketingForm";
import { Heading } from "../display/Heading";
import { Paragraph } from "../display/Paragraph";
import { WebDisplay } from "../display/WebDisplay";
import { ContentContainer } from "../layout/ContentContainer";
import { DocAccount, DocSettings, Infrastructure } from "../model/AccountModel";
import { saveDocumentationSettings } from "../utils/AccountFetchUtils";
import { socialMediaDomains } from "../utils/TransformUtils";
import { setDocSettings } from "../features/settings/docSettingsSlice";

export const DocumentationPage = () => {
  const dispatch = useDispatch();

  const authToken: string = useSelector((state: any) => state.auth.token);
  const infrastructure: Infrastructure = useSelector(
    (state: any) => state.onboard.infrastructure
  );
  const docSettings: DocSettings = useSelector(
    (state: any) => state.docSettings.docSettings
  );
  const account: DocAccount = useSelector((state: any) => state.auth.account);

  const [formData, setFormData] = useState<{ [key: string]: any }>({
    brandName: "",
    logoImg: undefined,
    logoUrl: undefined,
    brandColor: "#0000FF",
    homepageUrl: "",
    privacyPolicyUrl: "",
    callToActionName: "",
    callToActionUrl: "",
    infoEmail: "",
    supportEmail: "",
    careerEmail: "",
    socialLinks: new Array(Object.keys(socialMediaDomains).length).fill(""),
  });
  const [saveLoading, setSaveLoading] = useState<boolean>(false);

  useEffect(() => {
    if (docSettings) {
      setFormData({
        brandName: docSettings.brandName,
        logoImg: undefined,
        logoUrl: docSettings.logoUrl,
        brandColor: docSettings.brandColor || "#0000FF",
        homepageUrl: docSettings.homepageUrl,
        privacyPolicyUrl: docSettings.privacyPolicyUrl,
        callToActionName: docSettings.callToActionName,
        callToActionUrl: docSettings.callToActionUrl,
        infoEmail: docSettings.infoEmail,
        supportEmail: docSettings.supportEmail,
        careerEmail: docSettings.careerEmail,
        socialLinks:
          docSettings.socialLinks ||
          new Array(Object.keys(socialMediaDomains).length).fill(""),
      });
    }
  }, [docSettings]);

  const handleSaveChanges = async () => {
    setSaveLoading(true);

    const savingRequest: { [key: string]: any } = {
      ...(docSettings || {}),
      ...formData,
      logoUrl: undefined,
      email: account,
      organizationId: infrastructure.organizationId,
      gitLogin: infrastructure.githubUser?.login,
      gitRepo: infrastructure.docInitialRepo,
    };
    const reqFormData = new FormData();
    for (const name in savingRequest) {
      if (savingRequest[name]) {
        reqFormData.append(name, savingRequest[name]);
      }
    }
    const res = await saveDocumentationSettings(authToken, reqFormData);

    if (res) {
      dispatch(setDocSettings(res.docSettings));
    }

    setSaveLoading(false);
  };

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

        <GeneralForm formData={formData} setFormData={setFormData} />

        <MarketingForm formData={formData} setFormData={setFormData} />

        <ContactInformationForm formData={formData} setFormData={setFormData} />

        <div className="flex">
          <div className="flex">
            <PrimaryButton onClick={handleSaveChanges} loading={saveLoading}>
              Save changes
            </PrimaryButton>
          </div>
        </div>
      </ContentContainer>
    </div>
  );
};
