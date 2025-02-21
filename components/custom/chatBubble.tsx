import { Chat } from '@/store/useChatStore';

export default function ChatBubble({ chat }: { chat: Chat }) {
  return (
    <div>
      <div>{chat.prompt}</div>
      <div>{chat.response}</div>
    </div>
  );
}
