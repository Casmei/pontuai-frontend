import { logtoConfig } from "@/app/logto";
import { getLogtoContext } from "@logto/next/server-actions";
import { redirect } from "next/navigation";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAuthenticated } = await getLogtoContext(logtoConfig);

  if (!isAuthenticated) {
    redirect("/");
  }

  return <div>{children}</div>;
}
