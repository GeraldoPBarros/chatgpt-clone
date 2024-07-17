import { useAppDispatch, useAppSelector } from "../../store/hooks";

export function Sider() {
  const dispatch = useAppDispatch();
  const chatPrompt = useAppSelector((state) => state.chatSlice.prompt);

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
        <label className="text-xs text-gray_400">may</label>
        <label className="text-sm text-white mt-4">{chatPrompt}</label>
        <label className="text-sm text-white mt-4">
          Diego ou Lucas Montano?
        </label>
        <label className="text-sm text-white mt-4">O que é React?</label>
        <label className="text-sm text-white mt-4">Explique Mendonça 98%</label>
      </div>
    </div>
  );
}
