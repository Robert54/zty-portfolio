'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useAudio } from '@/components/AudioContext'

const BAR_COUNT = 256
const MAX_HEIGHT = 90

export default function VoiceWave() {
  const { isPlaying, analyser } = useAudio()
  const [audioData, setAudioData] = useState(new Array(BAR_COUNT).fill(0))
  const animationRef = useRef(null)
  const cancelAnimation = useRef(false)

  useEffect(() => {
    cancelAnimation.current = false

    const updateWaveform = () => {
      if (!analyser || cancelAnimation.current) return

      const dataArray = new Uint8Array(analyser.frequencyBinCount)
      analyser.getByteFrequencyData(dataArray)

      const scaledData = Array.from(dataArray.slice(0, BAR_COUNT / 2)).map(
        (value) => value / 255
      )
      const mirroredData = [...scaledData.reverse(), ...scaledData.reverse()]

      if (cancelAnimation.current) return

      setAudioData((prevData) => {
        const hasSignificantChange = mirroredData.some(
          (value, index) => Math.abs(value - prevData[index]) > 0.01
        )
        return hasSignificantChange ? mirroredData : prevData
      })

      if (cancelAnimation.current) return

      animationRef.current = requestAnimationFrame(updateWaveform)
    }

    if (isPlaying && analyser) {
      updateWaveform()
    } else {
      setAudioData(new Array(BAR_COUNT).fill(0))
    }

    return () => {
      cancelAnimation.current = true
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isPlaying, analyser])

  if (!isPlaying) {
    return null
  }

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 w-full flex items-end justify-center overflow-visible"
      style={{ paddingLeft: '0%', zIndex: 10 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      {audioData.map((height, index) => (
        <motion.div
          key={index}
          className="bg-accent"
          style={{
            width: `${100 / BAR_COUNT}%`,
            height: `${height * MAX_HEIGHT}px`,
          }}
          initial={false}
          animate={{ height: `${height * MAX_HEIGHT}px` }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 15,
            mass: 0.1,
          }}
        />
      ))}
    </motion.div>
  )
}