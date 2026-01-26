import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './styles/main.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('No root element found');
}

createRoot(rootElement).render(<App />);
