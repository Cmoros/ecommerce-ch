import IItem, { Category } from "typescript/types/Item";

export function checkCategory(toCheck: unknown): toCheck is Category {
  if (typeof toCheck !== "string") return false;
  return toCheck === "grain" || toCheck === "vegetable" || toCheck === "fruit";
}

export function checkIsItem(toCheck: unknown): toCheck is IItem {
  return typeof toCheck === "object" && toCheck != null;
}
