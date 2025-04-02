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
import { Input } from "@/components/ui/input";
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

export default function AddPointsPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerId, setCustomerId] = useState("");
  const [store, setStore] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call to add points
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/employee/transactions");
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Adicionar pontos</CardTitle>
        <CardDescription>
          Adicionar pontos à conta de um cliente com base na sua compra
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
                    {customer.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="store">Compra</Label>
            <Select value={store} onValueChange={setStore}>
              <SelectTrigger>
                <SelectValue placeholder="Select store" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ice-cream">Ice Cream Shop</SelectItem>
                <SelectItem value="clothing">Clothing Store</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Valor (R$)</Label>
            <Input
              id="amount"
              type="number"
              min="0"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="pt-2">
            <p className="text-sm text-muted-foreground">
              Pontos a acrescentar:{" "}
              <span className="font-medium">
                {amount ? Number.parseInt(amount) : 0}
              </span>
            </p>
            <p className="text-xs text-muted-foreground">
              É atribuído 1 ponto por cada 1 real gasto
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link href="/employee/transactions">
            <Button variant="outline" type="button">
              Cancelar
            </Button>
          </Link>
          <Button
            type="submit"
            disabled={isSubmitting || !customerId || !store || !amount}
          >
            {isSubmitting ? "Processando..." : "Adicionar pontos"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
