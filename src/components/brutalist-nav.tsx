type NavProps = {
  activeView: string
  setActiveView: (view: string) => void
}

export default function BrutalistNav({ activeView, setActiveView }: NavProps) {
  const views = ["MATRIX", "LIST"]

  return (
    <nav className="flex justify-between items-center px-4 py-2 border-b border-black/10">
      <div className="flex gap-4">
        {views.map((view) => (
          <button
            key={view}
            onClick={() => setActiveView(view)}
            className={`text-sm hover:underline ${activeView === view ? "underline" : ""}`}
          >
            {view}
          </button>
        ))}
      </div>
    </nav>
  )
}

