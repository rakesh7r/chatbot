'use client';
import { ConversationType, ResponseType } from '@/store/chatSlice';
import { axiosClient } from '@/utils/axiosConfig';

export const sendChat = async (
  prompt: string,
  history: ConversationType,
): Promise<ResponseType> => {
  const response = await axiosClient.post(`/chat/api`, {
    prompt: prompt,
    history: history.chats,
  });
  return response.data as ResponseType;
};
