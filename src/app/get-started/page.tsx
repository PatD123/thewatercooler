"use client";

import Image from "next/image";
import Welcome from "@/app/get-started/Welcome";
import BuildProfile from "@/app/get-started/BuildProfile";
import { useState } from "react";

export default function GetStarted() {
  const [currComp, setCurrComp] = useState(0);
  function nextStep() {
    if (currComp + 1 < 2) {
      setCurrComp(currComp + 1);
    }
  }
  const getStartedComps = [
    <Welcome buildProfile={nextStep} />,
    <BuildProfile />,
  ];

  return <div>{}</div>;
}
