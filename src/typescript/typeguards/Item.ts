import IItem, { IItemCard, ItemCategory } from "typescript/types/Item";

export function checkIsItemCategory(toCheck: unknown): toCheck is ItemCategory {
  if (typeof toCheck !== "string") return false;
  return toCheck === "grain" || toCheck === "vegetable" || toCheck === "fruit";
}

export function checkIsItem(toCheck: unknown): toCheck is IItem {
  return typeof toCheck === "object" && toCheck != null;
}

export function checkIsItemCard(toCheck: unknown): toCheck is IItemCard {
  return (
    checkIsItem(toCheck) &&
    "quantity" in toCheck &&
    typeof toCheck.quantity === "number"
  );
}
