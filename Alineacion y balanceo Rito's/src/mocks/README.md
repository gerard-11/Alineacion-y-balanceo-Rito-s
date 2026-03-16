# MSW - Mock Service Worker

Sistema de mocking de APIs con MSW para simular peticiones HTTP reales sin necesidad de un backend.

## Archivos

- **handlers.js**: Define todos los handlers HTTP para las APIs
- **worker.js**: Worker MSW para el navegador (desarrollo)
- **server.js**: Servidor MSW para pruebas de Node.js

## Cómo funciona

### En desarrollo

1. El `main.jsx` inicia automáticamente MSW si está en modo DEV y `VITE_LOCAL !== 'true'`
2. MSW intercepta todas las peticiones HTTP a `/api/*`
3. Los handlers devuelven los datos de los mocks como si fueran respuestas de servidor real

### Peticiones interceptadas

#### Ventas (`/api/sales`)
- `GET /api/sales` - Listar todas las ventas
- `GET /api/sales/:id` - Obtener venta por ID
- `POST /api/sales` - Crear nueva venta
- `PUT /api/sales/:id` - Actualizar venta
- `DELETE /api/sales/:id` - Eliminar venta

#### Productos (`/api/store/products`)
- `GET /api/store/products` - Listar productos
- `GET /api/store/products/:id` - Obtener producto
- `POST /api/store/products` - Crear producto
- `PUT /api/store/products/:id` - Actualizar producto
- `DELETE /api/store/products/:id` - Eliminar producto

#### Servicios (`/api/store/services`)
- `GET /api/store/services` - Listar servicios
- `GET /api/store/services/:id` - Obtener servicio
- `POST /api/store/services` - Crear servicio
- `PUT /api/store/services/:id` - Actualizar servicio
- `DELETE /api/store/services/:id` - Eliminar servicio

#### Clientes (`/api/clients`)
- `GET /api/clients` - Listar clientes
- `GET /api/clients/:id` - Obtener cliente
- `POST /api/clients` - Crear cliente
- `PUT /api/clients/:id` - Actualizar cliente
- `DELETE /api/clients/:id` - Eliminar cliente

#### Inventario (`/api/inventory`)
- `GET /api/inventory` - Listar inventario
- `GET /api/inventory/:id` - Obtener item
- `POST /api/inventory` - Crear item
- `PUT /api/inventory/:id` - Actualizar item
- `DELETE /api/inventory/:id` - Eliminar item

#### Historial (`/api/history/*`)
- `GET /api/history/sales` - Historial de ventas
- `GET /api/history/services` - Historial de servicios

## Variables de entorno

### VITE_LOCAL=true
- **Comportamiento**: Usa los mocks directamente en los servicios (sin HTTP)
- **Uso**: Desarrollo sin MSW
- **Ventaja**: Más rápido, sin latencia de red

### VITE_LOCAL=false (o vacío)
- **Comportamiento**: Hace peticiones HTTP reales
- **Con MSW en DEV**: Usa los handlers de MSW
- **Sin MSW (Producción)**: Peticiones a servidor backend real

## Estados persistentes

Los handlers mantienen estado en memoria durante la sesión:
- Crear un item agrega a la lista en memoria
- Actualizar modifica el item
- Eliminar lo quita de la lista

Al recargar la página, se reinician con los datos de los mocks originales.

## Agregar nuevo handler

Para agregar un nuevo endpoint, edita `handlers.js`:

```javascript
export const miHandlerPersonalizado = [
  http.get('/api/mi-endpoint', () => {
    return HttpResponse.json(misDatos, { status: 200 })
  }),
]

// Luego agrégalo a la lista de handlers al final
export const handlers = [
  ...miHandlerPersonalizado,
  // ... otros handlers
]
```

## Desactivar MSW

Si necesitas usar una API real en desarrollo, cambia `VITE_LOCAL` a `false` en `.env.local` y asegúrate de que tu servidor backend esté ejecutándose.

## Recursos

- [MSW Documentation](https://mswjs.io/)
- [HTTP API Reference](https://mswjs.io/docs/api/http)
