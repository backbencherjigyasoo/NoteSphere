import { Note } from "@/types";

interface NotesListProps {
  notes: Note[];
  selectedNoteId: string | null;
  setSelectedNoteId: (id: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function NotesList({
  notes,
  selectedNoteId,
  setSelectedNoteId,
  searchQuery,
  setSearchQuery,
}: NotesListProps) {
  return (
    <section className="w-80 border-r border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 overflow-y-auto p-4">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4 px-2">
        All Notes ({notes.length})
      </h2>

      {/* Search Input */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-3 py-2 text-xs outline-none focus:ring-1 focus:ring-indigo-500 dark:focus:ring-indigo-700"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-2.5 top-2.5 text-zinc-450 hover:text-zinc-700 dark:text-zinc-500 text-[10px]"
          >
            ✕
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto mt-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-4 px-2">
          Notes ({notes.length})
        </h2>
      </div>

      <div className="space-y-2">
        {notes.map((note) => {
          const isSelected = note.id === selectedNoteId;
          return (
            <div
              key={note.id}
              onClick={() => setSelectedNoteId(note.id)}
              className={`p-3 rounded-lg cursor-pointer transition-all ${
                isSelected
                  ? "bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800"
                  : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800/50"
              }`}
            >
              <div className="flex justify-between items-start gap-2 mb-1">
                <h3 className="font-semibold text-sm text-zinc-800 dark:text-zinc-200 truncate flex-1">
                  {note.title || "Untitled Note"}
                </h3>
                <span className="text-[10px] bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-500 dark:text-zinc-400 font-medium">
                  {note.category}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 mb-2">
                {note.content || "Empty content..."}
              </p>
              <div className="text-[10px] text-zinc-400 dark:text-zinc-500">
                {note.updatedAt?.split("T")[0]}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
