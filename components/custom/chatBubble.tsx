import { ChatType } from '@/store/chatSlice';
import MarkdownPreview from './markdown';
import { motion } from 'framer-motion';

export default function ChatBubble({ chat }: { chat: ChatType }) {
  return (
    <div className="flex flex-col gap-4">
      {chat.prompt && (
        <div className="w-full flex flex-row justify-end items-center">
          <span className="max-w-[90%] border-2  p-3 rounded-2xl bg-gray-100 dark:bg-gray-800">
            {chat.prompt}
          </span>
        </div>
      )}
      {chat.response ? (
        <div className="flex flex-row justify-start items-center">
          <span className="max-w-[90%] border-2 p-3 rounded-2xl bg-gray-100 dark:bg-gray-800 leading-7 text-justify">
            <MarkdownPreview content={chat.response.message} />
            {chat.response.data.items.map((item) => (
              <div key={item.name} className="my-4">
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <MarkdownPreview
                  key={item.name}
                  content={`### ${item.name}\n${item.description}`}
                />
              </div>
            ))}
          </span>
        </div>
      ) : (
        <motion.span
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 1, scale: 1.1 }}
          transition={{
            duration: 0.8, // Time for each cycle
            repeat: Infinity, // Loop forever
            repeatType: 'reverse', // Reverse back to the initial state
            ease: 'easeInOut', // Smooth transition
          }}
          className="w-min border-2  p-3 rounded-2xl bg-gray-100 dark:bg-gray-800"
        >
          Thinking...
        </motion.span>
      )}
    </div>
  );
}
