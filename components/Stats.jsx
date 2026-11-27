'use client'

import React from "react"
import Link from "next/link"

const milestones = [
  {
    year: "2018",
    text: "Started in data & ML",
    href: "/resume",
  },
  {
    year: "2025",
    text: "1st place, GPU hackathon",
    href: "/project",
  },
  {
    year: "2026",
    text: "First author, NVIDIA Cosmos Cookbook",
    href: "/project",
  },
  {
    year: "Now",
    text: "Founding Cloud Architect, Neural Motion",
    href: "/resume",
  },
]

const Stats = () => {
  return (
    <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
      <div className="container mx-auto">
        {/* 1 column on phones, 2 on tablets, 4 across at xl with the year above its label */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 max-w-[80vw] mx-auto xl:max-w-none items-center xl:items-start">
          {milestones.map((item, index) => (
            <Link
              href={item.href}
              className="group flex xl:flex-col gap-4 xl:gap-2 items-center xl:items-start justify-center"
              key={index}
            >
              <span className="text-4xl xl:text-6xl font-extrabold transition-all duration-300 group-hover:text-accent">
                {item.year}
              </span>
              <p className="max-w-[150px] leading-snug text-white/80 text-balance transition-all duration-300 group-hover:text-accent">
                {item.text}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats
