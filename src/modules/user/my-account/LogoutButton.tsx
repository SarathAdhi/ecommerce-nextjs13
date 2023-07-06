"use client";

import { Button } from "@components/ui/button";
import { useAppStore } from "@utils/store";
import { setCookie } from "cookies-next";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const LogoutButton = () => {
  const { refresh } = useRouter();
  const { setUser } = useAppStore();

  return (
    <Button
      variant="destructive"
      className="rounded-full"
      onClick={() => {
        setCookie("token-user", "");
        setUser(null);
        refresh();
      }}
    >
      <LogOut />
    </Button>
  );
};

export default LogoutButton;
