import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
  prompt: string;
  response: ResponseType;
  timestamp: string;
};

export type ConversationType = {
  id: string;
  chats: ChatType[];
};

const initialState: {
  conversation: ConversationType;
  history: ConversationType[];
} = {
  conversation: {
    chats: [
      {
        prompt: '',
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
};

export const chatSlice = createSlice({
  name: 'chat',
  initialState: initialState,
  reducers: {
    addChat: (state, action: PayloadAction<ChatType>) => {
      state.conversation.chats.push(action.payload);
    },
    addConversation: (state, action: PayloadAction<ConversationType>) => {
      state.history.push(action.payload);
    },
    setHistory: (state, action: PayloadAction<ConversationType[]>) => {
      state.history = action.payload;
    },
    updateLastResponse: (state, action: PayloadAction<ResponseSchema>) => {
      state.conversation.chats[state.conversation.chats.length - 1].response =
        action.payload;
    },
  },
});

export const { addChat, addConversation, setHistory, updateLastResponse } =
  chatSlice.actions;

export default chatSlice.reducer;
