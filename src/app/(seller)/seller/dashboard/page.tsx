import { getSellerProfile } from "@utils/get-profile";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Overview } from "@modules/seller/dashboard/Overview";
import { filterDocs } from "@backend/lib";
import { doc, getDoc, where } from "firebase/firestore";
import { sellerCollectionRef } from "@backend/db";
import { Product as _Product } from "types/product";
import { roundOff } from "@utils/round-off";
import { Order } from "types/order";

interface Product extends _Product {
  user: User;
}

let monthSalesData = [
  {
    name: "Jan",
    total: 0,
  },
  {
    name: "Feb",
    total: 0,
  },
  {
    name: "Mar",
    total: 0,
  },
  {
    name: "Apr",
    total: 0,
  },
  {
    name: "May",
    total: 0,
  },
  {
    name: "Jun",
    total: 0,
  },
  {
    name: "Jul",
    total: 0,
  },
  {
    name: "Aug",
    total: 0,
  },
  {
    name: "Sep",
    total: 0,
  },
  {
    name: "Oct",
    total: 0,
  },
  {
    name: "Nov",
    total: 0,
  },
  {
    name: "Dec",
    total: 0,
  },
];

const SellerDashboard = async () => {
  const seller = await getSellerProfile("/seller/auth/login");

  console.log(seller);

  const orders = (await filterDocs(
    "orders",
    where("owners", "array-contains", doc(sellerCollectionRef, seller?.id))
  )) as Order[];

  let products: Product[] = [];

  let totalRevenue = 0;
  let totalProductsSelled = 0;
  let totalProductsSelledToday = 0;
  let users = new Set();

  for (let i = 0; i < orders.length; i++) {
    const order = orders[i];
    const user = (await getDoc(order.user)).data() as User;

    for (let j = 0; j < order.products.length; j++) {
      const prod = order.products[j];

      if (prod.owner?.id === seller?.id) {
        const product = (await getDoc(prod.id)).data() as Product;

        const discountPrice =
          product.price - product.price * (product.discount / 100);

        totalRevenue += discountPrice;
        totalProductsSelled += 1;

        users.add(order.user?.id || order.user);

        const purchasedDateFormatted = new Date(order.purchasedAt.toDate());
        const todayDateFormatted = new Date();

        if (
          purchasedDateFormatted.toLocaleDateString() ===
          todayDateFormatted.toLocaleDateString()
        ) {
          totalProductsSelledToday += 1;
        }

        // Push only this month purchased products
        if (
          purchasedDateFormatted.getFullYear() ===
            todayDateFormatted.getFullYear() &&
          purchasedDateFormatted.getMonth() === todayDateFormatted.getMonth()
        ) {
          products.push({ ...product, price: discountPrice, user: user });
        }

        if (
          purchasedDateFormatted.getFullYear() ===
          todayDateFormatted.getFullYear()
        ) {
          monthSalesData[purchasedDateFormatted.getMonth()].total +=
            discountPrice;
        }
      }
    }
  }

  console.log(totalRevenue);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">{roundOff(totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Users</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.size}</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sales</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+{orders.length}</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProductsSelled}</div>
            <p className="text-xs text-muted-foreground">
              +{totalProductsSelledToday} since today
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>

          <CardContent className="pl-2">
            <Overview data={monthSalesData} />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>
              You made {products.length} sales this month.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-8">
              {products.map((e, i) => (
                <div key={i} className="flex items-center">
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {e.user.name} |{" "}
                      <a
                        href={`mailto:${e.user.email}`}
                        className="text-blue-600"
                      >
                        {e.user.email}
                      </a>
                    </p>
                    <p className="text-sm text-muted-foreground">{e.pname}</p>
                  </div>

                  <div className="ml-auto font-medium">
                    +{roundOff(e.price)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SellerDashboard;
