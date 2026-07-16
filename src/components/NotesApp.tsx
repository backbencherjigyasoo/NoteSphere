"use client";

import { useState, useCallback } from "react";
import { Note } from "@/types";
import Sidebar from "@/components/Sidebar";
import NotesList from "@/components/NotesList";
import NoteEditor from "@/components/NoteEditor";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const INITIAL_NOTES: Note[] = [
  {
    id: "1",
    title: "Note 1",
    content: "Content 1",
    category: "Work",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Note 2",
    content: "Content 2",
    category: "Personal",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function NotesApp() {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", INITIAL_NOTES);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const selectedNote = notes.find((note) => note.id === selectedNoteId);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleAddNote = useCallback(() => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: "New Note",
      content: "",
      category: "Others",
      createdAt: new Date().toLocaleDateString(),
      updatedAt: new Date().toLocaleDateString(),
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setSelectedNoteId(newNote.id);
  }, [setNotes]);

  const handleDeleteNote = useCallback(
    (id: string) => {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
      if (selectedNoteId === id) {
        setSelectedNoteId(null);
      }
    },
    [selectedNoteId, setNotes],
  );

  const handleUpdateNote = useCallback(
    (id: string, updatedFields: Partial<Note>) => {
      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note.id === id
            ? {
                ...note,
                ...updatedFields,
                updatedAt: new Date().toLocaleDateString(),
              }
            : note,
        ),
      );
    },
    [setNotes],
  );

  const filteredNotes = notes.filter((note) => {
    const matchesCategory =
      selectedCategory === "All" || note.category === selectedCategory;
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950 font-sans text-zinc-800 dark:text-zinc-200">
      {/* LEFT PANEL: Sidebar */}
      <Sidebar
        handleAddNote={handleAddNote}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* MIDDLE PANEL: Notes List */}
      <NotesList
        notes={filteredNotes}
        selectedNoteId={selectedNoteId}
        setSelectedNoteId={setSelectedNoteId}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* RIGHT PANEL: Editor */}
      <NoteEditor
        key={selectedNoteId || "empty"}
        handleUpdateNote={handleUpdateNote}
        handleDeleteNote={handleDeleteNote}
        selectedNote={selectedNote}
      />
    </div>
  );
}
