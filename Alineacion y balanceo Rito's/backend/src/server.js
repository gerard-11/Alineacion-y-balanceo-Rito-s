import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import dotenv from 'dotenv'
import { errorHandler } from './middleware/errorHandler.js'
import { corsMiddleware } from './middleware/corsMiddleware.js'
import routes from './routes/index.js'

dotenv.config()

const app = express()
const PORT = process.env.BACKEND_PORT || 3001

// Middleware
app.use(helmet())
app.use(morgan('dev'))
app.use(corsMiddleware)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api', routes)

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta no encontrada'
  })
})

// Error handler (must be last)
app.use(errorHandler)

export function startServer() {
  app.listen(PORT, () => {
    console.log(`🚀 Backend BFF running on http://localhost:${PORT}`)
    console.log(`📡 API will proxy requests to: ${process.env.EXTERNAL_API_URL}`)
  })
}
