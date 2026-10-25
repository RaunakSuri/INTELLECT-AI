function App() {
  return (
    <div className="w-full h-180 flex items-center justify-center bg-gray-900">
      <div className="w-[80%] h-[80%] border border-gray-600 ">
        <div>
          <h1 className="text-center bg-gray-300 p-4 text-xl font-bold">
            INTELLECT AI : CHATBOT
          </h1>
        </div>
        <div className=" w-full h-[89%] flex gap-3 p-1">
          <form className="flex-1 border flex flex-col justify-center items-center border-gray-200">
            <input
              type="text"
              className="h-[85%] w-[95%] border border-gray-100 m-2 text-white font-bold p-2 "
            />
            <button className="text-white font-bold text-center w-[90%] h-[10%] border border-gray-200 bg-black">
              ASK
            </button>
          </form>
          <div className="flex-1 border border-gray-200 flex justify-center items-center">
            <div className="w-[95%] h-[95%] border border-gray-100 scroll-auto overflow-auto">
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
