import { renderHook } from "@testing-library/react";
import { AuthProvider, useAuthContext } from "context/authContext";
import { ReactNode } from "react";
import { doActHookMethodAndProps } from "utils/doActHookMethod";

describe("authContext", () => {
  const wrapper = ({ children }: { children: ReactNode }) => (
    <AuthProvider>{children}</AuthProvider>
  );
  it("", async () => {
    const { result } = renderHook(useAuthContext, { wrapper });
    const hook = doActHookMethodAndProps(result);
    expect(await hook("isAuthenticated")).toBe(false);
    expect(await hook("isAuthtenticating")).toBe(false);
  });
});
