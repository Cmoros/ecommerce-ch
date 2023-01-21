import IItem, { Category } from "typescript/types/Item";

export function checkCategory(toCheck: unknown): toCheck is Category {
  if (typeof toCheck !== "string") return false;
  return toCheck === "grain" || toCheck === "vegetable" || toCheck === "fruit";
}

export function checkIsItem(toCheck: unknown): toCheck is IItem {
  // if (typeof toCheck === "object" && toCheck != null) {
  //   if (id) {
  //     (toCheck as { id: string })["id"] = id;
  //   }
  //   return true;
  // }
  // return false;
  return typeof toCheck === "object" && toCheck != null;
}
