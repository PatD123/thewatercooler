"use client";
import React, { useState, Suspense, useRef, useEffect } from "react";
import Image from "next/image";
import { useSession, SessionProvider } from "next-auth/react";
import { AnimatedTooltipPreview } from "@/components/ui/animated-tooltip";
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
import OnProfile from "@/app/(dashboard)/dashboard/onProfile";
import Search from "@/app/(dashboard)/dashboard/search";
import { useRouter } from "next/navigation";
import Recommend from "./recommend";

// Dummy dashboard component with content
export default function Dashboard() {
  const [initFetch, setInitFetch] = useState(0);
  const router = useRouter();

  // User important info
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [bio, setBio] = useState("");
  // User profile info
  const [favMovie, setFavMovie] = useState("");
  const [favMovieSrc, setFavMovieSrc] = useState("");
  const [favTVShow, setFavTVShow] = useState("");
  const [favTVShowSrc, setFavTVShowSrc] = useState("");
  const [currTVShow, setCurrTVShow] = useState("");
  const [currTVShowSrc, setCurrTVShowImg] = useState("");
  const [currTVShowPosterSrc, setCurrTVShowPosterSrc] = useState("");
  const [backdropSrc, setBackdropSrc] = useState("");

  // Editing Right-side Profile
  const [onProfile, setOnProfile] = useState(1);
  const [onAllShows, setOnAllShows] = useState(0);
  const [onRecs, setOnRecs] = useState(0);

  // For Search Bento Boxes
  const [bento, setBento] = useState(0);
  const [query, setQuery] = useState("");

  const [cineName, setCineName] = useState("");
  const [cineCategory, setCineCategory] = useState("Favorite TV Show");
  const [cineImgSrc, setCineImgSrc] = useState("");

  // Arrays
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  let friends = followers.filter((follower) => following.includes(follower));
  const [favMovies, setFavMovies] = useState<string[]>([]);
  const [favTVShows, setFavTVShows] = useState<string[]>([]);

  // Adding Fav Shows and Movies on Right Side
  const [showSearch, setShowSearch] = useState(0);
  const [addCine, setAddCine] = useState("Favorite TV Show"); // 1 for add Movie; 0 for add TV Show

  // Recommending Shows/Movies
  const [showUserSearch, setShowUserSearch] = useState(0);

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
      editCurrTVShow(userEmail, cineName, cineImgSrc, currTVShowPosterSrc);
      setCurrTVShowImg(cineImgSrc);
      setBackdropSrc(currTVShowPosterSrc);
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
    console.log(status);
    if (session) {
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
        setBackdropSrc(response[9]);
        setFollowers(response[10]);
        setFollowing(response[11]);
        setFavMovies(response[12]);
        setFavTVShows(response[13]);
      });
      setInitFetch(1);
      setUserEmail(email);
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [initFetch]);

  return (
    fullName && (
      <div className="flex justify-center bg-white w-full h-full">
        {/* Recommending movies and tv shows */}
        {showUserSearch ? (
          <Recommend
            setShowUserSearch={setShowUserSearch}
            userEmail={userEmail}
            cine={cineImgSrc}
            friends={friends}
          />
        ) : null}

        {/* Adding fav movies and tv shows Search */}
        {showSearch ? (
          <Search
            setShowSearch={setShowSearch}
            userEmail={userEmail}
            addCine={addCine}
          />
        ) : null}

        {/* PROFILE */}
        <div className="p-2 md:p-10 rounded-tl-2xl border border-neutral-200 gap-2 flex-1 w-full h-full z-0">
          <div className="flex w-full h-full justify-evenly z-0">
            {/* Left Side */}
            <div className="w-1/2 overflow-y-auto overflow-x-hidden no-scrollbar">
              {/* Profile Card */}
              <div className="flex place-content-center">
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
              {/* Search Bar */}
              <div className="w-full mx-auto my-8">
                <div className="join w-full">
                  {/* Dropdown */}
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
                      className="join-item top-0 end-0 p-4 font-medium text-white bg-info rounded-e-full hover:bg-blue-800 focus:ring-2"
                      onClick={updateCine}
                    >
                      Edit
                      <span className="sr-only">Search</span>
                    </button>
                  </div>
                </div>
              </div>
              {/* Bento Box of List Cinema */}
              {bento ? (
                <div className="relative h-full w-full" ref={bentoRef}>
                  <Suspense fallback={<p>Loading feed...</p>}>
                    {" "}
                    <BentoGridSearch
                      query={query}
                      qtype={cineCategory}
                      setCineName={setCineName}
                      setCineImgSrc={setCineImgSrc}
                      setCurrTVShowPosterSrc={setCurrTVShowPosterSrc}
                      setShowUserSearch={setShowUserSearch}
                    />
                  </Suspense>
                </div>
              ) : null}
            </div>
            {/*  Divider */}
            <div className="divider divider-horizontal"></div>
            {/*  Right Side */}
            <div className="w-3/5 h-[95%] bg-slate-900 rounded-lg overflow-y-auto no-scrollbar">
              <div
                className="rounded-lg"
                style={{ position: "relative", height: "300px" }}
              >
                <Image
                  src={backdropSrc}
                  alt="currTVShowPosterSrc"
                  className="rounded-lg"
                  fill
                  style={{ objectFit: "cover" }}
                />
                <div className="absolute rounded-lg inset-0 bg-gradient-to-r from-slate-900 via-transparent to-slate-900" />
                <div className="absolute rounded-lg inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900" />
              </div>
              <div className="flex">
                <div
                  className="flex-none rounded-log ml-3"
                  style={{
                    position: "relative",
                    height: "60px",
                    width: "60px",
                  }}
                >
                  <Image
                    src="/pulp.webp"
                    className="rounded-full"
                    fill
                    alt="Avatar"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="flex-none text-slate-200 font-bold p-2 text-2xl">
                  {username}
                </div>
                <div className="flex w-full justify-end pb-7 pt-3 mr-3">
                  <div className="text-sm text-white">23 TV Shows</div>
                  <div className="divider divider-horizontal divider-info"></div>
                  <div className="text-sm text-white">
                    {followers.length} Followers
                  </div>
                  <div className="divider divider-horizontal divider-info"></div>
                  <div className="text-sm text-white">
                    {following.length} Following
                  </div>
                </div>
              </div>
              <div className="text-white w-full pl-20 pr-20 mt-3">
                <div className="flex justify-around border border-cyan-700 rounded-lg">
                  <button
                    className={`${
                      onProfile ? "text-cyan-500" : "text-slate-500"
                    } hover:text-cyan-500`}
                    onClick={() => {
                      setOnProfile(1);
                      setOnAllShows(0);
                      setOnRecs(0);
                    }}
                  >
                    Profile
                  </button>
                  <button
                    className={`${
                      onAllShows ? "text-cyan-500" : "text-slate-500"
                    } hover:text-cyan-500`}
                    onClick={() => {
                      setOnProfile(0);
                      setOnAllShows(1);
                      setOnRecs(0);
                    }}
                  >
                    All TV Shows
                  </button>
                  <button
                    className={`${
                      onRecs ? "text-cyan-500" : "text-slate-500"
                    } hover:text-cyan-500`}
                    onClick={() => {
                      setOnProfile(0);
                      setOnAllShows(0);
                      setOnRecs(1);
                    }}
                  >
                    Your Recommendations
                  </button>
                </div>
              </div>
              {onProfile ? (
                <OnProfile
                  favTVShowSrc={currTVShowSrc}
                  bio={bio}
                  setShowSearch={setShowSearch}
                  movies={favMovies}
                  tvShows={favTVShows}
                  setAddCine={setAddCine}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    )
  );
}
