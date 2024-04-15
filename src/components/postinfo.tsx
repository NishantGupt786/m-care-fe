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

export default function MyPosts() {
  const [data, setData] = useState<ForumResponse2 | null>(null);

  useEffect(() => {
    async function getAllPosts() {
      const access_token: string | null = localStorage.getItem("access_token");
      const response = await axios.get(
        "http://ec2-3-110-176-87.ap-south-1.compute.amazonaws.com:8080/forum/myposts",
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
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
      <div className="flex flex-col bg-white text-black">
        <div className="mt-8 mx-auto w-full">
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
