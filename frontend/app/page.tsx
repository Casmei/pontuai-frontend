import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { signIn } from "@logto/next/server-actions";
import { logtoConfig } from "./logto";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold">
            Pontu<span className="text-amber-500">aí</span>
          </span>
        </div>
        {/* <nav className="hidden md:flex gap-6">
          <Link
            href="#"
            className="text-sm font-medium hover:text-amber-500 transition-colors"
          >
            Sobre
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:text-amber-500 transition-colors"
          >
            Benefícios
          </Link>
          <Link
            href="#"
            className="text-sm font-medium hover:text-amber-500 transition-colors"
          >
            Contato
          </Link>
        </nav> */}
        <Button
          onClick={async () => {
            "use server";

            await signIn(logtoConfig);
          }}
          className="bg-amber-500 text-white px-6 py-3 rounded-md text-center hover:bg-amber-600 transition-colors inline-flex items-center justify-center"
        >
          Área do atendente
        </Button>
      </header>
      <main className="flex-1 flex items-center">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              Fidelização <span className="text-amber-500">simplificada</span>{" "}
              para seu negócio
            </h1>
            <p className="text-lg text-gray-600 max-w-md">
              Transforme clientes ocasionais em clientes fiéis com um sistema de
              pontos simples e eficaz para pequenas empresas.
            </p>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden shadow-2xl hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-br from-amber-100 to-amber-300 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 shadow-lg max-w-xs w-full">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <h3 className="font-bold">Café Aroma</h3>
                    <p className="text-sm text-gray-500">
                      Cliente: Maria Silva
                    </p>
                  </div>
                  <Star className="h-5 w-5 text-amber-500" />
                </div>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>Pontos acumulados</span>
                      <span className="font-bold">235</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-amber-500 h-2 rounded-full w-[70%]"></div>
                    </div>
                  </div>
                  <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                    <p className="text-sm font-medium">
                      Próximo prêmio: 300 pontos
                    </p>
                    <p className="text-xs text-gray-500">
                      Café especial + sobremesa grátis
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <div className="bg-amber-500 text-white text-xs py-1 px-2 rounded">
                      +15 pontos hoje
                    </div>
                    <div className="bg-gray-100 text-gray-700 text-xs py-1 px-2 rounded">
                      65 pontos para o próximo prêmio
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="container mx-auto px-4 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Pontuaí at Byalsoft. Todos os direitos
        reservados.
      </footer>
    </div>
  );
}
