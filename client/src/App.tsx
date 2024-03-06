import { useState } from "react";
import io from "socket.io-client";
import "./assets/main.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Chat from "./components/Chat";

function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const socket = io(process.env.REACT_APP_SERVER_URL || "", {
    transports: ["websocket"],
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route
          index
          element={<Chat userName={userName} socket={socket} room={room} />}
        />
        <Route
          path="login"
          element={<Login setUserName={setUserName} setRoom={setRoom} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
