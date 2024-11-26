'use client'
import React from "react";
import Social from "@/components/Social";
import Photo from "@/components/Photo";
import Stats from "@/components/Stats";
import DownloadButtons from "@/components/DownloadButtons";
import dynamic from 'next/dynamic';

// Dynamically import Scene component
const Scene = dynamic(() => import('@/components/coupled-interface/App'), { 
  ssr: false,
  loading: () => <div className="h-full w-full fixed top-0 left-0 bg-black" />
});

export default function Home() {
  return (
    <section className="h-full relative">
      {/* Render the 3D Scene as a background */}
      <div className="fixed inset-0 -z-10">
        <Scene />
      </div>

      <div className="container mx-auto h-full relative z-10">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          <div className="text-center xl:text-left order-2 xl:order-none">
            <span className="text-xl">Software Developer</span>
            <h1 className="h1 mb-6">
              Hello I&apos;m <br /> <span className="text-accent">Tingyu (Robert) Zhang</span>
            </h1>
            <p className="max-w-[500px] mb-9 text-white/80">
              I create intelligent, scalable digital solutions by merging advanced machine learning with full-stack development to elevate user experiences.
            </p>
            {/* Download buttons and social icons */}
            <div className="flex flex-col xl:flex-row items-center gap-8">
              <DownloadButtons />
              <div className="mb-8 xl:mb-0">
                <Social
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent text-base hover:bg-accent hover:text-primary hover:transition-all duration-500"
                />
              </div>
            </div>
          </div>
          <div className="order-1 xl:order-none mb-8 xl:mb-0">
            <Photo />
          </div>
        </div>
      </div>

      <Stats />
    </section>
  );
}