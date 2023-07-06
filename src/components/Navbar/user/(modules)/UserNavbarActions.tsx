"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { SiShopify } from "react-icons/si";
import { RiLoginBoxLine } from "react-icons/ri";
import { Button } from "@components/ui/button";
import UserLoginModal from "./UserLoginModal";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useAppStore } from "@utils/store";

const UserNavbarActions = ({
  isSeller = false,
  isUser = false,
  cartItemsLength = 0,
}) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const auth = useSearchParams().get("auth");

  const { user } = useAppStore();
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = (auth = "login") => {
    replace(`?auth=${auth}`);

    setIsOpen(true);
  };

  const onClose = () => {
    replace(pathname);
    setIsOpen(false);
  };

  // This is needed to open the modal. If directly assigned to state, hyddration error is coming
  useEffect(() => {
    if ((!user && auth === "login") || (!user && auth === "register"))
      onOpen(auth);
    else onClose();
  }, [auth, user]);

  return (
    <>
      <Button asChild className="rounded-full">
        <Link href="/seller" className="flex items-center">
          <SiShopify />

          {!isSeller && (
            <span className="ml-2 hidden sm:block">Become Seller</span>
          )}
        </Link>
      </Button>

      {!isUser && (
        <>
          <Button asChild variant="success" className="rounded-full">
            <Link href="/?auth=login" className="mr" prefetch={true}>
              <RiLoginBoxLine />
              Login
            </Link>
          </Button>
        </>
      )}

      {isUser && (
        <>
          <Button asChild className="rounded-full">
            <Link href="/my-account">
              <FaUser />
            </Link>
          </Button>

          <Button asChild className="relative rounded-full">
            <Link href="/cart" className="flex items-center gap-1">
              <FaShoppingCart />

              <span className="ml-2 hidden sm:block">Cart</span>

              <span className="grid text-black place-content-center absolute -top-1 -right-1 w-5 h-5 text-sm font-bold rounded-full bg-white">
                {cartItemsLength}
              </span>
            </Link>
          </Button>
        </>
      )}

      <UserLoginModal {...{ isOpen, onClose }} />
    </>
  );
};

export default UserNavbarActions;
