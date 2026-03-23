import { defineConfig } from "drizzle-kit";
export default defineConfig({
    schema: "./src/server/db/schema.ts",
    driver: "pg",
    dbCredentials: {
        connectionString:
            "postgresql://neondb_owner:npg_8NFseOV0qpro@ep-rough-haze-a1c5ecfa-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=requireepostgresql://neondb_owner:npg_PJlRfKeG5Ak6@ep-rough-haze-a1c5ecfa-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
    },
    verbose: true,
    strict: true,
});
