import { createRoot } from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './styles/main.css';
import '@mantine/core/styles.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('No root element found');
}

createRoot(rootElement).render(
  <BrowserRouter>
    <MantineProvider>
      <App />
    </MantineProvider>
  </BrowserRouter>,
);
