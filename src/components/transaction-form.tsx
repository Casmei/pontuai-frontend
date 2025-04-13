"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { createTransaction } from "@/lib/services/transaction-service"
import { getCustomers } from "@/lib/services/customer-service"
import { getRewards } from "@/lib/services/reward-service"
import { useEffect } from "react"
import type { Customer, Reward } from "@/lib/types"

const purchaseSchema = z.object({
  type: z.literal("purchase"),
  customerId: z.string().min(1, "Selecione um cliente"),
  amount: z.coerce.number().min(0.01, "Valor deve ser maior que zero"),
})

const redeemSchema = z.object({
  type: z.literal("redeem"),
  customerId: z.string().min(1, "Selecione um cliente"),
  rewardId: z.string().min(1, "Selecione uma recompensa"),
})

const toast = (data: any) => {
  console.log(data)
}

const formSchema = z.discriminatedUnion("type", [purchaseSchema, redeemSchema])

interface TransactionFormProps {
  storeId: string
}

export function TransactionForm({ storeId }: TransactionFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [customers, setCustomers] = useState<Customer[]>([])
  const [rewards, setRewards] = useState<Reward[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      type: "purchase",
      customerId: "",
      amount: 0,
    },
  })

  const transactionType = form.watch("type")

  useEffect(() => {
    async function loadData() {
      try {
        const customersData = await getCustomers(storeId)
        setCustomers(customersData)

        const rewardsData = await getRewards(storeId)
        setRewards(rewardsData)
      } catch (error) {
        toast({
          title: "Erro",
          description: "Não foi possível carregar os dados.",
          variant: "destructive",
        })
      }
    }

    loadData()
  }, [storeId])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true)
      await createTransaction(storeId, values)
      toast({
        title: "Transação registrada",
        description: "A transação foi registrada com sucesso.",
      })
      form.reset({
        type: "purchase",
        customerId: "",
        amount: 0,
      })
    } catch (error) {
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao registrar a transação.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Tipo de Transação</FormLabel>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex space-x-4">
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="purchase" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">Compra (adicionar pontos)</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="redeem" />
                    </FormControl>
                    <FormLabel className="font-normal cursor-pointer">Resgate (usar pontos)</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="customerId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cliente</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um cliente" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name} ({customer.phone})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {transactionType === "purchase" && (
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor da Compra (R$)</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        {transactionType === "redeem" && (
          <FormField
            control={form.control}
            name="rewardId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Recompensa</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione uma recompensa" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {rewards.map((reward) => (
                      <SelectItem key={reward.id} value={reward.id}>
                        {reward.name} ({reward.pointsRequired} pts)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Processando..." : "Registrar Transação"}
          </Button>
        </div>
      </form>
    </Form>
  )
}
