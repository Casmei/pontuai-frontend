"use client"

import { Input } from "@/components/ui/input"

import { Label } from "@/components/ui/label"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Gift, History, Home, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data
const customerData = {
  name: "John Doe",
  points: 75,
  nextReward: 100,
  history: [
    { id: 1, date: "2023-05-15", store: "Ice Cream Shop", amount: 25, points: 25 },
    { id: 2, date: "2023-05-10", store: "Clothing Store", amount: 50, points: 50 },
    { id: 3, date: "2023-05-01", store: "Ice Cream Shop", amount: 15, points: 15 },
    { id: 4, date: "2023-04-22", store: "Clothing Store", amount: 35, points: 35 },
  ],
  rewards: [
    { id: 1, name: "10% Discount", points: 100, description: "10% off your next purchase" },
    { id: 2, name: "Free Ice Cream", points: 150, description: "One free ice cream of your choice" },
    { id: 3, name: "Gift Card", points: 300, description: "$30 gift card for any store" },
    { id: 4, name: "Premium Item", points: 500, description: "Select a premium clothing item" },
  ],
  promotions: [
    { id: 1, title: "Double Points Weekend", description: "Earn double points this weekend on all purchases" },
    { id: 2, title: "Summer Collection", description: "New summer items available with bonus points" },
  ],
}

export default function CustomerDashboard() {
  const [activeTab, setActiveTab] = useState("overview")

  const progressPercentage = (customerData.points / customerData.nextReward) * 100

  return (
    <div className="flex min-h-screen flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Customer Dashboard</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Welcome, {customerData.name}</span>
              <Link href="/">
                <Button variant="outline" size="sm">
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 flex-1">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 space-y-2">
            <Button
              variant={activeTab === "overview" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("overview")}
            >
              <Home className="mr-2 h-4 w-4" />
              Overview
            </Button>
            <Button
              variant={activeTab === "history" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("history")}
            >
              <History className="mr-2 h-4 w-4" />
              Points History
            </Button>
            <Button
              variant={activeTab === "rewards" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("rewards")}
            >
              <Gift className="mr-2 h-4 w-4" />
              Redeem Rewards
            </Button>
            <Button
              variant={activeTab === "profile" ? "default" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab("profile")}
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </Button>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Points Summary</CardTitle>
                    <CardDescription>Your current points and progress</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">Current Points</p>
                        <p className="text-3xl font-bold">{customerData.points}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Next Reward</p>
                        <p className="text-xl font-semibold">{customerData.nextReward} points</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress to next reward</span>
                        <span>
                          {customerData.points}/{customerData.nextReward}
                        </span>
                      </div>
                      <Progress value={progressPercentage} className="h-2" />
                      <p className="text-xs text-muted-foreground">
                        {customerData.nextReward - customerData.points} more points needed for a 10% discount
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => setActiveTab("rewards")}>
                      View Available Rewards
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>Your most recent point activities</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Store</TableHead>
                          <TableHead>Amount</TableHead>
                          <TableHead className="text-right">Points</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {customerData.history.slice(0, 3).map((transaction) => (
                          <TableRow key={transaction.id}>
                            <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                            <TableCell>{transaction.store}</TableCell>
                            <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                            <TableCell className="text-right font-medium">+{transaction.points}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <Button variant="ghost" className="w-full" onClick={() => setActiveTab("history")}>
                      View All Transactions
                    </Button>
                  </CardFooter>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Special Promotions</CardTitle>
                    <CardDescription>Exclusive offers for loyalty members</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {customerData.promotions.map((promo) => (
                      <div key={promo.id} className="border rounded-lg p-4">
                        <h3 className="font-semibold">{promo.title}</h3>
                        <p className="text-sm text-muted-foreground">{promo.description}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            )}

            {activeTab === "history" && (
              <Card>
                <CardHeader>
                  <CardTitle>Points History</CardTitle>
                  <CardDescription>Complete history of your points activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Store</TableHead>
                        <TableHead>Purchase Amount</TableHead>
                        <TableHead className="text-right">Points</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {customerData.history.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                          <TableCell>{transaction.store}</TableCell>
                          <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                          <TableCell className="text-right font-medium">+{transaction.points}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}

            {activeTab === "rewards" && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Available Points</CardTitle>
                    <CardDescription>You have {customerData.points} points to redeem</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Progress value={progressPercentage} className="h-2 mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {customerData.nextReward - customerData.points} more points needed for a 10% discount
                    </p>
                  </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-2">
                  {customerData.rewards.map((reward) => (
                    <Card key={reward.id} className={reward.points > customerData.points ? "opacity-60" : ""}>
                      <CardHeader>
                        <CardTitle>{reward.name}</CardTitle>
                        <CardDescription>{reward.points} points</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>{reward.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full" disabled={reward.points > customerData.points}>
                          {reward.points > customerData.points
                            ? `Need ${reward.points - customerData.points} more points`
                            : "Redeem Reward"}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <Card>
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Manage your account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="profile-name">Full Name</Label>
                    <Input id="profile-name" defaultValue={customerData.name} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profile-email">Email</Label>
                    <Input id="profile-email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="profile-phone">Phone Number</Label>
                    <Input id="profile-phone" defaultValue="(555) 123-4567" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Save Changes</Button>
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
  )
}

