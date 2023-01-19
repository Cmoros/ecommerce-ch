import { Category } from "typescript/types/Item";

export function checkCategory(toCheck: unknown): toCheck is Category {
  if (typeof toCheck !== "string") return false;
  return toCheck === "grain" || toCheck === "vegetable" || toCheck === "fruit";
}
