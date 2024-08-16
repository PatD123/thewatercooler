import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { getShowingUser, getFriendCarousel } from "@/app/actions/getFriends";

export default function FriendsCarousel() {
  const [followingUsers, setFollowingUsers] = useState([]);
  const [userImgs, setUserImgs] = useState([]);

  // For current session user
  const [seshUserEmail, setSeshUserEmail] = useState("");
  const { data: session, status } = useSession();

  const fetchUserImgs = async (users: any[]) => {
    console.log("Fetching user imgs ...");
    console.log(users);
    const imgs = Array(3).fill("");
    const allImgs = await Promise.all(
      users.map(async (id, i) => {
        const img = await getFriendCarousel(id);
        return img;
      })
    );
    return allImgs;
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
        .then((users) => fetchUserImgs(users))
        .then((imgs) => setUserImgs(imgs));
    }
  }, []);

  return followingUsers ? (
    <div className="carousel carousel-center rounded-box">
      {userImgs.map((img, i) => (
        <div className="carousel-item" key={i}>
          <div className="flex w-full h-full p-16 justify-center">
            <img src={img} alt="Pizza" className="rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  ) : null;
}
