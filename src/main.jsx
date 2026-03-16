import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Inicializar MSW en desarrollo si no estamos en modo local
if (import.meta.env.DEV && import.meta.env.VITE_LOCAL !== 'true') {
  const { worker } = await import('./mocks/worker')
  await worker.start({
    onUnhandledRequest: 'bypass',
  })
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
