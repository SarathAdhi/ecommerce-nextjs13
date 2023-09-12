import UserRegisterForm from "@modules/user/auth/UserRegisterForm";
import { getUserProfile } from "@utils/get-profile";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

const UserRegisterPage = async () => {
  const user = await getUserProfile();

  if (user) redirect("/");

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
          <UserRegisterForm />

          <Link
            className="underline text-sm"
            href="/auth/login"
            prefetch={true}
          >
            Existing User? Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UserRegisterPage;
