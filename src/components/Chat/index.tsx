import { useEffect, useState } from "react";

interface ShowResponseArrayType {
  question: string;
  answer: string;
}

type ShowResponseArray = ShowResponseArrayType[] | null;

export function Chat() {
  const [prompt, setPrompt] = useState("");
  const [indexRendering, setIndexRendering] = useState(0);
  const [responseArray, setResponseArray] = useState<string[]>([]);
  const [showResponse, setShowResponse] = useState<ShowResponseArray>(null);

  useEffect(() => {
    if (responseArray.length > 0 && indexRendering < responseArray.length) {
      let responseTemp =
        showResponse === null
          ? ""
          : showResponse[showResponse.length - 1]?.answer;

      let newAnswer = responseTemp + " " + responseArray[indexRendering];

      console.log(newAnswer);

      setTimeout(() => {
        const responseValidation: ShowResponseArray =
          showResponse === null
            ? [{ question: prompt, answer: newAnswer }]
            : updateOnLastIndex(showResponse, newAnswer);
        console.log(responseValidation);
        setShowResponse(responseValidation);

        if (indexRendering < responseArray.length) {
          setIndexRendering(indexRendering + 1);
        }
      }, 200);
    }
  }, [indexRendering, responseArray, showResponse, prompt]);

  function updateOnLastIndex(stateValue: ShowResponseArray, data: string) {
    let newStateValue = stateValue;
    console.log(stateValue);
    if (newStateValue !== null) {
      newStateValue[newStateValue?.length - 1].answer = data;
    }
    return newStateValue;
  }

  /** Organize response with json structure */
  function processChatResponse(response: string) {
    const responseObject = JSON.parse(response.replace("§", ""));
    const answerArray = responseObject.data.answer.split(" ");
    return answerArray;
  }

  /** send prompt function */
  async function sendPrompt(data: string) {
    const question = {
      data: data,
    };
    const requestOptions = {
      method: "POST", // Change to 'PUT' or 'PATCH' for update requests
      headers: { "Content-Type": "application/json" }, // Specify JSON body format
      body: JSON.stringify(question), // Convert data to JSON string
    };

    // update variables and send prompt
    try {
      setResponseArray([]);
      setIndexRendering(0);

      const res = await fetch("http://localhost:3001/question", requestOptions);
      const repo = await res.json();

      const updateShowResponse =
        showResponse === null
          ? [{ question: prompt, answer: "" }]
          : [...showResponse, { question: prompt, answer: "" }];

      setShowResponse([...updateShowResponse]);

      setResponseArray(processChatResponse(repo.message));
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="flex w-full flex-col bg-chat_gray h-full relative">
      <div className="flex w-full justify-start items-center ml-4 h-14 absolute top-0 bg-chat_gray">
        <label className="flex h-6 text-gray_300 cursor-pointer text-xl items-center">
          ChatGPT{" "}
          <img src="/CaretDown.png" alt="caret-down" className="w-5 h-5 ml-2" />
        </label>
      </div>

      <div className="flex flex-col h-full w-full mt-20">
        {showResponse === null ? (
          <div className="flex justify-center items-center w-full h-96 mt-20">
            <img className="w-20 h-20" src="/chat-logo.png" alt="chat-logo" />
          </div>
        ) : (
          <>
            <div className="flex justify-center flex-col items-center w-full h-96 mt-20 max-h-[35%]">
              {showResponse.map((item, index) => (
                <>
                  <div className="flex w-4/6 mx-12 justify-end">
                    <div
                      className="p-5 bg-olive rounded-full text-gray_300"
                      key={item.question + index}
                    >
                      {item.question}
                    </div>
                  </div>
                  <br />
                  <div className="flex flex-row justify-center">
                    <img className="w-9 h-9" src="/RoundedOpenAiLogo.png" alt="chat-logo" />
                    <label
                      className="max-w-[70%] text-gray_300 ml-4"
                      key={item.question + index + 2}
                    >
                      {item.answer}
                    </label>
                  </div>
                  <br />
                </>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex justify-center items-center flex-col w-full h-32 absolute bottom-0">
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

        <label className="text-white text-sm min-w-64 mt-2">
          ChatGPT Clone. By Geraldo Barros
        </label>
      </div>
    </div>
  );
}
