import { db } from "@/server/db/db";
import { orders, users } from "@/server/db/schema";
import { NextRequest } from "next/server";
import Stripe from "stripe";

 const stripe = new Stripe(
            "sk_test_51TDhsOBoXrC8fnzwKnIELPpK8NhTf5UyNTbN6gyPKcTOMtzPLpQDrkVhrhM2e8nNPxacdo6Usm9jMzSJYTsozo2Y00fZUasUUc"
 );


export async function POST(request: NextRequest) {
    const payload = await request.text();
    const sig = request.headers.get("stripe-signature");

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            payload,
            sig ?? "",
            "whsec_601625afa7b94df5361a3f8d0988779fa911d16ad7f7b0dad7cdb0387ffa978b"
        );
    } catch (err) {
        console.error(err);
        return new Response("", {
            status: 400,
        });
    }

    if (event.type === "checkout.session.completed") {
        // Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
            event.data.object.id,
            {
                expand: ["line_items"],
            }
        );
        // const lineItems = sessionWithLineItems.line_items;

        const order = await db.query.orders.findFirst({
            where: (orders, { eq }) =>
                eq(orders.sessionId, (event.data.object as any).id),
        });

        if (!order || order.status !== "created") {
            return new Response("", {
                status: 400,
            });
        }

        await db.update(orders).set({
            status: "completed",
        });

        await db.update(users).set({
            plan: "payed",
        });
    }

    return new Response("", {
        status: 200,
    });
}
