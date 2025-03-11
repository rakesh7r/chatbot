'use client';
import { addChat, ResponseType, updateLastResponse } from '@/store/chatSlice';
import { useState } from 'react';
import { sendChat } from '../actions/chatActions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

type UseChatType = {
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  setChat: React.Dispatch<
    React.SetStateAction<{ prompt: string; response: ResponseType }>
  >;
  handleSendChat: (prompt: string) => Promise<void>;
  initChat: (prompt: string) => Promise<void>;
};

export function useChat(): UseChatType {
  const initChatState: { prompt: string; response: ResponseType } = {
    prompt: '',
    response: null,
  };
  const [chat, setChat] = useState(initChatState);
  const chatStore = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();

  const handleSendChat = async (prompt: string) => {
    try {
      dispatch(
        addChat({
          prompt: prompt,
          response: null,
          id: Date.now().toString(),
          timestamp: new Date().toISOString(),
        }),
      );
      const response = await sendChat(prompt, chatStore.conversation);
      if (response) {
        setChat((prevState) => ({ ...prevState, response: response }));
        dispatch(updateLastResponse(response));
      }
    } catch (error) {
      console.log(error);
    }
    const chatscreen = document.querySelector('#chatscreen');
    if (chatscreen) {
      chatscreen.scrollTop = chatscreen.scrollHeight;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleSendChat(chat?.prompt);
  };

  const initChat = async (prompt: string) => {
    const response = await sendChat(prompt, chatStore.conversation);
    dispatch(updateLastResponse(response));
  };

  return { handleSubmit, setChat, handleSendChat, initChat };
}
