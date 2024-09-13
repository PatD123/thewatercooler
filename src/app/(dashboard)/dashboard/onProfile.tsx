import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function OnProfile({
  favTVShowSrc,
  bio,
  setShowSearch,
  movies,
  tvShows,
  setAddCine,
}: {
  favTVShowSrc: string;
  bio: string;
  setShowSearch: any;
  movies: string[];
  tvShows: string[];
  setAddCine: any;
}) {
  const [favMovies, setFavMovies] = useState([]);
  const [favTVShows, setFavTVShows] = useState([]);

  return (
    <div className="mt-10 px-4 pb-2 w-full h-full">
      <div className="h-[95%]">
        <div className="bg-white/10 rounded-lg h-full text-white p-3">
          <div className="flex">
            {/* Left Side */}
            <div className="flex-none h-full">
              {/* Fav TV Shows */}
              <h1 className="text-slate-200 font-bold">Favorite TV Shows</h1>
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
              <h1 className="text-slate-200 font-bold mt-2">Favorite Movies</h1>
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

              {/* Tags */}
              <h1 className="text-slate-200 font-bold mt-2">Tags</h1>
              <div className="flex">
                {[1, 2, 3, 4].map((vals, i) => (
                  <span
                    key={i}
                    className="rounded-lg bg-green-400 px-2 py-2 text-xs text-green-700/70 mr-1 mt-2"
                  >
                    Fanatic
                  </span>
                ))}
              </div>
            </div>
            {/* Divider */}
            <div className="divider divider-horizontal divider-info"></div>
            {/* Right Side */}
            <div className="h-full">
              <div className="text-lg text-slate-200 font-bold">Bio</div>
              <div className="text-sm text-slate-300">{bio}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
