import env from "@/config/env";

export const logtoConfig = {
  endpoint: env.LOGTO_ENDPOINT,
  appId: env.LOGTO_APP_ID,
  appSecret: env.LOGTO_APP_SECRET,
  baseUrl: env.LOGTO_BASE_URL, // Change to your own base URL
  cookieSecret: env.LOGTO_COOKIE_SECRET, // Auto-generated 32 digit secret
  cookieSecure: env.NODE_ENV === "production",
};
