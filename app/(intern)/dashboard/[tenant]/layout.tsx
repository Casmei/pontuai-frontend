import { logtoConfig } from "@/config/logto";
import { getLogtoContext } from "@logto/next/server-actions";
import { redirect } from "next/navigation";
import Header from "./header.component";
import Sidebar from "./sidebar.component";
import { TenantProvider } from "@/app/provider/tenant-provider";
import { getMyTenants } from "@/action/get-my-tenants";

export default async function EmployeeLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: { tenant: string };
}>) {
  const { isAuthenticated, userInfo } = await getLogtoContext(logtoConfig, {
    fetchUserInfo: true,
  });

  if (!isAuthenticated) {
    redirect("/");
  }

  const tenants = await getMyTenants()

  return (
    <TenantProvider initialTenants={tenants}>
      <div className="flex min-h-screen flex-col">
        <Header />

        <div className="container mx-auto px-4 py-6 flex-1">
          <div className="flex flex-col md:flex-row gap-6">
            <Sidebar tenant={params.tenant} />

            <div className="flex-1">{children}</div>
          </div>
        </div>

        <footer className="border-t py-4 mt-auto">
          <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Pontuaí @ Byalsoft
          </div>
        </footer>
      </div>
    </TenantProvider>
  );
}