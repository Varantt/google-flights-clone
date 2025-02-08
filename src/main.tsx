import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './variables.scss'
import App from './App.tsx'
import { AppProvider } from '@/context/AppContext.ts'

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>
);
