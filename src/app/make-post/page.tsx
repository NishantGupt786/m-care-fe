"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import prof from "@/assets/profico.svg";
import toast from "react-hot-toast";

export default function MakePost() {
  const Router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState("");
  const [file, setFile] = useState<string | undefined>(undefined);
  const handleTitleChange = (e: any) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: any) => {
    setDescription(e.target.value);
  };

  const handleImageChange = (e: any) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const imageUrl = URL.createObjectURL(selectedImage);
      setFile(imageUrl);
    }
    setImage(selectedImage);

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
        "http://ec2-3-110-176-87.ap-south-1.compute.amazonaws.com:8080/forum/create ",
        send,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      console.log(response.data);
      toast.success("Post submitted successfully");
      setTimeout(() => {
        Router.push("/forum");
      }, 1000);
    } catch (error: any) {
      console.error("Error submitting post:", error);
      toast.error(error.response.data.message || "Something went wrong");
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
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Title"
              className="w-full"
            />
          </div>
          <div className="border-2 border-black rounded-md">
            <div className="relative w-[600px] h-[300px] overflow-hidden">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-[100]"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-700">
                {file ? (
                  <img
                    src={file}
                    alt="Uploaded Image"
                    className="max-w-full max-h-full"
                  />
                ) : (
                  <>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                    <span>Upload an image</span>
                  </>
                )}
              </div>
            </div>
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

          <button
            onClick={handleSubmit}
            className="bg-[#0C21C1] py-2 px-4 mt-4 rounded-lg text-white"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
