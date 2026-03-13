import { useAlineacion } from '../hooks/useAlineacion'
import { ErrorAlert, LoadingSpinner, PageTitle, ContentContainer } from '../shared/components'

export default function AlineacionPage() {
  const { servicios, loading, error } = useAlineacion()

  return (
    <ContentContainer>
      <PageTitle title="SERVICIOS DE ALINEACIÓN" />

      {error && <ErrorAlert message={error} />}

      {loading && <LoadingSpinner />}

      {!loading && (
        <>
          {servicios.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {servicios.map((servicio) => (
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
        </>
      )}
    </ContentContainer>
  )
}
