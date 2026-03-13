import { useLlantas } from '../hooks/useLlantas'
import { ErrorAlert, LoadingSpinner, PageTitle, ContentContainer } from '../shared/components'

export default function LlantasPage() {
  const { llantas, loading, error } = useLlantas()

  return (
    <ContentContainer>
      <PageTitle title="VENTA DE LLANTAS" />

      {error && <ErrorAlert message={error} />}

      {loading && <LoadingSpinner />}

      {!loading && (
        <>
          {llantas.length > 0 ? (
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
        </>
      )}
    </ContentContainer>
  )
}
