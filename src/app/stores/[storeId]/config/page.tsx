import { ConfigForm } from "@/components/config-form"
import { getStoreConfig } from "@/lib/services/store-service"

export default async function StoreConfigPage({
  params,
}: {
  params: { storeId: string }
}) {
  const config = await getStoreConfig(params.storeId)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Configurações</h1>
      <ConfigForm storeId={params.storeId} initialData={config} />
    </div>
  )
}
