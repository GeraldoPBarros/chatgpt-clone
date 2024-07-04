import { useState } from "react";

export function Chat() {
  const [prompt, setPrompt] = useState("");
  const [showResponse, setShowResponse] = useState("");

  async function sendPrompt(data: string) {
    const question = {
      data: data,
    };
    const requestOptions = {
      method: "POST", // Change to 'PUT' or 'PATCH' for update requests
      headers: { "Content-Type": "application/json" }, // Specify JSON body format
      body: JSON.stringify(question), // Convert data to JSON string
    };

    try {
      const res = await fetch("http://localhost:3001/question", requestOptions);
      const repo = await res.json();
      console.log(repo.message);
      setShowResponse(repo.message);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="flex w-full flex-col bg-chat_gray h-full relative">
      <div className="flex w-full justify-start items-center ml-4 h-14 absolute top-0">
        <label className="flex h-6 text-gray_300 cursor-pointer text-xl items-center">
          ChatGPT <img src="/CaretDown.png" alt="caret-down" className="w-5 h-5 ml-2" />
        </label>
      </div>
      <div className="flex flex-col h-full w-full mt-20">
        {showResponse === "" ? (
          <div className="flex justify-center items-center w-full h-96 mt-20">
            <img className="w-20 h-20" src="/chat-logo.png" />
          </div>
        ) : (
          <>
            <div className="flex justify-center items-center w-full h-96 mt-20">
              <label className="w-4/5">{showResponse}</label>
            </div>
          </>
        )}
      </div>
      <div className="flex justify-center items-center flex-col w-full px-80 h-32 mb-20 absolute bottom-0">
        <div className="flex w-full items-center relative">
          <input
            className="flex bg-olive text-white rounded-full h-16 w-full min-w-full mx-12 px-5"
            type="text"
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            className="text-white absolute bg-olive right-20"
            onClick={() => sendPrompt(prompt)}
          >
            {" "}
            Submit{" "}
          </button>
        </div>

        <br />
        <label className="text-white text-sm">
          ChatGPT Clone. By Geraldo Barros
        </label>
      </div>
    </div>
  );
}
