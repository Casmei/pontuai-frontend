import { ConfigForm } from "@/components/config-form"
import { getStoreConfig } from "@/lib/services/store-service"

export default async function StoreConfigPage({
  params,
}: {
  params: Promise<{ storeId: string }>
}) {
  const { storeId } = await params
  const config = await getStoreConfig(storeId)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Configurações</h1>
      <ConfigForm storeId={storeId} initialData={config} />
    </div>
  )
}
