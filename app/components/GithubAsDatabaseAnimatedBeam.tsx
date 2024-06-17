"use client";

import React, { useRef } from "react";
import { AnimatedBeam } from "./AnimatedBeam";
import clsx from "clsx";
import LiveFeedbackIcon from "./icons/LiveFeedbackIcon";
import { GithubLogo } from "@phosphor-icons/react/dist/ssr";

type Props = React.HTMLAttributes<HTMLDivElement>;

const GithubAnimatedBeam = ({ className }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={containerRef}
      className={clsx(
        "relative flex h-full w-full items-center justify-between",
        className
      )}
    >
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div1Ref}
        curvature={24}
        toRef={div2Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div3Ref}
      />
      <AnimatedBeam
        reverse
        containerRef={containerRef}
        fromRef={div1Ref}
        curvature={24}
        toRef={div2Ref}
      />
      <AnimatedBeam
        reverse
        containerRef={containerRef}
        fromRef={div2Ref}
        toRef={div3Ref}
      />
      <div
        ref={div1Ref}
        className="z-20 flex items-center justify-center w-12 h-12 text-lg border rounded-full shadow-xl border-white/10 bg-background text-foreground"
      >
        <LiveFeedbackIcon className="drop-shadow-sm" />
      </div>
      <div
        ref={div2Ref}
        className="z-20 flex items-center justify-center w-12 h-12 text-lg -translate-y-6 border rounded-full shadow-xl border-white/10 bg-background text-foreground"
      >
        <GithubLogo />
      </div>
      <div
        ref={div3Ref}
        className="z-20 flex items-center justify-center w-12 h-12 text-lg border rounded-full shadow-xl border-white/10 bg-background text-foreground"
      >
        <div className="flex h-4 w-4 justify-center items-center aspect-square border border-white rounded-[50%]">
          <span className="bg-white w-1 h-1 rounded-[50%]"></span>
        </div>
      </div>
    </div>
  );
};

export default GithubAnimatedBeam;
