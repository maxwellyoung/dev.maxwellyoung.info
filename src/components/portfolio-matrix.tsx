"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import ForceGraph2D from "react-force-graph-2d"
import { portfolioData, type Node } from "@/data/portfolio-data"
import { motion, AnimatePresence } from "framer-motion"

type PortfolioMatrixProps = {
  onNodeSelect: (node: Node) => void
}

export default function PortfolioMatrix({ onNodeSelect }: PortfolioMatrixProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const graphRef = useRef<any>(null)
  const [dimensions, setDimensions] = useState({ width: 1000, height: 800 })
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    if (!containerRef.current) return

    const updateDimensions = () => {
      if (containerRef.current) {
        const container = containerRef.current
        setDimensions({
          width: container.clientWidth,
          height: container.clientHeight,
        })
      }
    }

    updateDimensions()
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  const randomizedData = useCallback(() => {
    const data = JSON.parse(JSON.stringify(portfolioData))
    const width = dimensions.width
    const height = dimensions.height

    data.nodes.forEach((node: any) => {
      node.x = Math.random() * width * 0.8 + width * 0.1
      node.y = Math.random() * height * 0.8 + height * 0.1
    })
    return data
  }, [dimensions])

  useEffect(() => {
    if (graphRef.current) {
      graphRef.current.d3Force("center", null)
      graphRef.current.d3Force("charge").strength(-100)
      graphRef.current.d3Force("link").distance(100)
    }
  }, [])

  const handleNodeClick = (node: Node) => {
    onNodeSelect(node)
  }

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => setIsLoaded(true), 500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <motion.div
      className="relative w-full h-[calc(100vh-48px)]"
      ref={containerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatePresence>
        {isLoaded && (
          <motion.div
            key="graph"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <ForceGraph2D
              ref={graphRef}
              graphData={randomizedData()}
              width={dimensions.width}
              height={dimensions.height}
              nodeLabel="name"
              nodeRelSize={4}
              nodeCanvasObject={(node, ctx, globalScale) => {
                const label = node.name as string
                const fontSize = 10 / globalScale
                ctx.font = `${fontSize}px monospace`
                const textWidth = ctx.measureText(label).width
                const bckgDimensions = [textWidth, fontSize].map((n) => n + fontSize * 0.2)

                ctx.fillStyle = getNodeColor(node.group as string)
                ctx.fillRect(
                  (node.x as number) - bckgDimensions[0] / 2,
                  (node.y as number) - bckgDimensions[1] / 2,
                  bckgDimensions[0],
                  bckgDimensions[1],
                )

                ctx.textAlign = "center"
                ctx.textBaseline = "middle"
                ctx.fillStyle = "#000"
                ctx.fillText(label, node.x as number, node.y as number)
              }}
              linkColor={() => "#000"}
              linkWidth={0.5}
              onNodeClick={handleNodeClick}
              cooldownTicks={100}
              d3AlphaDecay={0.01}
              d3VelocityDecay={0.1}
              enableZoom={true}
              enablePan={true}
              enableNodeDrag={true}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function getNodeColor(group: string): string {
  switch (group) {
    case "project":
      return "#FFB3BA" // Light Pink
    case "skill":
      return "#BAFFC9" // Light Green
    case "experience":
      return "#BAE1FF" // Light Blue
    case "education":
      return "#FFFFBA" // Light Yellow
    case "category":
      return "#FFD9BA" // Light Orange
    default:
      return "#E6E6E6" // Light Gray
  }
}

