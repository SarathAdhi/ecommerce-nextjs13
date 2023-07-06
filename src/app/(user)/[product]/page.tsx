import React from "react";
import { roundOff } from "@utils/round-off";
import { filterDocs } from "@backend/lib";
import { where } from "firebase/firestore";
import { Product } from "types/product";
import { fetchProductDetails } from "@utils/fetch-product";
import ImageViewer from "@modules/user/product/ImageViewer";

type Props = {
  params: {
    product: string;
  };
};

const ViewProduct: React.FC<Props> = async ({ params }) => {
  const products = await filterDocs(
    "products",
    where("uuid", "==", params.product)
  );

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
  } = product;

  return (
    <div className="grid grid-cols-10 gap-4">
      <ImageViewer {...{ images, productId: id }} />

      <div className="col-span-7 flex flex-col gap-4">
        <h3>{pname}</h3>

        <div>
          <p className="!text-lg font-semibold text-green-700">
            Extra {roundOff(price * (discount / 100))} off
          </p>
          <p>
            <span className="text-3xl font-semibold">
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
          <legend className="px-2 text-2xl font-semibold">Seller</legend>

          <div className="-mt-2">
            <p>{seller.companyName}</p>
          </div>
        </fieldset>

        <fieldset className="border p-4 rounded-md">
          <legend className="px-2 text-2xl font-semibold">Description</legend>

          <div className="-mt-2">
            <p>{description}</p>
          </div>
        </fieldset>

        <fieldset className="border p-4 rounded-md">
          <legend className="px-2 text-2xl font-semibold">Reviews</legend>

          <div className="-mt-2">
            <p>{description}</p>
          </div>
        </fieldset>

        <fieldset className="border p-4 rounded-md">
          <legend className="px-2 text-2xl font-semibold">Reviews</legend>

          <div className="-mt-2">
            <p>{description}</p>
          </div>
        </fieldset>

        <fieldset className="border p-4 rounded-md">
          <legend className="px-2 text-2xl font-semibold">Reviews</legend>

          <div className="-mt-2">
            <p>{description}</p>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default ViewProduct;

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const id = `${context.query?.id}`;

//   const products = await filterDocs("products", where("uuid", "==", id));

//   let product = products[0] as Product;

//   const docSnap = await getDoc(
//     product?.owner as DocumentReference<DocumentData>
//   );

//   const owner = {
//     ...docSnap.data(),
//     id: docSnap.id,
//   };

//   const allImages = await getFilesInFolder(product.imagePath);
//   const images = allImages.map((url) => ({
//     url,
//     name: ref(storage, url).fullPath,
//   }));

//   product = {
//     ...product,
//     owner: owner as Seller,
//     images,
//   };

//   return {
//     props: {
//       _productDetails: JSON.stringify(product),
//     },
//   };
// }
