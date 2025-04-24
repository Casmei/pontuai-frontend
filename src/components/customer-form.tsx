"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { createCustomerAction } from "@/action/create-customer";

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  phone: z.string().min(10, "Telefone deve ter pelo menos 10 dígitos"),
  moneySpent: z
    .number({ invalid_type_error: "Valor gasto precisa ser um número" })
  ,
});

interface CustomerFormProps {
  storeId: string;
}

export function CustomerForm({ storeId }: CustomerFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      moneySpent: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsLoading(true);
      await createCustomerAction({
        xTenantId: storeId,
        createCustomerDto: {
          name: values.name,
          phone: values.phone,
          moneySpent: values.moneySpent,
        },
      });
      toast.success("Cliente adicionado", {
        description: "O cliente foi adicionado com sucesso.",
      });
      form.reset();
    } catch (error) {
      console.error(error);
      toast.error("Erro", {
        description: "Ocorreu um erro ao adicionar o cliente.",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Cliente</FormLabel>
                <FormControl>
                  <Input placeholder="Nome completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input placeholder="(00) 00000-0000" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="moneySpent"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dinheiro Gasto</FormLabel>
                <FormControl>
                  <Input placeholder="12.4" {...field} type="number" onChange={(e) => field.onChange(+e.target.value)} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Adicionando..." : "Adicionar Cliente"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
