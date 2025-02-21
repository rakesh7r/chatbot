'use client';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';

export default function ThemeSwitch() {
  const [theme, setTheme] = useState('dark');

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    const body = document.querySelector('#body');
    if (body) {
      body.classList.toggle('dark');
    }
  };

  return (
    <Button variant="outline" onClick={toggleTheme}>
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  );
}
