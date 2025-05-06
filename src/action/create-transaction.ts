"use server";

import { TransactionControllerCreateRequest } from "@/gen";
import { getCustomers } from "@/lib/services/customer-service";
import { createTransaction } from "@/lib/services/transaction-service";
import { revalidateTag } from "next/cache";

export async function createTransactionAction(data: TransactionControllerCreateRequest) {
    const [error] = await createTransaction(data);

    if (error) {
        return [{ message: error.message }, null] as const;
    }

    revalidateTag(getCustomers.name);
    return [null, null] as const;
}
