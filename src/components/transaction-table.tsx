import { getTransactions } from "@/lib/services/transaction-service"
import { formatDate, formatCurrency } from "@/lib/utils"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface TransactionTableProps {
  storeId: string
}

export async function TransactionTable({ storeId }: TransactionTableProps) {
  const transactions = await getTransactions(storeId)

  if (transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
        <h3 className="text-lg font-semibold">Nenhuma transação registrada</h3>
        <p className="text-sm text-muted-foreground mt-2">Registre transações usando o formulário acima.</p>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Data</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Detalhes</TableHead>
            <TableHead>Pontos</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{formatDate(transaction.createdAt)}</TableCell>
              <TableCell>{transaction.customer.name}</TableCell>
              <TableCell>
                {transaction.type === "purchase" ? (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    Compra
                  </Badge>
                ) : (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    Resgate
                  </Badge>
                )}
              </TableCell>
              <TableCell>
                {transaction.type === "purchase" ? (
                  <span>{formatCurrency(transaction.amount!)}</span>
                ) : (
                  <span>{transaction.reward?.name}</span>
                )}
              </TableCell>
              <TableCell>
                {transaction.type === "purchase" ? (
                  <span className="text-green-600">+{transaction.pointsEarned}</span>
                ) : (
                  <span className="text-blue-600">-{transaction.pointsSpent}</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
