"use client";
import { useState } from "react";
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.svg";
import mascot from "@/assets/mascot.png";
import { CircleHelp } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Register2() {
  const Router = useRouter();
  const userSchema = z.object({
    dob: z.string({
      required_error: "Required",
      invalid_type_error: "DOB must be a string",
    }),
    q1: z.string({
      required_error: "Required",
      invalid_type_error: "q1 must be a string",
    }),
    q2: z.string({
      required_error: "Required",
      invalid_type_error: "q2 must be a string",
    }),
    q3: z.string({
      required_error: "Required",
      invalid_type_error: "q3 must be a string",
    }),
  });

  const formik = useFormik({
    initialValues: {
      dob: "",
      q1: "",
      q2: "",
      q3: "",
    },
    validationSchema: toFormikValidationSchema(userSchema),
    validateOnChange: true,
    onSubmit: async (values) => {
      const name = localStorage.getItem("name");
      const email = localStorage.getItem("email");
      const phoneNo = localStorage.getItem("phoneNo");
      const password = localStorage.getItem("password");
      if (!name || !email || !phoneNo || !password) {
        Router.push("/register");
      }
      const send = {
        name: name,
        email: email,
        phoneNo: phoneNo,
        password: password,
        dob: values.dob,
        q1: values.q1,
        q2: values.q2,
        q3: values.q3,
      };
      console.log(send);
      try {
        const response = await axios.post(
          "http://localhost:5000/signup",
          send
        );
        console.log(response);
        Router.push("/");
      } catch (e) {
        console.log(e);
      }
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
            <p className="text-sm text-black">Step 2/2</p>
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
                htmlFor="dob"
                className={`text-[#999999] ${
                  touched.dob && errors.dob ? "text-red-500" : ""
                }`}
              >
                Date of Birth
              </label>
              <div className="flex items-center border-b-2 border-black">
                <CircleHelp className="text-[#0C21C1] ml-1.5" />
                <input
                  name="dob"
                  type="date"
                  value={values.dob}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter your date of birth"
                  className="w-full p-3 text-black pl-4 text-sm"
                />
              </div>
            </div>
            <div className="flex flex-col pb-6 text-sm">
              <label
                htmlFor="q1"
                className={`text-[#999999] ${
                  touched.q1 && errors.q1 ? "text-red-500" : ""
                }`}
              >
                Are you currently pregnant?
              </label>
              <div className="flex items-center border-b-2 border-black">
                <CircleHelp className="text-[#0C21C1] ml-1.5" />
                <select
                  name="q1"
                  value={values.q1}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-3 text-black bg-white"
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="no">Prefer not to say</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col pb-6 text-sm">
              <label
                htmlFor="q2"
                className={`text-[#999999] ${
                  touched.q2 && errors.q2 ? "text-red-500" : ""
                }`}
              >
                Have you had a child before?{" "}
              </label>
              <div className="flex items-center border-b-2 border-black">
                <CircleHelp className="text-[#0C21C1] ml-1.5" />
                <select
                  name="q2"
                  value={values.q2}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="w-full p-3 text-black bg-white"
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  <option value="yes">Yes</option>
                  <option value="no">No</option>
                  <option value="no">Prefer not to say</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col pb-6 text-sm">
              <label
                htmlFor="q3"
                className={`text-[#999999] ${
                  touched.q3 && errors.q3 ? "text-red-500" : ""
                }`}
              >
                How many children do you have?
              </label>
              <div className="flex items-center border-b-2 border-black">
                <CircleHelp className="text-[#0C21C1] ml-1.5" />
                <input
                  name="q3"
                  type="text"
                  value={values.q3}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter here"
                  className="w-full p-3 text-black pl-4"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full rounded-full py-3 bg-[#0C21C1] mt-8"
            >
              Submit
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
