import React, { useState, useEffect } from "react";
import { getShowingUser } from "@/app/actions/getFriends";
import Image from "next/image";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import User from "@/models/User";
import { AnimatedTooltipPreview } from "@/components/ui/animated-tooltip";

export default function ShowingUser({ showingUser }: { showingUser: string }) {
  const [user, setUser] = useState<(typeof User)[]>([]);

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

  return user ? (
    <div className="w-full h-full bg-gray-300/30 border-2 border-gray-300 backdrop-blur-2xl overflow-hidden rounded-lg shadow-xl">
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
    </div>
  ) : null;
}

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Tyler Durden",
    designation: "Soap Developer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
  {
    id: 6,
    name: "Dora",
    designation: "The Explorer",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  },
];
