"use client";

import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CiMenuFries } from "react-icons/ci";
import { motion } from "framer-motion";
import AudioControls from "./AudioControls";

const links = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "resume",
    path: "/resume",
  },
  {
    name: "project",
    path: "/project",
  },
  {
    name: "contact",
    path: "/contact",
  },
];

const MobileNav = () => {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="flex justify-center items-center p-2 cursor-pointer z-50 relative" aria-label="Open menu">
          <CiMenuFries className="text-[32px] text-accent" />
        </button>
      </SheetTrigger>
      <SheetContent 
        className="flex flex-col overflow-y-auto py-4 px-4 max-h-screen" 
        side="right">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <div className="sr-only" id="navigation-description">Navigation menu for the portfolio website</div>
        {/* logo */}
        <div className="mt-8 mb-12 text-center">
          <Link href="/">
            <div className="relative w-[80px] h-[80px] mx-auto">
              {/* Circle background */}
              <div className="w-full h-full rounded-full bg-accent/10 flex items-center justify-center overflow-hidden">
                <h1 className="text-xl font-semibold z-10">
                  T<span className="text-accent">.</span>
                </h1>
              </div>

              {/* Animated circle border */}
              <div className="absolute inset-0 rounded-full border border-accent animate-pulse"></div>
              
              {/* Animated circle draw effect */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 80 80">
                <circle 
                  cx="40" 
                  cy="40" 
                  r="39" 
                  fill="none" 
                  stroke="#0FCDA8" 
                  strokeWidth="1" 
                  strokeDasharray="245" 
                  strokeDashoffset="245" 
                  className="animate-draw"
                />
              </svg>
            </div>
          </Link>
        </div>
        {/* nav */}
        <nav className="flex flex-col justify-center items-center gap-3">
          {links.map((link, index) => {
            return (
              <Link
                href={link.path}
                key={index}
                className={`${
                  link.path === pathname &&
                  "text-accent border-b border-accent"
                } text-base capitalize hover:text-accent transition-all`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>
        
        {/* Podcast Controls */}
        <div className="mt-8 pt-4 border-t border-gray-700 w-full">
          <div className="flex flex-col items-center">
            <h3 className="text-sm mb-2 text-white/70">Resume Podcast</h3>
            <div className="w-full flex justify-center">
              <AudioControls />
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
