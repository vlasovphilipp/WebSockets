import { Navigate } from "react-router-dom";
import { useState } from "react";
import Container from "./Container";
import { socket } from "../socket";
import { useSelector } from "react-redux";

type Message = {
  message: string;
  name: string;
};

function Chat(props: any) {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [userMessage, setUserMessage] = useState("");
  const userName = useSelector(
    (state: { user: { userName: string } }) => state.user.userName
  );
  const userStoreState = useSelector((state) => state);

  console.log("userStoreState", userStoreState);

  socket.on("message", (data: any) => {
    setMessages([...messages, data]);
  });

  function sendMessage(e: any) {
    e.preventDefault();
    socket.emit("sendMessage", {
      message: userMessage,
      name: props.userName,
    });
    setUserMessage("");
  }

  return props.userName ? (
    <Container>
      {/* <p>(Data from redux store) user name: {userName}</p> */}
      <div className="py-10">
        <ul>
          {messages.map((item) => (
            <li className="flex">
              <h3 className="mr-3">{item.name}:</h3>
              <p>{item.message}</p>
            </li>
          ))}
        </ul>
        <form
          className="flex items-center py-6"
          onSubmit={(e) => sendMessage(e)}
        >
          <input
            className="w-full px-2 py-1 border border-sky-500"
            value={userMessage}
            type="text"
            onChange={(e) => setUserMessage(e.target.value)}
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2">
            Send
          </button>
        </form>
      </div>
    </Container>
  ) : (
    <Navigate to="/login" />
  );
}

export default Chat;
