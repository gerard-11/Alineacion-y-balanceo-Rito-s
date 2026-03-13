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
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-4xl font-bold text-white">Alineación y Balanceo Rito's</h1>
          <p className="text-blue-100 mt-2">Dashboard de Gestión</p>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-gray-800 border-b border-gray-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('ventas')}
              className={`px-4 py-4 font-medium transition-colors border-b-2 ${
                activeTab === 'ventas'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Ventas
            </button>
            <button
              onClick={() => setActiveTab('alineacion')}
              className={`px-4 py-4 font-medium transition-colors border-b-2 ${
                activeTab === 'alineacion'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Alineación
            </button>
            <button
              onClick={() => setActiveTab('balanceo')}
              className={`px-4 py-4 font-medium transition-colors border-b-2 ${
                activeTab === 'balanceo'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Balanceo
            </button>
            <button
              onClick={() => setActiveTab('llantas')}
              className={`px-4 py-4 font-medium transition-colors border-b-2 ${
                activeTab === 'llantas'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-gray-400 hover:text-gray-300'
              }`}
            >
              Llantas
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
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-200">
                <p>⚠️ Error: {ventasError}</p>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Sales Card */}
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 text-white">
                <h3 className="text-sm font-medium text-green-100">Ventas Totales</h3>
                <p className="text-4xl font-bold mt-2">${ventas.length > 0 ? ventas.reduce((sum, v) => sum + parseFloat(v.monto || 0), 0).toFixed(2) : '0.00'}</p>
                <p className="text-green-100 mt-2 text-sm">Este mes</p>
              </div>

              {/* Orders Card */}
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 text-white">
                <h3 className="text-sm font-medium text-blue-100">Ordenes</h3>
                <p className="text-4xl font-bold mt-2">{ventas.length}</p>
                <p className="text-blue-100 mt-2 text-sm">Registradas</p>
              </div>

              {/* Customers Card */}
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 text-white">
                <h3 className="text-sm font-medium text-purple-100">Clientes</h3>
                <p className="text-4xl font-bold mt-2">{new Set(ventas.map(v => v.cliente)).size}</p>
                <p className="text-purple-100 mt-2 text-sm">Únicos</p>
              </div>
            </div>

            {/* Recent Sales Table */}
            <div className="bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Ventas Recientes</h2>
              {ventasLoading && (
                <div className="text-center py-8">
                  <p className="text-gray-400">Cargando ventas...</p>
                </div>
              )}
              {!ventasLoading && (
                <div className="overflow-x-auto">
                  <table className="w-full text-gray-300">
                    <thead className="border-b border-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-100">ID</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-100">Cliente</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-100">Servicio</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-100">Monto</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-100">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ventas.length > 0 ? (
                        ventas.map((venta) => (
                          <tr key={venta.id} className="border-b border-gray-700 hover:bg-gray-700 transition-colors">
                            <td className="px-6 py-4 text-sm">{venta.id || '-'}</td>
                            <td className="px-6 py-4 text-sm">{venta.cliente}</td>
                            <td className="px-6 py-4 text-sm">{venta.servicio}</td>
                            <td className="px-6 py-4 text-sm">{venta.monto}</td>
                            <td className="px-6 py-4 text-sm">
                              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                venta.estado === 'completada' ? 'bg-green-500/20 text-green-400' :
                                venta.estado === 'pendiente' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-gray-500/20 text-gray-400'
                              }`}>
                                {venta.estado}
                              </span>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr className="border-b border-gray-700">
                          <td colSpan="5" className="px-6 py-8 text-center text-sm text-gray-400">
                            Sin ventas registradas
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
          <div className="bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Servicios de Alineación</h2>
            {alineacionError && (
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-200 mb-6">
                <p>⚠️ Error: {alineacionError}</p>
              </div>
            )}
            {alineacionLoading ? (
              <div className="text-center py-8">
                <p className="text-gray-400">Cargando servicios de alineación...</p>
              </div>
            ) : alineacionServicios.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {alineacionServicios.map((servicio) => (
                  <div key={servicio.id} className="bg-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white">{servicio.nombre || 'Servicio'}</h3>
                    <p className="text-gray-300 mt-2">{servicio.descripcion || 'Sin descripción'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">Sin servicios de alineación disponibles</p>
            )}
          </div>
        )}

        {/* Balanceo Tab */}
        {activeTab === 'balanceo' && (
          <div className="bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Servicios de Balanceo</h2>
            {balanceoError && (
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-200 mb-6">
                <p>⚠️ Error: {balanceoError}</p>
              </div>
            )}
            {balanceoLoading ? (
              <div className="text-center py-8">
                <p className="text-gray-400">Cargando servicios de balanceo...</p>
              </div>
            ) : balanceoServicios.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {balanceoServicios.map((servicio) => (
                  <div key={servicio.id} className="bg-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white">{servicio.nombre || 'Servicio'}</h3>
                    <p className="text-gray-300 mt-2">{servicio.descripcion || 'Sin descripción'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">Sin servicios de balanceo disponibles</p>
            )}
          </div>
        )}

        {/* Llantas Tab */}
        {activeTab === 'llantas' && (
          <div className="bg-gray-800 rounded-lg shadow-lg p-8">
            <h2 className="text-3xl font-bold text-white mb-6">Venta de Llantas</h2>
            {llantasError && (
              <div className="bg-red-500/20 border border-red-500 rounded-lg p-4 text-red-200 mb-6">
                <p>⚠️ Error: {llantasError}</p>
              </div>
            )}
            {llantasLoading ? (
              <div className="text-center py-8">
                <p className="text-gray-400">Cargando llantas...</p>
              </div>
            ) : llantas.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {llantas.map((llanta) => (
                  <div key={llanta.id} className="bg-gray-700 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-white">{llanta.marca || 'Marca'}</h3>
                    <p className="text-gray-300 mt-2">Modelo: {llanta.modelo || 'N/A'}</p>
                    <p className="text-gray-300">Precio: ${llanta.precio || '0.00'}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">Sin llantas disponibles</p>
            )}
          </div>
        )}
      </main>
    </div>
  )
}
