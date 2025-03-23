"use client";

import Link from "next/link";
import { Gift, Plus, ShoppingBag, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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

// Mock data
const customers = [
  {
    id: 1,
    name: "John Doe",
    phone: "(555) 123-4567",
    email: "john@example.com",
    points: 75,
  },
  {
    id: 2,
    name: "Jane Smith",
    phone: "(555) 987-6543",
    email: "jane@example.com",
    points: 120,
  },
  {
    id: 3,
    name: "Robert Johnson",
    phone: "(555) 456-7890",
    email: "robert@example.com",
    points: 45,
  },
  {
    id: 4,
    name: "Emily Davis",
    phone: "(555) 234-5678",
    email: "emily@example.com",
    points: 200,
  },
  {
    id: 5,
    name: "Michael Wilson",
    phone: "(555) 876-5432",
    email: "michael@example.com",
    points: 150,
  },
];

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

const rewards = [
  {
    id: 1,
    name: "10% Discount",
    points: 100,
    description: "10% off your next purchase",
  },
  {
    id: 2,
    name: "Free Ice Cream",
    points: 150,
    description: "One free ice cream of your choice",
  },
  {
    id: 3,
    name: "Gift Card",
    points: 300,
    description: "$30 gift card for any store",
  },
  {
    id: 4,
    name: "Premium Item",
    points: 500,
    description: "Select a premium clothing item",
  },
];

export default function EmployeeDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">125</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Today's Transactions
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+3 from yesterday</p>
          </CardContent>
        </Card>

        <Card className="flex-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Points Awarded Today
            </CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">165</div>
            <p className="text-xs text-muted-foreground">+45 from yesterday</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Today's customer activity</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Store</TableHead>
                <TableHead>Type</TableHead>
                <TableHead className="text-right">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.slice(0, 5).map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{transaction.customer}</TableCell>
                  <TableCell>{transaction.store}</TableCell>
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
        </CardContent>
        <CardFooter>
          <Link href="/employee/transactions" className="w-full">
            <Button variant="ghost" className="w-full">
              View All Transactions
            </Button>
          </Link>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center">
          <div>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks for employees</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/employee/transactions/add">
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                Add Points
              </Button>
            </Link>

            <Link href="/employee/transactions/redeem">
              <Button className="w-full">
                <Gift className="mr-2 h-4 w-4" />
                Redeem Reward
              </Button>
            </Link>

            <Link href="/employee/customers">
              <Button className="w-full">
                <Users className="mr-2 h-4 w-4" />
                Find Customer
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
