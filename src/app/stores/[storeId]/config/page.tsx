import { ConfigForm } from "@/components/config-form"
import { NotificationConfigForm } from "@/components/notification-config-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { getStoreById } from "@/lib/services/store-service"

export default async function StoreConfigPage({
  params,
}: {
  params: Promise<{ storeId: string }>
}) {
  const { storeId } = await params
  const [err, store] = await getStoreById(storeId)

  if (err) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <h2 className="text-lg font-semibold">Erro ao buscar loja</h2>
        <p className="text-sm text-muted-foreground mt-2">{err.message}</p>
      </div>
    )
  }

  const config = store.config;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Configurações</h1>

      <Tabs defaultValue="points" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-2 mb-8">
          <TabsTrigger value="points">Configuração de Pontos</TabsTrigger>
          <TabsTrigger value="notifications">Configuração de Notificações</TabsTrigger>
        </TabsList>
        <TabsContent value="points">
          <ConfigForm storeId={storeId} initialData={config.pointConfig} />
        </TabsContent>
        <TabsContent value="notifications">
          <NotificationConfigForm storeId={storeId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
