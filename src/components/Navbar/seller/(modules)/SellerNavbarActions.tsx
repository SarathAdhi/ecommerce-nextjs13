import Link from "next/link";
import React from "react";
import { FaUser, FaCartPlus, FaProductHunt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { Button } from "@components/ui/button";
import { LogIn } from "lucide-react";
import { cn } from "@utils/cn";
import SellerLogoutButton from "@components/SellerLogoutButton";

const SellerNavbarActions = ({ isSeller = false }) => {
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
            <Link href="/seller/auth/login" className="mr" prefetch={true}>
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

            <SellerLogoutButton />
          </div>
        )}
      </div>
    </>
  );
};

export default SellerNavbarActions;
