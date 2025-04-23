import { UserProvider } from "@/components/@providers/user-provider"
import { Toaster } from "@/components/ui/sonner"
import { logtoConfig } from "@/config/logto"
import { getLogtoContext } from "@logto/next/server-actions"
import { redirect } from "next/navigation"
import type React from "react"

export default async function InternalLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const user = await getLogtoContext(logtoConfig, {
    fetchUserInfo: true,
  })

  if (!user.userInfo) {
    return redirect("/")
  }

  return (
    <UserProvider user={user.userInfo}>
      {children}
      <Toaster />
    </UserProvider>
  )
}
