import { LogtoNextConfig } from "@logto/next";

export const logtoConfig: LogtoNextConfig = {
  endpoint: "https://0zyxhw.logto.app/",
  appId: "8bwfog7qb518g3hhcj6wl",
  appSecret: "Fm1US7jfCVGmxczXQpwu6EzgUrlwVYXt",
  baseUrl: "http://localhost:3000", // Change to your own base URL
  cookieSecret: "WD475D6bo2JMmvFApXf2GANt9sbY5ovb", // Auto-generated 32 digit secret
  cookieSecure: process.env.NODE_ENV === "production",
  resources: ["https://pontuai-api.kontact.com.br"],
};
