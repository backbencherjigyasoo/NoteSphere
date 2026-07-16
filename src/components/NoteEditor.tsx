"use client";

import { Note } from "@/types";
import { useState, useEffect } from "react";

interface NoteEditorProps {
  handleUpdateNote: (id: string, data: Partial<Note>) => void;
  handleDeleteNote: (id: string) => void;
  selectedNote: Note | undefined;
}

const NoteEditor = ({
  handleUpdateNote,
  handleDeleteNote,
  selectedNote,
}: NoteEditorProps) => {
  // 1. Editor ke local inputs ki fields
  const [localTitle, setLocalTitle] = useState(selectedNote?.title ?? "");
  const [localContent, setLocalContent] = useState(selectedNote?.content ?? "");
  const [saveStatus, setSaveStatus] = useState<"Draft" | "Saving..." | "Saved">(
    "Saved",
  );

  // 3. Debounce Auto-Save Logic
  useEffect(() => {
    if (!selectedNote) return;

    // Direct match check (agar updates nahi hain, to render drop kardo)
    if (
      localTitle === selectedNote.title &&
      localContent === selectedNote.content
    ) {
      return;
    }

    // Timer set karein: 800ms typing gap check
    const saveTimer = setTimeout(() => {
      handleUpdateNote(selectedNote.id, {
        title: localTitle,
        content: localContent,
      });
      setSaveStatus("Saved");
    }, 800);

    // Clean-up handler: Next key stroke par previous pending timer cancel kar dega!
    return () => clearTimeout(saveTimer);
  }, [localTitle, localContent, selectedNote, handleUpdateNote]);

  return (
    <main className="flex-1 bg-white dark:bg-zinc-900 p-6 flex flex-col justify-between">
      {selectedNote ? (
        <div className="flex flex-col flex-1 gap-4">
          {/* Editor Header: Category selector & Status & Delete */}
          <div className="flex justify-between items-center pb-4 border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <select
                value={selectedNote.category}
                onChange={(e) =>
                  handleUpdateNote(selectedNote.id, {
                    category: e.target.value,
                  })
                }
                className="bg-zinc-100 dark:bg-zinc-800 text-xs px-3 py-1.5 rounded-lg border-none text-zinc-700 dark:text-zinc-300 font-medium cursor-pointer"
              >
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Ideas">Ideas</option>
                <option value="Others">Others</option>
              </select>

              {/* Dynamic Saving Indicator Badge */}
              <span
                className={`text-[10px] px-2 py-1 rounded-full font-medium transition-all ${
                  saveStatus === "Saving..."
                    ? "bg-amber-50 text-amber-600 dark:bg-amber-950/20 dark:text-amber-400"
                    : "bg-emerald-50 text-emerald-600 dark:bg-emerald-950/20 dark:text-emerald-400"
                }`}
              >
                ● {saveStatus}
              </span>
            </div>

            <button
              onClick={() => handleDeleteNote(selectedNote.id)}
              className="text-xs text-red-500 hover:text-red-650 dark:text-red-400 dark:hover:text-red-350 bg-red-50 dark:bg-red-950/30 px-3 py-1.5 rounded-lg font-medium transition-all"
            >
              Delete Note
            </button>
          </div>

          {/* Editor Inputs (now connected with local States) */}
          <input
            type="text"
            placeholder="Note Title"
            value={localTitle}
            onChange={(e) => {
              const newTitle = e.target.value;
              setLocalTitle(newTitle);
              if (
                newTitle === selectedNote.title &&
                localContent === selectedNote.content
              ) {
                setSaveStatus("Saved");
              } else {
                setSaveStatus("Saving...");
              }
            }}
            className="w-full text-2xl font-bold border-none outline-none focus:ring-0 text-zinc-800 dark:text-white bg-transparent"
          />

          <textarea
            placeholder="Type note details here..."
            value={localContent}
            onChange={(e) => {
              const newContent = e.target.value;
              setLocalContent(newContent);
              if (
                localTitle === selectedNote.title &&
                newContent === selectedNote.content
              ) {
                setSaveStatus("Saved");
              } else {
                setSaveStatus("Saving...");
              }
            }}
            className="w-full flex-grow resize-none border-none outline-none focus:ring-0 text-sm text-zinc-650 dark:text-zinc-350 bg-transparent"
          />
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center text-zinc-400 dark:text-zinc-600">
          <div className="text-4xl mb-2">📓</div>
          <p className="text-sm">
            Select a note from the left, or create a new one to start writing!
          </p>
        </div>
      )}
    </main>
  );
};

export default NoteEditor;
