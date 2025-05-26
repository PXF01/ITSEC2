"use client";
import React, { useEffect, useState } from "react";

import ChatButton from "./Components/ChatButton";
import DottedFace from "./Components/DottedFace";
import SimliHeaderLogo from "./Components/Logo";
import Navbar from "./Components/Navbar";
import Image from "next/image";
import GitHubLogo from "@/media/github-mark-white.svg";

const Demo: React.FC = () => {
  const [showDottedFace, setShowDottedFace] = useState(true);

  const onStart = () => {
    console.log("Setting setshowDottedface to false...");
    setShowDottedFace(false);
  };

  const onClose = () => {
    console.log("Setting setshowDottedface to true...");
    setShowDottedFace(true);
  };

  return (
    <div className="bg-black min-h-screen flex flex-col items-center font-abc-repro font-normal text-sm text-white p-8">
      <SimliHeaderLogo />
      <Navbar />
      <ChatButton />

      <div className="absolute top-[32px] right-[32px]">
        <text
          onClick={() => {
            window.open("https://github.com/simliai/create-simli-agent");
          }}
          className="font-bold cursor-pointer mb-8 text-xl leading-8"
        >
          <Image className="w-[20px] inline mr-2" src={GitHubLogo} alt="" />
        </text>
      </div>
      <div className="flex flex-col items-center gap-6 bg-effect15Black p-6 pb-[40px] rounded-xl w-full">
        {showDottedFace && <DottedFace />}
      </div>

      <div className="max-w-[400px] font-thin flex flex-col items-center mt-auto mb-24">
        <span className="font-bold mb-[8px] leading-5 ">
          {" "}
           
          <div className="text-center space-y-4">
            <p className="text-xl font-semibold">Your AI-powered security assistant</p>
            <div className="flex flex-col gap-2">
              <span className="text-blue-400">• Expert security guidance and support</span>
              <span className="text-blue-400">• 24/7 threat monitoring</span>
              <span className="text-blue-400">• Advanced protection</span>
            </div>
          </div>
        </span>
      </div>
    </div>
  );
};

export default Demo;
