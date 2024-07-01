export interface GithubAccessToken {
  accessToken: string;
  expiresIn: number;
  refreshToken: string;
  refreshTokenExpiresIn: number;
  scope: string;
  tokenType: string;
}
