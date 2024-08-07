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
          <div
            className="flex rounded-2xl overflow-hidden bg-white/20 shadow-lg ring-1 ring-black/5"
            style={{ position: "relative", width: "500px", height: "300px" }}
          >
            <div
              className="fixed inset-0"
              style={{ position: "relative", width: "200px", height: "300px" }}
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
              style={{ position: "relative", width: "200px", height: "300px" }}
            >
              <h2 className="card-title">{fullName}</h2>
              <a>Favorite TV Show: {favTVShow}</a>
              <a>Favorite Movie: {favMovie}</a>
              <a>Current Tv Show: {currTVShow}</a>
            </div>
          </div>
          <div className="divider divider-horizontal"></div>
          <div className="w-3/5 max-h-3/4 p-5">
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
                    className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
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
            <div className="h-full w-full" ref={bentoRef}>
              {bento ? (
                // NEED SKELETONS
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
