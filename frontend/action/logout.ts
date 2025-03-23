"use server";

import { logtoConfig } from "@/config/logto";
import { signOut } from "@logto/next/server-actions";

export async function logout() {
  await signOut(logtoConfig);
}
