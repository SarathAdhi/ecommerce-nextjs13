"use client";

import { Button } from "@components/ui/button";
import getStripe from "@lib/stripe";
import { useAppStore } from "@utils/store";
import { useSearchParams } from "next/navigation";
import React, { useEffect } from "react";
import { Product } from "types/product";

type MyCartItem = Product<Seller> & { qty: number };

const PlaceOrderButton: React.FC<{ cart: MyCartItem[] }> = ({ cart }) => {
  const isForceCheckout = useSearchParams().get("forceCheckout") === "true";

  console.log({ isForceCheckout });

  const { user } = useAppStore();

  const handlePlaceOrder = async () => {
    const stripe = await getStripe();

    const response = await fetch("/api/stripe?isCartItems=true", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart, user }),
    });

    if (response.status === 500) return;

    const data = await response.json();

    console.log("return", data);

    try {
      stripe?.redirectToCheckout({ sessionId: data.session.id });
    } catch (error) {
      console.log("client -> ", error);
    }
  };

  useEffect(() => {
    if (isForceCheckout) handlePlaceOrder();
  }, [isForceCheckout]);

  return <Button onClick={handlePlaceOrder}>Place Order</Button>;
};

export default PlaceOrderButton;
