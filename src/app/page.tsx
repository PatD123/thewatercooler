"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  return (
    <div className="bg-gradient-to-r from-amber-500 to-cyan-500">
      <div className="hero min-h-screen">
        <div className="hero-content text-center mb-80">
          <div className="max-w-max">
            <h1 className="text-5xl font-bold">
              Watch it together. Enjoy it together.
            </h1>
            <p className="font-light py-6">
              Get the inside scoop of what your friends and family are tuning
              into.
            </p>
            <button
              className="btn btn-primary"
              onClick={() => router.push("/get-started")}
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
