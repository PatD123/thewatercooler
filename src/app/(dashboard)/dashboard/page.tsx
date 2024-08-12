"use client";
import React, { useState, Suspense, useRef, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import {
  fetchProfile,
  editCurrTVShow,
  editFavMovie,
  editFavTVShow,
  editUsername,
  editBio,
} from "@/app/actions/editProfile";
import { BentoGridSearch } from "@/components/ui/bentoGrid";
import { useDebouncedCallback } from "use-debounce";

// Dummy dashboard component with content
export default function Dashboard() {
  const [initFetch, setInitFetch] = useState(0);

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [bio, setBio] = useState("");

  const [favMovie, setFavMovie] = useState("");
  const [favMovieSrc, setFavMovieSrc] = useState("");
  const [favTVShow, setFavTVShow] = useState("");
  const [favTVShowSrc, setFavTVShowSrc] = useState("");
  const [currTVShow, setCurrTVShow] = useState("");
  const [currTVShowSrc, setCurrTVShowImg] = useState("");

  const [bento, setBento] = useState(0);
  const [query, setQuery] = useState("");

  const [cineName, setCineName] = useState("");
  const [cineCategory, setCineCategory] = useState("Favorite TV Show");
  const [cineImgSrc, setCineImgSrc] = useState("");

  const bentoRef = useRef<any>(null);

  // GET ALL FROM DATABASE FIRST AND PRE-FILL
  // ALL PLACEHOLDERS SHOULD BE FROM DATABASE
  const { data: session, status } = useSession();

  let pins = [
    {
      id: 1,
      name: favMovie,
      designation: "Favorite Movie",
      image: favMovieSrc,
    },
    {
      id: 2,
      name: favTVShow,
      designation: "Favorite TV Show",
      image: favTVShowSrc,
    },
    {
      id: 3,
      name: currTVShow,
      designation: "Current TV Show",
      image: currTVShowSrc,
    },
    {
      id: 4,
      name: "Avatar",
      designation: "",
      image: "/pulp.webp",
    },
  ];

  const cardMap = new Map();
  cardMap.set("name", setFullName);
  cardMap.set("favTVShow", setFavTVShow);
  cardMap.set("favMovie", setFavMovie);
  cardMap.set("currTVShow", setCurrTVShow);

  function updateCine(event: any) {
    if (cineName === "") return;

    let cat = "";
    if (cineCategory === "Favorite TV Show") {
      cat = "favTVShow";
      editFavTVShow(userEmail, cineName, cineImgSrc);
      setFavTVShowSrc(cineImgSrc);
    } else if (cineCategory === "Favorite Movie") {
      cat = "favMovie";
      editFavMovie(userEmail, cineName, cineImgSrc);
      setFavMovieSrc(cineImgSrc);
    } else if (cineCategory === "Current TV Show") {
      cat = "currTVShow";
      editCurrTVShow(userEmail, cineName, cineImgSrc);
      setCurrTVShowImg(cineImgSrc);
    }
    const updateFunc = cardMap.get(cat);
    updateFunc(cineName);

    pins[0].name = favMovie;
    pins[0].image = favMovieSrc;
    pins[1].name = favTVShow;
    pins[1].image = favTVShowSrc;
    pins[2].name = currTVShow;
    pins[2].image = currTVShowSrc;
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
    if (session && !initFetch) {
      const email = session?.user?.email as string;
      fetchProfile(email).then((response) => {
        setFullName(response[0]);
        setFavMovie(response[1]);
        setFavTVShow(response[2]);
        setCurrTVShow(response[3]);
        setCurrTVShowImg(response[4]);
        setUsername(response[5]);
        setBio(response[6]);
        setFavMovieSrc(response[7]);
        setFavTVShowSrc(response[8]);
        console.log("asdfasdfasdf");
        console.log(favMovieSrc);
      });
      setInitFetch(1);
      setUserEmail(email);
    }

    console.log("here");

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  return (
    fullName && (
      <div className="flex flex-1 z-10 bg-white/10">
        <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 bg-white/20 dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
          <div className="flex w-full h-full justify-evenly">
            <div className="place-content-center">
              <div
                className="flex rounded-2xl overflow-hidden bg-white/20 shadow-lg ring-1 ring-black/5"
                style={{
                  position: "relative",
                  width: "500px",
                  height: "300px",
                }}
              >
                <div
                  className="fixed flex-none inset-0"
                  style={{
                    position: "relative",
                    width: "200px",
                    height: "300px",
                  }}
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/original${currTVShowSrc}`}
                    alt="Picture of the author"
                    fill
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </div>
                <div className="card-body">
                  <div className="w-full h-1/2">
                    <h2 className="card-title text-sky-600 text-2xl mt-5">
                      {username}
                      <p className="text-xs">({fullName})</p>
                    </h2>
                  </div>

                  <div className="w-full h-1/2 flex-none">
                    <h2 className="card-title">Bio</h2>
                    <p className="whitespace-pre-wrap text-xs">{bio}</p>
                  </div>
                  <AnimatedTooltipPreview pins={pins} />
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
                    <ul className="dropdown-content menu bg-base-100 rounded-box z-50 w-52 p-2 shadow">
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
                      onClick={updateCine}
                    >
                      Edit
                      <span className="sr-only">Search</span>
                    </button>
                  </div>
                </div>
              </div>
              <div className="absolute flex mt-10 w-full h-96">
                <div className="relative flex-none h-96">
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
                          className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                          placeholder="Input username"
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
                    <div className="mt-2 h-96 w-72">
                      <textarea
                        id="about"
                        name="about"
                        rows={11}
                        placeholder="Write a bio!"
                        className="block w-full rounded-md border-5 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      ></textarea>
                    </div>
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
                            <span>Upload a file or drag and drop</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                            />
                          </label>
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
                      qtype={cineCategory}
                      setCineName={setCineName}
                      setCineImgSrc={setCineImgSrc}
                    />
                  </Suspense>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export function AnimatedTooltipPreview({
  pins,
}: {
  pins: {
    id: number;
    name: string;
    designation: string;
    image: string;
  }[];
}) {
  return (
    <div className="relative flex flex-row items-center justify-start w-full mb-3">
      <AnimatedTooltip items={pins} />
    </div>
  );
}
