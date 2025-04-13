import { getStores } from "@/lib/services/store-service"
import { StoreCard } from "@/components/store-card"

export async function StoreList() {
  const stores = await getStores()

  if (stores.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <h2 className="text-lg font-semibold">Nenhum estabelecimento encontrado</h2>
        <p className="text-sm text-muted-foreground mt-2">Crie seu primeiro estabelecimento para começar.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {stores.map((store) => (
        <StoreCard key={store.id} store={store} />
      ))}
    </div>
  )
}
