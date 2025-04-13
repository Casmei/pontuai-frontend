import type { Store, StoreConfig, StoreStats } from "@/lib/types";
import { generateId } from "@/lib/utils";

// Simulação de banco de dados
const stores: Store[] = [
  {
    id: "store1",
    name: "Café Aroma",
    address: "Rua das Flores, 123",
    phone: "(11) 98765-4321",
    description: "Cafeteria especializada em grãos selecionados",
    customerCount: 42,
    createdAt: new Date("2023-01-15"),
  },
  {
    id: "store2",
    name: "Padaria Sabor",
    address: "Av. Principal, 456",
    phone: "(11) 91234-5678",
    description: "Pães artesanais e doces caseiros",
    customerCount: 78,
    createdAt: new Date("2023-03-22"),
  },
];

const storeConfigs: Record<string, StoreConfig> = {
  store1: {
    pointsPerReal: 1,
    expirationDays: 90,
    minSpendToEarn: 10,
    minPointsToRedeem: 50,
  },
  store2: {
    pointsPerReal: 0.5,
    expirationDays: 60,
    minSpendToEarn: 5,
    minPointsToRedeem: 100,
  },
};

// Funções de serviço
export async function getStores(): Promise<Store[]> {
  // Simula uma chamada de API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(stores);
    }, 500);
  });
}

export async function getStoreById(id: string): Promise<Store | null> {
  // Simula uma chamada de API
  return new Promise((resolve) => {
    setTimeout(() => {
      const store = stores.find((s) => s.id === id);
      resolve(store || null);
    }, 300);
  });
}

export async function createStore(
  data: Omit<Store, "id" | "customerCount" | "createdAt">
): Promise<string> {
  // Simula uma chamada de API
  return new Promise((resolve) => {
    setTimeout(() => {
      const newStore: Store = {
        id: generateId(),
        ...data,
        customerCount: 0,
        createdAt: new Date(),
      };

      stores.push(newStore);

      // Inicializa a configuração padrão
      storeConfigs[newStore.id] = {
        pointsPerReal: 1,
        expirationDays: 90,
        minSpendToEarn: 10,
        minPointsToRedeem: 50,
      };

      resolve(newStore.id);
    }, 800);
  });
}

export async function getStoreConfig(storeId: string): Promise<StoreConfig> {
  // Simula uma chamada de API
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        storeConfigs[storeId] || {
          pointsPerReal: 1,
          expirationDays: 90,
          minSpendToEarn: 10,
          minPointsToRedeem: 50,
        }
      );
    }, 300);
  });
}

export async function updateStoreConfig(
  storeId: string,
  config: StoreConfig
): Promise<void> {
  // Simula uma chamada de API
  return new Promise((resolve) => {
    setTimeout(() => {
      storeConfigs[storeId] = config;
      resolve();
    }, 500);
  });
}

export async function getStoreStats(storeId: string): Promise<StoreStats> {
  console.log(storeId);
  // Simula uma chamada de API
  return new Promise((resolve) => {
    setTimeout(() => {
      // Dados simulados
      resolve({
        totalCustomers: 42,
        newCustomersThisMonth: 5,
        totalSales: 12580.5,
        salesThisMonth: 2340.75,
        totalPointsRedeemed: 3750,
        redeemedThisMonth: 850,
        activePoints: 5280,
        pointsEarnedThisMonth: 1240,
      });
    }, 800);
  });
}
