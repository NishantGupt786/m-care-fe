"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { NotebookPen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import prof from "@/assets/profico.svg";

interface ForumResponse {
  title: string;
  desc: string;
  image: string;
  author: string;
  createdAt: string;
  _id: string;
}

interface ForumResponse2 {
  posts: ForumResponse[];
}

export default function Forum() {
  const [data, setData] = useState<ForumResponse2 | null>(null);

  useEffect(() => {
    async function getAllPosts() {
      const response = await axios.get(
        "https://ec2-3-110-176-87.ap-south-1.compute.amazonaws.com:8080/forum/posts/all"
      );
      console.log(response.data);
      setData(response.data);
    }
    getAllPosts();
  }, []);

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  return (
    <>
      <div className="flex flex-col bg-white min-h-screen text-black">
        <div className="flex justify-between mt-6 mx-6">
          <Image src={logo} alt="logo" />
          <div className="flex gap-x-8 text-gray-900">
            <Link href="/landing">Home</Link>
            <Link href="">ChatBot</Link>
          </div>
          <Link href="/accountinfo">
            <Image src={prof} alt="profile icon" />
          </Link>
        </div>
        <div className="flex flex-col mx-auto mt-12">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-semibold">Welcome to Our Forum!</h1>
            <Link href="/make-post">
              <span className="flex gap-x-2">
                <span>Write a post </span>
                <NotebookPen color="#1024C2" />
              </span>
            </Link>
          </div>
          <p className="text-[#00000066]">
            Join our supportive forum for expert advice, shared experiences, and
            a caring community
          </p>
          <p className="text-[#00000066]">
            to guide you through your pregnancy journey!
          </p>
        </div>
        <div className="mt-8 mx-auto w-[55%]">
          {data &&
            data.posts.map((post, index) => (
              <div key={index} className="p-4 m-4 border-b-2">
                <div className="flex gap-x-6 mb-4 items-center text-[#00000066]">
                  <Image src={prof} alt="logo" />
                  <p>{post.author}</p>
                  <p>{post.createdAt}</p>
                </div>
                <Link href={`/forum/${post._id}`}>
                  <h2 className="text-2xl font-semibold">{post.title}</h2>
                </Link>
                <div className="flex gap-x-2 items-center">
                  <p className="font-light georgia w-[70%]">
                    {truncateText(post.desc, 200)}
                  </p>
                  {post.image && (
                    <div className="mt-2 w-[30%]">
                      <Image
                        src={post.image}
                        alt="post image"
                        width={200}
                        height={200}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
