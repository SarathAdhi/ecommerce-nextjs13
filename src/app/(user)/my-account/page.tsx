import React from "react";
import { getUserProfile } from "@utils/get-profile";
import { filterDocs } from "@backend/lib";
import {
  DocumentSnapshot,
  doc,
  getDoc,
  limit,
  where,
} from "firebase/firestore";
import { userCollectionRef } from "@backend/db";
import { Order } from "types/order";
import { Product } from "types/product";
import { roundOff } from "@utils/round-off";
import Link from "next/link";
import { productLink } from "@utils/product-link";
import { Input } from "@components/ui/input";
import Grid from "@components/Grid";

const MyAccount = async () => {
  const user = await getUserProfile("/auth/login");

  const myOrders = (await filterDocs(
    "orders",
    where("user", "==", doc(userCollectionRef, user?.id!)),
    limit(5)
  )) as Order[];

  let purchasedProducts: Product[] = [];

  for (let i = 0; i < myOrders?.length; i++) {
    for (let j = 0; j < myOrders[i].products?.length; j++) {
      const prod = myOrders[i].products[j];

      const productDetails: DocumentSnapshot<Product> = await getDoc(prod.id);

      const product = {
        id: productDetails.id,
        ...productDetails.data(),
        quantity: prod.qty,
      } as Product;

      purchasedProducts.push(product);
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <h4>My Account</h4>

        <Grid>
          <Input label="Email" defaultValue={user?.email} readOnly />

          <Input label="Name" defaultValue={user?.name} readOnly />
        </Grid>
      </div>

      <hr />

      <div className="grid gap-2">
        <h4>My Latest Orders</h4>

        <div className="divide-y-2">
          {purchasedProducts.map((e) => (
            <div
              key={e.id}
              className="py-2 first:pt-0 flex items-end justify-between gap-1"
            >
              <div className="space-y-1">
                <Link
                  href={productLink(e.pname, e.uuid)}
                  className="hover:underline text-blue-600"
                >
                  <h6>{e.pname}</h6>
                </Link>

                <p className="flex items-center divide-x-2">
                  <span className="pr-2">Price: {roundOff(e.price)}</span>

                  <span className="pl-2">Quantity: {e.quantity}</span>
                </p>
              </div>

              <p className="font-medium text-red-600">
                - {roundOff(e.price * e.quantity)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
