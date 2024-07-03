export const isTokenValid = (expiresAt: string): boolean => {
  const expiresAtDate = new Date(expiresAt);
  const nowMinusOneMinute = new Date(Date.now() - 60 * 1000);

  return expiresAtDate > nowMinusOneMinute;
};
