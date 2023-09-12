import React from "react";
import { Product } from "types/product";
import Link from "next/link";
import { roundOff } from "@utils/round-off";
import Image from "next/image";
import RemoveProductButton from "./RemoveProductButton";
import ProductCounter from "./ProductCounter";

const CartProductCard: React.FC<
  Product<Seller> & { cartId: string; qty: number }
> = ({ id, pname, price, uuid, images, discount, cartId, owner, qty }) => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-md shadow-lg">
      <div className="flex items-start gap-8">
        <Image
          src={images[0].url}
          width={1000}
          height={1000}
          className="w-52 rounded-md object-contain"
          draggable={false}
          priority={true}
          alt={images[0].name}
        />

        <div className="grid gap-2">
          <div>
            <Link href={`/${uuid}`} className="hover:underline">
              <h4>{pname}</h4>
            </Link>

            <p className="font-medium italic">Seller: {owner.companyName}</p>
          </div>

          <div>
            <p className="!text-base font-semibold text-green-700">
              Extra {roundOff(price * (discount / 100))} off
            </p>

            <p>
              <span className="text-2xl font-semibold">
                {roundOff(price - price * (discount / 100))}
              </span>

              <span className="ml-2 !text-base">
                <span className="text-gray-400 font-normal line-through mr-2">
                  ₹{roundOff(price)}
                </span>

                <span className="text-green-700">{discount}% off</span>
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <ProductCounter {...{ qty, id }} />

        <RemoveProductButton {...{ cartId, id, qty }} />
      </div>
    </div>
  );
};

export default CartProductCard;
