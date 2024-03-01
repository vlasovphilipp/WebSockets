import { Navigate } from "react-router-dom";
import { useState } from "react";

type Message = {
  message: string;
  user: string;
};

function Chat(props: any) {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [userMessage, setUserMessage] = useState("");

  props.socket.on("message", (data: any) => {
    setMessages([...messages, data]);
  });

  function sendMessage(e: any) {
    e.preventDefault();
    props.socket.emit("message", {
      message: userMessage,
      user: props.userName,
    });
    setUserMessage("");
  }

  return props.userName ? (
    <div className="max-w-lg mx-auto py-10">
      <ul>
        {messages.map((item) => (
          <li className="flex">
            <h3 className="mr-3">{item.user}:</h3>
            <p>{item.message}</p>
          </li>
        ))}
      </ul>
      <form className="flex items-center py-6" onSubmit={(e) => sendMessage(e)}>
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
  ) : (
    <Navigate to="/login" />
  );
}

export default Chat;
