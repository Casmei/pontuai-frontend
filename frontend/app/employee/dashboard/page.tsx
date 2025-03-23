"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Gift,
  Home,
  LogOut,
  Plus,
  Search,
  Settings,
  ShoppingBag,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
import { signOut } from "@logto/next/server-actions";
import { logtoConfig } from "@/app/logto";
import LogoutButton from "./logout.component";

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
  const [activeTab, setActiveTab] = useState("dashboard");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.phone.includes(searchQuery) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Employee Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                Employee: Jane Manager
              </span>
              <LogoutButton />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 flex-1">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 space-y-2">
            <Button
              variant={activeTab === "dashboard" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("dashboard")}
            >
              <Home className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
            <Button
              variant={activeTab === "customers" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("customers")}
            >
              <Users className="mr-2 h-4 w-4" />
              Customers
            </Button>
            <Button
              variant={activeTab === "transactions" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("transactions")}
            >
              <ShoppingBag className="mr-2 h-4 w-4" />
              Transactions
            </Button>
            <Button
              variant={activeTab === "rewards" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("rewards")}
            >
              <Gift className="mr-2 h-4 w-4" />
              Manage Rewards
            </Button>
            <Button
              variant={activeTab === "settings" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "dashboard" && (
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
                      <div className="text-2xl font-bold">
                        {customers.length}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        +2 from last week
                      </p>
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
                      <p className="text-xs text-muted-foreground">
                        +3 from yesterday
                      </p>
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
                      <p className="text-xs text-muted-foreground">
                        +45 from yesterday
                      </p>
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
                    <Button
                      variant="ghost"
                      className="w-full"
                      onClick={() => setActiveTab("transactions")}
                    >
                      View All Transactions
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center">
                    <div>
                      <CardTitle>Quick Actions</CardTitle>
                      <CardDescription>
                        Common tasks for employees
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full">
                            <Plus className="mr-2 h-4 w-4" />
                            Add Points
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add Points</DialogTitle>
                            <DialogDescription>
                              Add points to a customer's account based on their
                              purchase.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="customer">Customer</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select customer" />
                                </SelectTrigger>
                                <SelectContent>
                                  {customers.map((customer) => (
                                    <SelectItem
                                      key={customer.id}
                                      value={customer.id.toString()}
                                    >
                                      {customer.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="store">Store</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select store" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="ice-cream">
                                    Ice Cream Shop
                                  </SelectItem>
                                  <SelectItem value="clothing">
                                    Clothing Store
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="amount">
                                Purchase Amount ($)
                              </Label>
                              <Input
                                id="amount"
                                type="number"
                                min="0"
                                step="0.01"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit">Add Points</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="w-full">
                            <Gift className="mr-2 h-4 w-4" />
                            Redeem Reward
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Redeem Customer Reward</DialogTitle>
                            <DialogDescription>
                              Process a reward redemption for a customer.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="redeem-customer">Customer</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select customer" />
                                </SelectTrigger>
                                <SelectContent>
                                  {customers.map((customer) => (
                                    <SelectItem
                                      key={customer.id}
                                      value={customer.id.toString()}
                                    >
                                      {customer.name} ({customer.points} points)
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="reward">Reward</Label>
                              <Select>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select reward" />
                                </SelectTrigger>
                                <SelectContent>
                                  {rewards.map((reward) => (
                                    <SelectItem
                                      key={reward.id}
                                      value={reward.id.toString()}
                                    >
                                      {reward.name} ({reward.points} points)
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit">Process Redemption</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Button
                        className="w-full"
                        onClick={() => setActiveTab("customers")}
                      >
                        <Search className="mr-2 h-4 w-4" />
                        Find Customer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "customers" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Customer Management</CardTitle>
                    <CardDescription>
                      Search and manage customer accounts
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="relative flex-1">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Search by name, phone, or email"
                          className="pl-8"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                      </div>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Customer
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Add New Customer</DialogTitle>
                            <DialogDescription>
                              Create a new customer account in the loyalty
                              program.
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div className="space-y-2">
                              <Label htmlFor="new-name">Full Name</Label>
                              <Input
                                id="new-name"
                                placeholder="Enter customer name"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="new-email">Email</Label>
                              <Input
                                id="new-email"
                                type="email"
                                placeholder="Enter customer email"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="new-phone">Phone Number</Label>
                              <Input
                                id="new-phone"
                                placeholder="Enter customer phone"
                              />
                            </div>
                          </div>
                          <DialogFooter>
                            <Button type="submit">Create Customer</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>

                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Phone</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Points</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredCustomers.map((customer) => (
                          <TableRow key={customer.id}>
                            <TableCell className="font-medium">
                              {customer.name}
                            </TableCell>
                            <TableCell>{customer.phone}</TableCell>
                            <TableCell>{customer.email}</TableCell>
                            <TableCell>{customer.points}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  setSelectedCustomer(customer);
                                  setActiveTab("customer-detail");
                                }}
                              >
                                View
                                <ArrowRight className="ml-2 h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "customer-detail" && selectedCustomer && (
              <div className="space-y-6">
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setActiveTab("customers")}
                  >
                    Back to Customers
                  </Button>
                  <h2 className="text-xl font-semibold">
                    {selectedCustomer.name}
                  </h2>
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
                          <p className="font-medium">{selectedCustomer.name}</p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">
                            Points Balance
                          </p>
                          <p className="font-medium">
                            {selectedCustomer.points}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Phone</p>
                          <p className="font-medium">
                            {selectedCustomer.phone}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Email</p>
                          <p className="font-medium">
                            {selectedCustomer.email}
                          </p>
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
                              <Input
                                id="edit-name"
                                defaultValue={selectedCustomer.name}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-email">Email</Label>
                              <Input
                                id="edit-email"
                                type="email"
                                defaultValue={selectedCustomer.email}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="edit-phone">Phone Number</Label>
                              <Input
                                id="edit-phone"
                                defaultValue={selectedCustomer.phone}
                              />
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
                              Add or remove points from {selectedCustomer.name}
                              's account
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
                                  <SelectItem value="add">
                                    Add Points
                                  </SelectItem>
                                  <SelectItem value="remove">
                                    Remove Points
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="points-amount">
                                Points Amount
                              </Label>
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
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">Points</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {transactions
                            .filter((t) => t.customer === selectedCustomer.name)
                            .map((transaction, index) => (
                              <TableRow key={index}>
                                <TableCell>
                                  {new Date(
                                    transaction.date,
                                  ).toLocaleDateString()}
                                </TableCell>
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
                  </Card>
                </div>
              </div>
            )}

            {activeTab === "transactions" && (
              <Card>
                <CardHeader>
                  <CardTitle>Transaction History</CardTitle>
                  <CardDescription>
                    All customer transactions and point activities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="all">
                    <TabsList className="mb-4">
                      <TabsTrigger value="all">All Transactions</TabsTrigger>
                      <TabsTrigger value="purchases">Purchases</TabsTrigger>
                      <TabsTrigger value="redemptions">Redemptions</TabsTrigger>
                    </TabsList>
                    <TabsContent value="all">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Store</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead className="text-right">Points</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {transactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                              <TableCell>
                                {new Date(
                                  transaction.date,
                                ).toLocaleDateString()}
                              </TableCell>
                              <TableCell>{transaction.customer}</TableCell>
                              <TableCell>{transaction.store}</TableCell>
                              <TableCell>
                                ${transaction.amount.toFixed(2)}
                              </TableCell>
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
                            <TableHead>Date</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Store</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead className="text-right">Points</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {transactions
                            .filter((t) => t.type === "Purchase")
                            .map((transaction) => (
                              <TableRow key={transaction.id}>
                                <TableCell>
                                  {new Date(
                                    transaction.date,
                                  ).toLocaleDateString()}
                                </TableCell>
                                <TableCell>{transaction.customer}</TableCell>
                                <TableCell>{transaction.store}</TableCell>
                                <TableCell>
                                  ${transaction.amount.toFixed(2)}
                                </TableCell>
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
                            <TableHead>Date</TableHead>
                            <TableHead>Customer</TableHead>
                            <TableHead>Store</TableHead>
                            <TableHead>Reward</TableHead>
                            <TableHead className="text-right">Points</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {transactions
                            .filter((t) => t.type === "Redemption")
                            .map((transaction) => (
                              <TableRow key={transaction.id}>
                                <TableCell>
                                  {new Date(
                                    transaction.date,
                                  ).toLocaleDateString()}
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
            )}

            {activeTab === "rewards" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle>Manage Rewards</CardTitle>
                      <CardDescription>
                        Configure available rewards for customers
                      </CardDescription>
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button>
                          <Plus className="mr-2 h-4 w-4" />
                          Add Reward
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Add New Reward</DialogTitle>
                          <DialogDescription>
                            Create a new reward option for customers to redeem
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div className="space-y-2">
                            <Label htmlFor="reward-name">Reward Name</Label>
                            <Input
                              id="reward-name"
                              placeholder="Enter reward name"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="reward-points">
                              Points Required
                            </Label>
                            <Input id="reward-points" type="number" min="1" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="reward-description">
                              Description
                            </Label>
                            <Input
                              id="reward-description"
                              placeholder="Enter reward description"
                            />
                          </div>
                        </div>
                        <DialogFooter>
                          <Button type="submit">Create Reward</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Reward Name</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Points Required</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {rewards.map((reward) => (
                          <TableRow key={reward.id}>
                            <TableCell className="font-medium">
                              {reward.name}
                            </TableCell>
                            <TableCell>{reward.description}</TableCell>
                            <TableCell>{reward.points}</TableCell>
                            <TableCell className="text-right">
                              <Button variant="ghost" size="sm">
                                Edit
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "settings" && (
              <Card>
                <CardHeader>
                  <CardTitle>System Settings</CardTitle>
                  <CardDescription>
                    Configure loyalty program settings
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="points-ratio">Points Ratio</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        id="points-ratio"
                        defaultValue="1"
                        className="w-20"
                      />
                      <span>point(s) per</span>
                      <Input defaultValue="1" className="w-20" />
                      <span>dollar spent</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="expiration">Points Expiration</Label>
                    <Select defaultValue="365">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="never">Never expire</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                        <SelectItem value="180">180 days</SelectItem>
                        <SelectItem value="365">1 year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="min-redemption">
                      Minimum Points for Redemption
                    </Label>
                    <Input id="min-redemption" defaultValue="100" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button>Save Settings</Button>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </div>

      <footer className="border-t py-4 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Loyalty Points System
        </div>
      </footer>
    </div>
  );
}
