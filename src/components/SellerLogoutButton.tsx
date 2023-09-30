"use client";

import { Button } from "@components/ui/button";
import { useAppStore } from "@utils/store";
import { setCookie } from "cookies-next";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const SellerLogoutButton = () => {
  const { refresh } = useRouter();
  const { setSeller } = useAppStore();

  return (
    <Button
      variant="destructive"
      className="w-full rounded-lg py-1 flex items-center gap-2"
      onClick={() => {
        setCookie("token-seller", "");
        setSeller(null);
        refresh();
      }}
    >
      <LogOut />

      <span>Logout</span>
    </Button>
  );
};

export default SellerLogoutButton;
