# Backend for Frontend (BFF) - Alineación y Balanceo Rito's

Este es el servidor Express que actúa como intermediario entre el frontend React y la API externa, manteniendo las claves API seguras en el servidor.

## 🚀 Inicio Rápido

### Instalación

```bash
cd backend
npm install
```

### Configuración

Crear archivo `.env` en la carpeta `backend/`:

```env
EXTERNAL_API_URL=https://api.example.com
EXTERNAL_API_KEY=tu-clave-api-secreta
BACKEND_PORT=3001
NODE_ENV=development
```

### Ejecutar el servidor

```bash
# Desarrollo sin reload automático
npm run dev

# Desarrollo con reload automático (requiere nodemon)
npm run dev:watch

# O desde la raíz del proyecto
npm run dev:backend
npm run dev:backend:watch
```

El servidor estará disponible en: `http://localhost:3001`

## 🏗️ Estructura del Proyecto

```
backend/
├── src/
│   ├── middleware/           # Middlewares Express
│   │   ├── corsMiddleware.js # Configuración CORS
│   │   └── errorHandler.js   # Manejo global de errores
│   ├── routes/               # Definición de rutas
│   │   ├── index.js
│   │   ├── ventas.js
│   │   ├── alineacion.js
│   │   ├── balanceo.js
│   │   └── llantas.js
│   ├── controllers/          # Lógica de controladores
│   │   ├── ventasController.js
│   │   ├── alineacionController.js
│   │   ├── balanceoController.js
│   │   └── llantasController.js
│   ├── services/             # Lógica de negocio
│   │   ├── apiClient.js      # Cliente HTTP (MANTIENE LAS CLAVES API)
│   │   ├── ventasService.js
│   │   ├── alineacionService.js
│   │   ├── balanceoService.js
│   │   └── llantasService.js
│   └── server.js             # Configuración del servidor Express
├── index.js                  # Punto de entrada
├── .env.example              # Template de variables de entorno
├── .env                      # Variables de entorno (git ignored)
└── package.json
```

## 📡 Endpoints Disponibles

### Ventas
- `GET /api/ventas` - Obtener todas las ventas
- `GET /api/ventas/:id` - Obtener una venta por ID
- `POST /api/ventas` - Crear una nueva venta
- `PUT /api/ventas/:id` - Actualizar una venta
- `DELETE /api/ventas/:id` - Eliminar una venta

### Alineación
- `GET /api/alineacion` - Obtener servicios de alineación
- `GET /api/alineacion/:id` - Obtener un servicio por ID
- `POST /api/alineacion` - Crear un servicio
- `PUT /api/alineacion/:id` - Actualizar un servicio
- `DELETE /api/alineacion/:id` - Eliminar un servicio

### Balanceo
- `GET /api/balanceo` - Obtener servicios de balanceo
- `GET /api/balanceo/:id` - Obtener un servicio por ID
- `POST /api/balanceo` - Crear un servicio
- `PUT /api/balanceo/:id` - Actualizar un servicio
- `DELETE /api/balanceo/:id` - Eliminar un servicio

### Llantas
- `GET /api/llantas` - Obtener llantas disponibles
- `GET /api/llantas/:id` - Obtener una llanta por ID
- `POST /api/llantas` - Crear una nueva llanta
- `PUT /api/llantas/:id` - Actualizar una llanta
- `DELETE /api/llantas/:id` - Eliminar una llanta

### Health Check
- `GET /health` - Verificar que el servidor está activo

## 🔐 Seguridad

### ¿Por qué un BFF?

La arquitetura BFF (Backend for Frontend) **protege tus claves API** de dos formas importantes:

1. **Claves Nunca Expuestas al Frontend:**
   - La clave API está guardada en `backend/.env`
   - Solo el servidor Express la conoce
   - El frontend **nunca** recibe la clave

2. **Transformación de Datos:**
   - El backend puede transformar/formatear datos de la API externa
   - Puedes filtrar información sensible antes de enviarla al frontend
   - Agregar datos o cambiar estructura sin modificar el frontend

### Cómo Funciona

```
Frontend (http://localhost:5173)
    ↓ (sin API key)
    Petición a /api/ventas
    ↓
Vite Proxy (redirige a :3001)
    ↓
Backend Express (http://localhost:3001)
    ↓ (CON API key en headers)
    Petición a API Externa
    ↓
API Externa (Supabase, etc)
    ↓
Respuesta transformada
    ↓
Frontend recibe datos limpios
```

### Variables de Entorno

**Nunca** commities el archivo `.env` con claves reales. Usa `.env.example` como template.

```bash
# Para desarrollo local
cp .env.example .env
# Luego edita .env con tus valores reales
```

## 🔌 Integración con API Externa

### Actualizar el cliente API

En `backend/src/services/apiClient.js`:

```javascript
const apiClient = axios.create({
  baseURL: process.env.EXTERNAL_API_URL,
  headers: {
    'Authorization': `Bearer ${process.env.EXTERNAL_API_KEY}`
    // O el header que requiera tu API
  }
})
```

### Transformar Respuestas

En `backend/src/services/ventasService.js`:

```javascript
async getAllVentas() {
  const response = await apiClient.get('/ventas')
  // Transforma la respuesta de la API externa
  return response.data.map(item => ({
    id: item.id,
    cliente: item.customer_name,  // Renombra campos
    monto: parseFloat(item.amount),  // Convierte tipos
    estado: item.status.toLowerCase()  // Estandariza datos
  }))
}
```

## 🧪 Testing

Para probar los endpoints, puedes usar:

```bash
# Con curl
curl http://localhost:3001/api/ventas

# Con Postman/Insomnia
GET http://localhost:3001/api/ventas
```

## 📊 Logs

El servidor usa `morgan` para logging de peticiones HTTP:

```
[API REQUEST] GET https://api.example.com/ventas
[API RESPONSE] 200 /ventas
```

Revisa la consola para ver todos los logs.

## ⚠️ Manejo de Errores

- Errores de validación: `400 Bad Request`
- Errores de autenticación: `401 Unauthorized`
- Errores no encontrados: `404 Not Found`
- Errores del servidor: `500 Internal Server Error`

Todas las respuestas incluyen:

```json
{
  "success": false,
  "message": "Mensaje descriptivo del error"
}
```

## 🚢 Deployment

### Variables de Entorno en Producción

En tu plataforma de hosting (Heroku, Railway, Vercel, etc), configura:

```
EXTERNAL_API_URL=https://api.production.com
EXTERNAL_API_KEY=tu-clave-produccion
BACKEND_PORT=3001
NODE_ENV=production
FRONTEND_URL=https://www.tudominio.com
```

### CORS en Producción

Actualiza `backend/src/middleware/corsMiddleware.js` para restringir a tu dominio:

```javascript
origin: process.env.FRONTEND_URL || 'https://tudominio.com'
```

## 📚 Recursos

- [Express.js Documentation](https://expressjs.com/)
- [Axios HTTP Client](https://axios-http.com/)
- [CORS Documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)
- [REST API Best Practices](https://restfulapi.net/)

## ❓ FAQ

**P: ¿Por qué no llamo directamente a la API externa desde el frontend?**
R: Expondrías tu clave API al mundo. Cualquiera podría robarla del navegador.

**P: ¿Puede el usuario ver mi clave API?**
R: No. El backend la guarda en `.env` y nunca se envía al navegador.

**P: ¿Qué sucede si la API externa se cae?**
R: El servidor devuelve error 500 sin exponer detalles internos.

**P: ¿Puedo agregar autenticación para usuarios?**
R: Sí, el BFF es el lugar perfecto para agregar JWT, sesiones, etc.
