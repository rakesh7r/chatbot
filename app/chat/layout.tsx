'use client';
import ChatControls from '@/components/custom/chatControls';

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      {children}
      <ChatControls />
    </>
  );
}
