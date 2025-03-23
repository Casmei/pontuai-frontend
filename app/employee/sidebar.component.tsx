"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Gift,
  Home,
  Settings,
  ShoppingBag,
  UserPlus,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  const pathname = usePathname();

  const routes = [
    {
      href: "/employee/dashboard",
      icon: Home,
      label: "Dashboard",
    },
    {
      href: "/employee/customers",
      icon: Users,
      label: "Clientes",
    },
    {
      href: "/employee/transactions",
      icon: ShoppingBag,
      label: "Transações",
    },
    {
      href: "/employee/rewards",
      icon: Gift,
      label: "Prêmios",
    },
    {
      href: "/employee/attendants",
      icon: UserPlus,
      label: "Atendentes",
    },
    {
      href: "/employee/settings",
      icon: Settings,
      label: "Configurações",
    },
  ];

  return (
    <div className="w-full md:w-64 space-y-2">
      {routes.map((route) => (
        <Link key={route.href} href={route.href}>
          <Button
            variant={pathname === route.href ? "default" : "ghost"}
            className="w-full justify-start"
          >
            <route.icon className="mr-2 h-4 w-4" />
            {route.label}
          </Button>
        </Link>
      ))}
    </div>
  );
}
