"use client";

import React from "react";
import * as y from "yup";
import { Input } from "@components/ui/input";
import { useFormik } from "formik";
import { delFile, updateDoc } from "@backend/lib";
import { toast } from "react-hot-toast";
import { Button } from "@components/ui/button";
import { Product } from "types/product";
import { FaTrashAlt } from "react-icons/fa";
import { Carousel } from "@components/Carousel";
import { ResponsiveType } from "react-multi-carousel";
import { Textarea } from "@components/ui/textarea";
import InputFile from "@components/ui/InputFile";
import Grid from "@components/Grid";

const responsive: ResponsiveType = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const schema = y.object().shape({
  uuid: y.string().required("Product ID is required"),
  pname: y.string().required("Product Name is required"),
  description: y.string().required("Description is required"),
  quantity: y.number().required("Product Quantity is required"),
  price: y.number().required("Product Price is required"),
  discount: y.number().required("Product Discount is required"),
});

type Props = {
  product: Product<Seller>;
};

const EditProductForm: React.FC<Props> = ({ product }) => {
  const { id: pid, owner, imagePath, ...rest } = product;
  let _initialValues = rest;

  const formik = useFormik({
    initialValues: _initialValues,
    validationSchema: schema,
    onSubmit: async (values) => {
      try {
        await updateDoc("products", pid, {
          ...values,
        });

        toast.success("Product updated");
      } catch (error) {
        toast.error("Something went wrong");
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col items-end gap-4"
    >
      <Grid>
        <Input
          label="Product ID"
          name="uuid"
          value={formik.values.uuid}
          onChange={formik.handleChange}
          error={formik.errors.uuid}
          readOnly
        />

        <Input
          label="Product Name"
          name="pname"
          value={formik.values.pname}
          onChange={formik.handleChange}
          error={formik.errors.pname}
        />

        <Input
          label="Product Quantity"
          name="quantity"
          type="number"
          value={formik.values.quantity}
          onChange={formik.handleChange}
          error={formik.errors.quantity}
        />
        <Input
          label="Product Price"
          name="price"
          type="number"
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.errors.price}
          prefix="₹"
        />
        <Input
          label="Product Discount (%)"
          name="discount"
          type="number"
          value={formik.values.discount}
          onChange={formik.handleChange}
          error={formik.errors.discount}
          step={5}
          min={0}
          max={100}
        />
      </Grid>

      <Textarea
        label="Description"
        name="description"
        value={formik.values.description}
        onChange={formik.handleChange}
        error={formik.errors.description}
        rows={8}
      />

      <div className="w-full grid">
        <Carousel responsive={responsive}>
          {product.images.map((img, index) => (
            <div key={index} className="group relative">
              <img
                src={img.url}
                className="w-full h-80 rounded-md object-fill"
                alt="Product image"
              />

              <div className="rounded-md duration-200 opacity-0 group-hover:opacity-100 grid place-content-center absolute top-0 left-0 w-full h-full bg-black/30">
                <Button
                  variant="destructive"
                  className="p-1 w-10 h-10 !rounded-full"
                  onClick={() => {
                    delFile(img.name);
                  }}
                >
                  <FaTrashAlt />
                </Button>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      <InputFile
        label="Product Images"
        name="images"
        path={`products/${_initialValues.uuid}/`}
        setFieldValue={formik.setFieldValue}
        value={formik.values["images"]}
        // callback={getProduct}
        allowMultiple
      />

      <Button>Update Product</Button>
    </form>
  );
};

export default EditProductForm;
