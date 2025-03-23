"use server";

import { logtoConfig } from "@/app/logto";
import { signOut } from "@logto/next/server-actions";

export async function logout() {
  await signOut(logtoConfig);
}
