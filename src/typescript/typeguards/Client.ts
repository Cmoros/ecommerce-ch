import { checkIsObject } from ".";
import { Client, ClientFull } from "../types/Client";

export const checkIsClient = (toCheck: unknown): toCheck is Client => {
  if (!checkIsObject(toCheck)) return false;
  return (
    "email" in toCheck &&
    typeof toCheck["email"] === "string" &&
    "phone" in toCheck &&
    typeof toCheck["phone"] === "string" &&
    "name" in toCheck &&
    typeof toCheck["name"] === "string"
    // && "likes" in toCheck
    // && Array.isArray(toCheck.likes)
  );
};

export const checkIsClientFull = (toCheck: unknown): toCheck is ClientFull => {
  return (
    checkIsClient(toCheck) &&
    "id" in toCheck &&
    typeof toCheck.id === "string" &&
    "token" in toCheck &&
    typeof toCheck.token === "string"
  );
};
