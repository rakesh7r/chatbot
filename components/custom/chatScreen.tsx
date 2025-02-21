'use client';

import { axiosClient } from '@/app/_utils/axiosConfig';
import { useState } from 'react';

export default function ChatScreen() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState<object | null>(null);

  const sendHandler = async (prompt: string) => {
    const response = await axiosClient.post(`/chat/api`, { prompt });
    console.log(response.data);
    return response.data;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await sendHandler(prompt);
    setResponse(response);
    setPrompt('');
  };
  return (
    <div>
      <div>screen</div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <button type="submit">Send</button>
        <p>{JSON.stringify(response)}</p>
      </form>
    </div>
  );
}
