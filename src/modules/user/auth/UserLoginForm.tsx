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
import { useRouter } from "next/navigation";

const loginSchema = y.object().shape({
  email: y.string().email("Invalid email").required("Email is required"),
  password: y.string().required("Password is required"),
});

const initialValuesLogin = {
  email: "",
  password: "",
};

const UserLoginForm = () => {
  const { refresh } = useRouter();

  const formik = useFormik({
    initialValues: initialValuesLogin,
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      const user = await filterDocs(
        "users",
        where("email", "==", values.email)
      );

      if (user.length === 0) return toast.error("Email does not exist");

      if (user[0].password !== values.password)
        return toast.error("Invalid credentials");

      setCookie("token-user", user[0].uuid);
      toast.success("Login successful");

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

export default UserLoginForm;
