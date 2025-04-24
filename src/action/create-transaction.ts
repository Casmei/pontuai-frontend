"use server";

import { TransactionControllerCreateRequest } from "@/gen";
import { getCustomers } from "@/lib/services/customer-service";
import { createTransaction } from "@/lib/services/transaction-service";
import { revalidateTag } from "next/cache";

export async function createTransactionAction(data: TransactionControllerCreateRequest) {
    await createTransaction(data);
    // revalidateTag(getTransactions.name)
    revalidateTag(getCustomers.name)
}
