"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function AccInfo() {
  //   const [details, setDetails] = useState(null);
  //   useEffect(() => {
  //     const access_token: string | null = localStorage.getItem("access_token");
  //     async function getDetails() {
  //       const response = await axios.get("damn", {
  //         headers: {
  //           Authorization: `Bearer ${access_token}`,
  //         },
  //       });
  //       setDetails(response.data)
  //     }
  //   }, []);
  return (
    <>
      <div className="flex flex-col text-black mt-6">
        <div className="flex flex-col border-b-[1px] border-[#00000033] w-[45%] pb-4">
          <p className="font-semibold pb-1">Name</p>
          <p className="text-[#000000CC] font-normal">Karan Dugar</p>
        </div>
        <div className="flex flex-col border-b-[1px] border-[#00000033] w-[45%] py-4">
          <p className="font-semibold pb-1">Email</p>
          <p className="text-[#000000CC] font-normal">KaranDugar@gmail.com</p>
        </div>
        <div className="flex flex-col border-b-[1px] border-[#00000033] w-[45%] py-4">
          <p className="font-semibold pb-1">Phone Number</p>
          <p className="text-[#000000CC] font-normal">9090897678</p>
        </div>
        <div className="flex flex-col border-b-[1px] border-[#00000033] w-[45%] py-4">
          <p className="font-semibold pb-1">Date of Birth</p>
          <p className="text-[#000000CC] font-normal">20/12/1998</p>
        </div>
      </div>
    </>
  );
}
