import { useVentas } from '../hooks/useVentas'
import { StatCard, ErrorAlert, LoadingSpinner, PageTitle, ContentContainer } from '../shared/components'

export default function VentasPage() {
  const { ventas, loading, error } = useVentas()

  const totalVentas = ventas.length > 0
    ? ventas.reduce((sum, v) => sum + parseFloat(v.monto || 0), 0).toFixed(2)
    : '0.00'

  const clientesUnicos = new Set(ventas.map(v => v.cliente)).size

  return (
    <div className="space-y-8">
      {error && <ErrorAlert message={error} />}

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="VENTAS TOTALES" value={`$${totalVentas}`} subtitle="ESTE MES" />
        <StatCard title="ÓRDENES" value={ventas.length} subtitle="REGISTRADAS" accentColor="#ff8c42" />
        <StatCard title="CLIENTES" value={clientesUnicos} subtitle="ÚNICOS" />
      </div>

      {/* Recent Sales Table */}
      <ContentContainer>
        <PageTitle title="VENTAS RECIENTES" />

        {loading && <LoadingSpinner />}

        {!loading && (
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
      </ContentContainer>
    </div>
  )
}
