import { drizzle } from "drizzle-orm/postgres-js";
import { drizzle as drizzleHTTP } from "drizzle-orm/neon-http";
import postgres from "postgres";
import { neon } from "@neondatabase/serverless";

import * as schema from "./schema";

function createDB() {
    const neonDBUrl = process.env.NEON_DB_URL;

    if (neonDBUrl) {
        const client = neon(neonDBUrl);

        return drizzleHTTP(client as any, { schema });
    } else {
        const queryClient = postgres(
            "postgres://postgres:123456@localhost:5431/postgres"
        );

        return drizzle(queryClient, { schema, logger: true });
    }
}

export const db = createDB();
