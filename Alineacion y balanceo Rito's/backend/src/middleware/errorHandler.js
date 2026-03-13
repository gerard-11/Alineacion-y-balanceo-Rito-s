export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Error interno del servidor'

  // Log detailed error server-side
  console.error('[ERROR]', {
    timestamp: new Date().toISOString(),
    statusCode,
    message,
    path: req.path,
    method: req.method,
    stack: err.stack
  })

  // Return generic error to client (never expose API key or internal details)
  res.status(statusCode).json({
    success: false,
    message: message,
    ...(process.env.NODE_ENV === 'development' && { error: err.message })
  })
}
