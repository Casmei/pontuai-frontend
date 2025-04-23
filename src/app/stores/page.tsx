import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { StoreList } from "@/components/store-list"
import { StoreListSkeleton } from "@/components/store-list-skeleton"

export default function StoresPage() {
  return (
    <div className="container mx-auto py-6 px-4 md:py-10 md:px-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Meus Estabelecimentos</h1>
          <p className="text-muted-foreground mt-1">Gerencie todos os seus estabelecimentos em um só lugar</p>
        </div>
        <Link href="/stores/create">
          <Button size="sm" className="w-full sm:w-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Estabelecimento
          </Button>
        </Link>
      </div>

      <Suspense fallback={<StoreListSkeleton />}>
        <StoreList />
      </Suspense>
    </div>
  )
}
