import InvalidSession from "@components/InvalidSession";
import { redirect } from "next/navigation";
import React from "react";
import Stripe from "stripe";

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
});

type Props = {
  searchParams: {
    session_id: string;
    isCart: string;
  };
};

const OrderCancelledPage: React.FC<Props> = async ({ searchParams }) => {
  try {
    await stripe.checkout.sessions.listLineItems(searchParams.session_id);
  } catch (error) {
    redirect("/");
  }

  return (
    <div>
      <InvalidSession message="Your order have been cancelled." />
    </div>
  );
};

export default OrderCancelledPage;
