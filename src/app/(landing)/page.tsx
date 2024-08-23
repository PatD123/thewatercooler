"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";
import { useEffect, useState, Suspense } from "react";
import { getPopular } from "@/app/lib/data";
import Image from "next/image";

import {
  motion,
  useScroll,
  useMotionValueEvent,
  useTransform,
} from "framer-motion";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex bg-black min-h-screen min-w-screen justify-center">
      <Accordion />
    </div>
  );
}

export function Accordion() {
  // Framer stuff
  const { scrollYProgress } = useScroll();
  const escale = useTransform(scrollYProgress, [0, 0.4], [0, 1.3]);

  const [shows, setShows] = useState([]);

  useEffect(() => {
    getPopular().then((json) => {
      console.log(json);
      setShows(json["results"].slice(0, 10));
    });
  }, []);

  return (
    <div className="relative bg-black min-h-full min-w-full">
      <div className="absolute z-40">
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
      <div className="bg-black z-0">
        <motion.div style={{ scale: escale }}>
          <div className="relative mt-48">
            <div className="absolute border-black border-b-[100px] z-10 w-full h-48 rounded-[70%] -mt-24"></div>
            <div className="absolute border-black border-t-[100px] z-10 w-full h-48 rounded-[70%] bottom-0 left-0 -mb-24"></div>
            <div className="grid grid-cols-10 z-1">
              {shows.map((show, i) => (
                <div
                  className=""
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
