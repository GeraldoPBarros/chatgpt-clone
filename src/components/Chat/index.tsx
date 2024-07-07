import { useEffect, useState } from "react";

export function Chat() {
  const [prompt, setPrompt] = useState("");
  const [indexRendering, setIndexRendering] = useState(0);
  const [responseArray, setResponseArray] = useState<string[]>([]);
  const [showResponse, setShowResponse] = useState("");

  useEffect(() => {
    if (responseArray.length > 0 && indexRendering < responseArray.length) {
      let newAnswer = showResponse + " " + responseArray[indexRendering];
      setTimeout(() => {
        if (indexRendering < responseArray.length) {
          setIndexRendering(indexRendering + 1);
        }
        setShowResponse(newAnswer);
      }, 200);
    }
  }, [indexRendering, responseArray, showResponse]);

  function processChatResponse(response: string) {
    const responseObject = JSON.parse(response.replace("§", ""));
    const answerArray = responseObject.data.answer.split(" ");
    return answerArray;
  }

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
      setResponseArray([]);
      setIndexRendering(0);
      const res = await fetch("http://localhost:3001/question", requestOptions);
      const repo = await res.json();
      // console.log(repo.message);
      setResponseArray(processChatResponse(repo.message));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="flex w-full flex-col bg-chat_gray h-full relative">
      <div className="flex w-full justify-start items-center ml-4 h-14 absolute top-0">
        <label className="flex h-6 text-gray_300 cursor-pointer text-xl items-center">
          ChatGPT{" "}
          <img src="/CaretDown.png" alt="caret-down" className="w-5 h-5 ml-2" />
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
      <div className="flex justify-center items-center flex-col w-full h-32 mb-12 absolute bottom-0">
        <div className="flex w-4/5 min-w-max items-center relative">
          <input
            className="flex bg-olive text-white rounded-full h-16 w-full mx-12 px-12 focus:outline-none"
            placeholder="Message ChatGPT"
            type="text"
            onChange={(e) => setPrompt(e.target.value)}
          />
          <button
            className="text-white absolute ml-14"
            onClick={() => sendPrompt(prompt)}
          >
            <img src="/PaperClipHorizontal.png" className="w-10 h-8" alt="" />
          </button>
          <button
            className="text-white absolute right-14"
            onClick={() => sendPrompt(prompt)}
          >
            {prompt === "" ? (
              <img src="/ArrowUpOpacity.png" className="w-14 h-14" alt="" />
            ) : (
              <img src="/ArrowUp.png" className="w-14 h-14" alt="" />
            )}
          </button>
        </div>

        <br />
        <label className="text-white text-sm min-w-64">
          ChatGPT Clone. By Geraldo Barros
        </label>
      </div>
    </div>
  );
}
