import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import './styles/main.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('No root element found');
}

createRoot(rootElement).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
);
