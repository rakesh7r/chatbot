'use client';
import { useChat } from '@/lib/hooks/useChat';
import { useChatStore } from '@/store/useChatStore';

export const ChatSuggestions = () => {
  const { conversation } = useChatStore();
  const { handleSendChat } = useChat();
  return (
    <div className="w-full overflow-x-auto flex flex-row gap-4">
      {conversation.chats[
        conversation.chats.length - 1
      ]?.response?.data.suggestions.map((suggestion, idx) => (
        <div
          key={idx}
          className="border-2 border-gray-200 p-4 rounded-2xl w-max cursor-pointer"
          onClick={() => {
            handleSendChat(suggestion);
          }}
        >
          {suggestion}
        </div>
      ))}{' '}
    </div>
  );
};
