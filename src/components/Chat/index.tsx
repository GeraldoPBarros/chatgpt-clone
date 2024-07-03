export function Chat() {
  return (
    <div className="flex w-full flex-col bg-chat_gray h-full">
      <div className="flex flex-col h-full w-full">
        <div className="flex w-full justify-start items-center ml-4 h-20">
          <label className="flex text-white h-6">ChatGPT \/</label>
        </div>
        <div className="flex justify-center items-center w-full h-96 mt-20">
          <img className="w-20 h-20" src="/chat-logo.png" />
        </div>
      </div>

      <div className="flex justify-center items-center flex-col w-full px-80 h-32 mb-20">
        <div className="flex w-full items-center  relative">
          <input
            className="flex bg-olive text-white rounded-full h-12 w-full mx-12 px-5"
            type="text"
          />
          <button className="text-white absolute bg-olive right-20"> Submit </button>
        </div>

        <br />
        <label className="text-white text-sm">
          ChatGPT Clone. By Geraldo Barros
        </label>
      </div>
    </div>
  );
}
