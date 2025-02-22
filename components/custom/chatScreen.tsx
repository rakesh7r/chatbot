'use client';
import { ChatType, useChatStore } from '@/store/useChatStore';
import ChatBubble from './chatBubble';
import { ChatSuggestions } from './chatSuggestions';

export default function ChatScreen() {
  const { conversation } = useChatStore();
  return (
    <div className="w-full md:w-3/5 p-8 mx-auto shadow-sm min-h-screen overflow-y-auto flex flex-col gap-4">
      {conversation.chats.map((chat: ChatType) => (
        <ChatBubble key={chat.id} chat={chat} />
      ))}
      <ChatSuggestions />
    </div>
  );
}
