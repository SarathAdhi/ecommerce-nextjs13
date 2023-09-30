"use client";

import React from "react";
import * as y from "yup";
import { Input } from "@components/ui/input";
import { useFormik } from "formik";
import { filterDocs } from "@backend/lib";
import { where } from "firebase/firestore";
import { toast } from "react-hot-toast";
import { Button } from "@components/ui/button";
import { setCookie } from "cookies-next";
import { getSellerProfile } from "@utils/get-profile";
import { useRouter } from "next/navigation";

const loginSchema = y.object().shape({
  email: y.string().email("Invalid email").required("Email is required"),
  password: y.string().required("Password is required"),
});

const initialValuesLogin = {
  email: "",
  password: "",
};

const SellerLoginForm = () => {
  const { refresh } = useRouter();

  const formik = useFormik({
    initialValues: initialValuesLogin,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const seller = await filterDocs(
        "sellers",
        where("email", "==", values.email)
      );

      if (seller.length === 0) return toast.error("Email does not exist");

      if (seller[0].password !== values.password)
        return toast.error("Invalid credentials");

      toast.success("Login successful");

      setCookie("token-seller", seller[0].uuid);

      await getSellerProfile("", seller[0].uuid);

      refresh();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
      <Input
        label="Email"
        name="email"
        placeholder="Enter your Email"
        value={formik.values.email}
        onChange={formik.handleChange}
      />

      <Input
        label="Password"
        name="password"
        placeholder="Enter your Password"
        type="password"
        value={formik.values.password}
        onChange={formik.handleChange}
      />

      <Button>Login</Button>
    </form>
  );
};

export default SellerLoginForm;
