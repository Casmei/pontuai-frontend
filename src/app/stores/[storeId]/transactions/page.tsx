import { TransactionTable } from "@/components/transaction-table"
import { TransactionForm } from "@/components/transaction-form"
import { Suspense } from "react"
import { TransactionTableSkeleton } from "@/components/transaction-table-skeleton"
import { getCustomers } from "@/lib/services/customer-service"
import { getRewards } from "@/lib/services/reward-service"

export default async function TransactionsPage({
  params,
}: {
  params: Promise<{ storeId: string }>
}) {
  const { storeId } = await params
  const [customersErr, customers] = await getCustomers({ xTenantId: storeId })
  const [rewardsErr, rewards] = await getRewards({ xTenantId: storeId })

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Transações</h1>

      <div className="rounded-lg border p-4">
        <h2 className="text-xl font-semibold mb-4">Nova Transação</h2>
        <TransactionForm storeId={storeId} customers={customers} rewards={rewards} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Histórico de Transações</h2>
        <Suspense fallback={<TransactionTableSkeleton />}>
          <TransactionTable storeId={storeId} />
        </Suspense>
      </div>
    </div>
  )
}
