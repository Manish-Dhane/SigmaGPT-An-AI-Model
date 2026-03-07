# SigmaGPT – AI Powered Chat Application

SigmaGPT is a full-stack AI-powered chat application inspired by ChatGPT.  
It allows users to sign up, log in, and interact with an AI assistant in real-time while maintaining chat history for each user.

The project demonstrates a modern full-stack architecture using **React, Node.js, MongoDB, and Google Gemini AI**.

---

## Live Demo

Frontend (Netlify):  
https://sigmagpt-ai-model.netlify.app/

Backend (Render):  
https://sigmagpt-an-ai-model-backend-4egr.onrender.com

---

## Features

User Authentication
- Secure signup and login using JWT
- Password hashing using bcrypt
- User session management

AI Chat System
- Real-time AI responses using Google Gemini API
- Chat thread creation with unique IDs
- Persistent conversation history

User-Specific Chat History
- Each user sees only their own chat threads
- Sidebar displays past conversations
- Ability to switch between chats

Thread Management
- Create new chat threads
- Delete conversations
- Load previous messages

Modern UI
- ChatGPT-like interface
- Markdown rendering for AI responses
- Code syntax highlighting

Deployment
- Frontend hosted on Netlify
- Backend hosted on Render
- Database hosted on MongoDB Atlas

---

## Tech Stack

Frontend
- React
- Vite
- React Router
- Context API
- React Markdown
- Highlight.js

Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt

AI Integration
- Google Gemini API

Deployment
- Netlify (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)

---

## Project Architecture


User Browser
↓
React Frontend (Netlify)
↓
Express Backend API (Render)
↓
MongoDB Atlas Database
↓
Google Gemini AI API


---

## Folder Structure


SigmaGPT
│
├── Backend
│ ├── models
│ │ ├── Thread.js
│ │ └── User.js
│ │
│ ├── routes
│ │ ├── chat.js
│ │ └── auth.js
│ │
│ ├── middleware
│ │ └── authMiddleware.js
│ │
│ ├── utils
│ │ └── openai.js
│ │
│ └── server.js
│
├── Frontend
│ ├── src
│ │ ├── pages
│ │ │ ├── Login.jsx
│ │ │ └── Signup.jsx
│ │ │
│ │ ├── components
│ │ │ ├── Chat.jsx
│ │ │ ├── ChatWindow.jsx
│ │ │ └── Sidebar.jsx
│ │ │
│ │ └── App.jsx
│ │
│ └── public
│
└── README.md


---

## Environment Variables

Create a `.env` file inside the **Backend** folder.


MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_google_gemini_api_key


---

## Installation and Setup

Clone the repository


git clone https://github.com/Manish-Dhane/SigmaGPT-An-AI-Model

cd SigmaGPT-An-AI-Model


---

### Backend Setup


cd Backend

npm install

npm run dev


Backend runs on


http://localhost:8080


---

### Frontend Setup


cd Frontend

npm install

npm run dev


Frontend runs on


http://localhost:5173


---

## API Endpoints

Authentication

POST /api/auth/signup  
Register a new user

POST /api/auth/login  
Login user and return JWT token

---

Chat System

POST /api/chat  
Send message and receive AI response

GET /api/thread  
Fetch all user threads

GET /api/thread/:threadId  
Fetch messages of a thread

DELETE /api/thread/:threadId  
Delete a thread

---

## Future Improvements

- Streaming AI responses
- Chat message editing
- Chat search
- User profile settings
- Chat export
- Dark mode UI
- Rate limiting and security improvements

---

## Learning Outcomes

This project helped in understanding:

- Full-stack application development
- JWT authentication
- REST API design
- AI API integration
- MongoDB data modeling
- Deployment pipelines
- Production debugging

---

## Author

Manish Dhane

GitHub  
https://github.com/Manish-Dhane

---

## License

This project is for educational and portfolio purposes.