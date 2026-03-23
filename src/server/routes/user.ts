import { Stripe } from "stripe";

import { db } from "../db/db";
import { orders, users } from "../db/schema";
import { protectedProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = router({
    getPlan: protectedProcedure.query(async ({ ctx }) => {
        const result = await db.query.users.findFirst({
            where: (users, { eq, and }) => eq(users.id, ctx.session.user.id),
            columns: { plan: true },
        });

        return result?.plan;
    }),

    upgrade: protectedProcedure.mutation(async ({ ctx }) => {
        const stripe = new Stripe(
            "sk_test_51TDhsOBoXrC8fnzwKnIELPpK8NhTf5UyNTbN6gyPKcTOMtzPLpQDrkVhrhM2e8nNPxacdo6Usm9jMzSJYTsozo2Y00fZUasUUc"
        );

        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price: "price_1TDiMIBoXrC8fnzwTq49gSM4",
                    quantity: 1,
                },
            ],
            mode: "subscription",
            success_url: `http://localhost:3000/pay/callback/success`,
            cancel_url: `http://localhost:3000/pay/callback/cancel`,
        });

        if (!session.url) {
            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
            });
        }

        await db.insert(orders).values({
            sessionId: session.id,
            userId: ctx.session.user.id,
            status: "created",
        });

        return {
            url: session.url,
        };

        // await db.update(users).set({
        //     plan: "payed",
        // });
    }),
});
