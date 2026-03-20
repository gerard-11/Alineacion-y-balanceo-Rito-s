import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import ProductsPage from '@modules/store/components/ProductsPage'
import ServicesPage from '@modules/store/components/ServicesPage'
import InventoryPage from '@modules/store/components/InventoryPage'
import ClientsPage from '@modules/clients/components/ClientsPage'
import SalesPage from '@modules/sales/components/SalesPage'
import HistoryPage from '@modules/history/components/HistoryPage'
import LoginPage from '@modules/auth/components/LoginPage'
import LogoutPage from '@modules/auth/components/LogoutPage'
import { ProtectedRoute } from '@components/ProtectedRoute'
import { AuthProvider } from '@contexts/AuthContext'
import { ThemeProvider } from '@contexts/ThemeContext'

function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />

        {/* Protected routes */}
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Routes>
                  <Route path="/productos" element={<ProductsPage />} />
                  <Route path="/servicios" element={<ServicesPage />} />
                  <Route path="/inventario" element={<InventoryPage />} />
                  <Route path="/ventas" element={<SalesPage />} />
                  <Route path="/historial" element={<HistoryPage />} />
                  <Route path="/clientes" element={<ClientsPage />} />
                  <Route path="/" element={<Navigate to="/ventas" replace />} />
                </Routes>
              </MainLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </AuthProvider>
  )
}
