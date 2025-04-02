import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Tenant {
    id: string;
    name: string;
    slug: string;
    CNPJ: string;
}

interface TenantStore {
    currentTenant: Tenant | null;
    tenants: Tenant[];
    setCurrentTenant: (tenant: Tenant) => void;
    setTenants: (tenants: Tenant[]) => void;
    clear: () => void;
}

export const useTenantStore = create<TenantStore>()(
    persist(
        (set) => ({
            currentTenant: null,
            tenants: [],
            setCurrentTenant: (tenant) => set({ currentTenant: tenant }),
            setTenants: (tenants) => set({ tenants }),
            clear: () => set({ currentTenant: null, tenants: [] }),
        }),
        {
            name: 'tenant-storage',
        }
    )
);