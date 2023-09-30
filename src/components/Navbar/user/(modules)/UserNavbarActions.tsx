import Link from "next/link";
import React from "react";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { SiShopify } from "react-icons/si";
import { RiLoginBoxLine } from "react-icons/ri";
import { Button } from "@components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import LogoutButton from "@components/UserLogoutButton";

const UserNavbarActions = ({
  isSeller = false,
  isUser = false,
  cartItemsLength = 0,
}) => {
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
            <Link href="/auth/login" className="mr" prefetch={true}>
              <RiLoginBoxLine />
              Login
            </Link>
          </Button>
        </>
      )}

      {isUser && (
        <>
          <Popover>
            <PopoverTrigger asChild>
              <Button className="rounded-full">
                {/* <Link href="/my-account"> */}
                <FaUser />
                {/* </Link> */}
              </Button>
            </PopoverTrigger>

            <PopoverContent className="p-2 w-48 space-y-2">
              <Link
                className="p-2 hover:bg-gray-200 rounded-lg duration-200 flex items-center gap-2 font-semibold"
                href="/my-account"
              >
                <FaUser />
                My Profile
              </Link>

              <hr />

              <LogoutButton />
            </PopoverContent>
          </Popover>

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
    </>
  );
};

export default UserNavbarActions;
