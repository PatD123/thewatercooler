"use client";
import React, { useState, Suspense, useRef, useEffect } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "@/components/ui/sidebar";
import {
  IconBrandTabler,
  IconUserBolt,
  IconSettings,
  IconArrowLeft,
} from "@tabler/icons-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { Logo, LogoIcon } from "@/components/ui/logo";
import {
  fetchProfile,
  editCurrTVShow,
  editFavMovie,
  editFavTVShow,
} from "@/app/actions/editProfile";
import { BentoGridSearch } from "@/components/ui/bentoGrid";
import { useDebouncedCallback } from "use-debounce";

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

// Dummy dashboard component with content
export const Dashboard = () => {
  const [fullName, setFullName] = useState(""); // Could be username
  const [favMovie, setFavMovie] = useState("");
  const [favTVShow, setFavTVShow] = useState("");
  const [currTVShow, setCurrTVShow] = useState("");
  const [currTVShowImg, setCurrTVShowImg] = useState("");
  const [initFetch, setInitFetch] = useState(0);
  const [userEmail, setUserEmail] = useState("");

  const [bento, setBento] = useState(0);
  const [query, setQuery] = useState("");

  const [cineName, setCineName] = useState("");
  const [cineCategory, setCineCategory] = useState("Favorite TV Show");
  const [cineImgSrc, setCineImgSrc] = useState("");

  const bentoRef = useRef<any>(null);

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
      setCurrTVShowImg(response[4]);
      setUsername(response[5]);
      setBio(response[6]);
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
    if (cineName === "") return;

    let cat = "";
    if (cineCategory === "Favorite TV Show") {
      cat = "favTVShow";
      editFavTVShow(userEmail, cineName);
    } else if (cineCategory === "Favorite Movie") {
      cat = "favMovie";
      editFavMovie(userEmail, cineName);
    } else if (cineCategory === "Current TV Show") {
      cat = "currTVShow";
      editCurrTVShow(userEmail, cineName, cineImgSrc);
      setCurrTVShowImg(cineImgSrc);
    }
    const updateFunc = cardMap.get(cat);
    updateFunc(cineName);
  }

  function updateUserInfo(event: any) {
    event.preventDefault();
    const newUsername = document.getElementById("username")?.value.trim();
    const newBio = document.getElementById("about")?.value.trim();
    console.log(newBio);
    if (!(newUsername === "")) {
      editUsername(userEmail, newUsername);
      setUsername(newUsername);
    }
    if (!(newBio.trim() === "")) {
      setBio(newBio);
      editBio(userEmail, newBio);
    }
  }

  const updateBento = useDebouncedCallback((event: any) => {
    event.target.value === "" ? setBento(0) : setBento(1);
    setQuery(event.target.value);
  }, 300);

  const handleOutsideClick = (e: any) => {
    if (bentoRef.current && !bentoRef.current.contains(e.target)) {
      setBento(0);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex w-full h-full justify-evenly">
          <div className="place-content-center">
            <div
              className="flex rounded-2xl overflow-hidden bg-white/20 shadow-lg ring-1 ring-black/5"
              style={{ position: "relative", width: "500px", height: "300px" }}
            >
              <div
                className="fixed inset-0"
                style={{
                  position: "relative",
                  width: "200px",
                  height: "300px",
                }}
              >
                <Image
                  src={`https://image.tmdb.org/t/p/original${currTVShowImg}`}
                  alt="Picture of the author"
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                />
              </div>
              <div
                className="card-body"
                style={{
                  position: "relative",
                  width: "200px",
                  height: "300px",
                }}
              >
                <div className="relative w-full h-1/2">
                  <h2 className="card-title">{fullName}</h2>
                  <a>Favorite TV Show: {favTVShow}</a>
                  <a>Favorite Movie: {favMovie}</a>
                  <a>Current Tv Show: {currTVShow}</a>
                </div>
                <div className="relative w-full h-1/2 py-3">
                  <h2 className="card-title">Bio</h2>
                  <p className="whitespace-pre-wrap">{bio}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="divider divider-horizontal"></div>
          <div className="relative w-3/5 max-h-3/4 p-5 flex-col">
            {/* Search Bar */}
            <div className="w-full mx-auto my-8">
              <div className="join w-full">
                <div className="dropdown dropdown-hover join-item">
                  <div
                    tabindex="0"
                    role="button"
                    className="btn btn-info rounded-full join-item h-full w-full hover:bg-blue-800"
                  >
                    {cineCategory}
                  </div>
                  <ul
                    tabindex="0"
                    className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow"
                  >
                    <li onClick={() => setCineCategory("Favorite TV Show")}>
                      <a>Favorite TV Show</a>
                    </li>
                    <li onClick={() => setCineCategory("Favorite Movie")}>
                      <a>Favorite Movie</a>
                    </li>
                    <li onClick={() => setCineCategory("Current TV Show")}>
                      <a>Current TV Show</a>
                    </li>
                  </ul>
                </div>
                <div className="relative w-full join">
                  <input
                    type="search"
                    id="search-dropdown"
                    className="p-4 w-full join-item text-sm text-gray-900 bg-gray-50 rounded-e-full border-s-gray-50 border-s-2 border border-gray-300"
                    placeholder="What are you watching at the moment?"
                    onChange={updateBento}
                    onClick={updateBento}
                    required
                  />
                  <button
                    type="submit"
                    className="join-item top-0 end-0 p-4 font-medium text-white bg-info rounded-e-full hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={updateCard}
                  >
                    Edit
                    <span className="sr-only">Search</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute flex mt-10 w-full h-full">
              <div className="flex-none h-96">
                <div className="sm:col-span-4">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                  <div className="mt-2">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        type="text"
                        name="username"
                        id="username"
                        autoComplete="username"
                        className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="janedoe"
                      />
                    </div>
                  </div>
                </div>

                <div className="col-span-full py-10 h-full">
                  <label
                    htmlFor="about"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    About
                  </label>
                  <div className="mt-2 h-96">
                    <textarea
                      id="about"
                      name="about"
                      rows={11}
                      className="block w-full rounded-md border-5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    ></textarea>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write a few sentences about yourself.
                  </p>
                </div>
              </div>

              <div className="px-10 w-full h-96">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Avatar
                </label>
                <div className="mt-2 w-full h-full justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-300"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <div className="mt-4 justify-center flex text-sm leading-6 text-gray-600">
                      <div className="flex">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                          />
                        </label>
                        <p className="pl-1 text-center">or drag and drop</p>
                      </div>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute w-full bottom-0 flex justify-center">
              <button
                className="btn btn-block bg-info"
                onClick={updateUserInfo}
              >
                Submit
              </button>
            </div>

            {bento ? (
              <div className="relative h-full w-full" ref={bentoRef}>
                <Suspense fallback={<p>Loading feed...</p>}>
                  {" "}
                  <BentoGridSearch
                    query={query}
                    setCineName={setCineName}
                    setCineImgSrc={setCineImgSrc}
                  />
                </Suspense>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
