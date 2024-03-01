import { useState } from "react";
import io from "socket.io-client";
import "./assets/main.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Chat from "./components/Chat";

function App() {
  const [userName, setUserName] = useState("");
  const socket = io("https://websockets-6u46.onrender.com", {
    withCredentials: true,
    extraHeaders: {
      "my-custom-header": "abcd",
    },
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Chat userName={userName} socket={socket} />} />
        <Route path="login" element={<Login setUserName={setUserName} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
