import { MessageCircle } from "lucide-react"

function Chat() {
    return (
        <div className="glass-card h-[80vh] p-6">
            <div className="flex flex-col h-full">
                <div className="flex items-center gap-2 mb-4">
                    <MessageCircle className="w-5 h-5 text-yellow-400" />
                    <h2 className="text-white font-bold">Chat with your PDF</h2>
                </div>
                <div className="flex-1 overflow-y-auto mb-4"></div>
                <div className="flex gap-3">
                    <input type="text" placeholder="Type your message..." className="flex-1 p-3 rounded-xl bg-white/5 border border-white/10 text-white outline-none focus:ring-2 focus:ring-violet-500" />
                    <button className="p-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white transition-colors"><svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3 21l18-9-18-9v7v9z"
                            fill="currentColor"
                        />
                    </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Chat