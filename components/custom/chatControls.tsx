import { useChat } from '@/lib/hooks/useChat';
import { PlaceholdersAndVanishInput } from '../ui/placeholders-and-vanish-input';

export default function ChatControls() {
  const { handleSubmit, setChat } = useChat();
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
