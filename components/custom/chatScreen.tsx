'use client';
import { Chat, useChatStore } from '@/store/useChatStore';
import ChatBubble from './chatBubble';

export default function ChatScreen() {
  const { conversation } = useChatStore();
  return (
    <div>
      {conversation.map((chat: Chat) =>
        chat.response === 'Thinking...' ? (
          <div key={chat.id} className="text-gray-500">
            {chat.prompt}
            <span className="animate-pulse">...</span>
          </div>
        ) : (
          <ChatBubble key={chat.id} chat={chat} />
        ),
      )}
    </div>
  );
}
