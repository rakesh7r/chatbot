'use client';
import { useChat } from '@/lib/hooks/useChat';
import { useAppSelector } from '@/store/hooks';

export const ChatSuggestions = () => {
  const { conversation } = useAppSelector((state) => state.chat);
  const { handleSendChat } = useChat();
  return (
    <div className="w-full overflow-x-auto flex flex-col mt-5">
      {conversation.chats[conversation.chats.length - 1]?.response?.data
        ?.suggestions.length ? (
        <h3 className="text-lg font-semibold mb-3">Suggestions: </h3>
      ) : null}
      <div className="flex flex-row  gap-4 w-full overflow-x-auto">
        {conversation.chats[
          conversation.chats.length - 1
        ]?.response?.data.suggestions.map((suggestion, idx) => (
          <div
            key={idx}
            className=" bg-gray-50 dark:bg-gray-900 p-4 rounded-2xl w-max cursor-pointer min-w-44"
            onClick={() => {
              handleSendChat(suggestion);
            }}
          >
            {suggestion}
          </div>
        ))}{' '}
      </div>
    </div>
  );
};
