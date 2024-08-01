"use client";

import Welcome from "@/app/get-started/Welcome";
import BuildProfile from "@/app/get-started/BuildProfile";
import PreviewProfile from "@/app/get-started/PreviewProfile";
import { useState } from "react";

export default function GetStarted() {
  const [currComp, setCurrComp] = useState(0);
  function nextStep() {
    if (currComp + 1 < 3) {
      setCurrComp(currComp + 1);
    }
  }
  const getStartedComps = [
    <Welcome nextStep={nextStep} />,
    <BuildProfile nextStep={nextStep} />,
    <PreviewProfile />,
  ];

  return <div>{getStartedComps[currComp]}</div>;
}