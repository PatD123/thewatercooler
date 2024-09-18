import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function OnRecs({ recs }: { recs: string[] }) {
  async function deleteRec() {}

  return (
    <div className="mt-5 px-4 pb-2 w-full">
      <div className="">
        <div className="bg-white/10 rounded-lg h-full text-white p-3">
          <div className="flex justify-center">
            <div className="grid grid-rows-auto grid-cols-6 mt-2 gap-x-3">
              {recs.map((vals, i) => (
                <div
                  key={i}
                  className="rounded-lg mt-2"
                  style={{
                    position: "relative",
                    height: "200px",
                    width: "100px",
                  }}
                >
                  <Image
                    src={recs[i]}
                    alt="movie"
                    className="rounded-lg"
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
