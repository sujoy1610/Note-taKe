// src/pages/index.tsx
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-primary">Welcome to HD Note App</h1>
        <p className="text-muted-foreground text-lg">
          Start organizing your notes with ease and speed.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/signin"
            className="bg-hd-blue hover:bg-hd-blue/90 text-white px-6 py-3 rounded-md font-medium"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="border border-hd-blue text-hd-blue hover:bg-hd-blue hover:text-white px-6 py-3 rounded-md font-medium"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
