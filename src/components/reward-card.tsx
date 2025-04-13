import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Reward } from "@/lib/types"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash } from "lucide-react"

interface RewardCardProps {
  reward: Reward
}

export function RewardCard({ reward }: RewardCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg">{reward.name}</CardTitle>
          <Badge variant="secondary" className="ml-2">
            {reward.pointsRequired} pts
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{reward.description || "Sem descrição disponível."}</p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm">
          <Edit className="h-4 w-4 mr-2" />
          Editar
        </Button>
        <Button variant="outline" size="sm" className="text-destructive">
          <Trash className="h-4 w-4 mr-2" />
          Excluir
        </Button>
      </CardFooter>
    </Card>
  )
}
