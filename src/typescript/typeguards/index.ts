export const checkIsObject = (toCheck: unknown): toCheck is object => {
  return typeof toCheck === "object" && toCheck != null;
};
