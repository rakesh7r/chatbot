import { useChat } from '@/lib/hooks/useChat';
import { Button } from '../ui/button';
import { PlaceholdersAndVanishInput } from '../ui/placeholders-and-vanish-input';
type ChatControlsProps = {
  ref: React.Ref<HTMLTextAreaElement>;
};

export default function ChatControls({ ref }: ChatControlsProps) {
  const { handleSubmit, chat, setChat } = useChat();
  return (
    <div className="fixed bottom-0 w-full p-4 ">
      <PlaceholdersAndVanishInput
        placeholders={[
          'Ask me anything!',
          "What's on your mind?",
          'How can I help you?',
          'What can I do for you?',
        ]}
        onChange={(e) => {
          setChat((prevState) => ({
            ...prevState,
            prompt: e.target.value,
          }));
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
