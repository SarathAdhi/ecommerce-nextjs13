"use client";

import Modal from "@components/Modal";
import React from "react";
import { useSearchParams } from "next/navigation";
import SellerLoginForm from "../(components)/SellerLoginForm";
import SellerRegisterForm from "../(components)/SellerRegisterForm";
import Link from "next/link";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const SellerLoginModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const auth = useSearchParams().get("auth-seller");

  const isLoginModal = auth === "login";

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <div className="grid sm:grid-cols-2">
        <div className="hidden sm:grid text-white rounded-l-md p-8 bg-blue-600 gap-8">
          <div className="grid gap-4">
            <h3 className="font-bold">
              {isLoginModal ? "Login as a Seller" : "Register as a Seller"}
            </h3>

            <p className="text-lg leading-tight">
              {isLoginModal
                ? "Login to get access to your Orders, Wishlist, and more."
                : "Looks like you're new here! Register to get started."}
            </p>
          </div>

          <img src="/assets/login-vector.svg" />
        </div>

        <div className="p-8 flex flex-col gap-4 justify-between">
          {isLoginModal ? (
            <SellerLoginForm {...{ onClose }} />
          ) : (
            <SellerRegisterForm {...{ onClose }} />
          )}

          <Link
            className="underline"
            href={
              isLoginModal
                ? `/seller?auth-seller=register`
                : `/seller?auth-seller=login`
            }
            prefetch={true}
          >
            {isLoginModal
              ? "New to SaraKart? Create an seller account"
              : "Existing Seller? Login"}
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default SellerLoginModal;
