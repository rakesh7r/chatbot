import ChatScreen from '@/components/custom/chatScreen';
import axios from 'axios';
type Props = {
  params: {
    chatId: string;
  };
};
export default function Page({ params }: Props) {
  const { chatId } = params;

  return (
    <div className="overflow-auto  h-[80vh]">
      <ChatScreen />
    </div>
  );
}
