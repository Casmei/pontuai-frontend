"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useParams } from "next/navigation"; // A partir do Next.js 13.4+

// Mock data - in a real app, this would come from an API call
const customers = [
  {
    id: "1",
    name: "John Doe",
    phone: "(555) 123-4567",
    email: "john@example.com",
    points: 75,
  },
  {
    id: "2",
    name: "Jane Smith",
    phone: "(555) 987-6543",
    email: "jane@example.com",
    points: 120,
  },
  {
    id: "3",
    name: "Robert Johnson",
    phone: "(555) 456-7890",
    email: "robert@example.com",
    points: 45,
  },
  {
    id: "4",
    name: "Emily Davis",
    phone: "(555) 234-5678",
    email: "emily@example.com",
    points: 200,
  },
  {
    id: "5",
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
    date: "2023-05-10",
    customer: "John Doe",
    store: "Clothing Store",
    amount: 50,
    points: 50,
    type: "Purchase",
  },
  {
    id: 3,
    date: "2023-05-01",
    customer: "John Doe",
    store: "Ice Cream Shop",
    amount: 15,
    points: 15,
    type: "Purchase",
  },
  {
    id: 4,
    date: "2023-04-22",
    customer: "John Doe",
    store: "Clothing Store",
    amount: 35,
    points: 35,
    type: "Purchase",
  },
];

export default function CustomerDetailPage() {
  const { id } = useParams(); // Pega o parâmetro diretamente

  const customer = customers.find((c) => c.id === id) || customers[0];
  const customerTransactions = transactions.filter(
    (t) => t.customer === customer.name,
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/employee/customers">
          <Button variant="outline" size="sm">
            Back to Customers
          </Button>
        </Link>
        <h2 className="text-xl font-semibold">{customer.name}</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="font-medium">{customer.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Points Balance</p>
                <p className="font-medium">{customer.points}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Phone</p>
                <p className="font-medium">{customer.phone}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="font-medium">{customer.email}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Edit Customer</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit Customer</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="edit-name">Full Name</Label>
                    <Input id="edit-name" defaultValue={customer.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-email">Email</Label>
                    <Input
                      id="edit-email"
                      type="email"
                      defaultValue={customer.email}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-phone">Phone Number</Label>
                    <Input id="edit-phone" defaultValue={customer.phone} />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Changes</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button>Manage Points</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Manage Points</DialogTitle>
                  <DialogDescription>
                    Add or remove points from {customer.name}'s account
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="points-action">Action</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select action" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="add">Add Points</SelectItem>
                        <SelectItem value="remove">Remove Points</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="points-amount">Points Amount</Label>
                    <Input id="points-amount" type="number" min="1" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="points-reason">Reason</Label>
                    <Input
                      id="points-reason"
                      placeholder="Reason for adjustment"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Update Points</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Store</TableHead>
                  <TableHead className="text-right">Points</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customerTransactions.map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {new Date(transaction.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{transaction.store}</TableCell>
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
        </Card>
      </div>
    </div>
  );
}
