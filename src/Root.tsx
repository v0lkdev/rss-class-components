import { RouterProvider } from 'react-router-dom';
import { router } from './router.tsx';
import { useEffect, useState } from 'react';
import { ThemeContext } from './contexts.tsx';

export function Root() {
  const [theme, setTheme] = useState('light');

  function handleThemeChange() {
    setTheme((prev) => (prev == 'light' ? 'dark' : 'light'));
  }

  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, [theme]);

  return (
    <ThemeContext value={{ theme, handleThemeChange }}>
      <RouterProvider router={router} />
    </ThemeContext>
  );
}
