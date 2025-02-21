import { ChatType } from '@/store/useChatStore';
import MarkdownPreview from './markdown';

export default function ChatBubble({ chat }: { chat: ChatType }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex flex-row justify-end items-center">
        <span className="max-w-[90%] border-2  p-2 rounded-2xl bg-gray-100 dark:bg-gray-800">
          {chat.prompt}
        </span>
      </div>
      <div className="flex flex-row justify-start items-center">
        {chat.response && (
          <span className="max-w-[90%] border-2  p-2 rounded-2xl bg-gray-100 dark:bg-gray-800">
            <MarkdownPreview content={chat.response.message} />
            {chat.response.data.items.map((item) => (
              <MarkdownPreview
                key={item.name}
                content={`### ${item.name}\n${item.description}`}
              />
            ))}
          </span>
        )}
      </div>
    </div>
  );
}
