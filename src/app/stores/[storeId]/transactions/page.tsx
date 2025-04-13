import { TransactionTable } from "@/components/transaction-table"
import { TransactionForm } from "@/components/transaction-form"
import { Suspense } from "react"
import { TransactionTableSkeleton } from "@/components/transaction-table-skeleton"

export default async function TransactionsPage({
  params,
}: {
  params: Promise<{ storeId: string }>
}) {
  const { storeId } = await params
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Transações</h1>

      <div className="rounded-lg border p-4">
        <h2 className="text-xl font-semibold mb-4">Nova Transação</h2>
        <TransactionForm storeId={storeId} />
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
