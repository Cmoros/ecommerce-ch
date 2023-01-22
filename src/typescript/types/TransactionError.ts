export interface ITransactionError extends Error {
  type: "DocDataError" | "DocNotTypeExpected" | "DocNotExists" | "DocsDismatch";
}

export const transactionErrorTypeArr = [
  "DocDataError",
  "DocNotTypeExpected",
  "DocNotExists",
  "DocsDismatch",
];
