"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { PointConfig } from "@/gen";
import { updatePointConfig } from "@/action/update-point-config";

const formSchema = z.object({
  pointsPerReal: z.coerce.number().min(0.1, "Deve ser pelo menos 0.1"),
  expirationDays: z.coerce.number().int().min(1, "Deve ser pelo menos 1 dia"),
  minSpendToEarn: z.coerce.number().min(0, "Não pode ser negativo"),
  minPointsToRedeem: z.coerce
    .number()
    .int()
    .min(1, "Deve ser pelo menos 1 ponto"),
});

interface ConfigFormProps {
  storeId: string;
  initialData: PointConfig;
}

export function ConfigForm({ storeId, initialData }: ConfigFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pointsPerReal: initialData.ratio.amount,
      expirationDays: initialData.expirationInDays,
      minSpendToEarn: initialData.ratio.moneySpent,
      minPointsToRedeem: initialData.minimumRedemptionValue,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);

      await updatePointConfig({
        tenantId: storeId,
        updateTenantSettingsDto: {
          expirationInDays: values.expirationDays,
          minimumRedemptionValue: values.minPointsToRedeem,
          ratioAmount: values.pointsPerReal,
          ratioMoneySpent: values.minSpendToEarn,
        },
      });

      toast.success("Configurações atualizadas", {
        description: "As configurações foram salvas com sucesso.",
      });
    } catch (error) {
      console.error(error);
      toast.error("Erro", {
        description: "Ocorreu um erro ao salvar as configurações.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="pointsPerReal"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pontos por Real</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.1" {...field} />
                  </FormControl>
                  <FormDescription>
                    Quantos pontos o cliente ganha para cada R$ 1,00 gasto
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="expirationDays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dias para Expiração</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Número de dias até os pontos expirarem
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="minSpendToEarn"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor Mínimo para Pontuar (R$)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormDescription>
                    Valor mínimo que o cliente precisa gastar para começar a
                    ganhar pontos
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="minPointsToRedeem"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pontos Mínimos para Resgate</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Quantidade mínima de pontos necessários para fazer um
                    resgate
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Salvando..." : "Salvar Configurações"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
