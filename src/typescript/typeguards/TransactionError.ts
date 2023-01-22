import { TransactionError } from "db/firebase";
import {
  ITransactionError,
  transactionErrorTypeArr,
} from "typescript/types/TransactionError";

export const checkIsTransactionTypeError = (
  toCheck: unknown
): toCheck is ITransactionError["type"] => {
  if (typeof toCheck !== "string") return false;
  return transactionErrorTypeArr.includes(toCheck);
};

export const checkIsTransactionError = (
  toCheck: unknown
): toCheck is TransactionError => {
  if (typeof toCheck !== "object" || !toCheck) return false;
  return "type" in toCheck && checkIsTransactionTypeError(toCheck.type);
};
