"use server";

import { TenantControllerUpdateConfigRequest } from "@/gen";
import { updateStoreConfig } from "@/lib/services/store-service";

export async function updatePointConfigAction(
    data: TenantControllerUpdateConfigRequest
): Promise<[Error | null, null]> {
    const [error, _] = await updateStoreConfig(data);

    if (error) {
        return [error, _];
    }

    return [null, null];
}
