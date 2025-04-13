import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Store } from "@/lib/types"
import Link from "next/link"
import { ArrowRight, MapPin, Users } from "lucide-react"

interface StoreCardProps {
  store: Store
}

export function StoreCard({ store }: StoreCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle>{store.name}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm text-muted-foreground">
        <div className="flex items-center gap-2 mb-2">
          <MapPin className="h-4 w-4" />
          <span>{store.address}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-4 w-4" />
          <span>{store.customerCount} clientes</span>
        </div>
      </CardContent>
      <CardFooter>
        <Link href={`/stores/${store.id}`} className="w-full">
          <Button className="w-full">
            Gerenciar
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
