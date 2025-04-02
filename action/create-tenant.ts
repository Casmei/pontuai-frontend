'use server'

import { tenantControllerCreate } from "@/http/api"
import { getAccessToken } from "@logto/next/server-actions"
import { logtoConfig } from "@/config/logto"

export async function createTenant(data: { name: string; cnpj: string; slug: string }) {
    const token = await getAccessToken(logtoConfig, "https://pontuai-api.kontact.com.br")

    if (!token) {
        throw new Error("Unauthorized")
    }

    return await tenantControllerCreate(data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}