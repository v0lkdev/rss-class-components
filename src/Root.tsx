import { RouterProvider } from 'react-router-dom';
import { router } from './router.tsx';
import { useEffect, useState } from 'react';
import { ThemeContext } from './contexts.tsx';
import { store } from './store.ts';
import { Provider } from 'react-redux';

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
    <Provider store={store}>
      <ThemeContext value={{ theme, handleThemeChange }}>
        <RouterProvider router={router} />
      </ThemeContext>
    </Provider>
  );
}
