"use client";

import LogoutButton from "./logout.component";


interface HeaderInterface {
  employerName?: string;
}

export default function Header({ employerName }: HeaderInterface) {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Pontuaí</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Atendente: {employerName || "Sem nome"}
            </span>
            <LogoutButton />
          </div>
        </div>
      </div>
    </header>
  );
}
