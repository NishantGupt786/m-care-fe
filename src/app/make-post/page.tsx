"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import prof from "@/assets/profico.svg";

export default function MakePost() {
  const Router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState("");

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e: any) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    // Read image file as base64
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === "string") {
        setImageBase64(reader.result);
      }
    };
    reader.readAsDataURL(selectedImage);
  };

  const handleSubmit = async () => {
    const access_token: string | null = localStorage.getItem("access_token");
    try {
      const send = {
        title: title,
        desc: description,
        image: imageBase64,
      };
      const response = await axios.post(
        "https://yantra-hack.onrender.com/forum/create ",
        send,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      console.log(response.data);
      Router.push("/forum");
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <>
      <div className="bg-white min-h-screen text-black flex flex-col">
        <div className="flex justify-between mt-6 mx-6 items-center">
          <Image src={logo} alt="logo" />
          <div className="flex gap-x-8 text-gray-900">
            <Link href="/landing">Home</Link>
            <Link href="">ChatBot</Link>
            <Link href="/forum">Forum</Link>
          </div>
          <Image src={prof} alt="profile icon" />
        </div>
        <div className="georgia flex flex-col items-center my-8">
          <div className="text-4xl w-[600px] mb-4">
            
            <input type="text" value={title} onChange={handleTitleChange} placeholder="Title" />
          </div>
          <div className="border-2 border-black rounded-md">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-[600px] h-[300px]"
            />
          </div>
          <div className="flex flex-col w-[600px] mt-4">
            
            <textarea
              value={description}
              rows={5}
              onChange={handleDescriptionChange}
              className="text-2xl"
              placeholder="Tell us your story"
            />
          </div>

          <button onClick={handleSubmit} className="bg-[#0C21C1] py-2 px-4 mt-4 rounded-lg text-white">
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
