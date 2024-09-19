import Image from "next/image";
import React, { useEffect, useState } from "react";
import { unrecommend } from "@/app/actions/recommend";

export default function OnRecs({
  recs,
  setRecs,
  userId,
}: {
  recs: string[];
  setRecs: any;
  userId: string;
}) {
  const [select, setSelect] = useState(0);

  let selected = new Array<number>();

  // Deleting a recommendation after user has watched or smth.
  async function deleteRec() {
    selected.sort((a, b) => b - a);
    for (let i of selected) {
      await unrecommend(userId, recs[i]);
      recs.splice(i, 1);
      console.log(recs);
    }
    setRecs(recs);
    setSelect(0);
  }

  return (
    <div className="mt-5 px-4 pb-2 w-full">
      <div className="">
        <div className="bg-white/10 rounded-lg h-full text-white p-3">
          <div className="flex justify-end">
            <button
              className="p-1 border-2 border-slate-900 rounded-lg text-xs hover:ease-in-out duration-300 hover:scale-110"
              onClick={() => setSelect(1)}
            >
              Select
            </button>
            {select ? (
              <button
                className="bg-cyan-200 border-2 border-black rounded-lg ml-2 p-0.5 hover:ease-in-out duration-300 hover:scale-110"
                onClick={deleteRec}
              >
                <Image
                  src="/delete-rec.svg"
                  className="h-6 w-6"
                  width={30}
                  height={30}
                  alt="delete-rec"
                />
              </button>
            ) : null}
          </div>
          <div className="flex justify-center">
            <div className="grid grid-rows-auto grid-cols-6 gap-x-3">
              {recs.map((vals, i) => (
                <div
                  key={i}
                  className="rounded-lg mt-3"
                  style={{
                    position: "relative",
                    height: "200px",
                    width: "100px",
                  }}
                >
                  {select ? (
                    <input
                      type="checkbox"
                      value=""
                      className="checkbox absolute z-20 top-1 right-1"
                      onClick={() =>
                        selected.includes(i)
                          ? selected.splice(selected.indexOf(i), 1)
                          : selected.push(i)
                      }
                    />
                  ) : null}

                  <Image
                    src={recs[i]}
                    alt="movie"
                    className="rounded-lg z-10"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
