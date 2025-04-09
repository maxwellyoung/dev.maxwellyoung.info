"use client"

import { cn } from "@/lib/utils"

const navItems = [
  { id: "key", label: "Key" },
  { id: "list-view", label: "List View" },
  { id: "about", label: "About" },
  { id: "info", label: "Info / Live" },
  { id: "merch", label: "Merch" },
]

export default function Navigation({
  activeTab,
  setActiveTab,
}: {
  activeTab: string
  setActiveTab: (tab: string) => void
}) {
  return (
    <div className="border-b">
      <div className="container mx-auto px-4">
        <div className="flex space-x-1">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "px-4 py-2 text-sm font-medium border border-gray-300 rounded-t-md -mb-px",
                activeTab === item.id ? "bg-background border-b-transparent" : "bg-muted hover:bg-muted/80",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

