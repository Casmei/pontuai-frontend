import { CustomerTable } from "@/components/customer-table"
import { CustomerForm } from "@/components/customer-form"
import { Suspense } from "react"
import { CustomerTableSkeleton } from "@/components/customer-table-skeleton"

export default function CustomersPage({
  params,
}: {
  params: { storeId: string }
}) {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Clientes</h1>

      <div className="rounded-lg border p-4">
        <h2 className="text-xl font-semibold mb-4">Adicionar Cliente</h2>
        <CustomerForm storeId={params.storeId} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Lista de Clientes</h2>
        <Suspense fallback={<CustomerTableSkeleton />}>
          <CustomerTable storeId={params.storeId} />
        </Suspense>
      </div>
    </div>
  )
}
