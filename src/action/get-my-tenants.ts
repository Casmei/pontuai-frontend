"use server";

import { getAccessToken } from "@logto/next/server-actions";
import { logtoConfig } from "@/config/logto";

export async function getMyTenants() {
  const token = await getAccessToken(
    logtoConfig,
    "https://pontuai-api.kontact.com.br"
  );

  if (!token) {
    throw new Error("Unauthorized");
  }

  return await [];
}
