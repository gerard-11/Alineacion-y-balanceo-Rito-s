import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './components/Dashboard'

export default function App() {
    return (
        <div style={{ backgroundColor: '#0f0f0f', minHeight: '100vh' }}>
            <Router>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                </Routes>
            </Router>
        </div>
    )
}