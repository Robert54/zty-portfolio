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
      position: "Applied AI Engineer",
      duration: "December 2024 - Present",
      location: "Seattle, WA",
      country: "United States",
      details: [
        "AI SaaS Platform Development: Developed unified AI SaaS platform with multimodal RAG and long-term memory for Northwest Center and Marriott Bonvoy, featuring real-world automation and customer service workflows.",
        "Model Optimization on Verticals: Fine-tuned Qwen2.5-VL (3B parameters) using SFT + GRPO, achieving 40% accuracy improvement in domain-specific visual recognition tasks for janitorial automation workflows.",
        "Edge Deployment: Deployed lightweight models (DeepSeek R1, Gemma 3B) on mobile with MLX, MLC Chat and Google AI Edge Gallery, maintaining offline capabilities on mobile devices.",
        "On-device OCR & Text Extraction: Deployed lightweight OCR models for real-time document processing, reducing text extraction latency from minutes to seconds on mobile devices.",
        "Multimodal Agent Architecture: Architected a real-time, Manus-inspired agent system for browser automation by implementing its core agentic loop with LangManus, leveraging the underlying LangGraph foundation to manage complex state and cyclical workflows while integrating with Vapi for voice I/O.",
        "Cross-platform Migration: Migrated from Next.js PWA to React Native (Expo + Solito) ensuring consistent web/mobile experience; connected external systems via Model Context Protocols with Firebase and Vercel analytics dashboards.",
        "AI Safety & Monitoring: Implemented comprehensive observability using Arize for voice pipeline tracing and Hume AI for real-time sentiment analysis, ensuring enterprise-grade reliability and user safety."
      ]
    },
    {
      company: "AchillesHR (Contract)",
      position: "Machine Learning Engineer - Voice Agent Development",
      duration: "April 2025 - June 2025",
      location: "New York, NY",
      country: "United States",
      details: [
        "Ultra-low Latency Voice Pipeline: Developed an ultra-low-latency STT-LLM-TTS workflow using LangGraph, integrating GPT-4o, Claude 3.5, and ElevenLabs to power dynamic, multilingual (12+ languages) HR interviews for 50+ clients.",
        "Performance Optimization: Slashed p95 TTS latency by 57% (7s → 3s) and cut GPU costs by 40% by quantizing DiaTTS with Unsloth and deploying autoscaling inference endpoints on Modal and AWS Lambda.",
        "Production SaaS Platform: Engineered a scalable, multi-tenant microservices backend (NestJS, PostgreSQL, Prisma) for 100+ companies. Implemented blue-green CI/CD (Porter.run) and APM (New Relic) to achieve 99.9% uptime, handling real-time calls via Twilio SIP and LiveKit WebRTC.",
        "LLM Tool-calling Pipeline: Created a secure LLM tool-calling pipeline to ingest and parse resumes from presigned S3 URLs using a custom RAG system, enabling bidirectional data sync with enterprise HR systems (e.g., Oracle HCM) via Merge.dev.",
        "Speaker Diarization Enhancement: Boosted speaker diarization accuracy to 95% by fine-tuning models (Clearvoice, ElevenLabs) and implementing custom post-processing, which directly increased downstream model A/B test win-rates by 22%."
      ]
    },
    {
      company: "AffectusAI",
      position: "AI Full Stack Engineer",
      duration: "June 2024 - December 2024",
      location: "Remote (Los Angeles)",
      country: "United States",
      details: [
        "Personalized Growth Companion AI: Led end-to-end design and development of Personalized Growth Companion AI, a multi-agent system architected with LangGraph delivering proactive personalized experiences focused on personal growth, resulting in 40% boost in user engagement for self-reflection features.",
        "Digital Self Module: Engineered a deep personalization engine (the \"Digital Self\" module) by fine-tuning foundation models (Llama series) on user-specific corpora, creating a high-fidelity simulation of the user's internal thought processes and vectorized long-term memory.",
        "RLHF Pipeline Implementation: Implemented an advanced RLHF pipeline (Growth-Oriented Principled Adversarial Training) to train a professional \"Coach\" agent (the reasoning core), whose constructive and contrastive feedback are dynamically tailored to the user's emotional state as determined by a real-time Perception & Analysis module.",
        "AI Safety Gateway: Built and deployed a robust, low-latency AI Safety Gateway (the final output filter) that processes all model outputs through a series of checks (keywords, classifiers, LLM-judge), ensuring responsible user interaction while maintaining high throughput.",
        "System Integration & Optimization: Integrated and optimized the end-to-end system, engineering a predictive context pipeline with GraphRAG to pre-load relevant user memories, significantly reducing inference latency via optimized KV cache management, and incorporating a lightweight \"synthesis model\" (Weave Layer) that crafts a seamless internal dialogue."
      ]
    },
    {
      company: "Chima (YC-W23)",
      position: "Applied AI Engineer",
      duration: "January 2024 - February 2024",
      location: "San Francisco, CA",
      country: "United States",
      details: [
        "MVP LLM Integration: Delivered MVP LLM integration for knowledge gap detection using OpenAI and Perplexity APIs.",
        "Cost Optimization: Optimized API costs by 40% through intelligent caching and request batching strategies.",
        "Full-stack Development: Built scalable FastAPI backend with React frontend deployed on Vercel achieving sub-200ms response times."
      ]
    },
    {
      company: "Ping An Technology",
      position: "Machine Learning Engineer Intern (NLP)",
      duration: "June 2021 - August 2021",
      location: "Shanghai",
      country: "China",
      details: [
        "Temporal Graph Neural Networks: Developed temporal graph neural networks for policy release prediction, analyzing historical policy documents, public opinions, and research reports to forecast timing and content of regulatory announcements with 78% accuracy.",
        "Event Extraction Pipeline: Built an event extraction pipeline using ElasticSearch, regex, and StanfordCoreNLP to extract government and industry elite opinions on policy impacts across sectors, processing 10,000+ documents daily.",
        "Policy Linkage Models: Engineered policy linkage models on computational flow platform, enabling real-time monitoring of policy-market dynamics for investment decision support and regulatory compliance analysis."
      ]
    },
    {
      company: "Shanghai Em-data Technology Co., Ltd.",
      position: "Machine Learning Engineer Intern (CV)",
      duration: "September 2020 - November 2020",
      location: "Shanghai",
      country: "China",
      details: [
        "Precipitation Detection Research: Conducted research on precipitation detection using satellite data based on modified Deeplab V3+, achieving 15% improvement in detection accuracy through custom neural architectures and loss functions.",
        "Data Synthesis: Synthesized satellite data with numerical weather prediction models from National Meteorological Center, optimizing Vision Transformer model features modality for enhanced precipitation detection accuracy.",
        "Data Preprocessing Pipeline: Designed comprehensive data preprocessing pipeline for large-scale weather data, implementing image cropping, stitching, and geographic coordinate system alignment."
      ]
    },
    {
      company: "Institute for China Sustainable Urbanization, Tsinghua University",
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
    'RAG', 'multimodal', 'Simli', 'Qwen2.5-VL', 'DeepSeek', 'Gemma', 'MLC', 'MLX', 'Google', 'Edge', 'OCR', 'Sesame', 'Arize', 'Gemini', 'Hume',
    'LangManus', 'LangGraph', 'MCP', 'React Native', 'Expo', 'Solito', 'Firebase', 'Vercel', 'TypeScript', 'Next.js', 'React', 'Langchain', 'Pinecone', 'MongoDB',
    'OpenAI', 'Groq', 'GPT-4o', 'Claude', 'TTS', 'STT', 'ElevenLabs', 'Play.HT', 'Deepgram', 'LiveKit', 'Vapi', 'Daily', 'pipecat',
    'Unsloth', 'Modal', 'AWS', 'Lambda', 'NestJS', 'PostgreSQL', 'Prisma', 'Porter', 'New Relic', 'Twilio', 'WebRTC', 'S3', 'Merge', 'Clearvoice',
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