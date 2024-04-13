"use client";
import { useState } from "react";
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.svg";
import mascot from "@/assets/mascot.png";
import { Mail, Lock, UserRound, Phone } from "lucide-react";

export default function Register() {
  const userSchema = z
    .object({
      name: z.string({
        required_error: "Required",
        invalid_type_error: "Name must be a string",
      }),
      email: z
        .string({
          required_error: "Required",
          invalid_type_error: "Email must be a string",
        })
        .email("Enter a valid email"),
      password: z
        .string({
          required_error: "Required",
          invalid_type_error: "Password must be a string",
        })
        .regex(
          /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
          "Password should contain at least 8 characters, 1 uppercase, 1 lowercase, 1 number and 1 special character"
        ),
      confirmPassword: z.string({
        required_error: "Required",
        invalid_type_error: "Confirm password must be a string",
      }),
      phoneNo: z
        .string({
          required_error: "Required",
        })
        .max(11, "mobile number must have max 11 characters")
        .min(10, "mobile number must have a min of 10 characters"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNo: "",
    },
    validationSchema: toFormikValidationSchema(userSchema),
    validateOnChange: true,
    onSubmit: async (values) => {
      const send = {
        name: values.name,
        email: values.email,
        password: values.password,
        phoneNo: values.phoneNo,
      };
      console.log(send);
    },
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    formik;

  return (
    <div className="bg-white min-h-screen flex">
      <div className="w-[65%]">
        <Image src={logo} alt="logo" className="mt-8 ml-8" />
        <div className="h-[80%] flex flex-col justify-center mx-52">
          <div className="flex justify-between items-center pb-6">
            <p className="text-3xl text-black font-semibold">Sign in</p>
            <p className="text-sm text-black">Step 1/2</p>
          </div>
          <p className="text-black">
            If you already have an account{" "}
            <Link href="/">
              <span className="text-[#0C21C1] underline"> Login here</span>
            </Link>
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col py-6 text-sm">
              <label
                htmlFor="name"
                className={`text-[#999999] ${
                  touched.name && errors.name ? "text-red-500" : ""
                }`}
              >
                Name
              </label>
              <div className="flex items-center border-b-2 border-black">
                <UserRound className="text-[#0C21C1] ml-1.5" />
                <input
                  name="name"
                  type="text"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your name"
                  className="w-full p-3 text-black pl-4 text-sm"
                />
              </div>
              <div className="w-[80%]">
                <span className="text-red-500">
                  {touched.name && errors.name}
                </span>
              </div>
            </div>
            <div className="flex flex-col pb-6 text-sm">
              <label
                htmlFor="email"
                className={`text-[#999999] ${
                  touched.email && errors.email ? "text-red-500" : ""
                }`}
              >
                Email
              </label>
              <div className="flex items-center border-b-2 border-black">
                <Mail className="text-[#0C21C1] ml-1.5" />
                <input
                  name="email"
                  type="text"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your email address"
                  className="w-full p-3 text-black pl-4"
                />
              </div>
            </div>
            <div className="flex flex-col pb-6 text-sm">
              <label
                htmlFor="password"
                className={`text-[#999999] ${
                  touched.password && errors.password ? "text-red-500" : ""
                }`}
              >
                Password
              </label>
              <div className="flex items-center border-b-2 border-black">
                <Lock className="text-[#0C21C1] ml-1.5" />
                <input
                  name="password"
                  type="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your password"
                  className="w-full p-3 text-black pl-4"
                />
              </div>
            </div>
            <div className="flex flex-col pb-6 text-sm">
              <label
                htmlFor="confirmPassword"
                className={`text-[#999999] ${
                  touched.confirmPassword && errors.confirmPassword
                    ? "text-red-500"
                    : ""
                }`}
              >
                Confirm Password
              </label>
              <div className="flex items-center border-b-2 border-black">
                <Lock className="text-[#0C21C1] ml-1.5" />
                <input
                  name="confirmPassword"
                  type="password"
                  value={values.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Confirm your password"
                  className="w-full p-3 text-black pl-4"
                />
              </div>
            </div>
            <div className="flex flex-col pb-6 text-sm">
              <label
                htmlFor="phoneNo"
                className={`text-[#999999] ${
                  touched.phoneNo && errors.phoneNo ? "text-red-500" : ""
                }`}
              >
                Phone Number
              </label>
              <div className="flex items-center border-b-2 border-black">
                <Phone className="text-[#0C21C1] ml-1.5" />
                <input
                  name="phoneNo"
                  type="text"
                  value={values.phoneNo}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter you phone number"
                  className="w-full p-3 text-black pl-4"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-full py-3 bg-[#0C21C1] mt-8"
            >
              Next
            </button>
          </form>
        </div>
      </div>
      <div className="flex w-[40%]">
        <Image src={mascot} alt="mascot" className="py-4 px-3 h-full w-fit" />
      </div>
    </div>
  );
}
