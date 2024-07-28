"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  return (
    <div className="bg-gradient-to-r from-amber-500 to-cyan-500">
      <div className="navbar">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">
            <h1 className="text-xl font-bold text-info">
              <span className="text-teal-900">the</span>
              <span className="text-teal-700">watercooler</span>
            </h1>
            <Image
              className="object-fill"
              src="/favicon.ico"
              width={35}
              height={35}
              alt="Picture of the author"
            />
          </a>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Pricing</a>
            </li>
            <li>
              <a>FAQ</a>
            </li>
          </ul>
        </div>

        <div className="navbar-end">
          <a className="btn">Sign In</a>
        </div>
      </div>
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
