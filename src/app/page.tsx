"use client";

import dynamic from "next/dynamic";

const NotesApp = dynamic(() => import("@/components/NotesApp"), { ssr: false });

export default function Home() {
  return <NotesApp />;
}
