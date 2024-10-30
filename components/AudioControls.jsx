'use client'

import React from "react"
import { Play, Pause, Square } from "lucide-react"
import { useAudio } from "./AudioContext"

export default function AudioControls() {
  const { isPlaying, togglePlay, currentTime, duration, stop } = useAudio()

  const handleToggle = React.useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    togglePlay()
  }, [togglePlay])

  const handleStop = React.useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()
    stop()
  }, [stop])

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex items-center gap-2 bg-primary/80 backdrop-blur-sm p-2 rounded-md">
      <button 
        type="button"
        onClick={handleToggle}
        className="p-2 bg-accent text-white rounded-full hover:bg-opacity-80 transition-colors"
        aria-label={isPlaying ? "Pause resume audio" : "Play resume audio"}
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>
      <button 
        type="button"
        onClick={handleStop}
        className="p-2 bg-accent text-white rounded-full hover:bg-opacity-80 transition-colors"
        aria-label="Stop resume audio"
      >
        <Square size={16} />
      </button>
      <div className="text-xs text-white/80">
        {formatTime(currentTime)} / {formatTime(duration)}
      </div>
    </div>
  )
}