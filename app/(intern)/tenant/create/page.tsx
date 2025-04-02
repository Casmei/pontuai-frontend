"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "@/components/ui/use-toast"
import { CreateTenantDto, tenantControllerCreate } from "@/http/api"
import { getAccessToken, getAccessTokenRSC } from "@logto/next/server-actions"
import { logtoConfig } from "@/config/logto"
import { createTenant } from "@/action/create-tenant"
import { useTenantStore } from "@/app/stores/tenant-store"

// Schema de validação com Zod
const tenantFormSchema = z.object({
    name: z.string().min(2, {
        message: "O nome da empresa deve ter pelo menos 2 caracteres."
    }),
    cnpj: z.string().min(14, {
        message: "CNPJ inválido. Deve conter 14 dígitos."
    }),
    slug: z.string().min(3, {
        message: "O slug deve ter pelo menos 3 caracteres."
    }).regex(/^[a-z0-9-]+$/, {
        message: "O slug deve conter apenas letras minúsculas, números e hífens."
    })
})

type TenantFormValues = z.infer<typeof tenantFormSchema>

export default function CreateTenantPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    // Configuração do formulário com react-hook-form e zod
    const form = useForm<TenantFormValues>({
        resolver: zodResolver(tenantFormSchema),
        defaultValues: {
            name: "",
            cnpj: "",
            slug: "",
        }
    })

    // Gerar slug automático a partir do nome
    const generateSlug = (name: string) => {
        return name.toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "") // Remove acentos
            .replace(/[^a-z0-9 ]/g, "") // Remove caracteres especiais
            .replace(/\s+/g, "-") // Substitui espaços por hífens
    }

    // Atualizar o slug quando o nome mudar
    const updateSlugFromName = (name: string) => {
        const slug = generateSlug(name)
        form.setValue("slug", slug)
    }

    const onSubmit = async (data: TenantFormValues) => {
        setIsLoading(true)

        try {
            const result = await createTenant(data)
            useTenantStore.getState().setCurrentTenant(result);
            useTenantStore.getState().setTenants([...useTenantStore.getState().tenants, result]);
            router.push(`/dashboard/${result.slug}`)
        } catch (error) {
            toast({
                title: "Erro ao criar empresa",
                description: "Ocorreu um erro ao tentar criar a empresa. Por favor, tente novamente.",
                variant: "destructive"
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container mx-auto py-10 px-4 max-w-3xl">
            <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar
            </Button>

            <div className="flex flex-col items-center mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2">Empresa</h1>
                <p className="text-muted-foreground max-w-md">Configure a sua empresa para começar a gerir o seu programa de fidelização</p>
            </div>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Card>
                        <CardHeader>
                            <CardTitle>Dados</CardTitle>
                            <CardDescription>Preencha as informações da sua empresa</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Nome da empresa</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Digite o nome da sua empresa"
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e)
                                                        updateSlugFromName(e.target.value)
                                                    }}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="cnpj"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>CNPJ</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Digite o CNPJ da empresa"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="slug"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Slug</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="slug-da-empresa"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="flex flex-col space-y-2">
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Criando empresa..." : "Criar empresa"}
                            </Button>
                            <p className="text-xs text-center text-muted-foreground pt-2">
                                Ao criar uma empresa, você concorda com nossos Termos de Serviço e Política de Privacidade
                            </p>
                        </CardFooter>
                    </Card>
                </form>
            </Form>
        </div>
    )
}