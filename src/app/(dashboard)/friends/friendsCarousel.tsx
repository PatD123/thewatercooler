import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { getShowingUser, getFriendCarousel } from "@/app/actions/getFriends";

export default function FriendsCarousel({
  setShowingUser,
}: {
  setShowingUser: any;
}) {
  // Sliding window with left and right pointers.
  const [followingUsers, setFollowingUsers] = useState([]);
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(5);

  // For current session user
  const [seshUserEmail, setSeshUserEmail] = useState("");
  const { data: session, status } = useSession();

  function slideWindow(dir: number, steps: number = 1) {
    if (dir) {
      // Slide window right
      setLeft(left + steps);
      setRight(right + steps);
    } else {
      // Slide window left
      setLeft(left - steps);
      setRight(right - steps);
    }
  }

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
          users.push(null, null);
          setFollowingUsers(users);
        });
    }
  }, []);

  return followingUsers ? (
    <div className="flex w-full h-full justify-around">
      {followingUsers.slice(left, right).map((user, i) =>
        i === 2 ? (
          <div className="flex">
            {followingUsers[left + 1] ? (
              <button
                className="flex place-self-center"
                onClick={() => slideWindow(0)}
              >
                <Image
                  src="/right-arrow.svg"
                  className="h-5 w-5 rounded-full m-2 rotate-180 transition duration-300 hover:ease-out hover:scale-150"
                  width={30}
                  height={30}
                  alt="Avatar"
                />
              </button>
            ) : (
              <p className="flex place-self-center w-5 h-5 m-2"></p>
            )}
            <div className="relative w-96 h-full">
              <Image
                src={user["cineImgSrc"]}
                alt="Pizza"
                className="rounded-lg object-cover"
                fill
              />
              <button
                className="flex absolute"
                onClick={() => setShowingUser(user["email"])}
              >
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
              </button>
            </div>
            {followingUsers[right - 2] ? (
              <button
                className="flex place-self-center"
                onClick={() => slideWindow(1)}
              >
                <Image
                  src="/right-arrow.svg"
                  className="h-5 w-5 rounded-full m-2 transition duration-200 hover:ease-out hover:scale-150"
                  width={30}
                  height={30}
                  alt="Avatar"
                />
              </button>
            ) : (
              <p className="flex place-self-center w-5 h-5 m-2"></p>
            )}
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

                <button
                  className="flex absolute justify-center w-full h-full"
                  onClick={() => slideWindow(i < 2 ? 0 : 1, Math.abs(i - 2))}
                >
                  <div className="w-full h-full bg-black/50 rounded-lg">
                    <div className="w-full h-full place-content-center">
                      <div className="flex justify-center w-full">
                        <Image
                          src="/pulp.webp"
                          className="h-10 w-10 rounded-full m-2"
                          width={50}
                          height={50}
                          alt="Avatar"
                        />
                      </div>

                      <div className="flex justify-center">
                        <div className="text-sm text-stone-200">
                          {user["username"]}
                        </div>
                      </div>
                    </div>
                  </div>
                </button>
              </div>
            ) : (
              <div className="flex relative w-48 h-64 place-self-center"></div>
            )}
          </>
        )
      )}
    </div>
  ) : null;
}
