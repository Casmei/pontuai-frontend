"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"

const formSchema = z.object({
    apikey: z.string().min(1, "API Key é obrigatória"),
    baseUrl: z.string().url("URL inválida"),
    instanceName: z.string().min(1, "Nome da instância é obrigatório"),
})

export type NotificationConfig = {
    apikey: string
    baseUrl: string
    instanceName: string
}

interface NotificationConfigFormProps {
    storeId: string
}

export function NotificationConfigForm({ storeId }: NotificationConfigFormProps) {
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            apikey: "",
            baseUrl: "",
            instanceName: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            setIsLoading(true)
            toast.success("Configurações atualizadas", {
                description: "As configurações de notificação foram salvas com sucesso.",
            })
        } catch (error) {
            console.error(error)
            toast.error("Erro", {
                description: "Ocorreu um erro ao salvar as configurações de notificação.",
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Card>
            <CardContent className="pt-6">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="apikey"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>API Key</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>Chave de API para o serviço de notificação</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="baseUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>URL Base</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>URL base do serviço de notificação</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="instanceName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome da Instância</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>Nome da instância no serviço de notificação</FormDescription>
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
    )
}
