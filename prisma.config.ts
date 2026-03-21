import { defineConfig, env } from "prisma/config";
import { config } from "dotenv";

// Load .env.local for local dev; Vercel sets env vars natively
config({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
