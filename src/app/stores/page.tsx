import { Suspense } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { StoreList } from "@/components/store-list"
import { StoreListSkeleton } from "@/components/store-list-skeleton"

export default function StoresPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Meus Estabelecimentos</h1>
        <Link href="/stores/create">
          <Button>
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
