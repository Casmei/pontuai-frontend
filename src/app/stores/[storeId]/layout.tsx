import type React from "react"
import { getStoreById } from "@/lib/services/store-service"
import { notFound, redirect } from "next/navigation"
import { UserProvider } from "@/components/@providers/user-provider"
import { getAccessToken, getAccessTokenRSC, getLogtoContext } from "@logto/next/server-actions"
import { logtoConfig } from "@/config/logto"
import { AppSidebar } from "@/components/navigation/app-sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import { Toaster } from "@/components/ui/sonner"

export default async function StoreLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { storeId: string }
}) {
  const store = await getStoreById(params.storeId)

  if (!store) {
    notFound()
  }

  const user = await getLogtoContext(logtoConfig, {
    fetchUserInfo: true,
  })

  if (!user.userInfo) {
    return redirect("/")
  }

  return (
    <SidebarProvider>

      <UserProvider user={user.userInfo}>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
            </div>
          </header>
          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
        </SidebarInset>
        <Toaster />
      </UserProvider>
    </SidebarProvider>
  )
}
