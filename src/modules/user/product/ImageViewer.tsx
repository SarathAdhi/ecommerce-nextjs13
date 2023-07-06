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
};

const ImageViewer: React.FC<Props> = ({ images, productId }) => {
  const { refresh } = useRouter();

  const { user } = useAppStore();

  const [activeImage, setActiveImage] = useState("");
  const [isAddToCartLoading, setIsAddToCartLoading] = useState(false);

  async function addToCart() {
    setIsAddToCartLoading(true);

    const productRef = doc(productCollectionRef, productId);

    await updateDoc("cart", user?.cartId!, {
      myCart: arrayUnion(productRef),
    });

    toast.success("Added to cart");
    setIsAddToCartLoading(false);

    refresh();
  }

  return (
    <div className="col-span-3 sticky top-[74px] self-start flex flex-col gap-4">
      <div className="flex flex-col gap-4">
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

        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="secondary"
            onClick={addToCart}
            className="uppercase mr"
          >
            {isAddToCartLoading ? (
              <Loader2 className="animate-spin" />
            ) : (
              <>
                <FaCartPlus size={16} />

                <span>Add to Cart</span>
              </>
            )}
          </Button>

          <Button className="uppercase mr">
            <AiTwotoneThunderbolt size={16} />

            <span>Buy now</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
