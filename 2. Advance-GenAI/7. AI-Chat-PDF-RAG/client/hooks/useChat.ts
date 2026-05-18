import { useState } from 'react';
import { api } from '@/lib/axios';

export interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

/**
 * @hook useChat
 * @description Manages the state and logic for the AI chat interface. Handles sending messages, receiving AI responses, and maintaining the conversation history.
 * @state {Message[]} messages - Array containing the history of the conversation.
 * @state {string} input - The current text in the chat input field.
 * @state {boolean} isLoading - True when waiting for the AI response.
 * @state {string | null} error - Stores any error messages encountered during chat.
 * @returns {Object} State variables and the `sendMessage` function.
 */
export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * @function sendMessage
   * @description Validates the input, adds the user's message to the chat history, and sends it to the backend. It then processes the LLM's response and adds it to the chat history. It also handles and displays any errors encountered.
   */
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
      
      let botText = '';
      if (typeof responseData === 'string') {
        botText = responseData;
      } else if (responseData?.content) {
        botText = responseData.content;
      } else if (responseData?.kwargs?.content) {
        botText = responseData.kwargs.content;
      } else if (responseData?.text) {
        botText = responseData.text;
      } else {
        botText = JSON.stringify(responseData);
      }

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
