import SellerRegisterForm from "@modules/seller/auth/SellerRegisterForm";
import { getSellerProfile } from "@utils/get-profile";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const SellerRegisterPage = async () => {
  const seller = await getSellerProfile();

  if (seller) redirect("/");

  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="max-w-full w-[800px] h-full grid sm:grid-cols-2">
        <div className="hidden sm:grid text-white rounded-l-md p-8 bg-blue-600 gap-8">
          <div className="grid gap-4">
            <h3 className="font-bold">Register</h3>

            <p className="text-lg leading-tight">
              {"Looks like you're new here! Register to get started."}
            </p>
          </div>

          <Image
            width={500}
            height={500}
            src="/assets/login-vector.svg"
            alt="Register Image"
          />
        </div>

        <div className="p-8 flex flex-col gap-4 justify-between border border-blue-600 rounded-r-md">
          <SellerRegisterForm />

          <Link
            className="underline text-sm"
            href="/seller/auth/login"
            prefetch={true}
          >
            Existing Seller? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellerRegisterPage;
