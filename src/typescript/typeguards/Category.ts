import { Category } from "typescript/types/Category";
import { checkIsObject } from ".";
import { checkIsItemCategory } from "./Item";

export function checkIsChategory(toCheck: unknown): toCheck is Category {
  if (!checkIsObject(toCheck)) return false;
  return (
    "category" in toCheck &&
    checkIsItemCategory(toCheck.category) &&
    "label" in toCheck &&
    typeof toCheck.label === "string"
  );
}
