import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(`${process.env.NEXT_STRIPE_PUBLISHABLE_KEY}`!);
  }

  return stripePromise;
};

export default getStripe;
