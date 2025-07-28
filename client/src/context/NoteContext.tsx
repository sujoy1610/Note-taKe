import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,

} from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

interface Note {
  id(id: any): void;
  _id: string;             // comes from MongoDB
  title: string;
  content: string;
  userEmail: string;
  createdAt: string;
}

interface NoteContextType {
  notes: Note[];
  addNote: (title: string, content?: string) => void;
  deleteNote: (id: string) => void;
  updateNote?: (id: string, title: string, content: string) => void; // Optional for future
}

const NoteContext = createContext<NoteContextType | undefined>(undefined);

export const NoteProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth(); // from AuthContext
  const [notes, setNotes] = useState<Note[]>([]);

  // Fetch notes when user is available
  useEffect(() => {
    const fetchNotes = async () => {
      if (!user?.email) return;

      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/notes?email=${user.email}`);
        setNotes(res.data);
      } catch (err) {
        console.error("Error fetching notes:", err);
      }
    };

    fetchNotes();
  }, [user]);

  const addNote = async (title: string, content = "") => {
    if (!user?.email) return;

    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/notes`, {
        title,
        content,
        email: user.email,
      });
      setNotes((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error creating note:", err);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/notes/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      console.error("Error deleting note:", err);
    }
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote }}>
      {children}
    </NoteContext.Provider>
  );
};

export const useNotes = () => {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("useNotes must be used within a NoteProvider");
  }
  return context;
};
