"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Mock data
const customers = [
  { id: 1, name: "John Doe", points: 75 },
  { id: 2, name: "Jane Smith", points: 120 },
  { id: 3, name: "Robert Johnson", points: 45 },
  { id: 4, name: "Emily Davis", points: 200 },
  { id: 5, name: "Michael Wilson", points: 150 },
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

export default function RedeemPointsPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [rewardId, setRewardId] = useState("");

  const selectedCustomer = customerId
    ? customers.find((c) => c.id.toString() === customerId)
    : null;
  const selectedReward = rewardId
    ? rewards.find((r) => r.id.toString() === rewardId)
    : null;

  const canRedeem =
    selectedCustomer &&
    selectedReward &&
    selectedCustomer.points >= selectedReward.points;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call to redeem points
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/employee/transactions");
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resgatar pontos</CardTitle>
        <CardDescription>
          Processar um resgate de recompensa para um cliente
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="customer">Cliente</Label>
            <Select value={customerId} onValueChange={setCustomerId}>
              <SelectTrigger>
                <SelectValue placeholder="Select customer" />
              </SelectTrigger>
              <SelectContent>
                {customers.map((customer) => (
                  <SelectItem key={customer.id} value={customer.id.toString()}>
                    {customer.name} ({customer.points} points)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reward">Prêmio</Label>
            <Select value={rewardId} onValueChange={setRewardId}>
              <SelectTrigger>
                <SelectValue placeholder="Select reward" />
              </SelectTrigger>
              <SelectContent>
                {rewards.map((reward) => (
                  <SelectItem
                    key={reward.id}
                    value={reward.id.toString()}
                    disabled={
                      selectedCustomer?.id ? selectedCustomer.points < reward.points : false
                    }
                  >
                    {reward.name} ({reward.points} pontos)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedReward && (
            <div className="rounded-md border p-4">
              <h3 className="font-medium">{selectedReward.name}</h3>
              <p className="text-sm text-muted-foreground">
                {selectedReward.description}
              </p>
              <p className="text-sm mt-2">
                Pontos necessários:{" "}
                <span className="font-medium">{selectedReward.points}</span>
              </p>
            </div>
          )}

          {selectedCustomer && selectedReward && !canRedeem && (
            <div className="text-sm text-destructive">
              Este cliente não tem pontos suficientes para este prémio.
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/employee/transactions">
            <Button variant="outline" type="button">
              Cancelar
            </Button>
          </Link>
          <Button type="submit" disabled={isSubmitting || !canRedeem}>
            {isSubmitting ? "Processando..." : "Resgatar pontos"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
