import {
  productCollectionRef,
  sellerCollectionRef,
  userCollectionRef,
} from "@backend/db";
import { addDoc, filterDocs, updateDoc } from "@backend/lib";
import InvalidSession from "@components/InvalidSession";
import { Button } from "@components/ui/button";
import { getUserProfile } from "@utils/get-profile";
import { doc, where } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Stripe from "stripe";
import { Order } from "types/order";

const stripe = new Stripe(process.env.NEXT_STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
});

type Props = {
  searchParams: {
    session_id: string;
    isCart: string;
  };
};

const CheckoutPage: React.FC<Props> = async ({ searchParams }) => {
  const user = await getUserProfile("/auth/login");

  let session: Stripe.Response<Stripe.ApiList<Stripe.LineItem>> | null;

  try {
    session = await stripe.checkout.sessions.listLineItems(
      searchParams.session_id
    );
  } catch (error) {
    session = null;
  }

  if (!session) return <InvalidSession message="Invalid Session ID" />;

  const _items = session.data;

  let totalAmt = 0;

  _items.forEach((e) => {
    totalAmt += e?.amount_subtotal / 100;
  });

  let items: Stripe.Response<Stripe.Product>[] = [];

  for (let i = 0; i < _items.length; i++) {
    let prod = _items[i];
    const pid = prod.price?.product.toString();
    const product = await stripe.products.retrieve(pid!);

    items.push({ ...product });
  }

  const orders = await filterDocs(
    "orders",
    where("session_id", "==", searchParams.session_id)
  );

  const thisOrder = orders[0] as Order;

  if (searchParams?.isCart === "true" && !thisOrder) {
    // const userCart = (await filterDoc("cart", user?.cartId)) as Cart;

    // if (userCart.myCart.length === 0) return;

    const productsBought = items.map(({ metadata }) => ({
      id: doc(productCollectionRef, metadata.id),
      owner: doc(sellerCollectionRef, metadata?.owner),
      qty: parseInt(metadata.qty),
    }));

    const owners = productsBought.map((e) => e.owner);

    await addDoc("orders", {
      session_id: searchParams.session_id,
      user: doc(userCollectionRef, user?.id),
      products: productsBought,
      owners,
      purchasedAt: new Date(),
    });

    for (let i = 0; i < items.length; i++) {
      const prod = items[i];

      await updateDoc("products", prod.metadata.id, {
        quantity:
          parseInt(prod.metadata.quantity) - parseInt(prod.metadata.qty),
      });
    }

    await updateDoc("cart", user?.cartId, {
      myCart: [],
    });
  }

  return (
    <div className="grid gap-4 place-items-center">
      <div className="w-full p-4 border-2 border-green-300 rounded-lg space-y-4">
        <h4 className="text-green-600">
          Thank you, your order has been placed successfully.
        </h4>

        <div className="space-y-2">
          <h6 className="underline">Order Summary</h6>

          {items.map((e) => (
            <div key={e.id} className="flex items-center gap-2">
              <Image
                className="w-20 h-20"
                width={500}
                height={500}
                src={e.images[0]}
                alt={e.name}
              />

              <div>
                <h6>{e.name}</h6>

                <div className="divide-x-2 divide-black space-x-2">
                  <span className="font-medium">
                    Quantity: {e.metadata.qty}
                  </span>

                  <span className="pl-2 font-medium">
                    Price:{" "}
                    {parseInt(e.metadata.price).toLocaleString("en-IN", {
                      maximumFractionDigits: 0,
                      style: "currency",
                      currency: "INR",
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h6 className="text">
          Total Amount:{" "}
          {totalAmt.toLocaleString("en-IN", {
            maximumFractionDigits: 0,
            style: "currency",
            currency: "INR",
          })}
        </h6>
      </div>

      <Button asChild>
        <Link href="/">Continue Shopping</Link>
      </Button>
    </div>
  );
};

export default CheckoutPage;
