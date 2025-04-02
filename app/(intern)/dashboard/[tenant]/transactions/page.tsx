"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { Plus } from "lucide-react";

// Mock data
const transactions = [
  {
    id: 1,
    date: "2023-05-15",
    customer: "John Doe",
    store: "Ice Cream Shop",
    amount: 25,
    points: 25,
    type: "Purchase",
  },
  {
    id: 2,
    date: "2023-05-15",
    customer: "Jane Smith",
    store: "Clothing Store",
    amount: 75,
    points: 75,
    type: "Purchase",
  },
  {
    id: 3,
    date: "2023-05-14",
    customer: "Emily Davis",
    store: "Ice Cream Shop",
    amount: 15,
    points: 15,
    type: "Purchase",
  },
  {
    id: 4,
    date: "2023-05-14",
    customer: "Robert Johnson",
    store: "Clothing Store",
    amount: 50,
    points: 50,
    type: "Purchase",
  },
  {
    id: 5,
    date: "2023-05-13",
    customer: "Jane Smith",
    store: "Ice Cream Shop",
    amount: 0,
    points: -50,
    type: "Redemption",
  },
];

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Histórico de transações</CardTitle>
          <CardDescription>
            Todas as transacções de clientes e actividades de pontos
          </CardDescription>
        </div>
        <div className="flex gap-2">
          <Link href="/employee/transactions/add">
            <Button size="sm">Adicionar Pontos</Button>
          </Link>
          <Link href="/employee/transactions/redeem">
            <Button size="sm" variant="outline">
              Resgatar pontos
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="all">Todas as transações</TabsTrigger>
            <TabsTrigger value="purchases">Compras</TabsTrigger>
            <TabsTrigger value="redemptions">Resgates</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="text-right">Pontos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>
                      {new Date(transaction.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{transaction.customer}</TableCell>
                    <TableCell>{transaction.store}</TableCell>
                    <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                    <TableCell>{transaction.type}</TableCell>
                    <TableCell className="text-right font-medium">
                      {transaction.points > 0
                        ? `+${transaction.points}`
                        : transaction.points}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="purchases">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead className="text-right">Pontos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions
                  .filter((t) => t.type === "Purchase")
                  .map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        {new Date(transaction.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{transaction.customer}</TableCell>
                      <TableCell>{transaction.store}</TableCell>
                      <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                      <TableCell className="text-right font-medium">
                        +{transaction.points}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="redemptions">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Cliente</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead>Prêmio</TableHead>
                  <TableHead className="text-right">Pontos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions
                  .filter((t) => t.type === "Redemption")
                  .map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>
                        {new Date(transaction.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>{transaction.customer}</TableCell>
                      <TableCell>{transaction.store}</TableCell>
                      <TableCell>10% Discount</TableCell>
                      <TableCell className="text-right font-medium">
                        {transaction.points}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
