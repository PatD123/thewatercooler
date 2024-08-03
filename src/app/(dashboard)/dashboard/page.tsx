"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconArrowLeft,
  IconBrandTabler,
  IconSettings,
  IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { fetchProfile } from "@/app/actions/fetchProfile";
import { EditProfile } from "@/components/ui/editProfile";

export default function SidebarDemo() {
  const links = [
    {
      label: "Profile Card",
      href: "#",
      icon: (
        <IconBrandTabler className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Friends",
      href: "#",
      icon: (
        <IconUserBolt className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Groups",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Logout",
      href: "#",
      icon: (
        <IconArrowLeft className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div
      className={cn(
        "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-800 w-screen flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden",
        "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
          <div>
            <SidebarLink
              link={{
                label: "Manu Arora",
                href: "#",
                icon: (
                  <Image
                    src="/pulp.webp"
                    className="h-7 w-7 flex-shrink-0 rounded-full"
                    width={50}
                    height={50}
                    alt="Avatar"
                  />
                ),
              }}
            />
          </div>
        </SidebarBody>
      </Sidebar>
      <Dashboard />
    </div>
  );
}

export const Logo = () => {
  return (
    <Link
      href="/"
      className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
    >
      <LogoIcon />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium text-black dark:text-white whitespace-pre"
      >
        <h1 className="text-xl font-bold text-info">
          <span className="text-teal-900">the</span>
          <span className="text-teal-700">watercooler</span>
        </h1>
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Image
      className="object-fill"
      src="/dashboard_icon.ico"
      width={35}
      height={35}
      alt="Picture of the author"
    />
  );
};

// Dummy dashboard component with content
export const Dashboard = () => {
  const [fullName, setFullName] = useState(""); // Could be username
  const [favMovie, setFavMovie] = useState("");
  const [favTVShow, setFavTVShow] = useState("");
  const [currTVShow, setCurrTVShow] = useState("");
  const [initFetch, setInitFetch] = useState(0);
  const [userEmail, setUserEmail] = useState("");

  // GET ALL FROM DATABASE FIRST AND PRE-FILL
  // ALL PLACEHOLDERS SHOULD BE FROM DATABASE
  const { data: session, status } = useSession();

  if (session && !initFetch) {
    console.log(session?.user);
    const email = session?.user?.email as string;
    fetchProfile(email).then((response) => {
      setFullName(response[0]);
      setFavMovie(response[1]);
      setFavTVShow(response[2]);
      setCurrTVShow(response[3]);
    });
    setInitFetch(1);
    setUserEmail(email);
  }

  const cardMap = new Map();
  cardMap.set("name", setFullName);
  cardMap.set("favTVShow", setFavTVShow);
  cardMap.set("favMovie", setFavMovie);
  cardMap.set("currTVShow", setCurrTVShow);

  function updateCard(event: any) {
    const updateFunc = cardMap.get(event.target["name"]);
    updateFunc(event.target.value);
  }

  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex w-full h-full justify-evenly">
          <div className="place-content-center">
            <div className="grid grid-rows-2 grid-cols-1 gap-y-[2.75rem]">
              <div className="relative">
                <figure className="absolute">
                  <Image
                    className="rounded-lg"
                    src="/pulp.webp"
                    height={500}
                    width={500}
                    alt="TV/Movie"
                    priority
                  />
                </figure>
                <div className="avatar ml-5 mt-5 absolute">
                  <div className="w-12 rounded-full">
                    <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                  </div>
                </div>
              </div>
              <div className="card bg-base-100 w-96 shadow-xl">
                <div className="card-body">
                  <h2 className="card-title">{fullName}</h2>
                  <p>Favorite TV Show: {favTVShow}</p>
                  <p>Favorite Movie: {favMovie}</p>
                  <p>Current Tv Show: {currTVShow}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="divider divider-horizontal"></div>

          <form className="flex flex-col w-1/2 mx-auto my-8">
            <div className="join w-full">
              <div className="dropdown dropdown-hover join-item">
                <div
                  tabindex="0"
                  role="button"
                  className="btn btn-primary join-item h-full w-full"
                >
                  Hover
                </div>
                <ul
                  tabindex="0"
                  class="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
                >
                  <li>
                    <a>Item 1</a>
                  </li>
                  <li>
                    <a>Item 2</a>
                  </li>
                </ul>
              </div>
              <div className="relative w-full join">
                <input
                  type="search"
                  id="search-dropdown"
                  className="p-4 w-full join-item text-sm text-gray-900 bg-gray-50 rounded-e-lg border-s-gray-50 border-s-2 border border-gray-300"
                  placeholder="What are you watching at the moment?"
                  required
                />
                <button
                  type="submit"
                  className="join-item top-0 end-0 p-4 font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                  <span className="sr-only">Search</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
