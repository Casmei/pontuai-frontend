import { RewardList } from "@/components/reward-list"
import { RewardForm } from "@/components/reward-form"
import { Suspense } from "react"
import { RewardListSkeleton } from "@/components/reward-list-skeleton"

export default function RewardsPage({
  params,
}: {
  params: { storeId: string }
}) {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Recompensas</h1>

      <div className="rounded-lg border p-4">
        <h2 className="text-xl font-semibold mb-4">Adicionar Recompensa</h2>
        <RewardForm storeId={params.storeId} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Catálogo de Recompensas</h2>
        <Suspense fallback={<RewardListSkeleton />}>
          <RewardList storeId={params.storeId} />
        </Suspense>
      </div>
    </div>
  )
}
