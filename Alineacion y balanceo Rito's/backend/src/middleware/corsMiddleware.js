import cors from 'cors'

const isDevelopment = process.env.NODE_ENV === 'development'

export const corsMiddleware = cors({
  origin: isDevelopment
    ? 'http://localhost:5173'
    : process.env.FRONTEND_URL || 'https://yourdomain.com',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
})
