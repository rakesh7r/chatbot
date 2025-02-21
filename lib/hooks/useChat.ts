'use client';
import { useChatStore } from '@/store/useChatStore';
import { axiosClient } from '@/utils/axiosConfig';
import { useState } from 'react';

type UseChatType = {
  chat: {
    prompt: string;
    response: string;
  };
  setChat: React.Dispatch<
    React.SetStateAction<{ prompt: string; response: string }>
  >;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
};

export function useChat(): UseChatType {
  const initChatState = { prompt: '', response: '' };
  const [chat, setChat] = useState(initChatState);
  const { addChat, updateLastResponse } = useChatStore();

  const sendHandler = async (prompt: string) => {
    const response = await axiosClient.post(`/chat/api`, { prompt });
    return response.data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    addChat({
      ...chat,
      prompt: chat.prompt,
      response: 'Thinking...',
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    });
    const response = await sendHandler(chat.prompt);
    setChat((prevState) => ({
      ...prevState,
      response,
    }));
    updateLastResponse(response);
  };

  return { chat, setChat, handleSubmit };
}
