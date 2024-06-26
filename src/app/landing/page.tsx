"use client";
import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.svg";
import prof from "@/assets/profico.svg";
import icon1 from "@/assets/icon1.svg";
import icon2 from "@/assets/icon2.svg";
import icon3 from "@/assets/icon3.svg";
import banner2icon from "@/assets/banner2icon.png";
import banner3icon from "@/assets/banner3icon.png";
import ReactSimplyCarousel from "react-simply-carousel";
import { useState, useEffect } from "react";
import axios from "axios";

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

export default function Landing() {
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [data, setData] = useState<ForumResponse2 | null>(null);

  useEffect(() => {
    async function getAllPosts() {
      const response = await axios.get(
        "http://ec2-3-110-176-87.ap-south-1.compute.amazonaws.com:8080/forum/posts/all"
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
      <div className="flex flex-col bg-white min-h-screen overflow-x-hidden">
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
        <div className="w-screen banner h-[430px] mt-4 flex flex-col justify-center">
          <div className="px-24 w-[55%]">
            <h1 className="text-4xl font-bold py-6">
              Give Yourself the Best Care!
            </h1>
            <p className="pb-6 text-xl">
              Feeling overwhelmed after childbirth? Use our chatbot to check for
              signs of postpartum depression and find the support you need.
            </p>
            <button className="rounded-full py-2 px-8 text-xl bg-[#0C21C1]">
              Test
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-[50%] bg-white"></div>
          <div className="absolute bottom-0 left-0 w-full h-[50%] bg-[#0C21C1CC]"></div>
          <div className="flex justify-evenly overflow-x-hidden mt-14 relative z-10 mb-24">
            <div className="rounded-xl bg-[#0C21C1] flex flex-col justify-center items-center w-[25%] py-12">
              <Image src={icon1} alt="icon1" className="pb-4" />
              <h1 className="font-bold text-2xl pb-4">All-in-One</h1>
              <p className="text-center text-lg">
                Get prenatal care, education, counseling, and community
                resources in one platform.
              </p>
            </div>
            <div className="rounded-xl bg-[#0C21C1] flex flex-col justify-center items-center w-[25%] py-12">
              <Image src={icon2} alt="icon2" className="pb-4" />
              <h1 className="text-2xl font-bold pb-4">Connect and Share</h1>
              <p className="text-center text-lg">
                Share your journey, seek advice, and connect with others facing
                similar challenges.
              </p>
            </div>
            <div className="rounded-xl bg-[#0C21C1] flex flex-col justify-center items-center w-[25%] py-12">
              <Image src={icon3} alt="icon3" className="pb-4" />
              <h1 className="font-bold text-2xl pb-4">Social Integration</h1>
              <p className="text-center px-4 text-lg">
                Easily connect with family, friends, and support groups for
                added support through the app.
              </p>
            </div>
          </div>
        </div>
        <div className="bg-[#0C21C1CC] flex w-full pb-12">
          <Image src={banner2icon} alt="logo" className="" />
          <div className="flex flex-col">
            <div className="flex flex-col w-[93%]">
              <h1 className="text-3xl font-bold">Prioritize your health </h1>
              <p className="text-xl py-5 border-b-[1px] border-[#000000CC] w-full">
                Take the first step.
              </p>
            </div>
            <div className="flex gap-x-5 2xl:gap-x-10 w-full mt-6">
              <div className="flex flex-col w-[30%]">
                <h1 className="text-4xl font-bold">1 in 3</h1>
                <p>
                  expectant mothers reaching out to us seek support for managing
                  anxiety or emotional challenges. You&apos;re not alone on this
                  journey.
                </p>
              </div>
              <div className="flex flex-col w-[30%]">
                <h1 className="text-4xl font-bold">10 lakh+</h1>
                <p>
                  conversations have been participated in by users with out
                  chatbot.
                </p>
              </div>
              <div className="flex flex-col w-[30%]">
                <h1 className="text-4xl font-bold">300+</h1>
                <p>
                  connections forged with local services, such as prenatal care
                  counseling hotlines, to provide a wide range of support
                  options for expectant mothers.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center my-8">
          <Image src={logo} alt="logo" />
          <ReactSimplyCarousel
            activeSlideIndex={activeSlideIndex}
            onRequestChange={setActiveSlideIndex}
            itemsToShow={1}
            itemsToScroll={1}
            autoplay={true}
            autoplayDelay={5}
            dotsNav={{
              show: true,
              itemBtnProps: {
                style: {
                  height: 8,
                  width: 8,
                  borderRadius: "50%",
                  border: 0,
                  background: "#00000066",
                  marginRight: "8px",
                },
              },
              activeItemBtnProps: {
                style: {
                  height: 8,
                  width: 8,
                  borderRadius: "50%",
                  border: 0,
                  background: "#0C21C1",
                  marginRight: "8px",
                },
              },
            }}
            responsiveProps={[
              {
                itemsToShow: 1,
                itemsToScroll: 1,
                minWidth: 768,
              },
            ]}
            speed={400}
            easing="linear"
          >
            {/* here you can also pass any other element attributes. Also, you can use your custom components as slides */}

            <div
              style={{ width: 1000, height: 300, background: "white" }}
              className=" text-black text-center flex flex-col justify-center items-center gap-y-8"
            >
              <h1 className="text-4xl ">
                &quot;The community aspect of this app is fantastic! Connecting
                with other moms-to-be and sharing experiences has been both
                comforting and empowering.&quot;
              </h1>
              <div className="bg-[#0C21C1] px-4 py-2 rounded-lg text-white">
                Nishant Gupta{" "}
              </div>
            </div>
            <div
              style={{ width: 1000, height: 300, background: "white" }}
              className=" text-black text-center flex flex-col justify-center items-center gap-y-8"
            >
              <h1 className="text-4xl ">
                &quot;The community aspect of this app is fantastic! Connecting
                with other moms-to-be and sharing experiences has been both
                comforting and empowering.&quot;
              </h1>
              <div className="bg-[#0C21C1] px-4 py-2 rounded-lg text-white">
                Nishant Gupta{" "}
              </div>
            </div>
            <div
              style={{ width: 1000, height: 300, background: "white" }}
              className=" text-black text-center flex flex-col justify-center items-center gap-y-8"
            >
              <h1 className="text-4xl ">
                &quot;The community aspect of this app is fantastic! Connecting
                with other moms-to-be and sharing experiences has been both
                comforting and empowering.&quot;
              </h1>
              <div className="bg-[#0C21C1] px-4 py-2 rounded-lg text-white">
                Nishant Gupta{" "}
              </div>
            </div>
            <div
              style={{ width: 1000, height: 300, background: "white" }}
              className=" text-black text-center flex flex-col justify-center items-center gap-y-8"
            >
              <h1 className="text-4xl ">
                &quot;The community aspect of this app is fantastic! Connecting
                with other moms-to-be and sharing experiences has been both
                comforting and empowering.&quot;
              </h1>
              <div className="bg-[#0C21C1] px-4 py-2 rounded-lg text-white">
                Nishant Gupta
              </div>
            </div>
          </ReactSimplyCarousel>
        </div>
        <div className="flex flex-col mx-auto mt-12 text-black">
          <div className="flex items-center">
            <h1 className="text-3xl font-semibold">Welcome to Our Forum!</h1>
          </div>
          <p className="text-[#00000066]">
            Join our supportive forum for expert advice, shared experiences, and
            a caring community
          </p>
          <p className="text-[#00000066]">
            to guide you through your pregnancy journey!
          </p>
        </div>
        <div className="mt-8 mx-auto w-[55%] text-black">
          {data &&
            data.posts.slice(0, 2).map((post, index) => (
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
        <div className="mx-auto flex w-[55%] justify-end pr-8 mb-8">
          <Link href="/forum" className="">
            <p className="text-[#29292999]">View more</p>
          </Link>
        </div>
        <div className="bg-[#0C21C1CC] flex w-full pb-12 pt-8  justify-evenly items-center">
          <div className="flex flex-col gap-y-6">
            <h1 className="text-6xl font-bold">Need Help ?</h1>
            <p className="text-3xl">
              Reach out to our helpline for maternal health support.
            </p>
            <div className="flex gap-x-4">
              <div className="bg-[#0C21C1] px-4 py-3 rounded-lg text-xl text-white">
                Contact Us: +919632766066
              </div>
              <div className="bg-[#0C21C1] px-4 py-3 rounded-lg text-white text-xl">
                Mail Us: helpline@gmail.com
              </div>
            </div>
          </div>
          <Image src={banner3icon} alt="logo" className="" />
        </div>
      </div>
    </>
  );
}
