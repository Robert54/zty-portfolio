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
    category: "AGI House hackathon",
    title: "Inflection AI + LiveKit Integration",
    date: "Summer 2025",
    description:
      "Built real-time emotional AI system using Pi 3.1's emotion attribute labeling with LiveKit WebRTC integration and Tavus for digital human coaching.",
    stack: [
      { name: "Pi 3.1" },
      { name: "LiveKit" },
      { name: "Tavus" },
    ],
    bullets: [
      "Built real-time emotional AI system using Pi 3.1's emotion attribute labeling with LiveKit WebRTC integration.",
      "Integrated Tavus for digital human coaching with dynamic emotional state detection during live sessions.",
    ],
    image: "/assets/work/ai_conversation.png",
    live: "https://github.com/Robert54",
    github: "https://github.com/Robert54",
  },
  {
    category: "AI Engineering hackathon",
    title: "Accessible Front-End Codegen",
    date: "Summer 2025",
    description:
      "Co-developed WCAG-compliant UI generator outperforming frontier LLMs by 32% using Reasoning Reward Model (RRM).",
    stack: [
      { name: "Qwen 4B" },
      { name: "Unsloth" },
      { name: "Claude 4" },
      { name: "Gemini 2.5" },
    ],
    bullets: [
      "Fine-tuned Qwen 4B with custom Unsloth strategy achieving 91% compliance score with axe-core and WAVE evaluation.",
      "Created 18M token accessibility dataset using Claude 4 and Gemini 2.5 Flash for specialized training.",
    ],
    image: "/assets/work/ai_scraper.png",
    live: "https://github.com/Robert54",
    github: "https://github.com/Robert54",
  },
  {
    category: "GPU hackathon",
    title: "CUDA Codegen System",
    date: "Spring 2025",
    description:
      "1st Place: Built PyTorch-to-CUDA transpiler achieving 40% average speedup using fine-tuned Llama DeepSeek7B.",
    stack: [
      { name: "PyTorch" },
      { name: "CUDA" },
      { name: "Llama" },
      { name: "GRPO" },
    ],
    bullets: [
      "Built PyTorch-to-CUDA transpiler achieving 40% average speedup using fine-tuned Llama DeepSeek7B.",
      "Applied GRPO optimization with compile success, correctness, and performance reward signals.",
    ],
    image: "/assets/work/cuda_codegen.png",
    live: "https://words.strongcompute.com/p/strong-compute-gpu-hackathon-recap",
    github: "https://github.com/Robert54",
  },
  {
    category: "Llama Impact hackathon",
    title: "Compllama",
    date: "Fall 2024",
    description:
      "2nd Place: Developed AI compliance automation processing 500+ municipalities using Llama Stack Framework with Together AI.",
    stack: [
      { name: "Llama" },
      { name: "ChromaDB" },
      { name: "LlamaIndex" },
      { name: "Together AI" },
    ],
    bullets: [
      "Developed AI compliance automation processing 500+ municipalities using Llama Stack Framework with Together AI.",
      "Won Best Usage of Llama Stack award for innovative ChromaDB + LlamaIndex orchestration.",
    ],
    image: "/assets/work/comp_llama.png",
    live: "https://lablab.ai/event/llama-impact-hackathon/compllama/compllama",
    github: "https://github.com/Robert54",
  },
  {
    category: "autonomous driving",
    title: "Lane Simulation in Autonomous Driving Training",
    date: "Fall 2023",
    description:
      "Developed a Generative Adversarial Network (GAN) to transform abstract lane depictions into realistic road conditions, integrating Meta's Segment Anything Model (SAM) to improve ground truth masks for autonomous driving training.",
    stack: [
      { name: "GANs" },
      { name: "Python" },
      { name: "Pytorch" },
    ],
    image: "/assets/work/lane_simulation.png",
    live: "https://github.com/Robert54",
    github: "https://github.com/Robert54",
  },
  {
    category: "parallel computing",
    title: "Depthwise Separable Convolution Acceleration on GPU",
    date: "Winter 2022",
    description:
      "Accelerated Depthwise Separable Convolution on GPU by implementing a parallelized GEMM approach and optimizing memory access patterns through data re-usage in shared memory and register-level shuffling.",
    stack: [
      { name: "CUDA" },
      { name: "GEMM" },
      { name: "C++" },
    ],
    image: "/assets/work/cuda_codegen.png",
    live: "https://github.com/Robert54",
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
                {String(projects.findIndex(p => p.title === project.title) + 1).padStart(2, "0")}
              </div>
              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
                {project.category} project
              </h2>
              <p className="text-white/60">{project.description}</p>
              <ul className="flex flex-wrap gap-x-4 gap-y-2">
                {project.stack.map((item, index) => (
                  <li key={index} className="text-xl text-accent whitespace-nowrap">
                    {item.name}
                    {index !== project.stack.length - 1 && ","}
                  </li>
                ))}
              </ul>
              <div className="border border-white/20" />
              <div className="flex items-center gap-4">
                <Link
                  href={project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open live project: ${project.title}`}
                >
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
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open GitHub repository: ${project.title}`}
                >
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
