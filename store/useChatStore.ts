import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type ResponseSchema = {
  status: string;
  message: string;
  data: {
    items: {
      name: string;
      description: string;
    }[];
    suggestions: string[];
    citations: string[];
  };
};

export type ResponseType = ResponseSchema | null;

export type ChatType = {
  id: string;
  prompt: string | null;
  response: ResponseType;
  timestamp: string;
};

export type ConversationType = {
  id: string;
  chats: ChatType[];
};

type ChatStoreType = {
  conversation: ConversationType;
  history: ConversationType[];
  addChat: (chat: ChatType) => void;
  addConversation: (conversation: ConversationType) => void;
  setHistory: (history: ConversationType[]) => void;
  updateLastResponse: (response: ResponseType) => void;
};

export const useChatStore = create<ChatStoreType>()(
  immer<ChatStoreType>((set) => ({
    conversation: {
      chats: [
        {
          prompt: null,
          response: {
            status: 'success',
            message: 'Hello, how can I help you today?',
            data: {
              items: [],
              suggestions: [],
              citations: [],
            },
          },
          timestamp: new Date().toISOString(),
          id: new Date().toISOString(),
        },
      ],
      id: new Date().toISOString(),
    },
    history: [],
    addChat: (chat: ChatType) => {
      set((state) => {
        state.conversation.chats.push(chat);
      });
    },
    updateLastResponse: (response: ResponseType) => {
      set((state) => {
        state.conversation.chats[state.conversation.chats.length - 1].response =
          response;
      });
    },
    addConversation: (conversation: ConversationType) => {
      set((state) => {
        state.history.push(conversation);
      });
    },
    setHistory: (history: ConversationType[]) => {
      set((state) => {
        state.history = history;
      });
    },
  })),
);
