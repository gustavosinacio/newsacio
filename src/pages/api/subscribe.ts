import { query as q } from "faunadb";
import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";

import { fauna } from "../../services/fauna";
import { stripe } from "../../services/stripe";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405);
    res.end("Method not allowed");
    return;
  }

  const {
    user: { email },
  } = await getSession({ req });

  const user = await fauna.query<FaunaUser>(
    q.Get(q.Match(q.Index("user_by_email"), q.Casefold(email)))
  );

  let {
    data: { stripe_customer_id },
  } = user;

  if (!stripe_customer_id) {
    const stripeCustomer = await stripe.customers.create({
      email,
    });

    await fauna.query(
      q.Update(q.Ref(q.Collection("users"), user.ref.id), {
        data: {
          stripe_customer_id: stripeCustomer.id,
        },
      })
    );

    stripe_customer_id = stripeCustomer.id;
  }

  const stripeCheckoutSession = await stripe.checkout.sessions.create({
    customer: stripe_customer_id,
    payment_method_types: ["card"],
    billing_address_collection: "auto",
    line_items: [{ price: process.env.SUBSCRIPTION_PRODUCT_KEY, quantity: 1 }],
    mode: "subscription",
    allow_promotion_codes: true,
    success_url: process.env.STRIPE_CHECKOUT_SUCCESS_URL,
    cancel_url: process.env.STRIPE_CHECKOUT_CANCEL_URL,
  });

  return res.status(200).json({ sessionId: stripeCheckoutSession.id });
};
