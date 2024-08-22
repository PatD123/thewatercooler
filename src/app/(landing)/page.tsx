"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import React from "react";
import { useEffect, useState, Suspense } from "react";
import { getPopular } from "@/app/lib/data";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex bg-black w-screen h-screen justify-center">
      <Accordion />
    </div>
  );
}

export function Accordion() {
  const [shows, setShows] = useState([]);
  useEffect(() => {
    getPopular().then((json) => {
      console.log(json);
      setShows(json["results"].slice(0, 10));
    });
  }, []);
  return (
    <Suspense fallback={<div>Loading</div>}>
      <div className="relative mt-5">
        <div className="absolute border-black border-b-[100px] z-10 w-full h-48 rounded-[70%] -mt-24"></div>
        <div className="absolute border-black border-t-[100px] z-10 w-full h-48 rounded-[70%] mt-80"></div>
        <div className="grid grid-cols-10 z-0">
          {shows.map((show, i) => (
            <div
              className=""
              style={{
                position: "relative",
                width: "100px",
                height: "400px",
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
    </Suspense>
  );
}
