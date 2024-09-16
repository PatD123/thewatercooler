import React, { useState, useEffect, useRef } from "react";
import { getPossibleUsers } from "@/app/actions/getFriends";
import { recommend } from "@/app/actions/recommend";
import Image from "next/image";

export default function RecommendUser({
  queryUser,
  cine,
  setShowUserSearch,
}: {
  queryUser: string;
  cine: string;
  setShowUserSearch: any;
}) {
  const [prevUser, setPrevUser] = useState("");
  const [users, setUsers] = useState<any[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const recommendToUsers = async () => {
    for (let i = 0; i < selectedUsers.length; i++) {
      console.log(users[selectedUsers[i]]["_id"]);
      await recommend(users[selectedUsers[i]]["_id"], cine);
    }
    setShowUserSearch(0);
    setSelectedUsers([]);
  };

  const toggleUserSelection = (id: number) => {
    setSelectedUsers(
      (prevSelectedUsers) =>
        prevSelectedUsers.includes(id)
          ? prevSelectedUsers.filter((userId) => userId !== id) // Deselect if already selected
          : [...prevSelectedUsers, id] // Select if not already selected
    );
  };

  useEffect(() => {
    if (prevUser !== queryUser) {
      setPrevUser(queryUser);
      setSelectedUsers([]);
    }

    async function getUsers() {
      const users = await getPossibleUsers(queryUser);
      if (users) setUsers(users);
    }
    getUsers();
  }, [queryUser]);

  return users ? (
    <>
      <div className="h-96 overflow-auto py-2">
        {users.map((user, i) => (
          <div
            key={i}
            className="flex w-full h-12 rounded-lg px-2 mt-1 bg-gray-600/50 hover:bg-gray-400"
            onClick={() => toggleUserSelection(i)}
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
            <p className="content-center ml-2 text-sm text-slate-800">
              {user["username"]}
            </p>
            {selectedUsers.includes(i) ? (
              <div className="flex justify-end w-full items-center">
                <Image
                  src="/checkmark.svg"
                  className="h-8 w-8 "
                  width={30}
                  height={30}
                  alt="checkmark"
                />
              </div>
            ) : null}
          </div>
        ))}
      </div>
      <div className="flex w-full justify-center mt-2 ">
        <button
          className="w-full text-lg bg-gray-300/50 text-cyan-800 rounded-lg hover:text-gray-300/50 hover:bg-cyan-600/70"
          onClick={recommendToUsers}
        >
          Recommend!
        </button>
      </div>
    </>
  ) : null;
}
