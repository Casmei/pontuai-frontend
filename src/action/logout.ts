"use server";

import { useTenantStore } from "@/app/stores/tenant-store";
import { logtoConfig } from "@/config/logto";
import { signOut } from "@logto/next/server-actions";

export async function logout() {
  useTenantStore.getState().clear();
  await signOut(logtoConfig);
}
