import { defineConfig } from "prisma/config";
import { config } from "dotenv";

config({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrate: {
    url: process.env.DIRECT_URL || process.env.DATABASE_URL || "",
  },
  datasource: {
    url: process.env.DIRECT_URL || process.env.DATABASE_URL || "",
    directUrl: process.env.DIRECT_URL || "",
  },
});
