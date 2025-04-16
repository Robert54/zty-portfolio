"use client";

import React from "react"
import { useState } from "react";
import { motion } from "framer-motion";
import Link from 'next/link';
import {
  FaJs,
  FaReact,
  FaPython,
  FaJava,
} from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs, SiCplusplus, SiTensorflow, SiPytorch } from "react-icons/si";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import DownloadButtons from "@/components/ResumeDownloadButtons"

// about data
const about = {
  title: "About me",
  description:
    "Experienced AI/ML Full Stack Engineer with a strong background in computer engineering and computer science.",
  info: [
    { fieldName: "Name", fieldValue: "Tingyu (Robert) Zhang" },
    { fieldName: "Phone", fieldValue: "+1 (323) 943-5582" },
    { fieldName: "Experience", fieldValue: "1+ Years" },
    { fieldName: "Github", fieldValue: "https://github.com/Robert54", isLink: true },
    { fieldName: "Address", fieldValue: "4134 Pacific Coast Hwy, Torrance, CA, 90505" },
    { fieldName: "Email", fieldValue: "zty9854@gmail.com" },
    { fieldName: "LinkedIn", fieldValue: "https://www.linkedin.com/in/tingyu-zhang-b3357314a/", isLink: true },
    { fieldName: "Languages", fieldValue: "English, Mandarin" },
  ],
};

// experience data
const experience = {
  icon: "/assets/resume/badge.svg",
  title: "My experience",
  description: "Professional experience in AI/ML, Full-Stack development, and algorithm engineering.",
  items: [
    {
      company: "All Abilities Solutions",
      position: "AI / ML Software Engineer",
      duration: "December 2024 - Present",
      location: "Remote (Los Angeles)",
      country: "United States",
      details: [
        "Developed an integrated AI assistant platform for Northwest Center and Marriott Bonvoy that combines RAG, memory systems, and multimodal capabilities for real-world automation.",
        "Built multimodal agents using Vapi, CUA, and LangManus for shift management and booking workflows.",
        "Created a Simli-powered avatar for Marriott enabling video/audio customer interactions for flight bookings.",
        "Implemented on-device document processing for extracting key information from schedules, contracts, and manuals.",
        "Fine-tuned Qwen2-VL (2B) via SFT + GRPO to recognize cleaning-specific visual elements in janitorial environments.",
        "Deployed lightweight models (DeepSeek R1, Gemma 3B) with MLX and MLC Chat for offline capabilities.",
        "Enabled offline voice interaction through Sesame 1B deployed on the phone.",
        "Utilized Arize for tracing and evaluating voice application pipelines, enhancing observability in voice chat.",
        "Utilized Gemini for video task verification and Hume AI for employee sentiment analysis (mood check).",
        "Migrated from Next.js to React Native (Expo + Solito) for consistent web/mobile experience.",
        "Connected external systems via MCP architecture and delivered analytics dashboards using Firebase and Vercel."
      ]
    },
    {
      company: "AffectusAI",
      position: "AI / ML Full Stack Engineer",
      duration: "June 2024 - December 2024",
      location: "Remote (Los Angeles)",
      country: "United States",
      details: [
        "Built full-stack AI conversation system using TypeScript backend, Next.js/React frontend, with Emotion/Topics-guided Contextual RAG (Langchain) and optimized Pinecone-MongoDB synchronization.",
        "Engineered voice interaction pipeline with voice cloning, cancellation and filtering, using OpenAI/Groq for TTS/STT and ElevenLabs/Play.HT/Deepgram, with real-time interaction capabilities via LiveKit, Vapi, and Daily (pipecat).",
        "Enhanced personalized user experience through OpenAI model fine-tuning, Perplexity web search, and developed a dynamic style management system, incorporating Hume AI’s emotional tagging for adaptive LLM state management.",
        "Developed an multi-step graph-based retrieval system using nearest neighbor algorithms, GraphRAG, and utilized embedding techniques like manifold learning and RIC for recall, complete with an interactive visualization interface.",
        "Implemented AI safety measures with NVIDIA NeMo Guardrails, RAGs for continuous evaluation.",
        "Designed no-code dynamic behaviour RAG chatflows & agentic workflows with Flowise."
      ]
    },
    {
      company: "Chima (YC-W23)",
      position: "Applied AI Engineer",
      duration: "Jan 2024 - Feb 2024",
      location: "San Francisco",
      country: "United States",
      details: [
        "Developed FastAPI backend services to identify knowledge gaps between user queries and LLM knowledge base.",
        "Incorporated OpenAI and Perplexity API for responsive knowledge gap filling and reindexing in the RAG System.",
        "Integrated backend with React Front-end and deployed product on Vercel for accessibility and performance."
      ]
    },
    {
      company: "Ping An Technology",
      position: "Machine Learning Engineer Intern (NLP)",
      duration: "June 2021 - August 2021",
      location: "Shanghai",
      country: "China",
      details: [
        "Utilized elastic search and NLP techniques for event extraction from news and policy documents.",
        "Assisted in building a python-based Data Flow implementation for policy linkage models.",
        "Applied temporal graph neural networks to predict policy document release and analyze their impact."
      ]
    },
    {
      company: "Shanghai Em-data Technology Co., Ltd.",
      position: "Machine Learning Engineer Intern (CV)",
      duration: "September 2020 - November 2020",
      location: "Shanghai",
      country: "China",
      details: [
        "Conducted research on precipitation detection using satellite data and modified Deeplab V3+.",
        "Synthesized satellite data with numerical weather prediction model data for improved accuracy.",
        "Assisted in processing model outputs for precipitation forecasting and explored upsampling methods.",
        "Designed data preprocessing scripts for various models, including data cleaning and image processing."
      ]
    },
    {
      company: "Institute for China Sustainable Urbanization Tsinghua University",
      position: "Big Data Engineer Intern",
      duration: "July 2018 - August 2018",
      location: "Beijing",
      country: "China",
      details: [
        "Built database of biochemical corporations using data mining techniques.",
        "Analyzed raw data from city offices using NLP and deep learning for research publications.",
        "Developed image recognition model with Convolutional Neural Net to detect website bots."
      ]
    },
  ],
}


// education data
const education = {
  icon: "/assets/resume/cap.svg",
  title: "My education",
  description:
    "Strong academic background in Computer Engineering and Computer Science from top universities.",
  items: [
    {
      institution: "University of Southern California",
      degree: "Master in Computer Engineering",
      duration: "September 2021 - December 2023",
      city: "Los Angeles",
      country: "United States",
    },
    {
      institution: "University of Toronto",
      degree: "Bachelor in Computer Science, Double Minor in Mathematics & Statistics",
      duration: "August 2016 - June 2021",
      city: "Toronto",
      country: "Canada",
    },
  ],
};

// skills data
const skills = {
  title: "My skills",
  description:
    "Proficient in various programming languages, frameworks, and tools for AI/ML and full-stack development.",
  skillList: [
    { icon: <FaPython />, name: "Python" },
    { icon: <FaJava />, name: "Java" },
    { icon: <SiCplusplus />, name: "C/C++" },
    { icon: <FaJs />, name: "JavaScript" },
    { icon: <FaReact />, name: "React" },
    { icon: <SiNextdotjs />, name: "Next.js" },
    { icon: <SiPytorch />, name: "Pytorch" },
    { icon: <SiTailwindcss />, name: "Tailwind CSS" },
  ],
};

const HighlightedText = ({ text, highlightWords }) => {
  const words = text.split(/\b/);
  return (
    <span>
      {words.map((word, index) => {
        const lowerWord = word.toLowerCase();
        const isHighlighted = highlightWords.some(hw => lowerWord.includes(hw.toLowerCase()));
        return (
          <span
            key={index}
            className={isHighlighted ? "text-accent font-semibold" : ""}
          >
            {word}
          </span>
        );
      })}
    </span>
  );
};

const Timeline = ({ duration }) => {
  return (
    <div className="flex items-center space-x-2 mb-4">
      <div className="w-4 h-4 rounded-full bg-accent"></div>
      <div className="h-0.5 flex-grow bg-accent"></div>
      <span className="text-accent font-semibold">{duration}</span>
    </div>
  );
};

export default function Resume() {
  const [selectedExperience, setSelectedExperience] = useState(null);

  const openExperienceDialog = (item) => {
    setSelectedExperience(item);
  };

  const closeExperienceDialog = () => {
    setSelectedExperience(null);
  };

  const highlightWords = [
    'RAG', 'multimodal', 'Simli', 'Qwen2-VL', 'DeepSeek', 'Gemma', 'MLC', 'MLX', 'Sesame', 'Arize', 'Gemini', 'Hume',
    'React Native', 'Expo', 'Solito', 'Firebase', 'Vercel', 'TypeScript', 'Next.js', 'React', 'Langchain', 'Pinecone', 'MongoDB',
    'OpenAI', 'Groq', 'TTS', 'STT', 'ElevenLabs', 'Play.HT', 'Deepgram', 'LiveKit', 'Vapi', 'Daily', 'pipecat',
    'Perplexity', 'GraphRAG', 'RIC', 'NVIDIA', 'NeMo', 'Guardrails', 'Flowise', 'AI', 'LLM', 'fine-tuning', 'analytics', 'dashboard', 'offline'
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 2.4, duration: 0.4, ease: "easeIn" },
      }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Tabs
          defaultValue="experience"
          className="flex flex-col xl:flex-row gap-[60px]"
        > 
          <div className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
            <TabsList className="flex flex-col w-full gap-6">
              <TabsTrigger value="experience">Experience</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="about">About me</TabsTrigger>
            </TabsList>
            <div className="w-full flex justify-center xl:justify-start">
              <DownloadButtons />
            </div>
          </div>
          
          <div className="min-h-[70vh] w-full">
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-3xl font-bold">{experience.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0 text-sm">
                  {experience.description}
                </p>
                <ScrollArea className="h-[420px] w-full pr-4 [&_::-webkit-scrollbar]:w-2 [&_::-webkit-scrollbar-thumb]:bg-accent [&_::-webkit-scrollbar-thumb]:rounded-full [&_::-webkit-scrollbar-track]:bg-transparent [&_::-webkit-scrollbar-thumb]:transition-opacity [&_::-webkit-scrollbar-thumb]:duration-300 hover:[&_::-webkit-scrollbar-thumb]:opacity-100 [&_::-webkit-scrollbar-thumb]:opacity-0">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {experience.items.map((item, index) => (
                      <li
                        key={index}
                        className="bg-gradient-to-br from-[#2a2a30] to-[#1c1c20] h-auto py-6 px-6 rounded-xl flex flex-col justify-center items-start gap-2 relative group cursor-pointer"
                        onClick={() => openExperienceDialog(item)}
                      >
                        <div className="absolute inset-0 rounded-xl border-2 border-transparent transition-colors duration-300 group-hover:border-accent"></div>
                        <span className="text-accent text-sm">{item.duration}</span>
                        <h3 className="text-lg font-semibold leading-tight">
                          {item.position}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                          <p className="text-white/60 text-sm">{item.company}</p>
                        </div>
                        <p className="text-white/60 text-sm">{item.location}, {item.country}</p>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-3xl font-bold">{education.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0 text-sm">
                  {education.description}
                </p>
                <ScrollArea className="h-[500px] w-full pr-4 [&_::-webkit-scrollbar]:w-2 [&_::-webkit-scrollbar-thumb]:bg-accent [&_::-webkit-scrollbar-thumb]:rounded-full [&_::-webkit-scrollbar-track]:bg-transparent [&_::-webkit-scrollbar-thumb]:transition-opacity [&_::-webkit-scrollbar-thumb]:duration-300 hover:[&_::-webkit-scrollbar-thumb]:opacity-100 [&_::-webkit-scrollbar-thumb]:opacity-0">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {education.items.map((item, index) => (
                      <li
                        key={index}
                        className="bg-gradient-to-br from-[#2a2a30] to-[#1c1c20] h-auto py-6 px-6 rounded-xl flex flex-col justify-center items-start gap-2 relative group"
                      >
                        <div className="absolute inset-0 rounded-xl border-2 border-transparent transition-colors duration-300 group-hover:border-accent"></div>
                        <span className="text-accent text-sm">{item.duration}</span>
                        <h3 className="text-lg font-semibold leading-tight">
                          {item.degree}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="w-[6px] h-[6px] rounded-full bg-accent"></span>
                          <p className="text-white/60 text-sm">{item.institution}</p>
                        </div>
                        <p className="text-white/60 text-sm">{item.city}, {item.country}</p>
                      </li>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>
            <TabsContent value="skills" className="w-full h-full">
              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-3xl font-bold">{skills.title}</h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0 text-sm">
                    {skills.description}
                  </p>
                </div>
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]">
                  {skills.skillList.map((skill, index) => (
                    <li key={index}>
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger className="w-full h-[150px] bg-gradient-to-br from-[#2a2a30] to-[#1c1c20] rounded-xl flex justify-center items-center group relative">
                            <div className="absolute inset-0 rounded-xl border-2 border-transparent transition-colors duration-300 group-hover:border-accent"></div>
                            <div className="text-6xl group-hover:text-accent transition-all duration-300">
                              {skill.icon}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="capitalize">{skill.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="about" className="w-full text-left">
              <div className="flex flex-col gap-8">
                <h2 className="text-4xl font-bold mb-4">About me</h2>
                <p className="text-lg text-white/80 max-w-[600px]">
                  Experienced AI/ML Full Stack Engineer with a strong background in computer engineering and computer science.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-12 max-w-[800px]">
                  {about.info.map((item, index) => (
                    <div key={index} className="flex flex-col">
                      <span className="text-white/60 text-sm mb-1">{item.fieldName}</span>
                      {item.isLink ? (
                        <Link 
                          href={item.fieldValue} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-lg text-accent hover:underline"
                        >
                          {item.fieldName}
                        </Link>
                      ) : (
                        <span className="text-lg">{item.fieldValue}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>

      <Dialog open={selectedExperience !== null} onOpenChange={closeExperienceDialog}>
        <DialogContent className="bg-gradient-to-br from-[#2a2a30] to-[#1c1c20] text-white border-2 border-accent max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{selectedExperience?.position}</DialogTitle>
            <DialogDescription className="text-white/60">
              {selectedExperience?.company} - {selectedExperience?.location}, {selectedExperience?.country}
            </DialogDescription>
          </DialogHeader>
          <Timeline duration={selectedExperience?.duration} />
          <div className="mt-4">
            <h4 className="text-lg font-semibold mb-2">Responsibilities:</h4>
            <ul className="list-disc pl-5 space-y-2">
              {selectedExperience?.details.map((detail, index) => (
                <li key={index} className="text-white/80">
                  <HighlightedText text={detail} highlightWords={highlightWords} />
                </li>
              ))}
            </ul>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}