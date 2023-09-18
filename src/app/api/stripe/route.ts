import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { Product } from "types/product";

// const stripe = require("stripe")(process.env.NEXT_STRIPE_SECRET_KEY);

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
});

type MyCartItem = Product<Seller> & { qty: number };

export async function POST(req: NextRequest) {
  const url = new URL(req.url);
  const searchParams = new URLSearchParams(url.search);
  const isCartItems = searchParams.get("isCartItems");

  const body = (await req.json()) as {
    cart: MyCartItem[];
    user: User;
  };

  console.log(isCartItems);

  const cartItems = body.cart;
  const user = body.user;

  // const paymentIntent = await stripe.paymentIntents.retrieve(
  //   "pi_3Nlmz4SAMGG8StSz0pQUIbCC"
  // );

  try {
    const params: Stripe.Checkout.SessionCreateParams = {
      submit_type: "pay",
      mode: "payment",
      payment_method_types: ["card"],
      billing_address_collection: "auto",
      shipping_options: [{ shipping_rate: "shr_1NpRehSAMGG8StSzsQueXIq0" }],
      line_items: cartItems.map((item) => {
        const images = item.images.map((e) => e.url);

        const discountPrice = item.price - item.price * (item.discount / 100);
        const {
          images: _i,
          owner,
          reviewId,
          description,
          reviews,
          pname,
          imagePath,
          ...rest
        } = item;

        return {
          price_data: {
            currency: "INR",
            product_data: {
              name: item.pname,
              images,
              description: item.description,
              metadata: {
                ...rest,
                owner: owner.id,
              },
            },
            unit_amount: discountPrice * 100,
          },
          quantity: item.qty,
        };
      }),
      customer_email: user.email,
      phone_number_collection: {
        enabled: true,
      },
      success_url: `${req.headers.get(
        "origin"
      )}/checkout/success?session_id={CHECKOUT_SESSION_ID}&isCart=${
        isCartItems || "false"
      }`,
      cancel_url: `${req.headers.get(
        "origin"
      )}/checkout/cancelled?session_id={CHECKOUT_SESSION_ID}`,
    };

    const session = await stripe.checkout.sessions.create(params);

    return NextResponse.json({ session, isCartItems });
  } catch (err) {
    console.log({ err });
    return NextResponse.json(err);
  }
}
