import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import VentasPage from './pages/VentasPage'
import AlineacionPage from './pages/AlineacionPage'
import BalanceoPage from './pages/BalanceoPage'
import LlantasPage from './pages/LlantasPage'

export default function App() {
    return (
        <Router>
            <MainLayout>
                <Routes>
                    <Route path="/ventas" element={<VentasPage />} />
                    <Route path="/alineacion" element={<AlineacionPage />} />
                    <Route path="/balanceo" element={<BalanceoPage />} />
                    <Route path="/llantas" element={<LlantasPage />} />
                    <Route path="/" element={<Navigate to="/ventas" replace />} />
                </Routes>
            </MainLayout>
        </Router>
    )
}