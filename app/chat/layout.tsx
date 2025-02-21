'use client';
import ChatControls from '@/components/custom/chatControls';
import { useEffect, useRef, useState } from 'react';

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const handleAutoFocus = () => {
      inputRef.current?.focus();
    };
    window.addEventListener('keydown', handleAutoFocus);
    return () => {
      window.removeEventListener('keydown', handleAutoFocus);
    };
  }, []);
  return (
    <>
      {children}
      <ChatControls ref={inputRef} />
    </>
  );
}
