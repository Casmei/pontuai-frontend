import { CustomerTable } from "@/components/customer-table";
import { CustomerForm } from "@/components/customer-form";
import { Suspense } from "react";
import { CustomerTableSkeleton } from "@/components/customer-table-skeleton";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { QuerySearch } from "@/components/query-search";

export default async function CustomersPage({
  params,
  searchParams,
}: {
  params: Promise<{ storeId: string }>;
  searchParams?: Promise<{ q?: string }>;
}) {
  const { storeId } = await params;
  const search = await searchParams;

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Clientes</h1>
      <div>
        <h2 className="text-xl font-semibold mb-4">Lista de Clientes</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <QuerySearch placeholder="Pesquise pelo nome ou número de celular do cliente" />
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className=" h-4 w-4" />
                  Adicionar Cliente
                </Button>
              </DialogTrigger>
              <CustomerForm storeId={storeId} />
            </Dialog>
          </div>
          <Suspense fallback={<CustomerTableSkeleton />}>
            <CustomerTable storeId={storeId} query={search?.q || ""} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
