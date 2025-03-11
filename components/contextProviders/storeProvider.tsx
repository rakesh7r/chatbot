'use client';
import { store } from '@/store';
import { Provider } from 'react-redux';

type StoreProviderType = {
  children: React.ReactNode;
};

export default function StoreProvider({ children }: StoreProviderType) {
  return <Provider store={store}>{children}</Provider>;
}
