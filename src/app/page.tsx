"use client";
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.svg";
import mascot from "@/assets/mascot.png";
import { Mail, Route } from "lucide-react";
import { Lock } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Login() {
  const Router = useRouter();
  const userSchema = z.object({
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
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: toFormikValidationSchema(userSchema),
    validateOnChange: true,
    onSubmit: async (values) => {
      const send = {
        email: values.email,
        password: values.password,
      };
      console.log(send);
      try {
        const response = await axios.post(
          "https://yantra-hack.onrender.com/login",
          send
        );
        console.log(response);
        localStorage.setItem("access_token", response.data.accessToken);
        Router.push("/forum");
      } catch (e) {
        console.log(e);
      }
    },
  });

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    formik;

  return (
    <div className="bg-white h-screen flex">
      <div className="w-full lg:w-[65%] 2xl:w-[50%]">
        <Image src={logo} alt="logo" className="mt-8 ml-8" />
        <div className="h-[80%] flex flex-col justify-center mx-52">
          <h1 className="text-3xl text-black font-semibold pb-6">Sign in</h1>
          <p className="text-black text-sm">
            If you don&apos;t have an account{" "}
            <Link href="/register">
              <span className="text-[#0C21C1] underline text-sm">
                {" "}
                Register here
              </span>
            </Link>
          </p>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col py-6 text-sm">
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
            <p className="text-[#4D4D4D] text-sm text-right">
              Forgot Password?
            </p>
            <button
              type="submit"
              className="w-full rounded-full py-3 bg-[#0C21C1] mt-8 text-sm"
            >
              Logins
            </button>
          </form>
        </div>
      </div>
      <div className="hidden lg:flex w-[40%] 2xl:w-[55%]">
        <Image src={mascot} alt="mascot" className="py-4 px-3 h-full w-fit" />
      </div>
    </div>
  );
}
