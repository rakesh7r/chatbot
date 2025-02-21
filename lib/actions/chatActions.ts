'use server';
import { ConversationType, ResponseType } from '@/store/useChatStore';
import { axiosClient } from '@/utils/axiosConfig';

export const sendChat = async (prompt: string): Promise<ResponseType> => {
  const response = await axiosClient.post(`/chat/api`, { prompt });
  return response.data as ResponseType;
};
