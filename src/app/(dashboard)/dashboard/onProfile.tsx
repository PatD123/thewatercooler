import Image from "next/image";
import React, { useEffect, useState } from "react";
import { editActivity } from "@/app/actions/editProfile";

export default function OnProfile({
  activity,
  bio,
  setShowSearch,
  movies,
  tvShows,
  setAddCine,
}: {
  activity: boolean[];
  bio: string;
  setShowSearch: any;
  movies: string[];
  tvShows: string[];
  setAddCine: any;
}) {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="mt-5 px-4 pb-2 w-full">
      <div className="bg-white/10 rounded-lg h-full text-white p-3">
        <div className="flex">
          {/* Left Side */}
          <div className="flex-none h-full">
            {/* Fav TV Shows */}
            <h1 className="text-cyan-500 font-bold">Favorite TV Shows</h1>
            <div className="grid grid-rows-1 grid-cols-4 mt-2 gap-x-3">
              {tvShows.map((vals, i) => (
                <div
                  key={i}
                  className="rounded-lg"
                  style={{
                    position: "relative",
                    height: "200px",
                    width: "100px",
                  }}
                >
                  <Image
                    src={tvShows[i]}
                    alt="movie"
                    className="rounded-lg"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}

              {/* Plus Sign to Add Fav TV Shows */}
              {tvShows.length < 4 ? (
                <div>
                  <button
                    onClick={() => {
                      setShowSearch(1);
                      setAddCine("Favorite TV Show");
                    }}
                  >
                    <Image
                      src="/plus-sign.svg"
                      className="h-10 w-10 invert-1 rounded-full mt-20 rotate-180 transition duration-300 hover:ease-out hover:scale-125"
                      width={30}
                      height={30}
                      alt="plus"
                    />
                  </button>
                </div>
              ) : null}
            </div>

            {/* Fav Movies */}
            <h1 className="text-cyan-500 font-bold mt-5">Favorite Movies</h1>
            <div className="grid grid-rows-1 grid-cols-4 mt-2 gap-x-3">
              {movies.map((vals, i) => (
                <div
                  key={i}
                  className="rounded-lg"
                  style={{
                    position: "relative",
                    height: "200px",
                    width: "100px",
                  }}
                >
                  <Image
                    src={movies[i]}
                    alt="movie"
                    className="rounded-lg"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}

              {/* Plus Sign to Add Fav Movies */}
              {movies.length < 4 ? (
                <div>
                  <button
                    onClick={() => {
                      setShowSearch(1);
                      setAddCine("Favorite Movie");
                    }}
                  >
                    <Image
                      src="/plus-sign.svg"
                      className="h-10 w-10 invert-1 rounded-full mt-20 rotate-180 transition duration-300 hover:ease-out hover:scale-125"
                      width={30}
                      height={30}
                      alt="plus"
                    />
                  </button>
                </div>
              ) : null}
            </div>
          </div>
          {/* Divider */}
          <div className="divider divider-horizontal divider-info"></div>
          {/* Right Side */}
          <div className="h-full">
            <div className="text-lg text-cyan-500 font-bold">Bio</div>
            <div className="text-sm text-slate-300">{bio}</div>

            {/* Tags */}
            <h1 className="text-cyan-500 font-bold mt-2">Tags</h1>
            <div>
              {[1, 2, 3, 4].map((vals, i) => (
                <p key={i} className="text-cyan h-5 w-5 text-xs">
                  Fanatic
                </p>
              ))}
            </div>

            {/* Activity */}
            <h1 className="text-cyan-500 font-bold mt-2">{`Activity (${
              monthNames[new Date().getMonth()]
            })`}</h1>
            <div className="grid grid-rows-auto grid-cols-7 gap-1 mt-2">
              {activity.map((val, i) => (
                <div
                  key={i}
                  className={`h-6 w-6 rounded-lg ${
                    !val ? "bg-slate-300" : "bg-green-300"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
