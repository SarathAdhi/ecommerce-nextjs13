"use client";

import { addDoc, filterDoc, updateDoc } from "@backend/lib";
import { Button } from "@components/ui/button";
import getStripe from "@lib/stripe";
import { useAppStore } from "@utils/store";
import React from "react";
import { Cart } from "types/cart";
import { Product } from "types/product";

type MyCartItem = Product<Seller> & { qty: number };

const PlaceOrderButton: React.FC<{ cart: MyCartItem[] }> = ({ cart }) => {
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

      // if (data?.isCartItems) {
      //   console.log("HELLO CART CLEAR");

      //   const userCart = (await filterDoc("cart", user?.cartId)) as Cart;

      //   await addDoc("orders", {
      //     user: user?.id,
      //     products: userCart.myCart,
      //     purchasedAt: new Date(),
      //   });

      //   await updateDoc("cart", user?.cartId, {
      //     myCart: [],
      //   });
      // }
    } catch (error) {
      console.log("client -> ", error);
    }
  };

  return <Button onClick={handlePlaceOrder}>Place Order</Button>;
};

export default PlaceOrderButton;
