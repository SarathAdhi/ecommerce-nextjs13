"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { FaUser, FaCartPlus, FaProductHunt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Button } from "@components/ui/button";
import SellerLoginModal from "./SellerLoginModal";
import { useAppStore } from "@utils/store";
import { setCookie } from "cookies-next";
import { LogIn, LogOut } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "@utils/cn";

const SellerNavbarActions = ({ isSeller = false }) => {
  const { replace } = useRouter();
  const pathname = usePathname();
  const auth = useSearchParams().get("auth-seller");

  const { seller, setSeller } = useAppStore();

  const [isOpen, setIsOpen] = useState(false);

  const onOpen = (auth = "login") => {
    replace(`?auth-seller=${auth}`);

    setIsOpen(true);
  };

  const onClose = () => {
    replace(pathname);
    setIsOpen(false);
  };

  // This is needed to open the modal. If directly assigned to state, hyddration error is coming
  useEffect(() => {
    if ((!seller && auth === "login") || (!seller && auth === "register"))
      onOpen(auth);
  }, [auth, seller]);

  return (
    <>
      <div
        className={cn(
          "w-full flex justify-between",
          isSeller && "h-full flex-col"
        )}
      >
        <div className="grid gap-2">
          {isSeller && (
            <>
              <Button asChild className="rounded-full">
                <Link href="/seller/dashboard" className="space-x-2">
                  <MdDashboard size={20} />
                  <span>Dashboard</span>
                </Link>
              </Button>

              <Button asChild className="!rounded-full">
                <Link href="/seller/products" className="space-x-2">
                  <FaProductHunt size={20} />
                  <span>My Product</span>
                </Link>
              </Button>

              <Button asChild className="!rounded-full">
                <Link href="/seller/product/add" className="space-x-2">
                  <FaCartPlus size={20} />
                  <span>Add Product</span>
                </Link>
              </Button>
            </>
          )}
        </div>

        {!isSeller && (
          <Button asChild variant="success" className="rounded-full">
            <Link href="?auth-seller=login" className="mr" prefetch={true}>
              <LogIn size={18} />
              Login
            </Link>
          </Button>
        )}

        {isSeller && (
          <div className="grid gap-2">
            <Button asChild className="!rounded-full">
              <Link href="/seller/my-account" className="space-x-2">
                <FaUser />
                <span>Account</span>
              </Link>
            </Button>

            <Button
              variant="destructive"
              className="rounded-full"
              onClick={() => {
                setCookie("token-seller", "");
                setSeller(null);
              }}
            >
              <LogOut />
            </Button>
          </div>
        )}
      </div>

      <SellerLoginModal {...{ isOpen, onClose }} />
    </>
  );
};

export default SellerNavbarActions;
