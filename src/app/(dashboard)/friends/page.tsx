"use client";

import { useDebouncedCallback } from "use-debounce";
import React, { useState, useEffect, useRef } from "react";
import UserList from "@/app/(dashboard)/friends/searchUser";
import ShowingUser from "@/app/(dashboard)/friends/showingUser";
import FriendsCarousel from "@/app/(dashboard)/friends/friendsCarousel";

export default function Friends() {
  const [haveUserList, setHaveUserList] = useState(0);
  const [queryUser, setQueryUser] = useState("");

  // EMAIL
  const [showingUser, setShowingUser] = useState("");

  // Click out of show user
  const showUserRef = useRef<any>(null);

  // This outside click is for the Showing User card
  const handleOutsideClick = (e: any) => {
    if (showUserRef.current && !showUserRef.current.contains(e.target)) {
      setShowingUser("");
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
    <div className="w-screen h-screen">
      <div className="flex relative w-full h-[12%] justify-center">
        {/* SEARCH FOR USERS HERE */}
        <div className="flex-grow max-w-md my-3">
          <div className="flex px-4 py-3 rounded-lg border-2 overflow-hidden mx-auto font-[sans-serif]">
            <input
              type="text"
              placeholder="Search for friends by username..."
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
          {haveUserList ? (
            <>
              <UserList
                queryUser={queryUser}
                setShowingUser={setShowingUser}
                setHaveUserList={setHaveUserList}
              />
            </>
          ) : null}
        </div>
        {/* SHOWING USER */}
        {showingUser ? (
          <div className="absolute w-screen h-screen z-40 py-32 px-72">
            <div ref={showUserRef} className="w-full h-full">
              <ShowingUser showingUser={showingUser} />
            </div>
          </div>
        ) : null}
      </div>
      <div className="flex w-full h-full justify-center pb-32">
        <FriendsCarousel />
      </div>
    </div>
  );
}
