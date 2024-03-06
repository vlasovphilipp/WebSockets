import { Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Container from "./Container";

type Message = {
  message: string;
  name: string;
};

function Chat(props: any) {
  const [messages, setMessages] = useState<Array<Message>>([]);
  const [userMessage, setUserMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  props.socket.on("message", (data: any) => {
    setMessages([...messages, data]);
  });

  function sendMessage(e: any) {
    e.preventDefault();
    props.socket.emit("sendMessage", {
      message: userMessage,
      name: props.userName,
    });
    setUserMessage("");
  }

  useEffect(() => {
    props.socket.emit(
      "join",
      {
        name: props.userName,
        room: props.room,
      },
      setErrorMessage
    );

    // return () => {
    //   props.socket.emit("disconnect");
    //   props.socket.off();
    // };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return props.userName ? (
    <Container>
      <div className="py-10">
        {errorMessage && <h3>{errorMessage}</h3>}
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
