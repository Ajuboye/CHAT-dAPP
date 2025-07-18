import { useState } from "react";
import { FaBars, FaTimes, FaSearch, FaPlus } from "react-icons/fa";
import "./index.css";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    alert("Message sent: " + input);
    setInput("");
  };

  return (
    <div className="h-screen w-screen bg-black text-white font-mono flex flex-col overflow-hidden">
      {/* Top Header Bar */}
      <header className="flex items-center justify-between bg-[#0f0f0f] border-b border-green-600 px-4 py-2 text-xs sm:text-sm">
        <div className="flex items-center gap-4">
          <button className="sm:hidden text-green-400" onClick={() => setShowSidebar(!showSidebar)}>
            {showSidebar ? <FaTimes /> : <FaBars />}
          </button>
          <span>Logged in: <span className="text-green-400"></span></span>
          
        </div>
        <div className="flex items-center gap-4">
          <span className="text-green-400">Wallet: 0xAbC...1234</span>
          {/* Search Bar */}
          <div className="flex items-center bg-[#1a1a1a] px-2 py-1 rounded-md border border-gray-700 flex-1 sm:flex-none">
            <FaSearch className="text-gray-400 mr-2" />
            <input className="bg-transparent outline-none text-white text-sm w-full" placeholder="Search..." />
          </div>
          <FaPlus className="text-green-400 cursor-pointer" />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`bg-[#121212] border-r border-gray-700 p-4 flex flex-col justify-between transition-all duration-300 z-10 sm:block ${showSidebar ? "block absolute h-full w-64" : "hidden sm:w-64"}`}>
          <div>
            <h2 className="text-green-500 text-sm mb-3">Chats</h2>
            <ul className="space-y-2">
              <li className="bg-green-900 text-green-300 p-2 rounded-md"></li>
            </ul>
          </div>
          <button className="mt-4 bg-red-800 hover:bg-red-700 py-2 rounded-md text-white text-xs w-full top-1000">
            Sign Out
          </button>
        </aside>

        {/* Chat Window */}
        <main className="flex-1 flex flex-col">
          <div className="flex-1 bg-[#0A0A0A] p-4">
            <p className="text-gray-400">Chat messages will appear here.</p>
          </div>

          {/* Chat Input */}
          <div className="p-4 border-t border-gray-700 bg-[#101010] flex gap-2">
            <input
              type="text"
              placeholder="Type message..."
              className="flex-1 p-3 rounded-md bg-[#1f1f1f] text-white outline-none border border-gray-700"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="bg-green-700 hover:bg-green-600 px-4 rounded-md text-white text-sm"
            >
              Send
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
