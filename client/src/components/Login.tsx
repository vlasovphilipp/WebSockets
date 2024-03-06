import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Container from "./Container";
import clsx from "clsx";
import { socket } from "../socket";

function Login(props: any) {
  const [name, setName] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  function hanldeLogin(data: any) {
    if (data.error) {
      setErrorMessage(data.error);
      return;
    }
    if (data.user) {
      setErrorMessage("");
      props.setUserName(name);
      props.setRoom(room);
      navigate("/");
    }
  }

  function handleSubmit(e: any) {
    e.preventDefault();
    if (name && room) {
      socket.emit(
        "join",
        {
          name,
          room,
        },
        hanldeLogin
      );
    }
  }

  function handleRoomSelection(e: any) {
    const options = e.target.options;
    const selectedValue = options[options.selectedIndex]?.value || "";
    setRoom(selectedValue);
  }

  const buttonDisabled = !name || !room;

  return (
    <Container>
      <form
        className="flex flex-col items-center"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h3 className="text-xl font-bold mb-2">Enter your name:</h3>
        <input
          onChange={(e) => setName(e.target.value)}
          className="w-[20rem] px-2 py-1 border border-sky-500 my-2"
          type="text"
        />
        <select
          className="w-[20rem] px-2 py-1 border border-sky-500 my-2"
          name="roomSelection"
          onChange={(e) => handleRoomSelection(e)}
        >
          <option value="" selected={true} disabled>
            Select room
          </option>
          <option value="room1">Room 1</option>
          <option value="room2">Room 2</option>
        </select>
        <button
          disabled={buttonDisabled}
          className={clsx(
            "block mx-auto bg-blue-500 hover:bg-blue-700 text-white cursor-pointer font-bold py-2 px-4 rounded mt-5",
            {
              "bg-slate-400 hover:bg-slate-400 hover:cursor-not-allowed":
                buttonDisabled,
            }
          )}
        >
          Send
        </button>
      </form>
      {errorMessage && <h3>{errorMessage}</h3>}
    </Container>
  );
}

export default Login;
