/* eslint-disable @typescript-eslint/no-explicit-any */
import { act } from "@testing-library/react";

export const doActHookMethod = <
  T extends Record<string, (...args: any[]) => any>
>(result: {
  current: T;
}) => {
  return async <Z extends keyof T>(
    method: Z,
    ...params: Parameters<T[Z]>
  ): Promise<ReturnType<T[Z]>> => {
    const fn = result.current[method];
    return act(() => fn(...params));
  };
};

export const doActHookMethodAndProps = <T extends Record<string, any>>(result: {
  current: T;
}) => {
  return async <Z extends keyof T>(
    prop: Z,
    ...params: T[Z] extends (...args: any[]) => any ? Parameters<T[Z]> : never[]
  ): Promise<
    T[Z] extends (...args: any[]) => any ? ReturnType<T[Z]> : T[Z]
  > => {
    const fn = result.current[prop];
    if (typeof fn === "function") {
      return act(() => fn(...params));
    }
    return act(() => fn);
  };
};
