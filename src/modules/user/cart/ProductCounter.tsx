"use client";

import { productCollectionRef } from "@backend/db";
import { filterDoc, updateDoc } from "@backend/lib";
import { Select } from "@components/ui/select";
import { useAppStore } from "@utils/store";
import { DocumentData, DocumentReference, doc } from "firebase/firestore";
import { MinusCircle, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Cart, MyCart } from "types/cart";

const ProductCounter = ({ qty = 1, id = "" }) => {
  const { refresh } = useRouter();
  const { user } = useAppStore();

  const [count, setCount] = useState(qty);

  let cartProducts: MyCart[] = [];

  async function updateProductQuantity(cnt: number) {
    const { myCart: _myCart } = (await filterDoc("cart", user?.cartId!)) as {
      id: string;
    } & Cart<DocumentReference<DocumentData>>;

    let myCart = _myCart.map((e) => ({ id: e.id.id, qty: e.qty }));

    for (let i = 0; i < myCart.length; i++) {
      const item = myCart[i];

      console.log({ item });

      if (item.id === id) {
        const productRef = doc(productCollectionRef, id);
        cartProducts.push({ id: productRef, qty: cnt });
      } else {
        const productRef = doc(productCollectionRef, item.id);
        cartProducts.push({ id: productRef, qty: item.qty });
      }
    }

    await updateDoc("cart", user?.cartId!, {
      myCart: cartProducts,
    });

    refresh();

    setCount(cnt);
  }

  const increment = async () => {
    if (!(count < 10)) return;

    cartProducts = [];

    const cnt = count < 10 ? count + 1 : count;

    updateProductQuantity(cnt);
  };
  const decrement = async () => {
    if (!(count > 1)) return;

    cartProducts = [];

    const cnt = count > 1 ? count - 1 : count;

    updateProductQuantity(cnt);
  };

  return (
    <div className="flex items-center justify-between gap-2">
      <button onClick={decrement} disabled={!(count > 1)}>
        <MinusCircle color={!(count > 1) ? "#7c7c7c" : "black"} />
      </button>

      <Select
        items={[...Array(10)]
          .map((e, i) => i + 1)
          .map((e) => ({ label: `${e}`, value: e }))}
        placeholder={`${count}`}
        className="w-10 h-8 text-center flex items-center justify-center focus:ring-0"
        hideArrow
        onValueChange={(e) => updateProductQuantity(parseInt(e))}
      />

      <button onClick={increment} disabled={!(count < 10)}>
        <PlusCircle color={!(count < 10) ? "#7c7c7c" : "black"} />
      </button>
    </div>
  );
};

export default ProductCounter;
