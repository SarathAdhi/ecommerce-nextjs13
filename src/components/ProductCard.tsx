import React from "react";
import { Product } from "types/product";
import Link from "next/link";
import { roundOff } from "@utils/round-off";
import { Carousel } from "./Carousel";
import { Button } from "./ui/button";
import Image from "next/image";

const CardWrapper: React.FC<
  Component & { isDisplay: boolean; uuid: string }
> = ({ isDisplay, uuid, children }) =>
  isDisplay ? (
    <Link
      href={`/${uuid}`}
      className="flex flex-col gap-4 p-4 bg-white rounded-md shadow-lg"
    >
      {children}
    </Link>
  ) : (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-md shadow-lg">
      {children}
    </div>
  );

const ProductCard: React.FC<
  Product & { isDisplay?: boolean; ActionButtons?: React.ReactNode }
> = ({
  pname,
  price,
  uuid,
  images,
  discount,
  isDisplay = false,
  ActionButtons,
}) => {
  return (
    <CardWrapper isDisplay={isDisplay} uuid={uuid}>
      <div>
        {isDisplay ? (
          <Image
            width={1000}
            height={1000}
            src={images[0].url}
            className="w-full h-60 rounded-md object-cover"
            alt="Product image"
          />
        ) : (
          <Carousel>
            {images.map((image, key) => (
              <Image
                key={key}
                src={image.url}
                width={1000}
                height={1000}
                className="mx-auto aspect-[2/1] object-contain"
                draggable={false}
                priority={true}
                alt={image.name}
              />
            ))}
          </Carousel>
        )}

        <div className="mt-2 grid gap-2">
          <h4>{pname}</h4>

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
                  ₹{price}
                </span>

                <span className="text-green-700">{discount}% off</span>
              </span>
            </p>
          </div>
        </div>
      </div>

      {!isDisplay && (
        <div>
          <Button asChild>
            <Link href={`/seller/product/${uuid}`}>Edit</Link>
          </Button>
        </div>
      )}

      {ActionButtons && ActionButtons}
    </CardWrapper>
  );
};

export default ProductCard;
