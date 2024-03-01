import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login(props: any) {
  const [name, setName] = useState<string>("");
  const navigate = useNavigate();

  function handleSubmit(e: any) {
    e.preventDefault();
    if (name) {
      props.setUserName(name);
      navigate("/");
    }
  }

  return (
    <form className="max-w-sm mx-auto py-10" onSubmit={(e) => handleSubmit(e)}>
      <h3 className="text-xl font-bold mb-2">Enter your name:</h3>
      <input
        onChange={(e) => setName(e.target.value)}
        className="w-full px-2 py-1 border border-sky-500"
        type="text"
      />
      <button className="block mx-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-5">
        Send
      </button>
    </form>
  );
}

export default Login;
