import { useState } from "react";
import { FaBars, FaTimes, FaSearch, FaPlus, FaUserCircle } from "react-icons/fa";
import "./index.css";

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (!input.trim()) return;
    // Removed alert
    setInput("");
  };

  return (
    <div className="h-screen w-screen bg-black text-white font-mono flex flex-col overflow-hidden overscroll-none">
      {/* Top Header Bar */}
      <header className="flex items-center justify-between bg-[#0f0f0f] border-b border-green-600 px-4 py-2 text-xs sm:text-sm relative z-50">
        <div className="flex items-center gap-4">
          <button
            className="sm:hidden text-green-400 text-xl"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            {showSidebar ? <FaTimes /> : <FaBars />}
          </button>
          <span className="text-green-500 text-xs sm:text-sm" style={{ fontFamily: "'Press Start 2P', monospace" }}>
            DE CRYPT
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4">
          <div className="flex items-center bg-[#1a1a1a] px-2 py-1 rounded-md border border-gray-700">
            <FaSearch className="text-gray-400 mr-2" />
            <input className="bg-transparent outline-none text-white text-sm" placeholder="Search..." />
          </div>
          <FaPlus className="text-green-400 cursor-pointer" />
          <div className="flex items-center gap-1">
            <FaUserCircle className="text-green-400 text-lg" />
            <span className="text-green-400 text-xs">0xAbC...1234</span>
          </div>
        </div>
      </header>

      {/* Sidebar Overlay for Mobile (Full screen like WhatsApp) */}
      {showSidebar && (
        <div className="sm:hidden fixed inset-0 z-40 bg-[#121212] flex flex-col p-4 w-full h-full">
          <div className="flex items-center justify-between mb-4">
            <span className="text-green-500 text-xs" style={{ fontFamily: "'Press Start 2P', monospace" }}>
              DE CRYPT
            </span>
            <button className="text-green-400 text-xl" onClick={() => setShowSidebar(false)}>
              <FaTimes />
            </button>
          </div>
          {/* Mobile Search & Add */}
          <div className="flex items-center bg-[#1a1a1a] px-2 py-1 rounded-md border border-gray-700 mb-4">
            <FaSearch className="text-gray-400 mr-2" />
            <input className="bg-transparent outline-none text-white text-sm w-full" placeholder="Search..." />
            <FaPlus className="text-green-400 ml-2 cursor-pointer" />
          </div>
          {/* Chat List */}
          <div className="flex-1 overflow-y-auto space-y-3">
            <h2 className="text-green-500 text-sm">Chats</h2>
            <ul className="space-y-2">
              <li className="bg-green-900 text-green-300 p-2 rounded-md">AJ - Testing Chat 1</li>
              <li className="bg-[#222] text-white p-2 rounded-md">Paddy - Let’s ship this dApp 🚀</li>
            </ul>
          </div>
          <button className="mt-4 bg-red-800 hover:bg-red-700 py-2 rounded-md text-white text-xs w-full">
            Sign Out
          </button>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar for Desktop */}
        <aside className="bg-[#121212] border-r border-gray-700 p-4 flex-col justify-between transition-all duration-300 z-10 hidden sm:flex w-64">
          <div className="flex-1 space-y-3 overflow-y-auto">
            <h2 className="text-green-500 text-sm">Chats</h2>
            <ul className="space-y-2">
              <li className="bg-green-900 text-green-300 p-2 rounded-md">AJ - Testing Chat 1</li>
              <li className="bg-[#222] text-white p-2 rounded-md">Paddy - Let’s ship this dApp 🚀</li>
            </ul>
          </div>
          <button className="mt-4 bg-red-800 hover:bg-red-700 py-2 rounded-md text-white text-xs w-full">
            Sign Out
          </button>
        </aside>

        {/* Chat Window */}
        <main className="flex-1 flex flex-col">
          <div className="flex-1 bg-[#0A0A0A] p-4 overflow-y-auto">
            <p className="text-gray-400">Chat messages will appear here.</p>
          </div>

          {/* Chat Input - now sticky at bottom */}
          <div className="p-4 border-t border-gray-700 bg-[#101010] flex gap-2 sticky bottom-0 z-50">
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
