import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import ProductsPage from '@modules/store/components/ProductsPage'
import ServicesPage from '@modules/store/components/ServicesPage'
import InventoryPage from '@modules/store/components/InventoryPage'
import ClientsPage from '@modules/clients/components/ClientsPage'
import SalesPage from '@modules/sales/components/SalesPage'
import HistoryPage from '@modules/history/components/HistoryPage'

export default function App() {
  return (
    <Router>
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
    </Router>
  )
}
