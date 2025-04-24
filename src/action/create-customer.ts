"use server";

import { CustomerControllerCreateRequest } from "@/gen";
import { createCustomer, getCustomers } from "@/lib/services/customer-service";
import { revalidateTag } from "next/cache";

export async function createCustomerAction(data: CustomerControllerCreateRequest) {
    await createCustomer(data);
    revalidateTag(getCustomers.name)
}
