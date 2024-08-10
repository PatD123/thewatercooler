"use client";

import { cn } from "@/lib/utils";
import {
  IconArrowWaveRightUp,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { fetchTMDBPage } from "@/app/lib/data";
import Pagination from "@/components/ui/pagination";
import { useEffect, useState } from "react";
import Image from "next/image";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-min grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto bg-white/20 backdrop-blur-sm drop-shadow-lg",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  setCineName,
  setCineImgSrc,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: string | React.ReactNode;
  setCineName: any;
  setCineImgSrc: any;
}) => {
  return (
    <div
      className={cn(
        "relative row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-black dark:border-white/[0.2] bg-white border border-transparent justify-between flex flex-col space-y-4",
        className
      )}
      onClick={() => {
        document.getElementById("search-dropdown")!.value = title;
        setCineName(title);
        setCineImgSrc(`https://image.tmdb.org/t/p/original${icon}`);
      }}
    >
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        <div
          className="object-cover"
          style={{ position: "relative", width: "200px", height: "300px" }}
        >
          <Image
            className="rounded-lg"
            src={`https://image.tmdb.org/t/p/original${icon}`}
            alt="Picture of the author"
            fill
            style={{
              objectFit: "contain",
            }}
          />
        </div>
        <div className="font-sans font-bold text-neutral-600 dark:text-neutral-200 mb-2 mt-2">
          {title}
        </div>
        <div className="font-sans font-normal text-neutral-600 text-xs dark:text-neutral-300">
          {description}
        </div>
      </div>
    </div>
  );
};

export function BentoGridSearch({
  query,
  qtype,
  setCineName,
  setCineImgSrc,
}: {
  query: string;
  qtype: string;
  setCineName: any;
  setCineImgSrc: any;
}) {
  const [currPage, setCurrPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [data, setData] = useState([]);

  function handlePagination(page: number) {
    if (page < 1) setCurrPage(1);
    else if (page > totalPages) setCurrPage(totalPages);
    else setCurrPage(page);
    setData([]);
  }

  useEffect(() => {
    async function getData() {
      const response = await fetchTMDBPage(query, qtype, currPage);
      setTotalPages(response["total_pages"]);
      setData(response["results"]);
    }
    getData();
  }, [query, currPage]);

  return data ? (
    <BentoGrid className="absolute max-h-[75%] p-5 border-2 rounded-lg shadow-lg shadow-cyan-500/50 overflow-y-auto z-40">
      {data.map((item, i) => (
        <BentoGridItem
          key={i}
          title={
            qtype.includes("TV")
              ? item["original_name"]
              : item["original_title"]
          }
          icon={item["poster_path"]}
          setCineName={setCineName}
          setCineImgSrc={setCineImgSrc}
        />
      ))}
      {totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          currPage={currPage}
          handlePagination={handlePagination}
        />
      )}
    </BentoGrid>
  ) : null;
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
