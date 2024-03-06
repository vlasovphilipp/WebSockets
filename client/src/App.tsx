import { useState, useEffect } from "react";
import "./assets/main.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Chat from "./components/Chat";
import { socket } from "./socket";

function App() {
  const [userName, setUserName] = useState("");
  const [room, setRoom] = useState("");
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  return (
    <>
      {isConnected && (
        <BrowserRouter>
          <Routes>
            <Route index element={<Chat userName={userName} room={room} />} />
            <Route
              path="login"
              element={<Login setUserName={setUserName} setRoom={setRoom} />}
            />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
