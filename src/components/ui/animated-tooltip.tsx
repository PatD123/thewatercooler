"use client";
import Image from "next/image";
import React, { useState } from "react";
import {
  motion,
  useTransform,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    image: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0); // going to set this value on mouse move
  // rotate the tooltip
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  // translate the tooltip
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );
  const handleMouseMove = (event: any) => {
    const halfWidth = event.target.offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth); // set the x value, which is then used in transform and rotate
  };

  const [reveal, setReveal] = useState(false);
  const visibility = reveal ? "visible" : "hidden";

  return (
    <>
      {items.map((item, idx) => (
        <div
          className="-mr-4 relative group"
          key={idx}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence mode="popLayout">
            {hoveredIndex === item.id && item.name != "Avatar" && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
                className="absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs  flex-col items-center justify-center rounded-md bg-black z-50 shadow-xl px-4 py-2"
              >
                <div className="font-bold text-xs text-white relative text-base">
                  {item.name}
                </div>
                <div className="text-white text-xs">{item.designation}</div>
              </motion.div>
            )}
          </AnimatePresence>
          {visibility ? (
            <Image
              key={idx}
              onMouseMove={handleMouseMove}
              height={100}
              width={100}
              src={item.image}
              alt={item.name}
              style={{ visibility }}
              onLoad={() => setReveal(true)}
              className={`object-cover !m-0 !p-0 object-top rounded-full ${
                item.name === "Avatar" ? "h-20 w-20" : "h-14 w-14"
              } border-2 group-hover:scale-105 group-hover:z-30 border-white  relative transition duration-500`}
            />
          ) : (
            <Image
              key={idx}
              onMouseMove={handleMouseMove}
              height={100}
              width={100}
              src="/pulp.webp"
              alt={item.name}
              className={`object-cover !m-0 !p-0 object-top rounded-full ${
                item.name === "Avatar" ? "h-20 w-20" : "h-14 w-14"
              } border-2 group-hover:scale-105 group-hover:z-30 border-white  relative transition duration-500`}
            />
          )}
        </div>
      ))}
    </>
  );
};

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
