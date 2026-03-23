import { NextRequest } from "next/server";

export function getAdminPassword(): string {
  return (process.env.ADMIN_PASSWORD || "").trim();
}

export function hasAdminAuthConfigured(): boolean {
  return getAdminPassword().length > 0;
}

/**
 * Simple token-based admin auth.
 * Dashboard sends `x-admin-token` header with the configured password.
 */
export function checkAdminAuth(req: NextRequest): boolean {
  const token = req.headers.get("x-admin-token")?.trim() || "";
  const password = getAdminPassword();

  if (!password) return false;

  return token === password;
}
