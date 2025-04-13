"use server"

import { logtoConfig } from "@/config/logto";
import { signOut } from "@logto/next/server-actions";

export const logout = async () => {
  await signOut(logtoConfig);
}