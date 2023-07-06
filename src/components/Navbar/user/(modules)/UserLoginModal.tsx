import Modal from "@components/Modal";
import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import LoginForm from "../(components)/UserLoginForm";
import RegisterForm from "../(components)/UserRegisterForm";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const UserLoginModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const auth = useSearchParams().get("auth");

  const isLoginModal = auth === "login";

  return (
    <Modal open={isOpen} onOpenChange={onClose}>
      <div className="grid sm:grid-cols-2">
        <div className="hidden sm:grid text-white rounded-l-md p-8 bg-blue-600 gap-8">
          <div className="grid gap-4">
            <h3 className="font-bold">{isLoginModal ? "Login" : "Register"}</h3>

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
            <LoginForm {...{ onClose }} />
          ) : (
            <RegisterForm {...{ onClose }} />
          )}

          <Link
            className="underline text-sm"
            href={isLoginModal ? `?auth=register` : `?auth=login`}
            prefetch={true}
          >
            {isLoginModal
              ? "New to SaraKart? Create an account"
              : "Existing User? Login"}
          </Link>
        </div>
      </div>
    </Modal>
  );
};

export default UserLoginModal;
