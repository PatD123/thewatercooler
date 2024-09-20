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
    <Welcome nextStep={nextStep} />,
    <BuildProfile nextStep={nextStep} />,
    <VerifyEmail />,
  ];

  return <div className="no-scrollbar">{getStartedComps[currComp]}</div>;
}
