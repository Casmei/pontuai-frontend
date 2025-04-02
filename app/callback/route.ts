import { getAccessToken, handleSignIn } from "@logto/next/server-actions";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { logtoConfig } from "../../config/logto";
import { tenantControllerGetMyTenants } from "@/http/api";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  await handleSignIn(logtoConfig, searchParams);

  const token = await getAccessToken(logtoConfig, "https://pontuai-api.kontact.com.br")

  const tenants = await tenantControllerGetMyTenants({
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  const hasData = Array.isArray(tenants.data) && tenants.data.length > 0;

  if (hasData) { redirect("/dashboard/alguma-coisa"); } else { redirect("/tenant/create"); }

}
