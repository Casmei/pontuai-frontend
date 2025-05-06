import { logtoConfig } from "@/config/logto";
import { Configuration, TenantApi, TenantControllerCreateRequest, TenantControllerUpdateConfigRequest } from "@/gen";
import { getAccessTokenRSC } from "@logto/next/server-actions";


const API_URL = process.env.API_URL;
const apiClient = new TenantApi(
  new Configuration({
    basePath: API_URL,
    accessToken: async () => {
      return await getAccessTokenRSC(logtoConfig, logtoConfig.resources![0])
    },
  })
);

export const getStores = async () => {
  try {
    const response = await apiClient.tenantControllerGetMyTenants();
    return [null, response] as const;
  } catch (e) {
    console.error(e);
    return [new Error("Falha ao buscar lojas"), null] as const;
  }
};

export const getStoreById = async (id: string) => {
  const [error, response] = await getStores();
  if (error) {
    return [error, null] as const;
  }
  const store = response?.find((store) => store.id === id);
  if (!store) {
    return [new Error("Loja não encontrada"), null] as const;
  }
  return [null, store!] as const;
}

export const createStore = async (data: TenantControllerCreateRequest) => {
  try {
    const response = await apiClient.tenantControllerCreate(data);
    return [null, response] as const;
  } catch (e) {
    console.error(e);
    return [new Error("Falha ao criar loja"), null] as const;
  }
}

export async function updateStoreConfig(data: TenantControllerUpdateConfigRequest) {
  try {
    const response = await apiClient.tenantControllerUpdateConfig(data);
    return [null, response] as const;
  } catch (e) {
    console.error(e);
    return [new Error("Falha ao atualizar configurações da loja"), null] as const;
  }
}

export async function getStoreStats(storeId: string) {
  console.log("Fetching store stats for storeId:", storeId);
  return new Promise((resolve) => {
    setTimeout(() => {
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
