import { useEffect, useState } from 'react';
import { ThemeContext } from './src/contexts';
import { store } from './src/store';
import { Provider } from 'react-redux';

export default function Root() {
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
      </ThemeContext>
    </Provider>
  );
}
