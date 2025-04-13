import type { Transaction } from "@/lib/types"
import { generateId } from "@/lib/utils"
import { getCustomerById, updateCustomerPoints } from "./customer-service"
import { getRewardById } from "./reward-service"
import { getStoreConfig } from "./store-service"

// Simulação de banco de dados
const transactions: Record<string, Transaction[]> = {
  store1: [
    {
      id: "trans1",
      type: "purchase",
      customer: {
        id: "cust1",
        name: "João Silva",
        phone: "(11) 98765-4321",
        points: 250,
        createdAt: new Date("2023-02-10"),
      },
      amount: 45.8,
      pointsEarned: 45,
      createdAt: new Date("2023-05-10"),
    },
    {
      id: "trans2",
      type: "redeem",
      customer: {
        id: "cust2",
        name: "Maria Oliveira",
        phone: "(11) 91234-5678",
        points: 480,
        createdAt: new Date("2023-03-15"),
      },
      pointsSpent: 50,
      reward: {
        id: "reward1",
        name: "Café Expresso Grátis",
        description: "Um café expresso de qualquer tipo",
        pointsRequired: 50,
        createdAt: new Date("2023-01-20"),
      },
      createdAt: new Date("2023-05-12"),
    },
    {
      id: "trans3",
      type: "purchase",
      customer: {
        id: "cust3",
        name: "Carlos Santos",
        phone: "(11) 99876-5432",
        points: 120,
        createdAt: new Date("2023-04-20"),
      },
      amount: 32.5,
      pointsEarned: 32,
      createdAt: new Date("2023-05-15"),
    },
  ],
  store2: [
    {
      id: "trans4",
      type: "purchase",
      customer: {
        id: "cust4",
        name: "Ana Pereira",
        phone: "(11) 97654-3210",
        points: 350,
        createdAt: new Date("2023-02-05"),
      },
      amount: 28.9,
      pointsEarned: 14,
      createdAt: new Date("2023-05-08"),
    },
    {
      id: "trans5",
      type: "redeem",
      customer: {
        id: "cust5",
        name: "Pedro Costa",
        phone: "(11) 98765-1234",
        points: 180,
        createdAt: new Date("2023-03-25"),
      },
      pointsSpent: 60,
      reward: {
        id: "reward4",
        name: "Pão Francês (6 unidades)",
        description: "Meia dúzia de pães franceses",
        pointsRequired: 60,
        createdAt: new Date("2023-03-25"),
      },
      createdAt: new Date("2023-05-14"),
    },
  ],
}

// Funções de serviço
export async function getTransactions(storeId: string, limit?: number): Promise<Transaction[]> {
  // Simula uma chamada de API
  return new Promise((resolve) => {
    setTimeout(() => {
      let result = transactions[storeId] || []

      // Ordenar por data (mais recente primeiro)
      result = [...result].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

      if (limit) {
        result = result.slice(0, limit)
      }

      resolve(result)
    }, 500)
  })
}

interface PurchaseTransaction {
  type: "purchase"
  customerId: string
  amount: number
}

interface RedeemTransaction {
  type: "redeem"
  customerId: string
  rewardId: string
}

type TransactionData = PurchaseTransaction | RedeemTransaction

export async function createTransaction(storeId: string, data: TransactionData): Promise<string> {
  // Simula uma chamada de API
  return new Promise(async (resolve) => {
    setTimeout(async () => {
      const customer = await getCustomerById(storeId, data.customerId)

      if (!customer) {
        throw new Error("Cliente não encontrado")
      }

      if (!transactions[storeId]) {
        transactions[storeId] = []
      }

      let transaction: Transaction

      if (data.type === "purchase") {
        const config = await getStoreConfig(storeId)

        // Calcula pontos apenas se o valor for maior que o mínimo
        let pointsEarned = 0
        if (data.amount >= config.minSpendToEarn) {
          pointsEarned = Math.floor(data.amount * config.pointsPerReal)
        }

        transaction = {
          id: generateId(),
          type: "purchase",
          customer,
          amount: data.amount,
          pointsEarned,
          createdAt: new Date(),
        }

        // Atualiza os pontos do cliente
        await updateCustomerPoints(storeId, customer.id, pointsEarned)
      } else {
        const reward = await getRewardById(storeId, data.rewardId)

        if (!reward) {
          throw new Error("Recompensa não encontrada")
        }

        if (customer.points < reward.pointsRequired) {
          throw new Error("Cliente não possui pontos suficientes")
        }

        transaction = {
          id: generateId(),
          type: "redeem",
          customer,
          pointsSpent: reward.pointsRequired,
          reward,
          createdAt: new Date(),
        }

        // Deduz os pontos do cliente
        await updateCustomerPoints(storeId, customer.id, -reward.pointsRequired)
      }

      transactions[storeId].push(transaction)
      resolve(transaction.id)
    }, 800)
  })
}
