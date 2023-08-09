"use client";

import { productCollectionRef } from "@backend/db";
import { updateDoc } from "@backend/lib";
import { Button } from "@components/ui/button";
import { arrayRemove, doc } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { toast } from "react-hot-toast";

const RemoveProductButton = ({ cartId = "", id = "", qty = 0 }) => {
  const { refresh } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function removeMyProduct(e: FormEvent) {
    e.preventDefault();
    setIsLoading(true);

    const productRef = doc(productCollectionRef, id);

    await updateDoc("cart", cartId, {
      myCart: arrayRemove({ id: productRef, qty }),
    });

    toast.success("Product removed from cart");
    refresh();

    setIsLoading(false);
  }

  return (
    <Button onClick={removeMyProduct} variant="destructive">
      {isLoading ? <Loader2 className="animate-spin" /> : "Remove"}
    </Button>
  );
};

export default RemoveProductButton;
