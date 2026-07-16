interface SidebarProps {
  handleAddNote: () => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CATEGORIES = ["All", "Personal", "Work", "Ideas", "Others"];

export default function Sidebar({
  handleAddNote,
  selectedCategory,
  setSelectedCategory,
}: SidebarProps) {
  return (
    <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 flex flex-col justify-between">
      <div>
        <h1 className="text-xl font-bold mb-6 tracking-tight text-zinc-900 dark:text-white">
          📝 NoteSphere
        </h1>

        {/* Add Note Button */}
        <button
          onClick={handleAddNote}
          className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition-all shadow-sm mb-6"
        >
          <span>+</span> New Note
        </button>

        {/* Categories List */}
        <div className="space-y-1">
          <p className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider px-2 mb-2">
            Folders
          </p>
          {CATEGORIES.map((cat) => {
            const isSelected = cat === selectedCategory;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`w-full text-left px-3 py-2 text-sm rounded-lg font-medium transition-all ${
                  isSelected
                    ? "bg-zinc-150 text-indigo-600 dark:bg-zinc-800 dark:text-indigo-400"
                    : "text-zinc-650 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/40 dark:hover:text-zinc-300"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      <div className="text-xs text-zinc-400 dark:text-zinc-500">
        Version 1.0.0
      </div>
    </aside>
  );
}