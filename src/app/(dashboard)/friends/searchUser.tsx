import React, { useState, useEffect, useRef } from "react";
import { getPossibleUsers } from "@/app/actions/getFriends";
import Image from "next/image";

export default function SearchUser({
  queryUser,
  setShowingUser,
  setHaveUserList,
}: {
  queryUser: string;
  setShowingUser: any;
  setHaveUserList: any;
}) {
  const [users, setUsers] = useState<any[]>([]);
  const showUsersRef = useRef<any>(null);

  const handleOutsideClick = (e: any) => {
    if (showUsersRef.current && !showUsersRef.current.contains(e.target)) {
      setHaveUserList(0);
      setUsers([]);
    }
  };

  function showUser(email: string) {
    setShowingUser(email);
    setHaveUserList(0);
    return <p className="z-40">Hi</p>;
  }

  useEffect(() => {
    async function getUsers() {
      const users = await getPossibleUsers(queryUser);
      if (users) setUsers(users);
    }
    getUsers();

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [queryUser]);

  return users ? (
    <div
      className="flex-grow my-2 max-h-lg bg-gray-300 border-2 border-gray-300 backdrop-blur-2xl overflow-hidden rounded-lg shadow-xl px-2 py-1 overflow-y-auto"
      ref={showUsersRef}
    >
      {users.map((user, i) => (
        <div
          key={i}
          className="flex w-full h-12 rounded-md px-2 my-1 bg-gray-300 hover:bg-gray-200"
          onClick={() => showUser(user["email"])}
        >
          <div className="content-center">
            <div className="relative w-10 h-10">
              <Image
                className="object-cover rounded-full"
                key={i}
                src={user["cineImgSrc"]}
                alt="Picture of the author"
                fill={true}
              />
            </div>
          </div>
          <p className="content-center ml-2 text-sm">{user["username"]}</p>
        </div>
      ))}
    </div>
  ) : null;
}
