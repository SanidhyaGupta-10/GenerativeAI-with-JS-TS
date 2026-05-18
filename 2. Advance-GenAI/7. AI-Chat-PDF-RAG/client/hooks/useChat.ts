import { useState } from 'react';
import { api } from '@/lib/axios';

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      isUser: true,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post('/chats/chat-with-pdf', {
        query: userMessage.text,
      });

      // LLM response.data from langchain often has a content field or is directly a string
      const responseData = response.data.data;
      console.log(responseData);
      const botText = typeof responseData === 'string' ? responseData : responseData?.content || JSON.stringify(responseData);

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: botText,
        isUser: false,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setError(err?.response?.data?.message || 'Failed to send message.');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    input,
    setInput,
    sendMessage,
    isLoading,
    error,
  };
};
