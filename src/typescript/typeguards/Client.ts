import { checkIsObject } from ".";
import { Client } from "../types/Client";

export const checkIsClient = (toCheck: unknown): toCheck is Client => {
  if (!checkIsObject(toCheck)) return false;
  return (
    "email" in toCheck &&
    typeof toCheck["email"] === "string" &&
    "phone" in toCheck &&
    typeof toCheck["phone"] === "string" &&
    "name" in toCheck &&
    typeof toCheck["name"] === "string"
  );
};
