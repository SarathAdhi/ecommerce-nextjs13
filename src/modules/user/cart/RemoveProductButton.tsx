"use client";

import { productCollectionRef } from "@backend/db";
import { updateDoc } from "@backend/lib";
import { Button } from "@components/ui/button";
import { arrayRemove, doc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import React, { FormEvent } from "react";
import { toast } from "react-hot-toast";

const RemoveProductButton = ({ cartId = "", id = "" }) => {
  const { refresh } = useRouter();

  async function removeMyProduct(e: FormEvent) {
    e.preventDefault();

    const productRef = doc(productCollectionRef, id);

    await updateDoc("cart", cartId, {
      myCart: arrayRemove(productRef),
    });

    refresh();
    toast.success("Product removed from cart");
  }

  return (
    <Button onClick={removeMyProduct} variant="destructive">
      Remove
    </Button>
  );
};

export default RemoveProductButton;
