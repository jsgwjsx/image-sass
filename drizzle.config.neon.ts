import { defineConfig } from "drizzle-kit";
export default defineConfig({
    schema: "./src/server/db/schema.ts",
    driver: "pg",
    dbCredentials: {
        connectionString:
            "postgresql://images_owner:2fDXoNvk0ZOm@ep-solitary-night-a1uydhpn.ap-southeast-1.aws.neon.tech/images?sslmode=require",
    },
    verbose: true,
    strict: true,
});
