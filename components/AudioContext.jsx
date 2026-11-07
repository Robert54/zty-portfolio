"use client";

import React, { createContext, useState, useContext, useEffect, useRef } from 'react'

const AudioContext = createContext()

const globalAudio = {
  context: null,
  element: null,
  analyser: null,
  isInitialized: false,
  playState: false
}

function initializeAudio() {
  if (!globalAudio.isInitialized && typeof window !== 'undefined') {
    try {
      globalAudio.context = new (window.AudioContext || window.webkitAudioContext)()
      globalAudio.element = new Audio('/assets/resume/Tingyu_Zhang_Resume.mp3')
      globalAudio.element.loop = true
      
      globalAudio.analyser = globalAudio.context.createAnalyser()
      globalAudio.analyser.fftSize = 2048
      
      const source = globalAudio.context.createMediaElementSource(globalAudio.element)
      source.connect(globalAudio.analyser)
      globalAudio.analyser.connect(globalAudio.context.destination)
      
      globalAudio.element.load()
      
      globalAudio.isInitialized = true
    } catch (error) {
      console.error("Audio initialization error:", error)
    }
  }
  return globalAudio.isInitialized
}

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const removeListeners = useRef(null)

  // The audio file and AudioContext are created on the first play (a user
  // gesture), so page loads never fetch the resume audio.
  const ensureAudio = () => {
    if (!initializeAudio()) return false

    if (!removeListeners.current) {
      const element = globalAudio.element
      const updateTime = () => setCurrentTime(element.currentTime)
      const updateDuration = () => setDuration(element.duration)
      const updatePlayState = () => setIsPlaying(globalAudio.playState)

      element.addEventListener('timeupdate', updateTime)
      element.addEventListener('loadedmetadata', updateDuration)
      element.addEventListener('play', updatePlayState)
      element.addEventListener('pause', updatePlayState)

      removeListeners.current = () => {
        element.removeEventListener('timeupdate', updateTime)
        element.removeEventListener('loadedmetadata', updateDuration)
        element.removeEventListener('play', updatePlayState)
        element.removeEventListener('pause', updatePlayState)
        removeListeners.current = null
      }
    }
    return true
  }

  useEffect(() => () => removeListeners.current?.(), [])

  const togglePlay = async (e) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }

    try {
      if (!globalAudio.playState) {
        if (!ensureAudio()) return
        if (globalAudio.context.state === 'suspended') {
          await globalAudio.context.resume()
        }
        await globalAudio.element.play()
        globalAudio.playState = true
      } else {
        globalAudio.element.pause()
        globalAudio.playState = false
      }
      setIsPlaying(globalAudio.playState)
    } catch (error) {
      console.error("Playback error:", error)
    }
  }

  const stop = () => {
    if (globalAudio.element) {
      globalAudio.element.pause()
      globalAudio.element.currentTime = 0
      globalAudio.playState = false
      setIsPlaying(false)
      setCurrentTime(0)
    }
  }

  return (
    <AudioContext.Provider value={{
      isPlaying,
      togglePlay,
      stop,
      analyser: globalAudio.analyser,
      isInitialized: globalAudio.isInitialized,
      currentTime,
      duration
    }}>
      {children}
    </AudioContext.Provider>
  )
}

export const useAudio = () => useContext(AudioContext)