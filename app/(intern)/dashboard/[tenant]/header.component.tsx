"use client";
import { useTenantStore } from "@/app/stores/tenant-store";
import LogoutButton from "./logout.component";

export default function Header() {
  const currentTenant = useTenantStore((state) => state.currentTenant);

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Pontuaí</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Empresa: {currentTenant?.name || "Sem empresa selecionada"}
            </span>
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  );
}