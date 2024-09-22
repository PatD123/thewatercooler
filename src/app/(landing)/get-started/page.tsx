"use client";

import Welcome from "@/app/(landing)/get-started/Welcome";
import BuildProfile from "@/app/(landing)/get-started/BuildProfile";
import VerifyEmail from "@/app/(landing)/get-started/verifyEmail";
import { useState } from "react";

export default function GetStarted() {
  const [currComp, setCurrComp] = useState(0);
  function nextStep() {
    if (currComp + 1 < 3) {
      setCurrComp(currComp + 1);
    }
  }
  const getStartedComps = [
    <Welcome key="0" nextStep={nextStep} />,
    <BuildProfile key="1" nextStep={nextStep} />,
    <VerifyEmail key="2" />,
  ];

  return <div className="no-scrollbar">{getStartedComps[currComp]}</div>;
}
