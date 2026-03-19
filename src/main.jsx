import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Initialize MSW in development mode
if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/worker')
  await worker.start({ onUnhandledRequest: 'warn' })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
