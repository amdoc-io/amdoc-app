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
  "FACEBOOK" = "FACEBOOK",
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
  githubUser?: GithubUser;
  gitInstallationId?: string;
  docInitialRepo?: string;
  currentStep?: number;
  docInitialWebsite?: string;
  docInitialWebsiteCreatedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GithubUserPlan {
  name: string;
  space: number;
  _repos: number;
  collaborators: number;
}

export interface GithubUser {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
  name: string;
  company: string;
  blog: string;
  location: string;
  email: string;
  hireable: boolean;
  bio: string;
  twitter_username: string;
  public_repos: number;
  public_gists: number;
  followers: number;
  following: number;
  created_at: string;
  updated_at: string;
  _gists: number;
  total__repos: number;
  owned__repos: number;
  disk_usage: number;
  collaborators: number;
  two_factor_authentication: boolean;
  plan: GithubUserPlan;
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
