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
      'Authorization': `Bearer ${token}`
    }
  });

  if (tenants.length > 0) {
    redirect(`/dashboard/${tenants[0].slug}`);
  } else {
    redirect("/tenant/create");
  }
}