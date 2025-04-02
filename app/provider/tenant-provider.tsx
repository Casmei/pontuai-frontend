'use client'

import { useEffect } from 'react';
import { useTenantStore } from '../stores/tenant-store';
import { getMyTenants } from '@/action/get-my-tenants';

export function TenantProvider({ children, initialTenants }: {
    children: React.ReactNode;
    initialTenants?: any[];
}) {
    const { setTenants, setCurrentTenant, tenants } = useTenantStore();

    useEffect(() => {
        async function loadTenants() {
            try {
                if (initialTenants) {
                    setTenants(initialTenants);
                    if (initialTenants.length > 0) {
                        setCurrentTenant(initialTenants[0]);
                    }
                    return;
                }

                const tenantsData = await getMyTenants();

                setTenants(tenantsData);
                if (tenantsData.length > 0) {
                    setCurrentTenant(tenantsData[0]);
                }
            } catch (error) {
                console.error('Failed to load tenants:', error);
            }
        }

        if (tenants.length === 0) {
            loadTenants();
        }
    }, [setTenants, setCurrentTenant, tenants.length, initialTenants]);

    return <>{children}</>;
}