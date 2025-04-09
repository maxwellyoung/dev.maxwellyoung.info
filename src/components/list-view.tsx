"use client"

import { useState } from "react"
import { portfolioData, type Node } from "@/data/portfolio-data"

type ListViewProps = {
  onNodeSelect: (node: Node) => void
}

export default function ListView({ onNodeSelect }: ListViewProps) {
  const [sortField, setSortField] = useState<"name" | "group">("name")

  const sortedNodes = [...portfolioData.nodes].sort((a, b) => a[sortField].localeCompare(b[sortField]))

  return (
    <div className="px-4">
      <div className="grid grid-cols-[100px_1fr_120px] gap-4 py-2 border-b border-black/10 text-sm">
        <div className="font-medium">Type</div>
        <div className="font-medium">Title</div>
        <div className="font-medium text-right">Date</div>
      </div>
      <div className="divide-y divide-black/5">
        {sortedNodes.map((node) => (
          <button
            key={node.id}
            onClick={() => onNodeSelect(node)}
            className="grid grid-cols-[100px_1fr_120px] gap-4 py-2 w-full text-left hover:bg-black/5 text-sm"
          >
            <div className="truncate">{node.group}</div>
            <div className="truncate">{node.name}</div>
            <div className="text-right text-black/60">03/03/2025</div>
          </button>
        ))}
      </div>
    </div>
  )
}

