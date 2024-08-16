import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { getShowingUser, getFriendCarousel } from "@/app/actions/getFriends";

export default function FriendsCarousel() {
  const [followingUsers, setFollowingUsers] = useState([]);

  // For current session user
  const [seshUserEmail, setSeshUserEmail] = useState("");
  const { data: session, status } = useSession();

  const fetchUserImgs = async (users: any[]) => {
    console.log("Fetching followed users ...");
    const followingUsers = await Promise.all(
      users.map(async (id, i) => {
        const user = await getFriendCarousel(id);
        return user;
      })
    );
    return followingUsers;
  };

  useEffect(() => {
    console.log("Status of session:" + status);
    if (session) {
      const email = session?.user?.email;
      setSeshUserEmail(email as string);

      getShowingUser(email as string)
        .then((user) => {
          return user["following"];
        })
        .then((resp) => fetchUserImgs(resp))
        .then((users) => setFollowingUsers(users));
    }
  }, []);

  return followingUsers ? (
    <div className="carousel carousel-center rounded-box">
      {followingUsers.map((user, i) => (
        <div className="carousel-item" key={i}>
          <div className="flex w-full h-full p-16 justify-center">
            <img src={user["cineImgSrc"]} alt="Pizza" className="rounded-lg" />
            <div>{user["favMovie"]}</div>
          </div>
        </div>
      ))}
    </div>
  ) : null;
}
