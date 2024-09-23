import React, { useState, createContext, useContext, useEffect } from "react";
import { useSession, SessionProvider } from "next-auth/react";
import {
  getPendingFollowers,
  getNameByID,
  getShowingUser,
} from "../actions/getFriends";
import { followBack } from "../actions/getFriends";

type User = {
  name: string;
  id: string;
};

export default function GetNotifs() {
  const { data: session, status } = useSession();

  const [id, setID] = useState("");

  const [pendingFollowers, setPendingFollowers] = useState<User[]>([]);

  function handleFollowBack(toID: string) {
    followBack(id, toID);
  }

  useEffect(() => {
    const email = session?.user?.email as string;
    getShowingUser(email).then((user) => setID(user["_id"]));

    getPendingFollowers(email).then((users) => {
      const promises = users.map((user: string) => getNameByID(user));
      Promise.all(promises)
        .then((names) => {
          const pendingUsers = names.map((name, i) => {
            const user: User = { name: name, id: users[i] };
            return user;
          });
          return pendingUsers;
        })
        .then((users) => {
          setPendingFollowers(users);
        });
    });
  }, []);

  return (
    <div className="bg-gray-200 rounded-lg p-2 mt-2">
      {pendingFollowers.length > 0 ? (
        pendingFollowers.map((user, i) => (
          <div
            key={i}
            className="bg-cyan-100 drop-shadow-lg rounded-lg p-3 mt-2"
          >
            <div className="flex justify-between items-center">
              <div key={i} className="text-sm">
                {user.name}
              </div>
              <button
                className="text-xs rounded-lg bg-cyan-400 p-1 hover:scale-110 duration-300"
                onClick={() => handleFollowBack(user.id)}
              >
                Follow Back
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="bg-cyan-400 drop-shadow-md rounded-lg p-3 mt-2">
          No new notifications
        </div>
      )}
    </div>
  );
}
