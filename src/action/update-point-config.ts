"use server";

import { TenantControllerUpdateConfigRequest } from "@/gen";
import { updateStoreConfig } from "@/lib/services/store-service";

export async function updatePointConfig(data: TenantControllerUpdateConfigRequest) {
    await updateStoreConfig(data);
}
