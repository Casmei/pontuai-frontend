"use server"

import { logtoConfig } from "@/config/logto";
import { signIn } from "@logto/next/server-actions";

export const login = async () => {
  await signIn(logtoConfig);
}