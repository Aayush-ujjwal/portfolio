"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme, systemTheme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let neurons: Neuron[] = []
    let connections: Connection[] = []
    let dataParticles: DataParticle[] = []
    const mouse = { x: 0, y: 0, radius: 150 }

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initNeuralNetwork()
    }

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }

    // Handle touch for mobile
    const handleTouch = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX
        mouse.y = e.touches[0].clientY
      }
    }

    interface Neuron {
      x: number
      y: number
      radius: number
      baseRadius: number
      pulseRadius: number
      pulseMax: number
      pulseSpeed: number
      pulseDirection: number
      vx: number
      vy: number
      active: boolean
      activationTime: number
      color: string
    }

    interface Connection {
      from: number
      to: number
      width: number
      active: boolean
      activationTime: number
      particles: DataParticle[]
    }

    interface DataParticle {
      x: number
      y: number
      size: number
      speed: number
      progress: number
      color: string
    }

    // Initialize neural network
    const initNeuralNetwork = () => {
      neurons = []
      connections = []
      dataParticles = []

      const currentTheme = theme === "system" ? systemTheme : theme
      const neuronCount = Math.min(Math.floor((canvas.width * canvas.height) / 25000), 50)

      // Create neurons
      for (let i = 0; i < neuronCount; i++) {
        const baseRadius = Math.random() * 3 + 2
        const pulseMax = baseRadius + Math.random() * 15 + 5

        neurons.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: baseRadius,
          baseRadius: baseRadius,
          pulseRadius: baseRadius,
          pulseMax: pulseMax,
          pulseSpeed: 0.05 + Math.random() * 0.1,
          pulseDirection: 1,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          active: false,
          activationTime: 0,
          color: currentTheme === "dark" ? `rgba(100, 149, 237, 0.8)` : `rgba(65, 105, 225, 0.8)`,
        })
      }

      // Create connections between neurons
      for (let i = 0; i < neurons.length; i++) {
        // Each neuron connects to 2-5 other neurons
        const connectionCount = Math.floor(Math.random() * 3) + 2

        for (let j = 0; j < connectionCount; j++) {
          const toNeuron = Math.floor(Math.random() * neurons.length)

          if (i !== toNeuron) {
            connections.push({
              from: i,
              to: toNeuron,
              width: Math.random() * 1 + 0.5,
              active: false,
              activationTime: 0,
              particles: [],
            })
          }
        }
      }
    }

    // Activate a random neuron
    const activateRandomNeuron = () => {
      if (Math.random() > 0.97) {
        const neuronIndex = Math.floor(Math.random() * neurons.length)
        neurons[neuronIndex].active = true
        neurons[neuronIndex].activationTime = 0

        // Activate connections from this neuron
        connections.forEach((conn) => {
          if (conn.from === neuronIndex) {
            conn.active = true
            conn.activationTime = 0

            // Create data particle
            createDataParticle(conn)
          }
        })
      }
    }

    // Create data particle for a connection
    const createDataParticle = (connection: Connection) => {
      const fromNeuron = neurons[connection.from]
      const toNeuron = neurons[connection.to]
      const currentTheme = theme === "system" ? systemTheme : theme

      const particle = {
        x: fromNeuron.x,
        y: fromNeuron.y,
        size: Math.random() * 2 + 1,
        speed: Math.random() * 0.01 + 0.005,
        progress: 0,
        color: currentTheme === "dark" ? `rgba(120, 200, 255, 0.8)` : `rgba(0, 120, 255, 0.8)`,
      }

      connection.particles.push(particle)
    }

    // Update and draw the neural network
    const drawNeuralNetwork = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const currentTheme = theme === "system" ? systemTheme : theme
      const baseColor = currentTheme === "dark" ? { r: 100, g: 149, b: 237 } : { r: 65, g: 105, b: 225 }
      const activeColor = currentTheme === "dark" ? { r: 120, g: 200, b: 255 } : { r: 0, g: 120, b: 255 }

      // Activate random neurons
      activateRandomNeuron()

      // Update and draw connections
      connections.forEach((conn) => {
        const fromNeuron = neurons[conn.from]
        const toNeuron = neurons[conn.to]

        // Calculate distance and angle
        const dx = toNeuron.x - fromNeuron.x
        const dy = toNeuron.y - fromNeuron.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Draw connection line
        ctx.beginPath()
        ctx.moveTo(fromNeuron.x, fromNeuron.y)
        ctx.lineTo(toNeuron.x, toNeuron.y)

        if (conn.active) {
          conn.activationTime += 0.02
          const alpha = Math.max(0, 1 - conn.activationTime)
          ctx.strokeStyle = `rgba(${activeColor.r}, ${activeColor.g}, ${activeColor.b}, ${alpha * 0.7})`
          ctx.lineWidth = conn.width + 1

          if (conn.activationTime >= 1) {
            conn.active = false
          }
        } else {
          ctx.strokeStyle = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, 0.15)`
          ctx.lineWidth = conn.width
        }

        ctx.stroke()

        // Update and draw data particles
        conn.particles = conn.particles.filter((particle) => {
          // Update position
          particle.progress += particle.speed

          if (particle.progress >= 1) {
            // Activate the target neuron when particle reaches it
            neurons[conn.to].active = true
            neurons[conn.to].activationTime = 0
            return false
          }

          // Calculate position along the connection
          particle.x = fromNeuron.x + dx * particle.progress
          particle.y = fromNeuron.y + dy * particle.progress

          // Draw particle
          ctx.beginPath()
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
          ctx.fillStyle = particle.color
          ctx.fill()

          return true
        })
      })

      // Update and draw neurons
      neurons.forEach((neuron, index) => {
        // Move neurons slightly
        neuron.x += neuron.vx
        neuron.y += neuron.vy

        // Bounce off edges
        if (neuron.x < neuron.radius || neuron.x > canvas.width - neuron.radius) {
          neuron.vx = -neuron.vx
        }
        if (neuron.y < neuron.radius || neuron.y > canvas.height - neuron.radius) {
          neuron.vy = -neuron.vy
        }

        // Update pulse effect
        if (neuron.pulseDirection === 1) {
          neuron.pulseRadius += neuron.pulseSpeed
          if (neuron.pulseRadius >= neuron.pulseMax) {
            neuron.pulseDirection = -1
          }
        } else {
          neuron.pulseRadius -= neuron.pulseSpeed
          if (neuron.pulseRadius <= neuron.baseRadius) {
            neuron.pulseDirection = 1
          }
        }

        // Draw pulse
        ctx.beginPath()
        ctx.arc(neuron.x, neuron.y, neuron.pulseRadius, 0, Math.PI * 2)
        const pulseOpacity =
          0.1 * (1 - (neuron.pulseRadius - neuron.baseRadius) / (neuron.pulseMax - neuron.baseRadius))
        ctx.fillStyle = `rgba(${baseColor.r}, ${baseColor.g}, ${baseColor.b}, ${pulseOpacity})`
        ctx.fill()

        // Draw neuron
        ctx.beginPath()
        ctx.arc(neuron.x, neuron.y, neuron.radius, 0, Math.PI * 2)

        if (neuron.active) {
          neuron.activationTime += 0.02
          neuron.radius = neuron.baseRadius + 2 * Math.max(0, 1 - neuron.activationTime)
          ctx.fillStyle = `rgba(${activeColor.r}, ${activeColor.g}, ${activeColor.b}, ${Math.max(0.5, 1 - neuron.activationTime)})`

          if (neuron.activationTime >= 1) {
            neuron.active = false
            neuron.radius = neuron.baseRadius
          }
        } else {
          ctx.fillStyle = neuron.color
        }

        ctx.fill()

        // Check mouse interaction
        const dx = mouse.x - neuron.x
        const dy = mouse.y - neuron.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouse.radius) {
          // Activate neuron on mouse hover
          if (!neuron.active && Math.random() > 0.95) {
            neuron.active = true
            neuron.activationTime = 0

            // Activate connections from this neuron
            connections.forEach((conn) => {
              if (conn.from === index) {
                conn.active = true
                conn.activationTime = 0
                createDataParticle(conn)
              }
            })
          }
        }
      })

      animationFrameId = requestAnimationFrame(drawNeuralNetwork)
    }

    window.addEventListener("resize", resizeCanvas)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouch)
    window.addEventListener("touchstart", handleTouch)

    resizeCanvas()
    drawNeuralNetwork()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouch)
      window.removeEventListener("touchstart", handleTouch)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme, systemTheme])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" aria-hidden="true" />
}

