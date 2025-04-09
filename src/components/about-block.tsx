"use client"

import { motion } from "framer-motion"

export default function AboutBlock() {
  return (
    <motion.div
      className="absolute top-4 right-4 w-64 bg-white/80 backdrop-blur-sm p-4 text-xs border border-black/10"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <motion.h2
        className="text-xs mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        About This Project
      </motion.h2>
      <motion.p
        className="mb-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
      >
        This interactive matrix visualizes the interconnections between various elements of a portfolio, including
        projects, skills, experiences, and education.
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      >
        Explore the nodes to discover relationships and click on any node to view more details.
      </motion.p>
    </motion.div>
  )
}

