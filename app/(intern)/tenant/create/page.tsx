"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CreateTenantPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [tenantData, setTenantData] = useState({
        name: "",
        type: "ice-cream" as "ice-cream" | "clothing",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        phone: "",
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setTenantData((prev) => ({ ...prev, [name]: value }))
    }

    const handleTypeChange = (value: string) => {
        setTenantData((prev) => ({ ...prev, type: value as "ice-cream" | "clothing" }))
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        // Simulate API call to create tenant
        setTimeout(() => {
            const newTenant = {
                id: `tenant-${Date.now()}`,
                name: tenantData.name,
                type: tenantData.type,
            }


            setIsLoading(false)

            // Redirecionar para o dashboard com o slug do tenant
            const tenantSlug = tenantData.name.toLowerCase().replace(/\s+/g, "-")
            router.push(`/dashboard/${tenantSlug}`)
        }, 1000)
    }

    const isFormValid =
        tenantData.name.trim() !== "" &&
        tenantData.address.trim() !== "" &&
        tenantData.city.trim() !== "" &&
        tenantData.state.trim() !== "" &&
        tenantData.zipCode.trim() !== "" &&
        tenantData.phone.trim() !== ""

    return (
        <div className="container mx-auto py-10 px-4 max-w-3xl">
            <Button variant="ghost" className="mb-6" onClick={() => router.back()}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
            </Button>

            <div className="flex flex-col items-center mb-8 text-center">
                <h1 className="text-3xl font-bold mb-2">Create Your Store</h1>
                <p className="text-muted-foreground max-w-md">Set up your store to start managing your loyalty program</p>
            </div>

            <form onSubmit={handleSubmit}>
                <Card>
                    <CardHeader>
                        <CardTitle>Store Information</CardTitle>
                        <CardDescription>Enter the details of your store</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Store Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    placeholder="Enter your store name"
                                    value={tenantData.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Store Type</Label>
                                <Tabs defaultValue={tenantData.type} onValueChange={handleTypeChange} className="w-full">
                                    <TabsList className="grid w-full grid-cols-2">
                                        <TabsTrigger value="ice-cream">Ice Cream Shop</TabsTrigger>
                                        <TabsTrigger value="clothing">Clothing Store</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="ice-cream" className="mt-4">
                                        <div className="flex items-center p-4 border rounded-lg">
                                            <div className="text-4xl mr-4">🍦</div>
                                            <div>
                                                <h3 className="font-medium">Ice Cream Shop</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Perfect for ice cream parlors, gelato shops, and dessert cafes
                                                </p>
                                            </div>
                                        </div>
                                    </TabsContent>
                                    <TabsContent value="clothing" className="mt-4">
                                        <div className="flex items-center p-4 border rounded-lg">
                                            <div className="text-4xl mr-4">👕</div>
                                            <div>
                                                <h3 className="font-medium">Clothing Store</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    Ideal for boutiques, fashion retailers, and apparel shops
                                                </p>
                                            </div>
                                        </div>
                                    </TabsContent>
                                </Tabs>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg font-medium mb-4">Store Location</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2 md:col-span-2">
                                    <Label htmlFor="address">Street Address</Label>
                                    <Input
                                        id="address"
                                        name="address"
                                        placeholder="123 Main St"
                                        value={tenantData.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="city">City</Label>
                                    <Input
                                        id="city"
                                        name="city"
                                        placeholder="City"
                                        value={tenantData.city}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="state">State</Label>
                                    <Input
                                        id="state"
                                        name="state"
                                        placeholder="State"
                                        value={tenantData.state}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="zipCode">ZIP Code</Label>
                                    <Input
                                        id="zipCode"
                                        name="zipCode"
                                        placeholder="ZIP Code"
                                        value={tenantData.zipCode}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        placeholder="(555) 123-4567"
                                        value={tenantData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex flex-col space-y-2">
                        <Button type="submit" className="w-full" disabled={isLoading || !isFormValid}>
                            {isLoading ? "Creating Store..." : "Create Store"}
                        </Button>
                        <p className="text-xs text-center text-muted-foreground pt-2">
                            By creating a store, you agree to our Terms of Service and Privacy Policy
                        </p>
                    </CardFooter>
                </Card>
            </form>
        </div>
    )
}

