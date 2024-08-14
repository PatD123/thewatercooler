import React, { useState, useEffect } from "react";
import { getShowingUser, followUser } from "@/app/actions/getFriends";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import User from "@/models/User";
import { useSession } from "next-auth/react";
import { AnimatedTooltipPreview } from "@/components/ui/animated-tooltip";

export default function ShowingUser({ showingUser }: { showingUser: string }) {
  // The user you want to show
  const [user, setUser] = useState<(typeof User)[]>([]);
  // The logged-in user
  const [seshUserEmail, setSeshUserEmail] = useState("");
  const { data: session, status } = useSession();

  let pins = [
    {
      id: 1,
      name: user["favMovie"],
      designation: "Favorite Movie",
      image: user["favMovieSrc"],
    },
    {
      id: 2,
      name: user["favTVShow"],
      designation: "Favorite TV Show",
      image: user["favTVShowSrc"],
    },
    {
      id: 3,
      name: user["currTVShow"],
      designation: "Current TV Show",
      image: user["cineImgSrc"],
    },
    {
      id: 4,
      name: "Avatar",
      designation: "Avatar",
      image: "/pulp.webp",
    },
  ];

  useEffect(() => {
    console.log("Status of session:" + status);
    // You get returned email and name
    // Map this to the user id and then get friends.
    // {name: 'Patrick Dai', email: 'thetofulion@gmail.com'}
    if (session) {
      const email = session?.user?.email;
      setSeshUserEmail(email);
    }

    async function getUser(showingUser: string) {
      const user = await getShowingUser(showingUser);
      if (user) {
        setUser(user);
        pins[0].name = user["favMovie"];
        pins[0].image = user["favMovieSrc"];
        pins[1].name = user["favTVShow"];
        pins[1].image = user["favTVShowSrc"];
        pins[2].name = user["currTVShow"];
        pins[2].image = user["currTVShowSrc"];
      }
    }
    getUser(showingUser);
  }, [showingUser]);

  async function onFollow() {
    // Of session user
    const seshUser = await getShowingUser(seshUserEmail);
    if (seshUser) {
      console.log(seshUser["_id"]);
      console.log(user["_id"]);
      await followUser(seshUser["_id"], user["_id"]);
    }
  }

  return user ? (
    <div className="w-full h-full bg-gray-300/30 border-2 border-gray-300 backdrop-blur-2xl overflow-hidden rounded-lg shadow-xl pb-16">
      <CardContainer className="inter-var w-full h-full">
        <CardBody className="flex bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-4 border">
          <CardItem translateZ="50" className="flex-none w-2/5">
            <Image
              src={user["cineImgSrc"]}
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
          <div className="ml-2">
            <CardItem
              translateZ="100"
              className="flex w-full text-xl font-bold text-sky-600"
            >
              {user["username"]}
              <p className="text-xs mt-1.5 ml-1"> ({user["name"]})</p>
            </CardItem>
            <CardItem
              translateZ="100"
              className="w-full text-xl items-start font-bold text-neutral-600 dark:text-white mt-2"
            >
              <div className="w-full">
                <h2 className="card-title">Bio</h2>
                <p className="whitespace-pre-wrap text-xs">{user["bio"]}</p>
              </div>
            </CardItem>
            <CardItem
              translateZ="100"
              className="w-full text-xl items-start font-bold text-neutral-600 dark:text-white mt-2"
            >
              <AnimatedTooltipPreview pins={pins} />
            </CardItem>
          </div>

          {/* <div className="flex justify-between items-center mt-20">
            <CardItem
              translateZ={20}
              as={Link}
              href="https://twitter.com/mannupaaji"
              target="__blank"
              className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
            >
              Try now →
            </CardItem>
            <CardItem
              translateZ={20}
              as="button"
              className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
            >
              Sign up
            </CardItem>
          </div> */}
        </CardBody>
      </CardContainer>

      <div className="flex justify-center">
        <button
          className="shadow-[0_4px_14px_0_rgb(0,118,255,39%)] hover:shadow-[0_6px_20px_rgba(0,118,255,23%)] hover:text-black hover:bg-[rgba(150,118,255,0.9)] px-8 py-2 bg-[#0070f3] rounded-lg text-white text-sm font-light transition duration-200 ease-linear"
          onClick={onFollow}
        >
          Follow
        </button>
      </div>
    </div>
  ) : null;
}
