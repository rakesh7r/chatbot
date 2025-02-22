'use client';
import { Button } from '@/components/ui/button';
import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeSwitch() {
  // @ts-undefined
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    if (localTheme === 'light') {
      setTheme('light');
      const body = document.querySelector('#body');
      if (body) {
        body.classList.remove('dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    const _theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(_theme);
    const body = document.querySelector('#body');
    if (body) {
      body.classList.toggle('dark');
      localStorage.setItem('theme', _theme);
    }
  };

  return (
    <Button variant="outline" onClick={toggleTheme}>
      {theme === 'dark' ? <Sun /> : <Moon />}
    </Button>
  );
}
