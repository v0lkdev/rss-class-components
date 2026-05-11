import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary
      fallback={
        <div className="test-error">
          Oops😢 Something went wrong. Please, reload the page
        </div>
      }
    >
      <App />
    </ErrorBoundary>
  </StrictMode>
);
