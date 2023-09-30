import SellerLoginForm from "@modules/seller/auth/SellerLoginForm";
import { getSellerProfile } from "@utils/get-profile";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const SellerLoginPage = async () => {
  const seller = await getSellerProfile();

  if (seller) redirect("/seller");

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="max-w-full w-[800px] h-full grid sm:grid-cols-2">
        <div className="hidden sm:grid text-white rounded-l-md p-8 bg-blue-600 gap-8">
          <div className="grid gap-4">
            <h3 className="font-bold">Login as a Seller</h3>

            <p className="text-lg leading-tight">
              Login to get access to your Orders, Wishlist, and more.
            </p>
          </div>

          <Image
            width={500}
            height={500}
            src="/assets/login-vector.svg"
            alt="Login Image"
          />
        </div>

        <div className="p-8 flex flex-col gap-4 justify-between border border-blue-600 rounded-r-md">
          <SellerLoginForm />

          <Link
            className="underline text-sm"
            href="/seller/auth/register"
            prefetch={true}
          >
            New to SaraKart? Create an seller account
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellerLoginPage;
