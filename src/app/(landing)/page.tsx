"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";
import { useEffect, useState, Suspense, useRef } from "react";
import { getPopular } from "@/app/lib/data";
import Image from "next/image";

import {
  motion,
  useScroll,
  useMotionValueEvent,
  useTransform,
  useSpring,
} from "framer-motion";

export default function Home() {
  const router = useRouter();
  return (
    <div className="bg-transparent">
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
                  <button className="btn btn-info btn-lg">Get Started</button>
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
      <div className="divider mt-72 divider-info text-black">Easter Egg</div>
      <div className="mt-20">
        <div className="text-3xl text-white">
          <p>
            You're reconnecting with a college friend you haven't seen in years.
          </p>
          <p className="mt-2">
            You're hitting it off with a person you've just met at a pickup
            game.
          </p>
          <p className="mt-2">
            Or perhaps, you're hanging out with a person you met only just last
            week.
          </p>
          <div className="flex mt-2">
            <p>Never need to ask the question, </p>
            <p className="ml-1 italic">"What have you been watching lately?"</p>
          </div>
          <p className="text-5xl text-cyan-500">You'll just know.</p>
        </div>
      </div>
      <div className="divider mt-20 divider-info text-black">Easter Egg</div>
      <div className="text-6xl mt-5 text-white">Build a Profile</div>
    </div>
  );
}

export function Accordion() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });
  const escale = useTransform(scrollYProgress, [0, 1], [0.5, 2]);
  const slowScroll = useTransform(scrollYProgress, [0, 1], [0, 1000]);

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
