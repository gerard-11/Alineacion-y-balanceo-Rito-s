import { Link, useLocation } from 'react-router-dom'

export default function MainLayout({ children }) {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0f0f0f' }}>
      {/* Header - Industrial Style */}
      <header style={{ backgroundColor: '#1a1a1a', borderBottom: '3px solid #ff6b35' }} className="shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-5xl font-bold text-white tracking-wider">ALINEACIÓN Y BALANCEO RITO'S</h1>
          <p className="text-gray-400 mt-3 text-sm font-mono tracking-widest">◆ DASHBOARD DE GESTIÓN</p>
        </div>
      </header>

      {/* Navigation - Industrial Style */}
      <nav style={{ backgroundColor: '#1a1a1a', borderBottom: '2px solid #444444' }} className="sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-0">
            <Link
              to="/ventas"
              className={`px-6 py-4 font-bold transition-all border-b-3 text-sm tracking-wider no-underline ${
                isActive('/ventas')
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
              style={{
                borderBottomColor: isActive('/ventas') ? '#ff6b35' : 'transparent',
                backgroundColor: isActive('/ventas') ? '#2a2a2a' : 'transparent'
              }}
            >
              ▸ VENTAS
            </Link>
            <Link
              to="/alineacion"
              className={`px-6 py-4 font-bold transition-all border-b-3 text-sm tracking-wider no-underline ${
                isActive('/alineacion')
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
              style={{
                borderBottomColor: isActive('/alineacion') ? '#ff6b35' : 'transparent',
                backgroundColor: isActive('/alineacion') ? '#2a2a2a' : 'transparent'
              }}
            >
              ▸ ALINEACIÓN
            </Link>
            <Link
              to="/balanceo"
              className={`px-6 py-4 font-bold transition-all border-b-3 text-sm tracking-wider no-underline ${
                isActive('/balanceo')
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
              style={{
                borderBottomColor: isActive('/balanceo') ? '#ff6b35' : 'transparent',
                backgroundColor: isActive('/balanceo') ? '#2a2a2a' : 'transparent'
              }}
            >
              ▸ BALANCEO
            </Link>
            <Link
              to="/llantas"
              className={`px-6 py-4 font-bold transition-all border-b-3 text-sm tracking-wider no-underline ${
                isActive('/llantas')
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
              style={{
                borderBottomColor: isActive('/llantas') ? '#ff6b35' : 'transparent',
                backgroundColor: isActive('/llantas') ? '#2a2a2a' : 'transparent'
              }}
            >
              ▸ LLANTAS
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {children}
      </main>
    </div>
  )
}
