import { useState } from "react";
import { FaBars, FaTimes, FaSearch, FaPlus, FaUserCircle } from "react-icons/fa";
import "./index.css";

function Onboarding({ onNext }) {
  const [slide, setSlide] = useState(0);
  const slides = [
    {
      title: "Welcome to DE CRYPT",
      description: "<strong>Encrypted Conversations</strong> for the decentralized world. Chat freely, securely, and without compromise."
    },
    {
      title: "Secure and Anonymous",
      description: "Your chats are end-to-end encrypted, anonymous, and stored on-chain. No middlemen, no data leaks."
    },
    {
      title: "Connect Your Wallet",
      description: "To start chatting, simply connect your Web3 wallet. Your identity is your address."
    }
  ];

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col justify-between p-8 relative">
      <div className="absolute top-4 right-4">
        <button className="text-green-500 text-sm border border-green-500 px-3 py-1 rounded" onClick={() => onNext()}>Connect Wallet</button>
      </div>
      <div className="flex-1 flex items-center justify-center text-center">
        <div className="p-6 text-green-400 max-w-md border-2 border-green-600 rounded-xl clip-path-custom">
          <h1 className="text-xl font-bold mb-3" dangerouslySetInnerHTML={{ __html: slides[slide].title }}></h1>
          <p className="text-sm" dangerouslySetInnerHTML={{ __html: slides[slide].description }}></p>
        </div>
      </div>
      <div className="w-full flex justify-between">
        <button
          className="text-sm text-white bg-green-700 hover:bg-green-600 px-4 py-2 rounded"
          onClick={() => {
            if (slide < slides.length - 1) setSlide(slide + 1);
            else onNext();
          }}
        >
          {slide < slides.length - 1 ? "Next" : "Continue"}
        </button>
        <button className="text-sm text-white bg-green-700 hover:bg-green-600 px-4 py-2 rounded" onClick={() => onNext()}>Skip</button>
      </div>
    </div>
  );
}

function ConnectWallet({ onConnect }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="h-screen w-screen bg-black text-white flex flex-col items-center justify-center p-8">
      <h2 className="text-green-400 text-xl mb-4">Select Wallet</h2>
      <div className="space-y-4 w-full max-w-sm">
        <button
          className={`w-full py-3 border ${selected === "metamask" ? "border-green-500" : "border-gray-600"} rounded bg-[#1a1a1a] hover:border-green-400`}
          onClick={() => setSelected("metamask")}
        >MetaMask</button>
        <button
          className={`w-full py-3 border ${selected === "core" ? "border-green-500" : "border-gray-600"} rounded bg-[#1a1a1a] hover:border-green-400`}
          onClick={() => setSelected("core")}
        >Core Wallet</button>
      </div>
      <button
        disabled={!selected}
        className="mt-6 px-6 py-2 bg-green-700 hover:bg-green-600 rounded disabled:opacity-50"
        onClick={onConnect}
      >
        Connect Wallet
      </button>
    </div>
  );
}

function WrapperApp() {
  const [step, setStep] = useState("onboarding");

  if (step === "onboarding") return <Onboarding onNext={() => setStep("connect")} />;
  if (step === "connect") return <ConnectWallet onConnect={() => setStep("chat")} />;

  return <App />;
}

function App() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, input.trim()]);
    setInput("");
  };

  return (
    <div className="h-screen w-screen bg-black text-white font-mono flex flex-col">
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

      {showSidebar && (
        <div className="sm:hidden fixed inset-0 z-40 bg-[#121212] flex flex-col w-full h-full overflow-y-auto p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="text-green-500 text-xs" style={{ fontFamily: "'Press Start 2P', monospace" }}>
              DE CRYPT
            </span>
            <button className="text-green-400 text-xl" onClick={() => setShowSidebar(false)}>
              <FaTimes />
            </button>
          </div>
          <div className="flex items-center bg-[#1a1a1a] px-2 py-1 rounded-md border border-gray-700 mb-4">
            <FaSearch className="text-gray-400 mr-2" />
            <input className="bg-transparent outline-none text-white text-sm w-full" placeholder="Search..." />
            <FaPlus className="text-green-400 ml-2 cursor-pointer" />
          </div>
          <div className="flex-1 overflow-y-auto space-y-3 mb-24">
            <h2 className="text-green-500 text-sm">Chats</h2>
            <ul className="space-y-2">
              <li className="bg-green-900 text-green-300 p-2 rounded-md">1vdhekbtu*****%&rh1</li>
            </ul>
          </div>
          <button className="mt-4 bg-red-800 hover:bg-red-700 py-2 rounded-md text-white text-xs w-30">
            Disconnent
          </button>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        <aside className="bg-[#121212] border-r border-gray-700 p-4 flex-col justify-between transition-all duration-300 z-10 hidden sm:flex w-64">
          <div className="flex-1 space-y-3 overflow-y-auto">
            <h2 className="text-green-500 text-sm">Chats</h2>
            <ul className="space-y-2">
              <li className="bg-green-900 text-green-300 p-2 rounded-md">1vdhekbtu*****%&rh1</li>
            </ul>
          </div>
          <button className="mt-4 bg-red-800 hover:bg-red-700 py-2 rounded-md text-white text-xs w-full">
            Disconnent
          </button>
        </aside>

        <main className="flex-1 flex flex-col relative">
          <div className="flex-1 bg-[#0A0A0A] p-4 overflow-y-auto space-y-3">
            {messages.length === 0 ? (
              <p className="text-gray-400">Chat messages will appear here.</p>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className="flex justify-end">
                  <div className="bg-green-700 text-white px-4 py-2 rounded-xl text-sm max-w-xs break-words">
                    {msg}
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="p-4 border-t border-gray-700 bg-[#101010] flex gap-2 sticky bottom-0">
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

export default WrapperApp;
