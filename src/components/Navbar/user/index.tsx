import { Button } from "@components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaSearch } from "react-icons/fa";
import UserNavbarActions from "./(modules)/UserNavbarActions";

const UserNavbar = ({
  isSeller = false,
  isUser = false,
  cartItemsLength = 0,
}) => {
  return (
    <header className="sticky top-0 z-50 w-full flex flex-col items-center bg-[#f1f2f4]">
      <div className="container py-2 px-4 flex justify-between gap-2 items-center place-items-end">
        <div>
          <Link className="text-2xl font-bold text-white" href={"/"}>
            <Image
              width={130}
              height={100}
              src="/logo.svg"
              alt="SaraKart Logo"
            />
          </Link>
        </div>

        <div className="flex gap-2">
          <Button className="rounded-full">
            <FaSearch />
          </Button>

          <UserNavbarActions {...{ isSeller, isUser, cartItemsLength }} />
        </div>
      </div>
    </header>
  );
};

export default UserNavbar;
