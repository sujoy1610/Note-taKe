import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Lovable HD Design Tokens
        background: "hsl(0, 0%, 100%)",
        foreground: "hsl(0, 0%, 3.9%)",
        "card": "hsl(0, 0%, 100%)",
        "card-foreground": "hsl(0, 0%, 3.9%)",
        "popover": "hsl(0, 0%, 100%)",
        "popover-foreground": "hsl(0, 0%, 3.9%)",
        "primary": "hsl(0, 0%, 9%)",
        "primary-foreground": "hsl(0, 0%, 98%)",
        "secondary": "hsl(0, 0%, 96.1%)",
        "secondary-foreground": "hsl(0, 0%, 9%)",
        "muted": "hsl(0, 0%, 96.1%)",
        "muted-foreground": "hsl(0, 0%, 45.1%)",
        "accent": "hsl(0, 0%, 96.1%)",
        "accent-foreground": "hsl(0, 0%, 9%)",
        "destructive": "hsl(0, 84.2%, 60.2%)",
        "destructive-foreground": "hsl(0, 0%, 98%)",
        "border": "hsl(0, 0%, 89.8%)",
        "input": "hsl(0, 0%, 89.8%)",
        "ring": "hsl(0, 0%, 3.9%)",

        // HD Custom Colors
        "hd-blue": "hsl(224, 100%, 66%)",
        "hd-blue-light": "hsl(224, 100%, 80%)",
        "hd-gray": "hsl(0, 0%, 60%)",
        "hd-gray-light": "hsl(0, 0%, 95%)",
      },
      borderRadius: {
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};

export default config;
