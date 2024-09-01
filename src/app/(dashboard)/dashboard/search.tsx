import React, { useState, Suspense, useRef, useEffect } from "react";
import { BentoGridSearch } from "@/components/ui/bentoGrid";
import {
  addFavMovies,
  addFavTVShows,
  getUser,
} from "@/app/actions/editProfile";
import Image from "next/image";

export default function Search({
  setShowSearch,
  userEmail,
}: {
  setShowSearch: any;
  userEmail: any;
}) {
  const [bento, setBento] = useState(0);

  const [cineName, setCineName] = useState("");
  const [currTVShowPosterSrc, setCurrTVShowPosterSrc] = useState("");
  const [cineImgSrc, setCineImgSrc] = useState("");

  const searchRef = useRef<any>(null);

  const handleOutsideClick = (e: any) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setShowSearch(0);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  const addMovie = async () => {
    getUser(userEmail as string)
      .then((user) => {
        return user["_id"];
      })
      .then((id) => {
        console.log(id);
        addFavMovies(id, cineImgSrc);
      });
  };

  const addTVShow = async () => {
    getUser(userEmail as string)
      .then((user) => {
        return user["_id"];
      })
      .then((id) => {
        console.log(id);
        addFavTVShows(id, cineImgSrc);
      });
  };

  return (
    <div
      className="absolute w-[70%] h-5/6 mt-16 bg-gray-300/30 border-2 border-gray-300 backdrop-blur-2xl rounded-lg shadow-xl z-10"
      ref={searchRef}
    >
      <div className="flex justify-center mt-4 w-full">
        <div className="pt-3.5">
          <Image
            src="/search.svg"
            className="absolute ml-1 h-4 w-4 bg-slate-300/0"
            width={30}
            height={30}
            alt="Avatar"
          />
        </div>
        <input
          type="search"
          id="search-dropdown"
          className="w-1/2 text-sm text-black rounded-xl bg-slate-300/50 py-3 pl-6"
          placeholder="Search"
          onChange={() => setBento(1)}
          onClick={() => setBento(1)}
          required
          autoComplete="off"
        />
        <button
          className="ml-3 w-16 bg-sky-900 text-slate-300 rounded-lg hover:bg-sky-700 hover:border-2 hover:border-sky-900"
          onClick={addTVShow}
        >
          Add
        </button>
      </div>
      <div className="flex justify-center mt-4 w-full h-full">
        {/* Bento Box of List Cinema */}
        {bento ? (
          <div className="flex justify-center h-full w-[70%]">
            <BentoGridSearch
              query="The Joker"
              qtype="Favorite Movie"
              setCineName={setCineName}
              setCineImgSrc={setCineImgSrc}
              setCurrTVShowPosterSrc={setCurrTVShowPosterSrc}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
