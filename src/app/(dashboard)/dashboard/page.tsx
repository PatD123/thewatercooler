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
import { fetchProfile, editProfile } from "@/app/actions/fetchProfile";

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
        <div className="flex w-full h-full justify-center">
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
          <EditProfile
            updateCard={updateCard}
            fullName={fullName}
            favMovie={favMovie}
            favTVShow={favTVShow}
            currTVShow={currTVShow}
            userEmail={userEmail}
          />
        </div>
      </div>
    </div>
  );
};

export const EditProfile = ({
  updateCard,
  fullName,
  favMovie,
  favTVShow,
  currTVShow,
  userEmail,
}: {
  updateCard: any;
  fullName: string;
  favMovie: string;
  favTVShow: string;
  currTVShow: string;
  userEmail: string;
}) => {
  const [error, setError] = useState<string>();
  const editProfileWithEmail = editProfile.bind(null, userEmail);
  return (
    <section className="flex items-center justify-center">
      <form
        className="p-6 w-full flex flex-col justify-center items-center gap-2 
            border border-solid border-black bg-white rounded"
        action={editProfileWithEmail}
      >
        {error && <div className="">{error}</div>}
        <h1 className="mb-5 min-w-full text-2xl font-bold">Edit Profile</h1>

        <label className="w-full text-sm">Full Name</label>
        <input
          type="text"
          placeholder={fullName}
          className="w-full h-8 border border-solid border-black py-1 px-2.5 rounded"
          name="name"
          onChange={updateCard}
        />

        <label className="w-full text-sm">Favorite TV Show</label>
        <input
          type="text"
          placeholder={favTVShow}
          className="w-full h-8 border border-solid border-black py-1 px-2.5 rounded"
          name="favTVShow"
          onChange={updateCard}
        />

        <label className="w-full text-sm">Favorite Movie</label>
        <div className="flex w-full">
          <input
            type="text"
            placeholder={favMovie}
            className="w-full h-8 border border-solid border-black py-1 px-2.5 rounded"
            name="favMovie"
            onChange={updateCard}
          />
        </div>

        <label className="w-full text-sm">Current TV Show</label>
        <div className="flex w-full">
          <input
            type="text"
            placeholder={currTVShow}
            className="w-full h-8 border border-solid border-black py-1 px-2.5 rounded"
            name="currTVShow"
            onChange={updateCard}
          />
        </div>

        <button
          className="w-full border border-solid border-black py-1.5 mt-2.5 rounded
            transition duration-150 ease hover:bg-sky-200"
          type="submit"
        >
          Edit
        </button>
      </form>
    </section>
  );
};
