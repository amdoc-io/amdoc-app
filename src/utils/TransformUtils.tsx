import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { RxLinkedinLogo } from "react-icons/rx";

export const socialMediaDomains = {
  linkedin: {
    domain: "linkedin.com",
    name: "LinkedIn",
  },
  facebook: {
    domain: "facebook.com",
    name: "Facebook",
  },
  instagram: {
    domain: "instagram.com",
    name: "Instagram",
  },
  twitter: {
    domain: "x.com",
    name: "X",
  },
  tiktok: {
    domain: "tiktok.com",
    name: "TikTok",
  },
};

export const socialMediaIcons = {
  linkedin: <RxLinkedinLogo />,
  facebook: <FaFacebook />,
  instagram: <FaInstagram />,
  twitter: <RiTwitterXLine />,
  tiktok: <FaTiktok />,
};

export const transformDomain = (value: string) => {
  if (!value) {
    return value;
  }

  let normalizedValue = value.trim();

  try {
    const href = new URL(normalizedValue).href;
    return href.endsWith("/") ? href.slice(0, -1) : href;
  } catch (e) {}

  if (normalizedValue.startsWith("www.")) {
    normalizedValue = `https://${normalizedValue}`;
  } else {
    normalizedValue = `https://www.${normalizedValue}`;
  }

  try {
    const href = new URL(normalizedValue).href;
    return href.endsWith("/") ? href.slice(0, -1) : href;
  } catch (e) {
    return value;
  }
};

export const getSocialMediaIcon = (url: string) => {
  try {
    const domain = new URL(url).hostname;

    for (const [key, value] of Object.entries(socialMediaDomains)) {
      if (domain.includes(value.domain)) {
        return socialMediaIcons[key as keyof typeof socialMediaIcons];
      }
    }
  } catch (e) {
    return undefined;
  }

  return undefined;
};
