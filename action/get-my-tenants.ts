'use server'

import { tenantControllerGetMyTenants } from "@/http/api"
import { getAccessToken, getAccessTokenRSC } from "@logto/next/server-actions"
import { logtoConfig } from "@/config/logto"

export async function getMyTenants() {
    const token = await getAccessToken(logtoConfig, "https://pontuai-api.kontact.com.br")

    if (!token) {
        throw new Error("Unauthorized")
    }

    return await tenantControllerGetMyTenants({
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
}