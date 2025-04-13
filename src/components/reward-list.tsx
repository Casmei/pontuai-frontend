import { getRewards } from "@/lib/services/reward-service"
import { RewardCard } from "@/components/reward-card"

interface RewardListProps {
  storeId: string
}

export async function RewardList({ storeId }: RewardListProps) {
  const rewards = await getRewards(storeId)

  if (rewards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <h3 className="text-lg font-semibold">Nenhuma recompensa cadastrada</h3>
        <p className="text-sm text-muted-foreground mt-2">Adicione recompensas usando o formulário acima.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {rewards.map((reward) => (
        <RewardCard key={reward.id} reward={reward} />
      ))}
    </div>
  )
}
