import { cleanEnv, str } from "envalid";

const env = cleanEnv(process.env, {
  LOGTO_ENDPOINT: str({ desc: "Base endpoint of logto auth provider" }),
  LOGTO_APP_ID: str({ desc: "App Id of logto auth provider" }),
  LOGTO_APP_SECRET: str({ desc: "App Secret of logto auth provider" }),
  LOGTO_BASE_URL: str({ desc: "Base endpoint of logto auth provider" }),
  LOGTO_COOKIE_SECRET: str({ desc: "Cookie secret of logto auth provider" }),
  NODE_ENV: str({
    desc: "The environment the application is running in.",
    choices: ["development", "production", "test"],
    default: "development",
  }),
});

export default env;
