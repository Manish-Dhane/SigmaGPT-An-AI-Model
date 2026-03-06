import "./App.css";
import Sidebar from "./Sidebar.jsx";
import ChatWindow from "./ChatWindow.jsx";
import { MyContext } from "./MyContext.jsx";

import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

import { useState, useEffect } from "react";
import { v1 as uuidv1 } from "uuid";

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {

  const [prompt, setPrompt] = useState("");
  const [reply, setReply] = useState(null);
  const [currThreadId, setCurrThreadId] = useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]);
  const [newChat, setNewChat] = useState(true);
  const [allThreads, setAllThreads] = useState([]);

  const [token, setToken] = useState(localStorage.getItem("token"));

  // useEffect(() => {
  //   const savedToken = localStorage.getItem("token");
  //   setToken(savedToken);
  // }, []);

  const providerValues = {
    prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads, setAllThreads
  };

  return (
    <BrowserRouter>

      <MyContext.Provider value={providerValues}>

        <Routes>

          {/* LOGIN */}
          <Route path="/login" element={<Login setToken={setToken} />} />

          {/* SIGNUP */}
          <Route path="/signup" element={<Signup />} />

          {/* CHAT (Protected Route) */}
          <Route
            path="/chat"
            element={
              token ? (
                <div className="app">
                  <Sidebar />
                  <ChatWindow />
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* DEFAULT ROUTE */}
          <Route
            path="/"
            element={
              token ? <Navigate to="/chat" /> : <Navigate to="/login" />
            }
          />

        </Routes>

      </MyContext.Provider>

    </BrowserRouter>
  );
}

export default App;