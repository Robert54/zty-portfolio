'use client'

import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useAudio } from '@/components/AudioContext'

const BAR_COUNT = 256
const MAX_HEIGHT = 90
const BAR_COLOR = '#00CED1'
// Fraction of the gap to the target height closed each frame (stands in for the old spring)
const EASE = 0.5

export default function VoiceWave() {
  const { isPlaying, analyser } = useAudio()
  const canvasRef = useRef(null)

  // Draw straight to the canvas each frame; no React state changes per frame
  useEffect(() => {
    const canvas = canvasRef.current
    if (!isPlaying || !analyser || !canvas) return

    const ctx = canvas.getContext('2d')
    const dataArray = new Uint8Array(analyser.frequencyBinCount)
    const heights = new Float32Array(BAR_COUNT)
    const half = BAR_COUNT / 2
    let frameId = null

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = Math.round(canvas.clientWidth * dpr)
      canvas.height = Math.round(MAX_HEIGHT * dpr)
    }

    const draw = () => {
      analyser.getByteFrequencyData(dataArray)

      const { width, height } = canvas
      const barWidth = width / BAR_COUNT
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = BAR_COLOR

      for (let i = 0; i < BAR_COUNT; i++) {
        // Mirror the low bins around the centre: left half reversed, right half in order
        const bin = i < half ? half - 1 - i : i - half
        const target = dataArray[bin] / 255
        heights[i] += (target - heights[i]) * EASE

        const barHeight = heights[i] * height
        const x0 = Math.round(i * barWidth)
        const x1 = Math.round((i + 1) * barWidth)
        ctx.fillRect(x0, height - barHeight, x1 - x0, barHeight)
      }

      frameId = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    draw()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(frameId)
    }
  }, [isPlaying, analyser])

  if (!isPlaying) {
    return null
  }

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 w-full pointer-events-none"
      style={{ zIndex: 10 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <canvas
        ref={canvasRef}
        className="block w-full"
        style={{ height: `${MAX_HEIGHT}px` }}
      />
    </motion.div>
  )
}
