"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import React, { useEffect, useState } from "react";

const BetaVersionDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const isRead = localStorage.getItem("beta-update") === "true";
    setIsOpen(isRead ? false : true);
  }, []);

  return (
    <div>
      <Dialog
        open={isOpen}
        onOpenChange={(e) => {
          setIsOpen(e);
          localStorage.setItem("beta-update", "true");
        }}
      >
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader className="space-y-4">
            <DialogTitle>Exciting Beta Launch Alert</DialogTitle>

            <DialogDescription>
              {
                "🚀 Get ready for a sneak peek into the future of online shopping (my personal project)! I'm thrilled to introduce the beta version, offering you an exclusive opportunity to explore a cutting-edge ecommerce experience like never before."
              }
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default BetaVersionDialog;
