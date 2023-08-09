import React from "react";
import { roundOff } from "@utils/round-off";
import { filterDoc, filterDocs } from "@backend/lib";
import { DocumentData, DocumentReference, where } from "firebase/firestore";
import { Product } from "types/product";
import { fetchProductDetails } from "@utils/fetch-product";
import ImageViewer from "@modules/user/product/ImageViewer";
import { getUserProfile } from "@utils/get-profile";
import { Cart } from "types/cart";
import Link from "next/link";
import Image from "next/image";
import { offers } from "../../../../offers";
import ProductReviewForm from "@modules/user/product/ProductReviewForm";
import StarRating from "@components/StarRating";
import ReviewRenderer from "@modules/user/product/ReviewRenderer";

type Props = {
  params: {
    product: string[];
  };
};

const ViewProduct: React.FC<Props> = async ({ params }) => {
  const productId = params.product[1];

  const products = await filterDocs("products", where("uuid", "==", productId));

  let _product = products[0] as Product;

  let product = await fetchProductDetails(_product);

  const {
    pname,
    description,
    price,
    discount,
    images,
    owner: seller,
    id,
    reviewId,
  } = product;

  const user = await getUserProfile();

  const { myCart } = (await filterDoc("cart", user?.cartId!)) as {
    id: string;
  } & Cart<DocumentReference<DocumentData>>;

  let isAddedToCart = myCart?.some((e) => e.id.id === id);

  const { reviews } = (await filterDoc("reviews", reviewId.id!)) as {
    reviews: Product["reviews"];
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="grid md:grid-cols-10 gap-8">
        <ImageViewer {...{ images, productId: id, isAddedToCart }} />

        <div className="md:col-span-6 lg:col-span-7 flex flex-col gap-4">
          <div>
            <h2>{pname}</h2>

            <Link
              className="text-sky-600 hover:underline font-medium"
              href={`/s/${seller.companyName}`}
            >
              Visit the {seller.companyName} store
            </Link>
          </div>

          <div>
            <p className="!text-lg font-semibold text-green-700">
              Extra {roundOff(price * (discount / 100))} off
            </p>

            <p>
              <span className="text-4xl font-semibold">
                {roundOff(price - price * (discount / 100))}
              </span>{" "}
              <span className="!text-lg">
                <span className="text-gray-400 font-normal line-through mr-2">
                  {roundOff(price)}
                </span>
                <span className="text-green-700">{discount}% off</span>
              </span>
            </p>
          </div>

          <fieldset className="border p-4 rounded-md">
            <legend className="px-2 text-2xl font-semibold">Offers</legend>

            <div className="-mt-2 grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
              {offers.map((e, i) => {
                return (
                  <div
                    key={e.name + i}
                    className="p-4 border-2 space-y-2 rounded-md flex flex-col items-end justify-between"
                  >
                    <div className="space-y-2">
                      <p className="font-semibold">
                        {e.type} - {e.name}
                      </p>

                      <p className="w-full text-sm">{e.description}</p>
                    </div>

                    <e.icon className="flex-shrink-0 text-green-600" />
                  </div>
                );
              })}
            </div>
          </fieldset>

          <div className="border-b-2 p-4 grid grid-cols-2 place-content-center place-items-center sm:flex items-center justify-between gap-4">
            <div className="w-20 grid place-items-center gap-4">
              <Image
                width={50}
                height={50}
                src="/assets/product/cod.png"
                alt="COD"
              />

              <span className="leading-none text-center text-sm font-semibold text-blue-600">
                Cash on Delivery
              </span>
            </div>

            <div className="w-20 grid place-items-center gap-4">
              <Image
                width={50}
                height={50}
                src="/assets/product/free-delivery.png"
                alt="COD"
              />

              <span className="leading-none text-center text-sm font-semibold text-blue-600">
                10 days Replacement
              </span>
            </div>

            <div className="w-20 grid place-items-center gap-4">
              <Image
                width={50}
                height={50}
                src="/assets/product/replacement.png"
                alt="COD"
              />

              <span className="leading-none text-center text-sm font-semibold text-blue-600">
                Secure Transaction
              </span>
            </div>

            <div className="w-20 grid place-items-center gap-4">
              <Image
                width={50}
                height={50}
                src="/assets/product/secure-transaction.png"
                alt="COD"
              />

              <span className="leading-none text-center text-sm font-semibold text-blue-600">
                Cash on Delivery
              </span>
            </div>
          </div>

          <fieldset className="border p-4 rounded-md">
            <legend className="px-2 text-2xl font-semibold">Description</legend>

            <div className="-mt-2">
              <p>{description}</p>
            </div>
          </fieldset>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 border p-4 rounded-md">
        {images.map(({ name, url }) => (
          <Image
            key={name}
            width={500}
            height={500}
            src={url}
            alt={"Product Image"}
          />
        ))}
      </div>

      <div className="flex flex-col lg:flex-row items-start gap-4">
        <div className="w-full lg:w-[400px] flex-shrink-0 border p-4 rounded-md space-y-4">
          <div>
            <h5>Review this product</h5>
            <span className="text-sm">
              Share your thoughts with other customers
            </span>
          </div>

          <hr />

          <ProductReviewForm reviewId={reviewId.id} />
        </div>

        <div className="w-full border p-4 rounded-md space-y-4">
          <h3>Reviews</h3>

          <hr />

          <div className="flex flex-col gap-4">
            {reviews.length === 0 && <p>No customer reviews</p>}

            {reviews.map(({ id, ...rest }) => (
              <ReviewRenderer key={id} {...rest} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProduct;
