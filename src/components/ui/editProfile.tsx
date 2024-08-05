import React, { useState } from "react";
import { editProfile } from "@/app/actions/editProfile";

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
    <section className="flex items-center justify-center px-5">
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
