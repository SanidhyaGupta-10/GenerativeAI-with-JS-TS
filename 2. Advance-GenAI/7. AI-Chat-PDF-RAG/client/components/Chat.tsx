'use client';

import { MessageCircle, Send, Loader2, Bot, User } from "lucide-react"
import { useChat } from "@/hooks/useChat"
import { useEffect, useRef } from "react";

function Chat() {
    const { messages, input, setInput, sendMessage, isLoading, error } = useChat();
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to the bottom when messages change
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    return (
        <div className="glass-card h-[80vh] flex flex-col p-6 rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] backdrop-blur-md bg-white/5 relative overflow-hidden">
            {/* Decorative gradient blobs behind the chat */}
            <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-violet-600/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600/20 rounded-full blur-[80px] pointer-events-none" />

            <div className="flex items-center gap-3 mb-6 relative z-10 border-b border-white/10 pb-4">
                <div className="p-2 bg-violet-500/20 rounded-xl">
                    <MessageCircle className="w-6 h-6 text-violet-400" />
                </div>
                <div>
                    <h2 className="text-xl text-white font-bold tracking-wide">Chat with PDF</h2>
                    <p className="text-sm text-white/50">Ask questions about your uploaded document</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto mb-4 relative z-10 pr-2 space-y-4">
                {messages.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-white/40 space-y-4">
                        <MessageCircle className="w-12 h-12 mb-2 opacity-50" />
                        <p>No messages yet. Start a conversation!</p>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <div key={msg.id} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                            <div className={`flex gap-3 max-w-[85%] ${msg.isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 ${msg.isUser ? 'bg-blue-500' : 'bg-violet-600'}`}>
                                    {msg.isUser ? <User className="w-5 h-5 text-white" /> : <Bot className="w-5 h-5 text-white" />}
                                </div>
                                <div className={`p-4 rounded-2xl ${msg.isUser ? 'bg-blue-600 text-white rounded-tr-none shadow-lg' : 'bg-white/10 text-white/90 border border-white/5 rounded-tl-none backdrop-blur-sm'}`}>
                                    <p className="whitespace-pre-wrap text-sm leading-relaxed">{msg.text}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
                
                {isLoading && (
                    <div className="flex justify-start">
                        <div className="flex gap-3 max-w-[85%] flex-row">
                            <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 bg-violet-600">
                                <Bot className="w-5 h-5 text-white" />
                            </div>
                            <div className="p-4 rounded-2xl bg-white/10 text-white/90 border border-white/5 rounded-tl-none backdrop-blur-sm flex items-center gap-2">
                                <Loader2 className="w-4 h-4 animate-spin text-violet-400" />
                                <span className="text-sm text-white/60">Thinking...</span>
                            </div>
                        </div>
                    </div>
                )}
                
                {error && (
                    <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-200 text-sm text-center">
                        {error}
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="flex gap-3 relative z-10 pt-2 border-t border-white/10">
                <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type your message..." 
                    className="flex-1 p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all backdrop-blur-md" 
                    disabled={isLoading}
                />
                <button 
                    onClick={sendMessage}
                    disabled={!input.trim() || isLoading}
                    className="p-4 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:bg-white/10 disabled:text-white/30 disabled:cursor-not-allowed text-white transition-all flex items-center justify-center shadow-lg hover:shadow-violet-500/25 active:scale-95"
                >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                </button>
            </div>
        </div>
    )
}

export default Chat