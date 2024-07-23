import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { ShowResponseArray } from "@/src/types/chat";

export function Sider() {
  const dispatch = useAppDispatch();
  const indexOfChat = useAppSelector(
    (state) => state.chatSlice.indexOfChatExibition
  );
  const globalResponses = useAppSelector(
    (state) => state.chatSlice.globalResponses
  );

  const [showResponse, setShowResponse] = useState<ShowResponseArray>(null);

  useEffect(() => {
    if (globalResponses !== null) {
      setShowResponse(globalResponses[indexOfChat]);
    }
  }, [globalResponses]);

  return (
    <div className="flex w-80 h-full flex-col bg-sider_black py-4 px-5">
      <div className="flex w-full h-14 justify-between">
        <img
          src="/CloseSiderBar.png"
          className="max-h-5 cursor-pointer"
          alt="close-side-bar"
        />
        <img
          src="/NewChat.png"
          className="max-h-6 cursor-pointer"
          alt="new-chat"
        />
      </div>
      <div className="flex w-full h-11 text-white">
        <img
          src="/RoundedOpenAiLogo.png"
          className="max-h-6"
          alt="chatgpt-logo"
        />
        <label className="ml-1">ChatGPT</label>
      </div>
      <div className="flex w-full h-11 text-white">
        <img src="/DotOutline.png" className="max-h-6" alt="explore-gpts" />
        <label className="ml-1">Explore GPTS</label>
      </div>
      <div className="flex w-full flex-col text-white mt-2">
        {showResponse?.map((item, index) => (
          <div key={item.question + index} className="flex flex-col">
            <label className="text-xs text-gray_400">Today</label>
            <div className="flex h-9 w-auto p-2 bg-chat_gray rounded-md">
              <label className="text-sm text-gray_50" key={item.question}>
                {item.question}
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
