import { DashboardStats } from "@/components/dashboard-stats"
import { RecentTransactions } from "@/components/recent-transactions"
import { Suspense } from "react"
import { DashboardStatsSkeleton } from "@/components/dashboard-stats-skeleton"
import { RecentTransactionsSkeleton } from "@/components/recent-transactions-skeleton"

export default function StoreDashboardPage({
  params,
}: {
  params: { storeId: string }
}) {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <Suspense fallback={<DashboardStatsSkeleton />}>
        <DashboardStats storeId={params.storeId} />
      </Suspense>

      <div>
        <h2 className="text-xl font-semibold mb-4">Transações Recentes</h2>
        <Suspense fallback={<RecentTransactionsSkeleton />}>
          <RecentTransactions storeId={params.storeId} limit={5} />
        </Suspense>
      </div>
    </div>
  )
}
