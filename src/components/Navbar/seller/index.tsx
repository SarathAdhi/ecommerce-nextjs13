import Image from "next/image";
import Link from "next/link";
import React from "react";
import SellerNavbarActions from "./(modules)/SellerNavbarActions";
import { cn } from "@utils/cn";

const SellerNavbar = ({ isSeller = false }) => {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex items-center bg-[#f1f2f4]",
        isSeller ? "w-44 h-screen flex-shrink-0 flex-col " : "w-full"
      )}
    >
      <div
        className={cn(
          "container h-full p-4 flex items-center",
          isSeller ? "flex-col gap-8" : ""
        )}
      >
        <Link className="text-2xl font-bold" href={"/seller"}>
          <Image
            width={130}
            height={100}
            src="/logo-seller.svg"
            alt="SaraKart Logo"
          />
        </Link>

        <SellerNavbarActions isSeller={isSeller} />
      </div>
    </header>
  );
};

export default SellerNavbar;
