import { Button } from "@components/ui/button";
import { getSellerProfile } from "@utils/get-profile";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

const SellerPage = async () => {
  const seller = await getSellerProfile();

  return (
    <div className="flex flex-col items-center gap-10">
      <div className="bg-white rounded-md">
        {seller ? (
          <Button asChild>
            <Link href="/seller/dashboard" className="mr">
              <AiOutlineArrowRight />
              Go to Dashboard
            </Link>
          </Button>
        ) : (
          <div className="flex flex-col justify-center items-center">
            <h1 className="font-bold text-center">
              Become a seller on SaraKart
            </h1>

            <Button asChild className="mt-4 text-xl">
              <Link href="/seller?auth-seller=register" className="ml">
                Start Selling
                <AiOutlineArrowRight />
              </Link>
            </Button>

            <Image
              width={1000}
              height={1000}
              className="mt-8 max-w-full w-[450px] max-h-full h-[450px]"
              src="/assets/seller-hero.png"
              alt="Seller"
            />
          </div>
        )}
      </div>

      <div className="sm:w-[90%] flex flex-col items-center gap-10">
        <div className="flex justify-center ">
          <div className="flex flex-col gap-2 items-center text-center">
            <h3 className="font-bold">SELL ONLINE ON SARAKART</h3>
            <p className="text-base font-medium text-gray-700">
              Businesses have the ideal opportunity with SaraKart Seller Hub to
              carry out a large portion of their operations online. Unlike
              traditional marketing, businesses can now promote their goods to a
              wider audience by doing so outside of their normal operating area.
              You can use our services to have access to a number of tools that
              will help you run your business more effectively. Consequently, if
              you want to sell something online, you have come to the right
              place.
            </p>
          </div>
        </div>

        <div className="grid sm:gap-4">
          <h2 className="font-bold text-center">Why sell on SaraKart?</h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-8 bg-white rounded-md flex flex-col items-center gap-2 hover:shadow-lg duration-200">
              <Image
                width={80}
                height={80}
                src="/assets/growth.svg"
                alt="Growth"
              />

              <h4 className="mt-4 font-extrabold text-center">Growth</h4>
              <p className="text-base font-medium text-gray-700 text-center">
                {
                  "With the help of account managers, you may increase your online business's growth."
                }
              </p>
            </div>

            <div className="p-8 bg-white rounded-md flex flex-col items-center  gap-2 hover:shadow-lg duration-200">
              <Image
                width={80}
                height={80}
                src="/assets/lcdb.svg"
                alt="Lowest cost of doing business"
              />

              <h4 className="mt-4 font-extrabold text-center">
                Lowest cost of doing business
              </h4>
              <p className="text-base font-medium text-gray-700 text-center">
                {
                  "You also receive trustworthy and timely payments in addition to the industry's most competitive rate card."
                }
              </p>
            </div>

            <div className="p-8 bg-white rounded-md flex flex-col items-center  gap-2 hover:shadow-lg duration-200">
              <Image width={80} height={80} src="/assets/lcdb.svg" alt="Ease" />

              <h4 className="mt-4 font-extrabold text-center">Ease</h4>
              <p className="text-base font-medium text-gray-700 text-center">
                To start selling online on SaraKart, you only need one product.
              </p>
            </div>
          </div>
        </div>

        <div className="w-full p-4 flex flex-col gap-4 bg-gray-100 rounded-md ">
          <h3 className="font-bold text-center">
            Popular categories to sell online in India
          </h3>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-4 text-gray-700 text-center">
            <p className="font-medium text-base">Sell Mobile Online</p>
            <p className="font-medium text-base">Sell Clothes Online</p>
            <p className="font-medium text-base">Sell Sarees Online</p>
            <p className="font-medium text-base">Sell Electronics Online</p>
            <p className="font-medium text-base">Sell Shoes Online</p>
            <p className="font-medium text-base">Sell Jewellery Online</p>
            <p className="font-medium text-base">Sell Tshirts Online</p>
            <p className="font-medium text-base">Sell Furniture Online</p>
            <p className="font-medium text-base">Sell Paintings Online</p>
            <p className="font-medium text-base">Sell Watch Online</p>
            <p className="font-medium text-base">Sell Books Online</p>
            <p className="font-medium text-base">Sell Home Products Online</p>
            <p className="font-medium text-base">Sell Beauty Products Online</p>
            <p className="font-medium text-base">Sell Toys Online</p>
            <p className="font-medium text-base">Sell Appliances Online</p>
            <p className="font-medium text-base">Sell Shirts Online</p>
            <p className="font-medium text-base">Sell Womens Clothes Online</p>
            <p className="font-medium text-base">Sell Makeup Online</p>
            <p className="font-medium text-base">Sell Kurtis Online</p>
            <p className="font-medium text-base">Sell Indian Clothes Online</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerPage;
