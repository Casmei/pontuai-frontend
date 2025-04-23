import { ConfigForm } from "@/components/config-form"
import { NotificationConfigForm } from "@/components/notification-config-form"
import { getStoreConfig } from "@/lib/services/store-service"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default async function StoreConfigPage({
  params,
}: {
  params: { storeId: string }
}) {
  const { storeId } = params
  const config = await getStoreConfig(storeId)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Configurações</h1>

      <Tabs defaultValue="points" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="points">Configuração de Pontos</TabsTrigger>
          <TabsTrigger value="notifications">Configuração de Notificações</TabsTrigger>
        </TabsList>
        <TabsContent value="points">
          <ConfigForm storeId={storeId} initialData={config} />
        </TabsContent>
        <TabsContent value="notifications">
          <NotificationConfigForm storeId={storeId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
