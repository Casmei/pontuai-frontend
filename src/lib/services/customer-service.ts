import type { Customer } from "@/lib/types"
import { generateId } from "@/lib/utils"

// Simulação de banco de dados
const customers: Record<string, Customer[]> = {
  store1: [
    {
      id: "cust1",
      name: "João Silva",
      phone: "(11) 98765-4321",
      points: 250,
      createdAt: new Date("2023-02-10"),
    },
    {
      id: "cust2",
      name: "Maria Oliveira",
      phone: "(11) 91234-5678",
      points: 480,
      createdAt: new Date("2023-03-15"),
    },
    {
      id: "cust3",
      name: "Carlos Santos",
      phone: "(11) 99876-5432",
      points: 120,
      createdAt: new Date("2023-04-20"),
    },
  ],
  store2: [
    {
      id: "cust4",
      name: "Ana Pereira",
      phone: "(11) 97654-3210",
      points: 350,
      createdAt: new Date("2023-02-05"),
    },
    {
      id: "cust5",
      name: "Pedro Costa",
      phone: "(11) 98765-1234",
      points: 180,
      createdAt: new Date("2023-03-25"),
    },
  ],
}

// Funções de serviço
export async function getCustomers(storeId: string): Promise<Customer[]> {
  // Simula uma chamada de API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(customers[storeId] || [])
    }, 500)
  })
}

export async function getCustomerById(storeId: string, customerId: string): Promise<Customer | null> {
  // Simula uma chamada de API
  return new Promise((resolve) => {
    setTimeout(() => {
      const customer = (customers[storeId] || []).find((c) => c.id === customerId)
      resolve(customer || null)
    }, 300)
  })
}

export async function createCustomer(
  storeId: string,
  data: Omit<Customer, "id" | "points" | "createdAt">,
): Promise<string> {
  // Simula uma chamada de API
  return new Promise((resolve) => {
    setTimeout(() => {
      const newCustomer: Customer = {
        id: generateId(),
        ...data,
        points: 0,
        createdAt: new Date(),
      }

      if (!customers[storeId]) {
        customers[storeId] = []
      }

      customers[storeId].push(newCustomer)
      resolve(newCustomer.id)
    }, 500)
  })
}

export async function updateCustomerPoints(storeId: string, customerId: string, points: number): Promise<void> {
  // Simula uma chamada de API
  return new Promise((resolve) => {
    setTimeout(() => {
      const customer = (customers[storeId] || []).find((c) => c.id === customerId)
      if (customer) {
        customer.points += points
      }
      resolve()
    }, 300)
  })
}
