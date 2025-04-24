"use server";

import { RewardControllerRedeemRequest, TransactionControllerCreateRequest } from "@/gen";
import { getCustomers } from "@/lib/services/customer-service";
import { redeemReward } from "@/lib/services/reward-service";
// import { getTransactions } from "@/lib/services/transaction-service";
import { revalidateTag } from "next/cache";

export async function redeemRewardAction(data: RewardControllerRedeemRequest) {
    await redeemReward(data);
    // revalidateTag(getTransactions.name)
    revalidateTag(getCustomers.name)
}
