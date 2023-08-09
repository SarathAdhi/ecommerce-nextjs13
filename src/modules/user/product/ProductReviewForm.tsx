"use client";

import React from "react";
import * as y from "yup";
import { Input } from "@components/ui/input";
import { useFormik } from "formik";
import { updateDoc } from "@backend/lib";
import { toast } from "react-hot-toast";
import { Button } from "@components/ui/button";
import { Textarea } from "@components/ui/textarea";
import { arrayUnion } from "firebase/firestore";
import { useAppStore } from "@utils/store";
import { useRouter } from "next/navigation";
import { uuid } from "@utils/uuid";
import StarRating from "@components/StarRating";

const schema = y.object().shape({
  title: y.string().required("Title is required"),
  description: y.string().required("Description is required"),
  ratings: y.string().required("Rating is required"),
});

const initialValues = {
  title: "",
  description: "",
  ratings: 0,
};

type Props = {
  reviewId: string;
};

const ProductReviewForm: React.FC<Props> = ({ reviewId }) => {
  const { replace, refresh } = useRouter();

  const { user } = useAppStore();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: schema,
    onSubmit: async (values) => {
      if (!user) {
        toast.error("Login to continue");
        replace("/?auth=login");
      }

      try {
        await updateDoc("reviews", reviewId, {
          reviews: arrayUnion({ ...values, id: uuid() }),
        });

        toast.success("Review posted successfully");
        formik.resetForm();
        refresh();
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    },
  });

  return (
    <form
      onSubmit={formik.handleSubmit}
      className="flex flex-col items-end gap-4"
    >
      <Input
        label="Title"
        name="title"
        value={formik.values.title}
        onChange={formik.handleChange}
        error={formik.errors.title}
      />

      <Textarea
        label="Description"
        name="description"
        value={formik.values.description}
        onChange={(e) => formik.setFieldValue("description", e.target.value)}
        error={formik.errors.description}
        rows={8}
      />

      <div className="w-full grid gap-2">
        <label className="font-semibold">Rating</label>

        <StarRating
          size={30}
          initialValue={formik.values.ratings}
          onClick={(e) => formik.setFieldValue("ratings", e)}
          showTooltip
        />
      </div>

      <Button isLoading={formik.isSubmitting}>Post Review</Button>
    </form>
  );
};

export default ProductReviewForm;
