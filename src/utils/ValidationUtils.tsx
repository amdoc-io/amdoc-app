export const isValidated = (validation: any) => {
  return Object.values(validation).every((item) => !item);
};
