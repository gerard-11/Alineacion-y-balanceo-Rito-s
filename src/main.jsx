import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Initialize MSW and then render the app
async function startApp() {
  // Only initialize MSW in development
  if (import.meta.env.DEV) {
    try {
      const { worker } = await import('./mocks/worker.js')
      console.log('[MSW] Starting worker...')
      await worker.start({ onUnhandledRequest: 'warn' })
      console.log('[MSW] Worker started successfully')
    } catch (error) {
      console.error('[MSW] Failed to start worker:', error)
    }
  }

  // Mount React app
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

startApp()
