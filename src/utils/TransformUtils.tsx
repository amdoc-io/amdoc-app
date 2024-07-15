import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { RxLinkedinLogo } from "react-icons/rx";

export const socialMediaDomains = {
  linkedin: {
    domain: "linkedin.com",
    name: "LinkedIn",
    placeholder: "https://www.linkedin.com",
    icon: <RxLinkedinLogo />,
    order: 1,
  },
  facebook: {
    domain: "facebook.com",
    name: "Facebook",
    placeholder: "https://www.facebook.com",
    icon: <FaFacebook />,
    order: 2,
  },
  instagram: {
    domain: "instagram.com",
    name: "Instagram",
    placeholder: "https://www.instagram.com",
    icon: <FaInstagram />,
    order: 3,
  },
  twitter: {
    domain: "x.com",
    name: "X",
    placeholder: "https://www.x.com",
    icon: <RiTwitterXLine />,
    order: 4,
  },
  tiktok: {
    domain: "tiktok.com",
    name: "TikTok",
    placeholder: "https://www.tiktok.com",
    icon: <FaTiktok />,
    order: 5,
  },
};

export const transformDomain = (value: string) => {
  if (!value) {
    return value;
  }

  let normalizedValue = value.toLowerCase().trim();

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
    return value.toLowerCase();
  }
};
