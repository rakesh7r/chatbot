'use client';
import { useChatStore, ResponseType } from '@/store/useChatStore';
import { useState } from 'react';
import { sendChat } from '../actions/chatActions';

type UseChatType = {
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  setChat: React.Dispatch<
    React.SetStateAction<{ prompt: string; response: ResponseType }>
  >;
};

export function useChat(): UseChatType {
  const initChatState: { prompt: string; response: ResponseType } = {
    prompt: '',
    response: null,
  };
  const [chat, setChat] = useState(initChatState);
  const { addChat, updateLastResponse, conversation } = useChatStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    addChat({
      ...chat,
      prompt: chat.prompt,
      response: null,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    });
    const response = await sendChat(chat.prompt, conversation);
    setChat((prevState) => ({ ...prevState, response }));
    updateLastResponse(response);
  };

  return { handleSubmit, setChat };
}
