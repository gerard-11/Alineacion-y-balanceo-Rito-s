import { useState } from 'react'
import { useVentas } from '../hooks/useVentas'
import { useAlineacion } from '../hooks/useAlineacion'
import { useBalanceo } from '../hooks/useBalanceo'
import { useLlantas } from '../hooks/useLlantas'

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('ventas')
  const { ventas, loading: ventasLoading, error: ventasError } = useVentas()
  const { servicios: alineacionServicios, loading: alineacionLoading, error: alineacionError } = useAlineacion()
  const { servicios: balanceoServicios, loading: balanceoLoading, error: balanceoError } = useBalanceo()
  const { llantas, loading: llantasLoading, error: llantasError } = useLlantas()

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0f0f0f' }}>
      {/* Header - Industrial Style */}
      <header style={{ backgroundColor: '#1a1a1a', borderBottom: '3px solid #ff6b35' }} className="shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-5xl font-bold text-white tracking-wider">ALINEACIÓN Y BALANCEO RITO'S</h1>
          <p className="text-gray-400 mt-3 text-sm font-mono tracking-widest">◆ DASHBOARD DE GESTIÓN</p>
        </div>
      </header>

      {/* Navigation Tabs - Industrial Style */}
      <nav style={{ backgroundColor: '#1a1a1a', borderBottom: '2px solid #444444' }} className="sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-0">
            <button
              onClick={() => setActiveTab('ventas')}
              className={`px-6 py-4 font-bold transition-all border-b-3 text-sm tracking-wider ${
                activeTab === 'ventas'
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
              style={{
                borderBottomColor: activeTab === 'ventas' ? '#ff6b35' : 'transparent',
                backgroundColor: activeTab === 'ventas' ? '#2a2a2a' : 'transparent'
              }}
            >
              ▸ VENTAS
            </button>
            <button
              onClick={() => setActiveTab('alineacion')}
              className={`px-6 py-4 font-bold transition-all border-b-3 text-sm tracking-wider ${
                activeTab === 'alineacion'
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
              style={{
                borderBottomColor: activeTab === 'alineacion' ? '#ff6b35' : 'transparent',
                backgroundColor: activeTab === 'alineacion' ? '#2a2a2a' : 'transparent'
              }}
            >
              ▸ ALINEACIÓN
            </button>
            <button
              onClick={() => setActiveTab('balanceo')}
              className={`px-6 py-4 font-bold transition-all border-b-3 text-sm tracking-wider ${
                activeTab === 'balanceo'
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
              style={{
                borderBottomColor: activeTab === 'balanceo' ? '#ff6b35' : 'transparent',
                backgroundColor: activeTab === 'balanceo' ? '#2a2a2a' : 'transparent'
              }}
            >
              ▸ BALANCEO
            </button>
            <button
              onClick={() => setActiveTab('llantas')}
              className={`px-6 py-4 font-bold transition-all border-b-3 text-sm tracking-wider ${
                activeTab === 'llantas'
                  ? 'text-white'
                  : 'text-gray-500 hover:text-gray-300'
              }`}
              style={{
                borderBottomColor: activeTab === 'llantas' ? '#ff6b35' : 'transparent',
                backgroundColor: activeTab === 'llantas' ? '#2a2a2a' : 'transparent'
              }}
            >
              ▸ LLANTAS
            </button>
          </div>
        </div>
      </nav>

      {/* Content Area */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Ventas Tab */}
        {activeTab === 'ventas' && (
          <div className="space-y-8">
            {ventasError && (
              <div style={{ backgroundColor: '#2a1a1a', borderLeft: '5px solid #ff6b35' }} className="p-4">
                <p className="text-red-400 font-mono">⚠ ERROR: {ventasError}</p>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sales Card - Industrial */}
              <div style={{ backgroundColor: '#2a2a2a', borderLeft: '5px solid #ff6b35' }} className="shadow-2xl p-8">
                <h3 className="text-xs font-bold text-gray-400 tracking-widest">VENTAS TOTALES</h3>
                <p className="text-5xl font-bold mt-4 text-white font-mono">${ventas.length > 0 ? ventas.reduce((sum, v) => sum + parseFloat(v.monto || 0), 0).toFixed(2) : '0.00'}</p>
                <p className="text-gray-500 mt-4 text-xs tracking-wider">◆ ESTE MES</p>
              </div>

              {/* Orders Card - Industrial */}
              <div style={{ backgroundColor: '#2a2a2a', borderLeft: '5px solid #ff8c42' }} className="shadow-2xl p-8">
                <h3 className="text-xs font-bold text-gray-400 tracking-widest">ÓRDENES</h3>
                <p className="text-5xl font-bold mt-4 text-white font-mono">{ventas.length}</p>
                <p className="text-gray-500 mt-4 text-xs tracking-wider">◆ REGISTRADAS</p>
              </div>

              {/* Customers Card - Industrial */}
              <div style={{ backgroundColor: '#2a2a2a', borderLeft: '5px solid #ff6b35' }} className="shadow-2xl p-8">
                <h3 className="text-xs font-bold text-gray-400 tracking-widest">CLIENTES</h3>
                <p className="text-5xl font-bold mt-4 text-white font-mono">{new Set(ventas.map(v => v.cliente)).size}</p>
                <p className="text-gray-500 mt-4 text-xs tracking-wider">◆ ÚNICOS</p>
              </div>
            </div>

            {/* Recent Sales Table - Industrial */}
            <div style={{ backgroundColor: '#2a2a2a', borderTop: '3px solid #ff6b35' }} className="shadow-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-8 tracking-wider">▸ VENTAS RECIENTES</h2>
              {ventasLoading && (
                <div className="text-center py-8">
                  <p className="text-gray-400 font-mono">⟳ Cargando ventas...</p>
                </div>
              )}
              {!ventasLoading && (
                <div className="overflow-x-auto">
                  <table className="w-full text-gray-300 font-mono">
                    <thead style={{ borderBottom: '2px solid #ff6b35' }}>
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 tracking-wider">ID</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 tracking-wider">CLIENTE</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 tracking-wider">SERVICIO</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 tracking-wider">MONTO</th>
                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-300 tracking-wider">ESTADO</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ventas.length > 0 ? (
                        ventas.map((venta) => (
                          <tr key={venta.id} style={{ borderBottom: '1px solid #444444' }} className="hover:bg-gray-800/50 transition-colors">
                            <td className="px-6 py-4 text-sm text-gray-400">{venta.id || '-'}</td>
                            <td className="px-6 py-4 text-sm text-white">{venta.cliente}</td>
                            <td className="px-6 py-4 text-sm text-gray-300">{venta.servicio}</td>
                            <td className="px-6 py-4 text-sm text-white font-bold">{venta.monto}</td>
                            <td className="px-6 py-4 text-sm">
                              <span className={`px-3 py-1 text-xs font-bold tracking-wider ${
                                venta.estado === 'completada' ? 'text-green-400' :
                                venta.estado === 'pendiente' ? 'text-yellow-400' :
                                'text-gray-400'
                              }`} style={{
                                backgroundColor: venta.estado === 'completada' ? '#1a3a1a' :
                                  venta.estado === 'pendiente' ? '#3a3a1a' : '#2a2a2a'
                              }}>
                                {venta.estado.toUpperCase()}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr style={{ borderBottom: '1px solid #444444' }}>
                          <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-500 font-mono">
                            ◇ Sin ventas registradas
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Alineación Tab */}
        {activeTab === 'alineacion' && (
          <div style={{ backgroundColor: '#2a2a2a', borderTop: '3px solid #ff6b35' }} className="shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-8 tracking-wider">▸ SERVICIOS DE ALINEACIÓN</h2>
            {alineacionError && (
              <div style={{ backgroundColor: '#2a1a1a', borderLeft: '5px solid #ff6b35' }} className="p-4 mb-6">
                <p className="text-red-400 font-mono">⚠ ERROR: {alineacionError}</p>
              </div>
            )}
            {alineacionLoading ? (
              <div className="text-center py-8">
                <p className="text-gray-400 font-mono">⟳ Cargando servicios...</p>
              </div>
            ) : alineacionServicios.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {alineacionServicios.map((servicio) => (
                  <div key={servicio.id} style={{ backgroundColor: '#1a1a1a', borderLeft: '5px solid #ff8c42' }} className="shadow-lg p-6">
                    <h3 className="text-lg font-bold text-white tracking-wider">{servicio.nombre || 'Servicio'}</h3>
                    <p className="text-gray-400 mt-3 font-mono text-sm">{servicio.descripcion || 'Sin descripción'}</p>
                    <p className="text-gray-500 mt-4 text-xs">Precio: ${servicio.precio_base || 'N/A'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8 font-mono">◇ Sin servicios disponibles</p>
            )}
          </div>
        )}

        {/* Balanceo Tab */}
        {activeTab === 'balanceo' && (
          <div style={{ backgroundColor: '#2a2a2a', borderTop: '3px solid #ff6b35' }} className="shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-8 tracking-wider">▸ SERVICIOS DE BALANCEO</h2>
            {balanceoError && (
              <div style={{ backgroundColor: '#2a1a1a', borderLeft: '5px solid #ff6b35' }} className="p-4 mb-6">
                <p className="text-red-400 font-mono">⚠ ERROR: {balanceoError}</p>
              </div>
            )}
            {balanceoLoading ? (
              <div className="text-center py-8">
                <p className="text-gray-400 font-mono">⟳ Cargando servicios...</p>
              </div>
            ) : balanceoServicios.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {balanceoServicios.map((servicio) => (
                  <div key={servicio.id} style={{ backgroundColor: '#1a1a1a', borderLeft: '5px solid #ff8c42' }} className="shadow-lg p-6">
                    <h3 className="text-lg font-bold text-white tracking-wider">{servicio.nombre || 'Servicio'}</h3>
                    <p className="text-gray-400 mt-3 font-mono text-sm">{servicio.descripcion || 'Sin descripción'}</p>
                    <p className="text-gray-500 mt-4 text-xs">Precio: ${servicio.precio_base || 'N/A'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8 font-mono">◇ Sin servicios disponibles</p>
            )}
          </div>
        )}

        {/* Llantas Tab */}
        {activeTab === 'llantas' && (
          <div style={{ backgroundColor: '#2a2a2a', borderTop: '3px solid #ff6b35' }} className="shadow-2xl p-8">
            <h2 className="text-3xl font-bold text-white mb-8 tracking-wider">▸ VENTA DE LLANTAS</h2>
            {llantasError && (
              <div style={{ backgroundColor: '#2a1a1a', borderLeft: '5px solid #ff6b35' }} className="p-4 mb-6">
                <p className="text-red-400 font-mono">⚠ ERROR: {llantasError}</p>
              </div>
            )}
            {llantasLoading ? (
              <div className="text-center py-8">
                <p className="text-gray-400 font-mono">⟳ Cargando llantas...</p>
              </div>
            ) : llantas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {llantas.map((llanta) => (
                  <div key={llanta.id} style={{ backgroundColor: '#1a1a1a', borderLeft: '5px solid #ff8c42' }} className="shadow-lg p-6">
                    <h3 className="text-lg font-bold text-white tracking-wider">{llanta.marca || 'Marca'}</h3>
                    <div className="mt-4 space-y-2 font-mono text-sm">
                      <p className="text-gray-400">Modelo: <span className="text-gray-300">{llanta.modelo || 'N/A'}</span></p>
                      <p className="text-gray-400">Precio: <span className="text-white font-bold">${llanta.precio || '0.00'}</span></p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8 font-mono">◇ Sin llantas disponibles</p>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
