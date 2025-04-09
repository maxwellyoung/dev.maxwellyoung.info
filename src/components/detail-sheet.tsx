"use client"

import { motion, AnimatePresence } from "framer-motion"
import { type Node, portfolioData } from "@/data/portfolio-data"

type DetailSheetProps = {
  node: Node | null
  onClose: () => void
}

export default function DetailSheet({ node, onClose }: DetailSheetProps) {
  if (!node) return null

  const connections = portfolioData.links
    .filter((link) => link.source === node.id || link.target === node.id)
    .map((link) => {
      const connectedNodeId = link.source === node.id ? link.target : link.source
      const connectedNode = portfolioData.nodes.find((n) => n.id === connectedNodeId)
      return { ...connectedNode, linkType: link.type }
    })

  return (
    <AnimatePresence>
      {node && (
        <motion.div
          className="fixed inset-0 bg-black/50 flex justify-end items-stretch z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-md bg-[#eee] p-4 overflow-y-auto"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-sm">{node.name}</h2>
              <button onClick={onClose} className="text-2xl leading-none">
                &times;
              </button>
            </div>
            <motion.div
              className="space-y-4 text-xs"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div>
                <h3 className="mb-1">Type</h3>
                <p>{node.group}</p>
              </div>
              <div>
                <h3 className="mb-1">Connections</h3>
                <ul className="space-y-1">
                  {connections.map((conn, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                    >
                      <span className={`w-2 h-2 ${conn.linkType === "primary" ? "bg-black" : "bg-black/50"}`}></span>
                      <span>{conn.name}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

