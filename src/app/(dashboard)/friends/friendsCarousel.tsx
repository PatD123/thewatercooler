import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { getShowingUser, getFriendCarousel } from "@/app/actions/getFriends";

export default function FriendsCarousel() {
  // Sliding window with left and right pointers.
  const [followingUsers, setFollowingUsers] = useState([]);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(5);

  // For current session user
  const [seshUserEmail, setSeshUserEmail] = useState("");
  const { data: session, status } = useSession();

  // Get users in seshUser's following list
  const fetchUsers = async (users: any[]) => {
    console.log("Fetching followed users ...");
    const followingUsers = await Promise.all(
      users.map(async (id, i) => {
        const user = await getFriendCarousel(id);
        return user;
      })
    );
    return followingUsers;
  };

  // Shuffle following list
  const shuffle = (users: any[]) => {
    let currentIndex = users.length;

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [users[currentIndex], users[randomIndex]] = [
        users[randomIndex],
        users[currentIndex],
      ];
    }
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
        .then((resp) => fetchUsers(resp))
        .then((users) => {
          shuffle(users);
          users.unshift(null, null);
          setFollowingUsers(users);
        });
    }
  }, []);

  return followingUsers ? (
    // <div className="carousel carousel-center rounded-box">
    // {followingUsers.slice(left, right).map((user, i) => (
    //   <div className="carousel-item" key={i}>
    //     {user ? (
    //       <div className="flex relative w-full h-full px-8">
    //         <img
    //           src={user["cineImgSrc"]}
    //           alt="Pizza"
    //           className="rounded-lg"
    //         />
    //         <div className="flex absolute">
    //           <Image
    //             src="/pulp.webp"
    //             className="h-10 w-10 rounded-full m-2"
    //             width={50}
    //             height={50}
    //             alt="Avatar"
    //           />
    //           <div className="flex self-center text-sm text-stone-200">
    //             {user["username"]}
    //           </div>
    //           <Image
    //             src="/right-arrow.svg"
    //             className="h-10 w-10 rounded-full m-2"
    //             width={50}
    //             height={50}
    //             alt="Avatar"
    //           />
    //         </div>
    //       </div>
    //     ) : (
    //       <div className="flex-none relative w-full h-full px-8">
    //         <Image
    //           src="/pulp.webp"
    //           className="h-10 w-10 rounded-full m-2"
    //           width={50}
    //           height={50}
    //           alt="Avatar"
    //         />
    //       </div>
    //     )}
    //   </div>
    // ))}
    // </div>

    <div className="flex w-full h-full justify-around">
      {followingUsers.slice(left, right).map((user, i) =>
        i === 2 ? (
          <div className="relative w-96 h-full">
            <Image
              src={user["cineImgSrc"]}
              alt="Pizza"
              className="rounded-lg object-cover"
              fill
            />
            <div className="flex absolute">
              <Image
                src="/pulp.webp"
                className="h-10 w-10 rounded-full m-2"
                width={50}
                height={50}
                alt="Avatar"
              />
              <div className="flex self-center text-sm text-stone-200">
                {user["username"]}
              </div>
              <Image
                src="/right-arrow.svg"
                className="h-10 w-10 rounded-full m-2"
                width={50}
                height={50}
                alt="Avatar"
              />
            </div>
          </div>
        ) : (
          <>
            {user ? (
              <div className="flex relative w-48 h-72 place-self-center">
                <Image
                  src={user["cineImgSrc"]}
                  alt="Pizza"
                  className="rounded-lg object-center"
                  fill
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />

                <div className="flex absolute justify-center w-full h-full">
                  <div className="flex place-content-center">
                    <div className="w-full h-full">
                      <div className="flex justify-center w-full">
                        <Image
                          src="/pulp.webp"
                          className="h-10 w-10 rounded-full m-2"
                          width={50}
                          height={50}
                          alt="Avatar"
                        />
                      </div>

                      <div className="flex self-center text-sm text-stone-200">
                        {user["username"]}
                      </div>
                      <Image
                        src="/right-arrow.svg"
                        className="h-5 w-5 rounded-full m-2"
                        width={30}
                        height={30}
                        alt="Avatar"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex relative w-32 h-64 place-self-center"></div>
            )}
          </>
        )
      )}
    </div>
  ) : null;
}
