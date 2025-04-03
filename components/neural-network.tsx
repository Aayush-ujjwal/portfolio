"use client"

import { useEffect, useRef } from "react"

interface Point {
  x: number
  y: number
  vx: number
  vy: number
}

export default function NeuralNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const points = useRef<Point[]>([])
  const mouse = useRef({ x: 0, y: 0 })
  const animationFrameId = useRef<number | undefined>(undefined)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Initialize points
    const initPoints = () => {
      points.current = []
      // Adjust number of points based on screen size
      const isMobile = window.innerWidth < 768
      const numberOfPoints = isMobile 
        ? Math.floor((canvas.width * canvas.height) / 30000) // Fewer points on mobile
        : Math.floor((canvas.width * canvas.height) / 15000)
      
      for (let i = 0; i < numberOfPoints; i++) {
        points.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5), // Slower movement on mobile
          vy: (Math.random() - 0.5) * (isMobile ? 0.3 : 0.5),
        })
      }
    }
    initPoints()

    // Mouse/touch move handler
    const handleMove = (e: MouseEvent | TouchEvent) => {
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX
      const y = 'touches' in e ? e.touches[0].clientY : e.clientY
      mouse.current = { x, y }
    }
    window.addEventListener("mousemove", handleMove)
    window.addEventListener("touchmove", handleMove)

    // Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const isMobile = window.innerWidth < 768
      ctx.strokeStyle = "rgba(100, 100, 255, 0.2)"
      ctx.lineWidth = isMobile ? 1 : 1

      // Update and draw points
      points.current.forEach((point) => {
        // Move points
        point.x += point.vx
        point.y += point.vy

        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) point.vx *= -1
        if (point.y < 0 || point.y > canvas.height) point.vy *= -1

        // Draw point
        ctx.beginPath()
        ctx.arc(point.x, point.y, isMobile ? 1.5 : 2, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(100, 100, 255, 0.6)"
        ctx.fill()

        // Connect points
        points.current.forEach((otherPoint) => {
          const dx = point.x - otherPoint.x
          const dy = point.y - otherPoint.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = isMobile ? 100 : 150

          if (distance < maxDistance) {
            ctx.beginPath()
            ctx.moveTo(point.x, point.y)
            ctx.lineTo(otherPoint.x, otherPoint.y)
            ctx.stroke()
          }
        })

        // Mouse/touch interaction
        const dx = mouse.current.x - point.x
        const dy = mouse.current.y - point.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        if (distance < (isMobile ? 80 : 100)) {
          point.vx -= dx * 0.0001
          point.vy -= dy * 0.0001
        }
      })

      animationFrameId.current = requestAnimationFrame(animate)
    }
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMove)
      window.removeEventListener("touchmove", handleMove)
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 opacity-50"
      style={{ background: "transparent" }}
    />
  )
} 