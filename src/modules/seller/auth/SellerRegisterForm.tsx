"use client";

import React from "react";
import * as y from "yup";
import { Input } from "@components/ui/input";
import { useFormik } from "formik";
import { addDoc, filterDocs } from "@backend/lib";
import { where } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { Button } from "@components/ui/button";
import { uuid } from "@utils/uuid";
import { setCookie } from "cookies-next";
import { getSellerProfile } from "@utils/get-profile";
import { useRouter } from "next/navigation";

const registerSchema = y.object().shape({
  companyName: y.string().required("Company Name is required"),
  email: y.string().email("Invalid email").required("Email is required"),
  password: y.string().required("Password is required"),
  confirm_password: y.string().required("Password is required"),
});

const initialValuesRegister = {
  companyName: "",
  email: "",
  password: "",
  confirm_password: "",
};

const SellerRegisterForm = () => {
  const { refresh } = useRouter();

  const formik = useFormik({
    initialValues: initialValuesRegister,
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      if (values.password !== values.confirm_password)
        return toast.error("Password doesn't match");

      try {
        const seller = await filterDocs(
          "sellers",
          where("email", "==", values.email)
        );

        if (seller.length !== 0) return toast.error("Email already exist");

        const { confirm_password, ...rest } = values;

        const _uuid = uuid();

        await addDoc("sellers", {
          ...rest,
          uuid: _uuid,
        });

        setCookie("token-seller", _uuid);

        toast.success("Account created successfully");

        await getSellerProfile("", _uuid);

        refresh();
      } catch (error) {
        console.log({ error });
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Company Name"
        name="companyName"
        placeholder="Enter your Company Name"
        value={formik.values.companyName}
        onChange={formik.handleChange}
        required
      />

      <Input
        label="Email"
        name="email"
        placeholder="Enter your Email"
        value={formik.values.email}
        onChange={formik.handleChange}
        required
      />

      <Input
        label="Password"
        name="password"
        placeholder="Enter your Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
        required
      />

      <Input
        label="Confirm Password"
        name="confirm_password"
        placeholder="Re-Enter your Password"
        type="password"
        value={formik.values.confirm_password}
        onChange={formik.handleChange}
        required
      />

      <Button type="submit" isLoading={formik.isSubmitting}>
        Register
      </Button>
    </form>
  );
};

export default SellerRegisterForm;
