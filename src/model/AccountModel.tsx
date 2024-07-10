export interface SignInResponse {
  account: DocAccount;
  authToken: string;
  createdAt: string;
}

export enum AuthType {
  "GOOGLE" = "GOOGLE",
  "GITHUB" = "GITHUB",
  "EMAIL" = "EMAIL",
  "LINKEDIN" = "LINKEDIN",
}

export interface DocAccount {
  id?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  organization?: string;
  companySize?: CompanySize;
  companyWebsite?: string;
  authType?: AuthType;
  accessToken?: string;
  isEmailVerified?: boolean;
  hashedPassword?: string;
  phoneNumber?: string;
  countryCode?: string;
  profileImageUrl?: string;
  subscriptionPlan?: string;
  authorities?: string[];
  jobTitle?: string;
  isNewsSubscribed?: boolean;
  isSetupComplete?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export enum CompanySize {
  FROM_1_TO_10 = "FROM_1_TO_10",
  FROM_11_TO_50 = "FROM_11_TO_50",
  FROM_51_TO_200 = "FROM_51_TO_200",
  FROM_201_TO_500 = "FROM_201_TO_500",
  FROM_501_TO_1000 = "FROM_501_TO_1000",
  FROM_1001_TO_INFINITY = "FROM_1001_TO_INFINITY",
}

export interface Organization {
  id?: string;
  email?: string;
  name?: string;
  country?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Infrastructure {
  id?: string;
  email?: string;
  organizationId?: string;
  gitProvider?: string;
  gitOauthToken?: GitOAuthToken;
  gitInstallationToken?: GitInstallationToken;
  gitInstallationId?: string;
  docInitialRepo?: string;
  currentStep?: number;
  docInitialWebsite?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GitOAuthToken {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
  scope: string;
  tokenType: string;
}

export interface GitPermissions {
  metadata: string;
  pullRequests: string;
  repositoryProjects: string;
}

export interface GitInstallationToken {
  token: string;
  expiresAt: string;
  permissions: GitPermissions;
  repositorySelection: string;
}

export interface LinkedInAccessToken {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
  scope: string;
}
