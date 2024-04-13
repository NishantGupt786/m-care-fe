"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useProfileStore } from "@/store";

interface profResponse {
  name: string;
  email: string;
  phoneNo: string;
  isVerified: boolean;
  dob: string;
  q1: boolean;
  q2: boolean;
  q3: string;
}

export default function AccInfo() {
  const [details, setDetails] = useState<profResponse | undefined>(undefined);

  useEffect(() => {
    const access_token: string | null = localStorage.getItem("access_token");
    async function getDetails() {
      const response = await axios.get(
        "https://yantra-hack.onrender.com/profile",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(response.data);
      setDetails(response.data);
      localStorage.setItem("data", response.data)
    }
    getDetails();
  }, []);

  return (
    <>
      <div className="flex flex-col text-black mt-6">
        <div className="flex flex-col border-b-[1px] border-[#00000033] w-[45%] pb-4">
          <p className="font-semibold pb-1">Name</p>
          <p className="text-[#000000CC] font-normal">
            {details?.name || ""}
          </p>
        </div>
        <div className="flex flex-col border-b-[1px] border-[#00000033] w-[45%] py-4">
          <p className="font-semibold pb-1">Email</p>
          <p className="text-[#000000CC] font-normal">
            {details?.email || ""}
          </p>
        </div>
        <div className="flex flex-col border-b-[1px] border-[#00000033] w-[45%] py-4">
          <p className="font-semibold pb-1">Phone Number</p>
          <p className="text-[#000000CC] font-normal">
            {details?.phoneNo || ""}
          </p>
        </div>
        <div className="flex flex-col border-b-[1px] border-[#00000033] w-[45%] py-4">
          <p className="font-semibold pb-1">Date of Birth</p>
          <p className="text-[#000000CC] font-normal">
            {details?.dob || ""}
          </p>
        </div>
      </div>
    </>
  );
}
