export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(" ");
}

export function searchObjEquality(
  src: object,
  query: string | number | null | undefined | boolean
): query is never;
export function searchObjEquality(
  src: string | number | null | undefined | boolean,
  query: object
): query is never;
export function searchObjEquality(
  src: boolean,
  query: unknown
): query is boolean;
export function searchObjEquality(src: string, query: unknown): query is string;
export function searchObjEquality(src: number, query: unknown): query is number;
export function searchObjEquality(src: null, query: unknown): query is null;
export function searchObjEquality<T>(
  src: T,
  query: unknown
): query is Partial<T>;
export function searchObjEquality<T>(
  src: T,
  query: unknown
): query is T | Partial<T> {
  if (
    !(typeof src === "object" && src !== null) ||
    !(typeof query === "object" && query !== null)
  ) {
    return src === query;
  }

  for (const key in query) {
    if (
      !(key in src) ||
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      !searchObjEquality((src as any)[key], (query as any)[key])
    ) {
      return false;
    }
  }
  return true;
}

const algo = {};
if (searchObjEquality(true, algo)) {
  algo;
}
