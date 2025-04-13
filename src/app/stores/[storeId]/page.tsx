import { DashboardStats } from "@/components/dashboard-stats"
import { RecentTransactions } from "@/components/recent-transactions"
import { Suspense } from "react"
import { DashboardStatsSkeleton } from "@/components/dashboard-stats-skeleton"
import { RecentTransactionsSkeleton } from "@/components/recent-transactions-skeleton"

export default async function StoreDashboardPage({
  params,
}: {
  params: Promise<{ storeId: string }>
}) {
  const { storeId } = await params
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <Suspense fallback={<DashboardStatsSkeleton />}>
        <DashboardStats storeId={storeId} />
      </Suspense>

      <div>
        <h2 className="text-xl font-semibold mb-4">Transações Recentes</h2>
        <Suspense fallback={<RecentTransactionsSkeleton />}>
          <RecentTransactions storeId={storeId} limit={5} />
        </Suspense>
      </div>
    </div>
  )
}
