export interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export type Category = "All" | "Personal" | "Work" | "Ideas" | "Others";
