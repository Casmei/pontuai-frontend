import { StoreForm } from "@/components/store-form"

export default function CreateStorePage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Novo Estabelecimento</h1>
      <StoreForm />
    </div>
  )
}
