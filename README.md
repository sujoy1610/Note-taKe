# 📒 Note Taking App — Full Stack (MERN + OTP Auth)

A secure, modern, and responsive Note-Taking web app built with:

-  **React (Vite + Tailwind)**
-  **Node.js + Express**
-  **MongoDB Atlas**
-  **Email-based OTP Authentication**
-  **Responsive Design + User Dashboard**
-  **Deployed on Vercel (Frontend) and Render (Backend)**

---

##  Live Demo

-  **Frontend:** [https://your-frontend.vercel.app](#)
-  **Backend:** [https://your-backend.onrender.com](#)
- Test Email OTP: Use any valid email (simulated or live)

---

##  Features

-  OTP-based sign up & login (no passwords)
-  Create, read & delete notes
-  Authenticated user dashboard
-  Notes stored per user (no cross access)
-  Simple & clean UI using Tailwind CSS
-  Persistent user session using `localStorage`

---

##  Tech Stack

| Frontend            | Backend             | Auth & DB           |
|---------------------|---------------------|---------------------|
| React + Vite        | Node.js + Express   | MongoDB Atlas       |
| Tailwind CSS        | Nodemailer (OTP)    | Email-based OTP     |
| ShadCN UI           | Mongoose            | Environment Variables |
| React Router DOM    | CORS + JSON parsing | Hosted on Render    |

---


---

##  Features

- Email-based OTP Sign In & Sign Up (no passwords)
- Fully authenticated dashboard
- Create, view, and delete personal notes
- User-specific notes (notes are stored per user)
- Mobile responsive design
- Clean UI with Tailwind CSS and Lucide Icons
- Toast notifications for user feedback

---

##  Environment Variables

###  Backend (`/server/.env`)

PORT=5000
MONGO_URI=your_mongodb_connection_string
EMAIL_USER=your_email@example.com
EMAIL_PASS=your_email_app_password


###  Frontend (`/client/.env`)

VITE_API_URL=http://localhost:5000/api


---

##  Installation & Running Locally

### Step 1: Clone the Repo

```bash
git clone https://github.com/your-username/note-taking-app.git
cd note-taking-app

 Deployment
 Frontend (Vercel)
Push client/ folder to GitHub.

Deploy to vercel.com

Set the VITE_API_URL in Vercel dashboard to your Render backend URL.

 Backend (Render)
Push server/ folder to GitHub.

Deploy to render.com

Add environment variables in Render dashboard:

MONGO_URI

EMAIL_USER

EMAIL_PASS

 Usage
Go to the site.

Sign up using your email and OTP.

Log in using the OTP.

Create and manage your notes securely.

Each user only sees their own notes.



