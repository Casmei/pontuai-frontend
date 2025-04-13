import type { Reward } from "@/lib/types"
import { generateId } from "@/lib/utils"

// Simulação de banco de dados
const rewards: Record<string, Reward[]> = {
  store1: [
    {
      id: "reward1",
      name: "Café Expresso Grátis",
      description: "Um café expresso de qualquer tipo",
      pointsRequired: 50,
      createdAt: new Date("2023-01-20"),
    },
    {
      id: "reward2",
      name: "Desconto de 15%",
      description: "Desconto de 15% em qualquer compra",
      pointsRequired: 100,
      createdAt: new Date("2023-01-25"),
    },
    {
      id: "reward3",
      name: "Bolo Fatia Grátis",
      description: "Uma fatia de bolo à sua escolha",
      pointsRequired: 80,
      createdAt: new Date("2023-02-05"),
    },
  ],
  store2: [
    {
      id: "reward4",
      name: "Pão Francês (6 unidades)",
      description: "Meia dúzia de pães franceses",
      pointsRequired: 60,
      createdAt: new Date("2023-03-25"),
    },
    {
      id: "reward5",
      name: "Desconto de 10%",
      description: "Desconto de 10% em qualquer compra",
      pointsRequired: 80,
      createdAt: new Date("2023-04-10"),
    },
  ],
}

// Funções de serviço
export async function getRewards(storeId: string): Promise<Reward[]> {
  // Simula uma chamada de API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(rewards[storeId] || [])
    }, 500)
  })
}

export async function getRewardById(storeId: string, rewardId: string): Promise<Reward | null> {
  // Simula uma chamada de API
  return new Promise((resolve) => {
    setTimeout(() => {
      const reward = (rewards[storeId] || []).find((r) => r.id === rewardId)
      resolve(reward || null)
    }, 300)
  })
}

export async function createReward(storeId: string, data: Omit<Reward, "id" | "createdAt">): Promise<string> {
  // Simula uma chamada de API
  return new Promise((resolve) => {
    setTimeout(() => {
      const newReward: Reward = {
        id: generateId(),
        ...data,
        createdAt: new Date(),
      }

      if (!rewards[storeId]) {
        rewards[storeId] = []
      }

      rewards[storeId].push(newReward)
      resolve(newReward.id)
    }, 500)
  })
}
