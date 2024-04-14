"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Pencil, Check } from "lucide-react";

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

export default function PerInfo() {
  const [pregnant, setPregnant] = useState<string>("");
  const [pregInput, togglePregInput] = useState<boolean>(false);
  const [child, setChild] = useState<string>("");
  const [childInput, toggleChildInput] = useState<boolean>(false);
  const [num, setNum] = useState<string | undefined>("");
  const [numInput, toggleNumInput] = useState<boolean>(false);

  useEffect(() => {
    async function getDetails() {
      try {
        const access_token: string | null =
          localStorage.getItem("access_token");
        const response = await axios.get("http://localhost:5000/profile", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });
        console.log(response.data);
        setPregnant(response.data.q1 ? "yes" : "no");
        setChild(response.data.q2 ? "yes" : "no");
        setNum(response.data.q3);
      } catch (e) {
        console.log(e);
      }
    }
    getDetails();
  }, []);

  async function editq1() {
    const access_token: string | null = localStorage.getItem("access_token");
    try {
      const response = await axios.patch(
        "http://localhost:5000/profile",
        { q1: pregnant },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      togglePregInput(false);
    } catch (e) {
      console.log(e);
    }
  }
  async function editq2() {
    const access_token: string | null = localStorage.getItem("access_token");
    try {
      const response = await axios.patch(
        "https://yantra-hack.onrender.com/profile",
        { q2: child },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      toggleChildInput(false);
    } catch (e) {
      console.log(e);
    }
  }
  async function editq3() {
    const access_token: string | null = localStorage.getItem("access_token");
    try {
      const response = await axios.patch(
        "https://yantra-hack.onrender.com/profile",
        { q3: num },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      toggleNumInput(false);
    } catch (e) {
      console.log(e);
    }
  }

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
                className="cursor-text w-full"
              />
            ) : (
              <p className="text-[#000000CC] font-normal">{pregnant}</p>
            )}
            {pregInput ? (
              <Check
                color="#0C21C1B3"
                size={20}
                className="cursor-pointer"
                onClick={() => togglePregInput(false)}
              />
            ) : (
              <Pencil
                color="#0C21C1B3"
                size={20}
                className="cursor-pointer"
                onClick={() => togglePregInput(true)}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col border-b-[1px] border-[#00000033] w-[45%] py-4">
          <p className="font-semibold pb-1">Have you had a child before?</p>
          <div className="flex justify-between">
            {childInput ? (
              <input
                value={child}
                onChange={(e) => setChild(e.target.value)}
                className="cursor-text w-full"
              />
            ) : (
              <p className="text-[#000000CC] font-normal">{child}</p>
            )}
            {childInput ? (
              <Check
                color="#0C21C1B3"
                size={20}
                className="cursor-pointer"
                onClick={() => toggleChildInput(false)}
              />
            ) : (
              <Pencil
                color="#0C21C1B3"
                size={20}
                className="cursor-pointer"
                onClick={() => toggleChildInput(true)}
              />
            )}
          </div>
        </div>
        <div className="flex flex-col border-b-[1px] border-[#00000033] w-[45%] py-4">
          <p className="font-semibold pb-1">How many children do you have</p>
          <div className="flex justify-between">
            {numInput ? (
              <input
                value={num}
                onChange={(e) => setNum(e.target.value)}
                className="cursor-text w-full"
              />
            ) : (
              <p className="text-[#000000CC] font-normal">{num}</p>
            )}
            {numInput ? (
              <Check
                color="#0C21C1B3"
                size={20}
                className="cursor-pointer"
                onClick={() => toggleNumInput(false)}
              />
            ) : (
              <Pencil
                color="#0C21C1B3"
                size={20}
                className="cursor-pointer"
                onClick={() => toggleNumInput(true)}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
