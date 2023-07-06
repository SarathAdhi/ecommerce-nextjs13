"use client";

import { useAppStore } from "@utils/store";
import React, { useEffect } from "react";
import NextTopLoader from "nextjs-toploader";

type Props = {
  children?: React.ReactNode;
  user: User | null;
  seller: Seller | null;
};

const ReduxProvider: React.FC<Props> = ({ children, user, seller }) => {
  const { setUser, setSeller } = useAppStore();

  useEffect(() => {
    setUser(user);
    setSeller(seller);
  }, []);

  console.log({ user, seller });

  return (
    <>
      <NextTopLoader showSpinner={false} />
      {children}
    </>
  );
};

export default ReduxProvider;
