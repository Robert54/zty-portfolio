'use client'

import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import SimliAvatar from "./SimliAvatar"

export default function Photo() {
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);

  const handleAvatarOpen = () => {
    if (!isAvatarOpen) {
      setIsAvatarOpen(true);
    }
  };

  const handleAvatarClose = () => {
    setIsAvatarOpen(false);
  };

  // Open on Enter or Space like a native button (ignore keys from inside the open avatar)
  const handleAvatarKeyDown = (e) => {
    if (e.target !== e.currentTarget) return;
    if (e.key === "Enter" || e.key === " ") {
      if (e.key === " ") e.preventDefault();
      handleAvatarOpen();
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      setIsAvatarOpen(false);
    };
  }, []);

  return (
    <div className="w-full h-full relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.3, duration: 0.4, ease: "easeIn" },
        }}
      > 
        {/* SVG definitions for mask and clip path */}
        <svg width="0" height="0" className="absolute">
          <defs>
            <radialGradient id="fadeGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="90%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
            <mask id="fadeMask">
              <circle cx="50%" cy="50%" r="50%" fill="url(#fadeGradient)" />
            </mask>
            <clipPath id="circleClip">
              <circle cx="50%" cy="50%" r="50%" />
            </clipPath>
          </defs>
        </svg>
        
        {/* Image container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.4, duration: 0.4, ease: "easeInOut" },
          }}
          className="w-[300px] h-[300px] xl:w-[500px] xl:h-[500px] relative overflow-hidden cursor-pointer"
          onClick={handleAvatarOpen}
          onKeyDown={handleAvatarKeyDown}
          // A button only while the photo shows; the open avatar has its own Close button
          role={isAvatarOpen ? undefined : "button"}
          tabIndex={isAvatarOpen ? -1 : 0}
          aria-label={isAvatarOpen ? undefined : "Talk to my AI avatar (uses your microphone)"}
        >
          <div className="w-full h-full relative rounded-full overflow-hidden">
            {!isAvatarOpen ? (
              <Image
                src="/assets/photo.png"
                priority
                quality={100}
                fill
                sizes="(max-width: 768px) 300px, 500px"
                alt="Tingyu (Robert) Zhang"
                className="object-cover"
                style={{ objectPosition: "center" }}
              />
            ) : (
              <SimliAvatar 
                isOpen={isAvatarOpen} 
                onClose={handleAvatarClose} 
              />
            )}
          </div>
        </motion.div>

        {/* Animated circle */}
        <motion.svg
          className="w-[300px] xl:w-[500px] h-[300px] xl:h-[500px] absolute top-0 left-0 pointer-events-none"
          fill="transparent"
          viewBox="0 0 500 500"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="250"
            cy="250"
            r="248"
            stroke="#00CED1"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ strokeDasharray: "24 10 0 0" }}
            animate={{
              strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
              rotate: [120, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        </motion.svg>

        {/* Caption under the circle; hidden (but keeps its space) while the avatar is open */}
        <p
          className={`mt-4 text-center text-sm text-white/60 ${isAvatarOpen ? "invisible" : ""}`}
          aria-hidden="true"
        >
          Talk to my AI avatar · uses your mic
        </p>
      </motion.div>
    </div>
  )
}