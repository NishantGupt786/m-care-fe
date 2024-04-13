"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.svg";
import prof from "@/assets/profico.svg";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Trash2, MessageCircle } from "lucide-react";
import { slide as Menu } from "react-burger-menu";
import { useRouter } from "next/navigation";

interface Comment {
  user: string;
  name: string;
  comment: string;
  _id: string;
  createdAt: string;
}

interface ForumResponse2 {
  post: {
    title: string;
    desc: string;
    image: string;
    author: string;
    createdAt: string;
    _id: string;
    comments: [Comment];
  };
}

export default function Post() {
  const commentsSectionRef = useRef<HTMLDivElement>(null);
  const Router = useRouter();
  const pathname = usePathname();
  const name = localStorage.getItem("name");
  const [commentText, setCommentText] = useState("");
  const [openComment, setOpenComment] = useState(false);
  const [data, setData] = useState<ForumResponse2 | null | any>(null);
  const id = pathname.replace("/forum/", "");

  useEffect(() => {
    async function getPost() {
      try {
        const response = await axios.get(
          `https://yantra-hack.onrender.com/forum/${id}`
        );
        setData(response.data);
      } catch (e) {
        console.log(e);
      }
    }
    getPost();
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        commentsSectionRef.current &&
        !commentsSectionRef.current.contains(event.target as Node)
      ) {
        setOpenComment(false);
      }
    }

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  async function addComment() {
    const access_token: string | null = localStorage.getItem("access_token");
    if (!access_token) {
      Router.push("/");
    }
    try {
      const response = await axios.put(
        `https://yantra-hack.onrender.com/forum/${id}`,
        {
          comment: commentText,
        },
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      const newComment: Comment = {
        user: name ?? "",
        name: name ?? "",
        comment: commentText,
        _id: response.data.commentId,
        createdAt: new Date().toISOString(),
      };
      setData((prevData: any) => {
        if (!prevData) {
          return {
            post: {
              title: "",
              desc: "",
              image: "",
              author: "",
              createdAt: "",
              _id: "",
              comments: [newComment],
            },
          };
        }

        return {
          ...prevData,
          post: {
            ...prevData.post,
            comments: [...prevData.post.comments, newComment],
          },
        };
      });

      setCommentText("");
      setOpenComment(false);
      setTimeout(() => {
        if (commentsSectionRef.current) {
          commentsSectionRef.current.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }
      }, 200);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <>
      <div className="flex flex-col bg-white min-h-screen cursor-default">
        <Menu
          isOpen={openComment}
          right
          className="bg-white text-black"
          // onClose={() => setOpenComment(false)}.
          width={"374px"}
        >
          <div className="h-full">
            <div className="flex flex-col mt-4 mx-3 ">
              <div className="flex flex-col gap-x-3 p-3 text-black shadow-lg rounded-lg">
                <div className="flex gap-x-3 items-center">
                  <Image src={prof} alt="profile" />
                  <p className="text-[#292929]">{name}</p>
                </div>

                <textarea
                  rows={4}
                  placeholder="What are your thoughts?"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="mx-2 mt-2 p-3"
                />
                <button
                  className="bg-[#0C21C1] self-end rounded-md p-2 text-white text-sm mr-2"
                  onClick={addComment}
                >
                  Comment
                </button>
              </div>
              <div ref={commentsSectionRef}>
                {data?.post.comments.map((comment: any) => (
                  <div
                    key={comment._id}
                    className="flex flex-col gap-x-3 items-center mt-4 border-t-2 georgia"
                  >
                    <div className="flex text-sm mt-4 w-full justify-between">
                      <div className="flex gap-x-3 items-center">
                        <Image src={prof} alt="profile" />
                        <div className="flex flex-col">
                          <p className="text-[#292929]">{comment.name}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col self-start mt-2">
                      <p className="text-[#292929]">{comment.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Menu>

        <div className="flex justify-between mt-6 mx-6 z-[100]">
          <Image src={logo} alt="logo" />
          <div className="flex gap-x-8 text-gray-900">
            <Link href="/landing">Home</Link>
            <Link href="">ChatBot</Link>
            <Link href="/forum">Forum</Link>
            
          </div>
          <Link href="/accountinfo">
            <Image src={prof} alt="profile icon" />
          </Link>
        </div>
        <div className="mx-auto w-[50%] mt-8 georgia">
          <div className="text-4xl text-black">{data?.post.title}</div>
          <div className="flex text-sm mt-4 w-full justify-between">
            <div className="flex gap-x-3 items-center">
              <Image src={prof} alt="profile" />
              <div className="flex flex-col">
                <p className="text-[#292929]">{data?.post.author || "User"}</p>
                <p className="text-[#757575]">{data?.post.createdAt}</p>
              </div>
            </div>
            <div className="flex gap-x-3 text-[#00000099] items-center">
              <span className="flex items-center gap-x-1">
                <MessageCircle className="cursor-pointer" />
                <span>{data?.post.comments.length}</span>
              </span>
            </div>
          </div>
          <div className="text-black mt-4">{data?.post.desc}</div>
        </div>
      </div>
    </>
  );
}
