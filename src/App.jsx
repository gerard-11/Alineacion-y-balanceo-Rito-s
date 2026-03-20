import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from '@contexts/ThemeContext'
import { AuthProvider } from '@contexts/AuthContext'
import { ProtectedRoute } from '@components/ProtectedRoute'
import MainLayout from './layouts/MainLayout'
import LoginPage from '@modules/auth/components/LoginPage'
import ProductsPage from '@modules/store/components/ProductsPage'
import ServicesPage from '@modules/store/components/ServicesPage'
import InventoryPage from '@modules/store/components/InventoryPage'
import ClientsPage from '@modules/clients/components/ClientsPage'
import SalesPage from '@modules/sales/components/SalesPage'
import HistoryPage from '@modules/history/components/HistoryPage'

function AppRoutes() {
  return (
    <Routes>
      {/* Ruta pública */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rutas protegidas */}
      <Route
        path="/productos"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ProductsPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/servicios"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ServicesPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/inventario"
        element={
          <ProtectedRoute>
            <MainLayout>
              <InventoryPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/ventas"
        element={
          <ProtectedRoute>
            <MainLayout>
              <SalesPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/historial"
        element={
          <ProtectedRoute>
            <MainLayout>
              <HistoryPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/clientes"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ClientsPage />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route path="/" element={<Navigate to="/ventas" replace />} />
      <Route path="*" element={<Navigate to="/ventas" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Router>
    </ThemeProvider>
  )
}
