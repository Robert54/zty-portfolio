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
          transition: { delay: 2, duration: 0.4, ease: "easeIn" },
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
              <circle cx="250" cy="250" r="250" fill="url(#fadeGradient)" />
            </mask>
            <clipPath id="circleClip">
              <circle cx="250" cy="250" r="250" />
            </clipPath>
          </defs>
        </svg>
        
        {/* Image container */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 2.4, duration: 0.4, ease: "easeInOut" },
          }}
          className="w-[300px] h-[300px] xl:w-[500px] xl:h-[500px] relative overflow-hidden cursor-pointer"
          onClick={handleAvatarOpen}
        >
          <div className="w-full h-full relative" style={{ clipPath: "url(#circleClip)" }}>
            {!isAvatarOpen ? (
              <Image
                src="/assets/photo.png"
                priority
                quality={100}
                fill
                alt="Tingyu (Robert) Zhang"
                className="object-cover"
                style={{ mask: "url(#fadeMask)" }}
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
      </motion.div>
    </div>
  )
}