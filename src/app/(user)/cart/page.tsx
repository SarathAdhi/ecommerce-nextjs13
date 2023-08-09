import { filterDoc } from "@backend/lib";
import CartProductCard from "@modules/user/cart/CartProductCard";
import { fetchProductImages } from "@utils/fetch-product";
import { getUserProfile } from "@utils/get-profile";
import { roundOff } from "@utils/round-off";
import { DocumentData, DocumentReference, getDoc } from "firebase/firestore";
import React from "react";
import { Cart } from "types/cart";
import { Product } from "types/product";

type MyCartItem = Product<Seller> & { qty: number };

const MyCart = async () => {
  const user = await getUserProfile("/?auth=login");

  const { myCart } = (await filterDoc("cart", user?.cartId!)) as {
    id: string;
  } & Cart<DocumentReference<DocumentData>>;

  let cart: MyCartItem[] = [];
  let totalPrice = 0;
  let totalDiscountPrice = 0;

  for (let i = 0; i < myCart.length; i++) {
    const item = myCart[i];
    const x = await getDoc(item.id);

    const _product = { id: x.id, ...x.data() } as Product;
    const product = await fetchProductImages(_product);

    const ownerDetails = await getDoc(_product.owner);

    const owner = {
      id: ownerDetails.id,
      ...ownerDetails.data(),
    };

    cart.push({ ...product, owner, qty: item.qty } as MyCartItem);

    totalPrice += _product.price * item.qty;
    totalDiscountPrice += _product.price * item.qty * (_product.discount / 100);
  }

  let totalPriceAfterDiscount = totalPrice - totalDiscountPrice;

  const isCartEmpty = cart.length === 0;

  if (isCartEmpty) return <h4 className="text-center">Your cart is empty.</h4>;

  return (
    <div className="grid grid-cols-6 gap-4 items-start">
      <div className="col-span-4 grid gap-4">
        {cart.map((product) => (
          <CartProductCard
            key={product.id}
            {...product}
            cartId={user?.cartId!}
          />
        ))}
      </div>

      <div className="p-4 sticky top-16 grid gap-2 col-span-2 shadow-lg border border-border rounded-md">
        <h5 className="text-gray-500">PRICE DETAILS</h5>

        <hr className="w-full h-1" />

        <div>
          <p className="w-full flex justify-between">
            <span>Price</span>
            <span>{roundOff(totalPrice)}</span>
          </p>

          <p className="w-full flex justify-between">
            <span>Discount</span>
            <span className="text-green-600">
              - {roundOff(totalDiscountPrice)}
            </span>
          </p>
        </div>

        <hr className="w-full h-1" />

        <h5 className="w-full flex justify-between">
          <span>Total Amount</span>
          <span>{roundOff(totalPriceAfterDiscount)}</span>
        </h5>
      </div>
    </div>
  );
};

export default MyCart;
