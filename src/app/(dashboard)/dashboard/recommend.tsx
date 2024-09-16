"use client";

import React, { useState, Suspense, useRef, useEffect } from "react";
import { BentoGridSearch } from "@/components/ui/bentoGrid";
import {
  addFavMovies,
  addFavTVShows,
  getUser,
} from "@/app/actions/editProfile";
import Image from "next/image";
import { useDebouncedCallback } from "use-debounce";
import RecommendUser from "@/app/(dashboard)/dashboard/recommendUser";

// Users to recommend other friends movies and tv shows.
export default function Recommend({
  setShowUserSearch,
  userEmail,
  cine,
}: {
  setShowUserSearch: any;
  userEmail: any;
  cine: string;
}) {
  const searchRef = useRef<any>(null);

  const [haveUserList, setHaveUserList] = useState(0);
  const [queryUser, setQueryUser] = useState("");

  const handleOutsideClick = (e: any) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setShowUserSearch(0);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  const updateUserList = useDebouncedCallback((event: any) => {
    event.target.value === "" ? setHaveUserList(0) : setHaveUserList(1);
    setQueryUser(event.target.value);
  }, 300);

  return (
    <div
      className="flex justify-center absolute w-[30%] min-h-2/5 mt-16 bg-gray-600/30 border-2 border-gray-500/30 backdrop-blur-2xl rounded-lg shadow-xl z-10 px-5"
      ref={searchRef}
    >
      <div className="w-full">
        <p className="text-cyan-700 text-2xl mt-2">Recommend to a friend.</p>

        {/* Search for User */}
        <div className="my-2">
          <div className="flex px-4 py-3 rounded-lg border-2 border-cyan-800 overflow-hidden mx-auto font-[sans-serif]">
            <input
              type="text"
              placeholder="Search for friend ..."
              className="w-full outline-none bg-transparent text-gray-600 text-sm"
              onChange={updateUserList}
              onClick={updateUserList}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 192.904 192.904"
              width="16px"
              className="fill-gray-600"
            >
              <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
            </svg>
          </div>

          {/* User Search List */}
          {haveUserList ? (
            <>
              <RecommendUser
                queryUser={queryUser}
                cine={cine}
                setShowUserSearch={setShowUserSearch}
              />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}
