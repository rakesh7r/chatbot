import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type Chat = {
  id: string;
  prompt: string;
  response: string;
  timestamp: string;
};

type Conversation = {
  id: string;
  chats: Chat[];
};

type ChatStoreType = {
  conversation: Chat[];
  history: Conversation[];
  addChat: (chat: Chat) => void;
  addConversation: (conversation: Conversation) => void;
  setHistory: (history: Conversation[]) => void;
  updateLastResponse: (response: string) => void;
};

export const useChatStore = create<ChatStoreType>()(
  immer<ChatStoreType>((set) => ({
    conversation: [],
    history: [],
    addChat: (chat: Chat) => {
      set((state) => {
        state.conversation.push(chat);
      });
    },
    updateLastResponse: (response: string) => {
      set((state) => {
        state.conversation[state.conversation.length - 1].response = response;
      });
    },
    addConversation: (conversation: Conversation) => {
      set((state) => {
        state.history.push(conversation);
      });
    },
    setHistory: (history: Conversation[]) => {
      set((state) => {
        state.history = history;
      });
    },
  })),
);
