"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";
import { useEffect, useState, Suspense, useRef } from "react";
import { getPopular } from "@/app/lib/data";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { AnimatedTooltipPreview } from "@/components/ui/animated-tooltip";

import {
  motion,
  useScroll,
  useMotionValueEvent,
  useTransform,
  useSpring,
} from "framer-motion";

let pins = [
  {
    id: 1,
    name: "The Irishman",
    designation: "Favorite Movie",
    image:
      "https://image.tmdb.org/t/p/original/mbm8k3GFhXS0ROd9AD1gqYbIFbM.jpg",
  },
  {
    id: 2,
    name: "Resident Alien",
    designation: "Favorite TV Show",
    image:
      "https://image.tmdb.org/t/p/original/5van3ktOTqWr5lcixh5aR8NlqqW.jpg",
  },
  {
    id: 3,
    name: "Mr. Robot",
    designation: "Current TV Show",
    image:
      "https://image.tmdb.org/t/p/original/oKIBhzZzDX07SoE2bOLhq2EE8rf.jpg",
  },
  {
    id: 4,
    name: "Avatar",
    designation: "Avatar",
    image: "/pulp.webp",
  },
];

export default function Home() {
  const router = useRouter();
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const escale = useTransform(scrollYProgress, [0.6, 1], [0.5, 1.5]);
  return (
    <div className="bg-gradient-to-b from-cyan-300 to-rose-300">
      <div>
        <div className="flex relative w-full h-full">
          <Accordion />
          <div className="flex absolute w-full h-full">
            <div className="flex-none z-1">
              <div className="flex-none h-72 w-72"></div>
              <div className="flex justify-center">
                <h1 className="text-9xl text-cyan-900">the watercooler</h1>
              </div>
              <div className="flex justify-center">
                <h1 className="text-9xl text-white">the watercooler</h1>
              </div>
              <div className="flex justify-center">
                <h1 className="text-9xl text-white">the watercooler</h1>
              </div>
              <div className="flex justify-center">
                <h1 className="text-9xl text-white">the watercooler</h1>
              </div>
            </div>
            <div className="flex relative z-1 ml-5 mt-60 w-full h-full">
              <div className="absolute bottom-0 left-0">
                <div className="flex-none w-full h-full">
                  <p className="text-4xl text-cyan-700">Watch it together.</p>
                  <p className="text-4xl text-white">Enjoy it together.</p>
                </div>
                <div className="py-5">
                  <button
                    className="bg-cyan-300 btn-lg rounded-lg"
                    onClick={() => router.push("/get-started")}
                  >
                    Get Started
                  </button>
                </div>
              </div>
              <div className="absolute bottom-0 right-0">
                <Image
                  src="/dashboard_icon.ico"
                  className="h-40 w-40 rounded-full mb-5"
                  width={20}
                  height={20}
                  alt="Avatar"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-96">
        <div className="text-3xl text-white rounded-lg bg-slate-300/40 p-8">
          <div>
            <div className="flex">
              <p>You're reconnecting with a college friend.</p>
              <p className="flex-none ml-8 text-black font-bold	line-through">
                "What have you been watching lately?"
              </p>
            </div>
            <div className="flex mt-8">
              <p>You're hitting it off with a stranger.</p>
              <p className="flex-none ml-8 text-black font-bold	line-through">
                "What have you been watching lately?"
              </p>
            </div>
            <div className="flex mt-8">
              <p>Or perhaps, just hanging out.</p>
              <p className="flex-none ml-8 text-black font-bold	line-through">
                "What have you been watching lately?"
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-16">
        <CardContainer className="inter-var h-full">
          <motion.div style={{ scale: escale }} initial={{ scale: 0 }}>
            <CardBody className="flex bg-rose-100 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-4 border">
              <CardItem translateZ="50" className="flex-none w-2/5">
                <Image
                  src={
                    "https://image.tmdb.org/t/p/original/oKIBhzZzDX07SoE2bOLhq2EE8rf.jpg"
                  }
                  height="1000"
                  width="1000"
                  className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
                  alt="thumbnail"
                />
              </CardItem>
              <div className="ml-2">
                <CardItem
                  translateZ="100"
                  className="flex w-full text-xl font-bold text-sky-600"
                >
                  {"theonceler"}
                  <p className="text-xs mt-1.5 ml-1"> ({"Patrick Dai"})</p>
                </CardItem>
                <CardItem
                  translateZ="100"
                  className="w-full text-xl items-start font-bold text-neutral-600 dark:text-white mt-2"
                >
                  <div className="w-full">
                    <h2 className="card-title">Bio</h2>
                    <p className="whitespace-pre-wrap text-xs">
                      {
                        "Hi, I go to UCLA, currently a junior. I wanna fix cars."
                      }
                    </p>
                  </div>
                </CardItem>
                <CardItem
                  translateZ="100"
                  className="w-full text-xl items-start font-bold text-neutral-600 dark:text-white mt-2"
                >
                  <AnimatedTooltipPreview pins={pins} />
                </CardItem>
              </div>
            </CardBody>
          </motion.div>
        </CardContainer>
      </div>

      <div className="flex justify-center mt-40 pb-5">
        <h1 className="text-white text-5xl">You'll just know.</h1>
      </div>
    </div>
  );
}

export function Accordion() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const escale = useTransform(scrollYProgress, [0, 1], [0.5, 2]);
  const slowScroll = useTransform(scrollYProgress, [0, 1], [0, 500]);

  const [shows, setShows] = useState([]);

  useEffect(() => {
    getPopular().then((json) => {
      console.log(json);
      setShows(json["results"].slice(0, 10));
    });
  }, []);

  return (
    <div className="relative bg-black z-0 w-full h-full overflow-hidden">
      <div>
        <motion.div
          style={{ scale: escale, y: slowScroll }}
          initial={{ scale: 0 }}
        >
          <div className="relative mt-16">
            <div className="absolute border-black border-b-[100px] z-10 w-full h-48 rounded-[70%] -mt-24 ml-10"></div>
            <div className="absolute border-black border-t-[100px] z-10 w-full h-48 rounded-[70%] bottom-0 left-0 -mb-24 ml-10"></div>
            <div className="grid grid-cols-10 z-1">
              {shows.map((show, i) => (
                <div
                  className="mx-10"
                  style={{
                    position: "relative",
                    width: "150px",
                    height: "500px",
                  }}
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/original${show["poster_path"]}`}
                    alt="Image"
                    fill
                    className="object-none object-center"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
