"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";

export default function PerInfo() {
  //   const [details, setDetails] = useState(null);
  const [pregnant, setPregnant] = useState("no");
  const [pregInput, togglePregInput] = useState(false);
  const [child, setChild] = useState("no");
  const [childInput, toggleChildInput] = useState(false);
  const [num, setNum] = useState("0");
  const [numInput, toggleNumInput] = useState(false);
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
          <p className="font-semibold pb-1">Are you currently pregnant?</p>
          <div className="flex justify-between">
            {pregInput ? (
              <input
                value={pregnant}
                onChange={(e) => setPregnant(e.target.value)}
                onBlur={() => togglePregInput(false)}
              />
            ) : (
              <p className="text-[#000000CC] font-normal">{pregnant}</p>
            )}
            <Pencil
              color="#0C21C1B3"
              size={20}
              className="cursor-pointer"
              onClick={() => togglePregInput(true)}
            />
          </div>
        </div>
        <div className="flex flex-col border-b-[1px] border-[#00000033] w-[45%] py-4">
          <p className="font-semibold pb-1">Have you had a child before?</p>
          <div className="flex justify-between">
            {childInput ? (
              <input
                value={child}
                onChange={(e) => setChild(e.target.value)}
                onBlur={() => toggleChildInput(false)}
              />
            ) : (
              <p className="text-[#000000CC] font-normal">{child}</p>
            )}
            <Pencil
              color="#0C21C1B3"
              size={20}
              className="cursor-pointer"
              onClick={() => toggleChildInput(true)}
            />
          </div>
        </div>
        <div className="flex flex-col border-b-[1px] border-[#00000033] w-[45%] py-4">
          <p className="font-semibold pb-1">How many children do you have</p>
          <div className="flex justify-between">
            {numInput ? (
              <input
                value={num}
                onChange={(e) => setNum(e.target.value)}
                onBlur={() => toggleNumInput(false)}
              />
            ) : (
              <p className="text-[#000000CC] font-normal">{num}</p>
            )}
            <Pencil
              color="#0C21C1B3"
              size={20}
              className="cursor-pointer"
              onClick={() => toggleNumInput(true)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
