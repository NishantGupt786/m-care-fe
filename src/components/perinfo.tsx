"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { Pencil } from "lucide-react";

export default function PerInfo() {
  //   const [details, setDetails] = useState(null);
  const [pregnant, setPregnant] = useState(false);
  const [hadChildBefore, setHadChildBefore] = useState(false);
  const [numberOfChildren, setNumberOfChildren] = useState(0);
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
  const toggleEditMode = (fieldName: string) => {
    switch (fieldName) {
      case "pregnant":
        setPregnant(!pregnant);
        break;
      case "hadChildBefore":
        setHadChildBefore(!hadChildBefore);
        break;
      case "numberOfChildren":
        setNumberOfChildren(0); // Reset number of children when editing
        break;
      default:
        break;
    }
  };

  const handleOptionChange = (fieldName: string, value: string) => {
    switch (fieldName) {
      case "pregnant":
        setPregnant(value === "Yes");
        break;
      case "hadChildBefore":
        setHadChildBefore(value === "Yes");
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div className="flex flex-col text-black mt-6">
        <div className="flex flex-col border-b-[1px] border-[#00000033] w-[45%] pb-4">
          <p className="font-semibold pb-1">Are you currently pregnant?</p>
          {pregnant ? (
            <select
              value={pregnant ? "Yes" : "No"}
              onChange={(e) => handleOptionChange("pregnant", e.target.value)}
              onBlur={() => toggleEditMode("pregnant")}
            >
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          ) : (
            <div className="flex justify-between">
              <p className="text-[#000000CC] font-normal">
                {pregnant ? "Yes" : "No"}
              </p>
              <Pencil
                color="#0C21C1B3"
                size={20}
                className="cursor-pointer"
                onClick={() => toggleEditMode("pregnant")}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col border-b-[1px] border-[#00000033] w-[45%] py-4">
          <p className="font-semibold pb-1">Have you had a child before?</p>
          <div className="flex justify-between">
            <p className="text-[#000000CC] font-normal">No</p>
            <Pencil color="#0C21C1B3" size={20} className="cursor-pointer" />
          </div>
        </div>
        <div className="flex flex-col border-b-[1px] border-[#00000033] w-[45%] py-4">
          <p className="font-semibold pb-1">How many children do you have</p>
          <div className="flex justify-between">
            <p className="text-[#000000CC] font-normal">0</p>
            <Pencil color="#0C21C1B3" size={20} className="cursor-pointer" />
          </div>
        </div>
      </div>
    </>
  );
}
