"use server";

import { RewardControllerCreateRequest } from "@/gen";
import { createReward, getRewards } from "@/lib/services/reward-service";
import { revalidateTag } from "next/cache";

export async function createRewardAction(data: RewardControllerCreateRequest) {
    await createReward(data);
    revalidateTag(getRewards.name)
}
