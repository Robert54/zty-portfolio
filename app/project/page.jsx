// "use client";

// import { motion } from "framer-motion";
// import React, { useState } from "react";

// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";

// import { BsArrowUpRight, BsGithub } from "react-icons/bs";

// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

// import Link from "next/link";
// import Image from "next/image";
// import WorkSliderBtns from "@/components/WorkSliderBtns";

// const projects = [
//   {
//     num: "01",
//     category: "fullstack",
//     title: "AI-Powered Conversation System",
//     description:
//       "Developed a full-stack AI-powered system with Next.js and TypeScript. Implemented Emotion and Topics-guided Contextual RAG using Langchain, synchronized data management with Pinecone and MongoDB.",
//     stack: [
//       { name: "Next.js" },
//       { name: "TypeScript" },
//       { name: "Langchain" },
//       { name: "Pinecone" },
//       { name: "MongoDB" },
//     ],
//     image: "/assets/work/ai_conversation.png",
//     live: "https://vercel.app/live_project_url",
//     github: "https://github.com/Robert54",
//   },
//   {
//     num: "02",
//     category: "machine learning",
//     title: "Lane Simulation in Autonomous Driving",
//     description:
//       "Built a generative model using GANs for lane condition simulation, enhancing autonomous driving training. Integrated Meta's SAM model for better image quality.",
//     stack: [{ name: "GANs" }, { name: "Python" }, { name: "Pytorch" }],
//     image: "/assets/work/lane_simulation.png",
//     live: "",
//     github: "https://github.com/Robert54",
//   },
//   {
//     num: "03",
//     category: "data engineering",
//     title: "AI Directory Website Scraper",
//     description:
//       "Developed an AI-powered web scraper for directory sites, handling pagination, dynamic content, and map-based interfaces. Utilized GPT-4o-mini models for intelligent element detection, reverse API routing for accuracy, and Firecrawl for request tracking.",
//     stack: [
//       { name: "GPT-4o-mini" },
//       // { name: "Firecrawl" },
//       { name: "Playright" },
//       { name: "Python" },
//     ],
//     image: "/assets/work/ai_scraper.png",
//     live: "",
//     github: "https://github.com/Robert54",
//   },
// ];

// const Work = () => {
//   const [project, setProject] = useState(projects[0]);

//   const handleSlideChange = (swiper) => {
//     // get current slide index
//     const currentIndex = swiper.activeIndex;
//     // update project state based on current slide index
//     setProject(projects[currentIndex]);
//   };

//   return (
//     <motion.section
//       initial={{ opacity: 0 }}
//       animate={{
//         opacity: 1,
//         transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
//       }}
//       className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
//     >
//       <div className="container mx-auto">
//         <div className="flex flex-col xl:flex-row xl:gap-[30px]">
//           <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
//             <div className="flex flex-col gap-[30px] h-[50%]">
//               {/* outline num */}
//               <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
//                 {project.num}
//               </div>
//               {/* project category */}
//               <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
//                 {project.category} project
//               </h2>
//               {/* project description */}
//               <p className="text-white/60">{project.description}</p>
//               {/* stack */}
//               <ul className="flex gap-4">
//                 {project.stack.map((item, index) => {
//                   return (
//                     <li key={index} className="text-xl text-accent">
//                       {item.name}
//                       {/* remove the last comma */}
//                       {index !== project.stack.length - 1 && ","}
//                     </li>
//                   );
//                 })}
//               </ul>
//               {/* border */}
//               <div className="border border-white/20"></div>
//               {/* buttons */}
//               <div className="flex items-center gap-4">
//                 {/* live project button */}
//                 <Link href={project.live}>
//                   <TooltipProvider delayDuration={100}>
//                     <Tooltip>
//                       <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
//                         <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
//                       </TooltipTrigger>
//                       <TooltipContent>
//                         <p>Live project</p>
//                       </TooltipContent>
//                     </Tooltip>
//                   </TooltipProvider>
//                 </Link>
//                 {/* github project button */}
//                 <Link href={project.github}>
//                   <TooltipProvider delayDuration={100}>
//                     <Tooltip>
//                       <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
//                         <BsGithub className="text-white text-3xl group-hover:text-accent" />
//                       </TooltipTrigger>
//                       <TooltipContent>
//                         <p>Github repository</p>
//                       </TooltipContent>
//                     </Tooltip>
//                   </TooltipProvider>
//                 </Link>
//               </div>
//             </div>
//           </div>
//           <div className="w-full xl:w-[50%]">
//             <Swiper
//               spaceBetween={30}
//               slidesPerView={1}
//               className="xl:h-[520px] mb-12"
//               onSlideChange={handleSlideChange}
//             >
//               {projects.map((project, index) => {
//                 return (
//                   <SwiperSlide key={index} className="w-full">
//                     <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20">
//                       {/* overlay */}
//                       <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
//                       {/* image */}
//                       <div className="relative w-full h-full">
//                         <Image
//                           src={project.image}
//                           fill
//                           className="object-cover"
//                           alt=""
//                         />
//                       </div>
//                     </div>
//                   </SwiperSlide>
//                 );
//               })}
//               {/* slider buttons */}
//               <WorkSliderBtns
//                 containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
//                 btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all"
//               />
//             </Swiper>
//           </div>
//         </div>
//       </div>
//     </motion.section>
//   );
// };

// export default Work;
"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BsArrowUpRight, BsGithub } from "react-icons/bs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import Image from "next/image";
import WorkSliderBtns from "@/components/WorkSliderBtns";

const projects = [
  {
    num: "01",
    category: "fullstack",
    title: "AI-Powered Conversation System",
    description:
      "Developed a full-stack AI-powered system with Next.js and TypeScript. Implemented Emotion and Topics-guided Contextual RAG using Langchain, synchronized data management with Pinecone and MongoDB.",
    stack: [
      { name: "Next.js" },
      { name: "TypeScript" },
      { name: "Langchain" },
      { name: "Pinecone" },
      { name: "MongoDB" },
    ],
    image: "/assets/work/ai_conversation.png",
    live: "https://vercel.app/live_project_url",
    github: "https://github.com/Robert54",
  },
  {
    num: "02",
    category: "machine learning",
    title: "Lane Simulation in Autonomous Driving",
    description:
      "Built a generative model using GANs for lane condition simulation, enhancing autonomous driving training. Integrated Meta's SAM model for better image quality.",
    stack: [{ name: "GANs" }, { name: "Python" }, { name: "Pytorch" }],
    image: "/assets/work/lane_simulation.png",
    live: "",
    github: "https://github.com/Robert54",
  },
  {
    num: "03",
    category: "data engineering",
    title: "AI Directory Website Scraper",
    description:
      "Developed an AI-powered web scraper for directory sites, handling pagination, dynamic content, and map-based interfaces. Utilized GPT-4o-mini models for intelligent element detection, reverse API routing for accuracy, and Firecrawl for request tracking.",
    stack: [
      { name: "GPT-4o-mini" },
      { name: "Playright" },
      { name: "Python" },
    ],
    image: "/assets/work/ai_scraper.png",
    live: "",
    github: "https://github.com/Robert54",
  },
];

const Work = () => {
  const [project, setProject] = useState(projects[0]);

  const handleSlideChange = (swiper) => {
    const currentIndex = swiper.activeIndex;
    setProject(projects[currentIndex]);
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:px-0"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          {/* Left side content */}
          <div className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-none">
            <div className="flex flex-col gap-[30px] h-[50%]">
              <div className="text-8xl leading-none font-extrabold text-transparent text-outline">
                {project.num}
              </div>
              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
                {project.category} project
              </h2>
              <p className="text-white/60">{project.description}</p>
              <ul className="flex gap-4">
                {project.stack.map((item, index) => (
                  <li key={index} className="text-xl text-accent">
                    {item.name}
                    {index !== project.stack.length - 1 && ","}
                  </li>
                ))}
              </ul>
              <div className="border border-white/20" />
              <div className="flex items-center gap-4">
                <Link href={project.live}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Live project</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
                <Link href={project.github}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group">
                        <BsGithub className="text-white text-3xl group-hover:text-accent" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Github repository</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
            </div>
          </div>
          
          {/* Right side slider */}
          <div className="w-full xl:w-[50%]">
            <Swiper
              spaceBetween={30}
              slidesPerView={1}
              className="h-auto xl:h-[520px] mb-12"
              onSlideChange={handleSlideChange}
            >
              {projects.map((project, index) => (
                <SwiperSlide key={index} className="w-full">
                  <div className="relative aspect-[4/3] w-full group">
                    <div className="absolute inset-0 bg-black/10 z-10" />
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-contain bg-pink-50/20"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={index === 0}
                    />
                  </div>
                </SwiperSlide>
              ))}
              <WorkSliderBtns
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all"
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Work;
