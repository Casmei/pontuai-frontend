"use server";

import { logtoConfig } from "@/config/logto";
import { signIn } from "@logto/next/server-actions";

export async function signin() {
  await signIn(logtoConfig);
}
