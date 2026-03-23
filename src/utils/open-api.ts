import { httpBatchLink, createTRPCClient } from "@trpc/client";
import { type OpenRouter } from "@/server/open-router";

export const apiClient = createTRPCClient<OpenRouter>({
    links: [
        httpBatchLink({
            url: "/api/trpc",
        }),
    ],
});

export { OpenRouter };
