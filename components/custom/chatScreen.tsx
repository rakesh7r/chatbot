'use client';
import { ChatType, useChatStore } from '@/store/useChatStore';
import ChatBubble from './chatBubble';
import { ChatSuggestions } from './chatSuggestions';
import { useEffect } from 'react';
import { useChat } from '@/lib/hooks/useChat';

export default function ChatScreen() {
  const { conversation } = useChatStore();
  const { initChat } = useChat();

  useEffect(() => {
    initChat(
      `I'm initializing the chat, respond to user with, "Hello, how can I help you today?" and answer with some suggestions in the respose schema with the trending topics. `,
    );
  }, []);

  return (
    <div className=" w-full md:w-3/5 p-8 mx-auto shadow-sm min-h-screen overflow-y-auto flex flex-col gap-4">
      {conversation.chats.map((chat: ChatType) => (
        <ChatBubble key={chat.id} chat={chat} />
      ))}
      <ChatSuggestions />
    </div>
  );
}
