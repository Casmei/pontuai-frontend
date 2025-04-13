import { getStoreStats } from "@/lib/services/store-service"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import { Users, CreditCard, Gift, TrendingUp } from "lucide-react"

interface DashboardStatsProps {
  storeId: string
}

export async function DashboardStats({ storeId }: DashboardStatsProps) {
  const stats = await getStoreStats(storeId)

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalCustomers}</div>
          <p className="text-xs text-muted-foreground">{stats.newCustomersThisMonth} novos este mês</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Vendas Totais</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{formatCurrency(stats.totalSales)}</div>
          <p className="text-xs text-muted-foreground">{formatCurrency(stats.salesThisMonth)} este mês</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pontos Resgatados</CardTitle>
          <Gift className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.totalPointsRedeemed}</div>
          <p className="text-xs text-muted-foreground">{stats.redeemedThisMonth} este mês</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Pontos Ativos</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.activePoints}</div>
          <p className="text-xs text-muted-foreground">{stats.pointsEarnedThisMonth} ganhos este mês</p>
        </CardContent>
      </Card>
    </div>
  )
}
