export const titleCaseToSnakeCase = (titleCase: string) => {
  return titleCase.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};
