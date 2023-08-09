"use client";

import { useAppStore } from "@utils/store";
import React, { useEffect } from "react";
import NextTopLoader from "nextjs-toploader";
import { MyCart } from "types/cart";

type Props = {
  children?: React.ReactNode;
  user: User | null;
  seller: Seller | null;
  myCart: MyCart<string>[] | null;
};

const ReduxProvider: React.FC<Props> = ({ children, user, seller, myCart }) => {
  const { setUser, setSeller, setMyCart } = useAppStore();

  useEffect(() => {
    setUser(user);
    setSeller(seller);
    if (myCart) setMyCart(myCart);
  }, []);

  return (
    <>
      <NextTopLoader showSpinner={false} />
      {children}
    </>
  );
};

export default ReduxProvider;
