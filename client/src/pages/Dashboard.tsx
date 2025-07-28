import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { useNotes } from "@/context/NoteContext";
import { useToast } from "@/hooks/use-toast";
import logo from "@/assets/logo.png";

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const { notes, addNote, deleteNote } = useNotes();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newNote, setNewNote] = useState({ title: "", content: "" });

  const handleSignOut = () => {
    signOut();
    navigate("/signin");
  };

  const handleCreateNote = () => {
    if (!newNote.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a note title",
        variant: "destructive"
      });
      return;
    }

    addNote(newNote.title, newNote.content);
    setNewNote({ title: "", content: "" });
    setIsCreateDialogOpen(false);
    toast({
      title: "Success",
      description: "Note created successfully!"
    });
  };

  const handleDeleteNote = (id: string) => {
    deleteNote(id);
    toast({
      title: "Success",
      description: "Note deleted successfully!"
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-4">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <h1 className="text-xl font-semibold">Dashboard</h1>
        </div>
        <Button
          variant="ghost"
          onClick={handleSignOut}
          className="text-hd-blue hover:text-hd-blue/80"
        >
          Sign Out
        </Button>
      </header>

      {/* Main Content */}
      <main className="p-4 max-w-4xl mx-auto">
        {/* Welcome */}
        <div className="bg-card rounded-lg p-6 mb-6 border">
          <h2 className="text-xl font-semibold mb-2">Welcome, {user?.name}!</h2>
          <p className="text-hd-gray">Email: {user?.email || "unknown"}</p>
        </div>

        {/* Create Note Dialog */}
        <div className="mb-6">
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full sm:w-auto bg-hd-blue hover:bg-hd-blue/90 text-white font-medium h-12 px-8">
                Create Note
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create New Note</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    placeholder="Enter note title"
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Content</label>
                  <Textarea
                    placeholder="Enter note content (optional)"
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                    rows={4}
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleCreateNote}
                    className="flex-1 bg-hd-blue hover:bg-hd-blue/90 text-white"
                  >
                    Create
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsCreateDialogOpen(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Notes List */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Notes</h3>
          <div className="space-y-3">
            {notes.map((note) => (
              <div
                key={note._id}
                className="flex items-center justify-between p-4 bg-hd-gray-light rounded-lg border"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-foreground">{note.title}</h4>
                  {note.content && (
                    <p className="text-sm text-hd-gray mt-1 line-clamp-2">
                      {note.content}
                    </p>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteNote(note._id)}
                  className="text-hd-gray hover:text-destructive"
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            ))}

            {notes.length === 0 && (
              <div className="text-center py-8 text-hd-gray">
                <p>No notes yet. Create your first note!</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
