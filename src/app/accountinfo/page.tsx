"use client";
import { useState } from "react";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import prof from "@/assets/profico.svg";
import Link from "next/link";
import AccInfo from "@/components/accinfo";
import PerInfo from "@/components/perinfo";
import MyPosts from "@/components/postinfo";

export default function Account() {
  const [currentPage, setCurrentPage] = useState("Account Information");
  return (
    <>
      <div className="flex flex-col bg-white h-screen overflow-x-hidden">
        <div className="flex justify-between mt-6 mx-6">
          <Image src={logo} alt="logo" />
          <div className="flex gap-x-8 text-gray-900">
            <Link href="/landing">Home</Link>
            <Link href="">ChatBot</Link>
            <Link href="/forum">Forum</Link>
            
          </div>
          <Image src={prof} alt="profile icon" />
        </div>
        <div className="flex mt-6 w-screen h-full">
          <div className="w-[25vw] text-black text-center">
            <div
              className={`cursor-pointer p-5 self-center hover:bg-[#D9D9D980] hover:border-l-2 hover:border-[#0C21C1] ${
                currentPage === "Account Information"
                  ? "bg-[#D9D9D980] border-l-2 border-[#0C21C1]"
                  : ""
              }`}
              onClick={() => setCurrentPage("Account Information")}
            >
              Account Information
            </div>
            <div
              className={`cursor-pointer p-5 hover:bg-[#D9D9D980] hover:border-l-2 hover:border-[#0C21C1] ${
                currentPage === "Personal Information"
                  ? "bg-[#D9D9D980] border-l-2 border-[#0C21C1]"
                  : ""
              }`}
              onClick={() => setCurrentPage("Personal Information")}
            >
              Personal Information
            </div>
            <div
              className={`cursor-pointer p-5 hover:bg-[#D9D9D980] hover:border-l-2 hover:border-[#0C21C1] ${
                currentPage === "Your Posts"
                  ? "bg-[#D9D9D980] border-l-2 border-[#0C21C1]"
                  : ""
              }`}
              onClick={() => setCurrentPage("Your Posts")}
            >
              Your Posts
            </div>
          </div>
          <div className="w-[75vw] pt-3 pl-14 font-semibold text-black">
            <h1 className="text-3xl">{currentPage}</h1>
            {currentPage === "Account Information" && <AccInfo />}
            {currentPage === "Personal Information" && <PerInfo />}
            {currentPage === "Your Posts" && <MyPosts />}
          </div>
        </div>
      </div>
    </>
  );
}
