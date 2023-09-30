"use client";

import { productCollectionRef } from "@backend/db";
import { updateDoc } from "@backend/lib";
import { Button } from "@components/ui/button";
import { useAppStore } from "@utils/store";
import { arrayUnion, doc } from "firebase/firestore";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { AiTwotoneThunderbolt } from "react-icons/ai";
import { FaCartPlus } from "react-icons/fa";
import { Product } from "types/product";

type Props = {
  images: Product["images"];
  productId: string;
  isAddedToCart: boolean;
};

const ImageViewer: React.FC<Props> = ({ images, productId, isAddedToCart }) => {
  const { refresh, push } = useRouter();

  const { user } = useAppStore();

  const [activeImage, setActiveImage] = useState("");
  const [isCartBtnLoading, setIsCartBtnLoading] = useState(false);
  const [isBuyBtnLoading, setIsBuyBtnLoading] = useState(false);

  async function addToCart() {
    setIsCartBtnLoading(true);

    const productRef = doc(productCollectionRef, productId);

    await updateDoc("cart", user?.cartId!, {
      myCart: arrayUnion({ id: productRef, qty: 1 }),
    });

    refresh();

    toast.success("Added to cart");
    setIsCartBtnLoading(false);
  }

  async function handleBuyProduct() {
    setIsBuyBtnLoading(true);

    const productRef = doc(productCollectionRef, productId);

    await updateDoc("cart", user?.cartId!, {
      myCart: arrayUnion({ id: productRef, qty: 1 }),
    });

    refresh();

    push("/cart?forceCheckout=true");
    setIsBuyBtnLoading(false);
  }

  return (
    <div className="w-full md:col-span-4 lg:col-span-3 md:sticky md:top-[74px] self-start flex flex-col gap-4">
      <div className="grid gap-4">
        <div className="flex overflow-x-auto">
          {images.map((img) => (
            <div
              key={img.name}
              onMouseOver={() => {
                if (activeImage !== img.url) setActiveImage(img.url);
              }}
              className="w-20 h-20 border p-1 flex-shrink-0"
            >
              <Image
                width={500}
                height={500}
                src={img.url}
                className="w-full h-full object-fill"
                alt="Product Image"
              />
            </div>
          ))}
        </div>

        <div className="border p-1 rounded-md">
          <Image
            width={1000}
            height={1000}
            className="w-full"
            src={activeImage || images[0].url}
            alt="Product Image"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4">
          <Button
            variant="secondary"
            onClick={addToCart}
            className="uppercase mr"
            disabled={isAddedToCart}
          >
            {isCartBtnLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                {!isAddedToCart && (
                  <FaCartPlus className="flex-shrink-0" size={16} />
                )}

                <span>{isAddedToCart ? "Added" : "Add"} to Cart</span>
              </>
            )}
          </Button>

          <Button onClick={handleBuyProduct} className="uppercase mr">
            {isBuyBtnLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <AiTwotoneThunderbolt className="flex-shrink-0" size={16} />

                <span>Buy now</span>
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
