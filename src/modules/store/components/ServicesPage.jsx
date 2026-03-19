import { useState } from 'react'
import { PlusIcon, ClockIcon } from '@heroicons/react/24/outline'
import { useStoreServices } from '../hooks/useStoreServices'
import {
  ErrorAlert,
  LoadingSpinner,
  SearchInput,
  Badge,
  Modal,
  EmptyState,
} from '@shared/components'

export default function ServicesPage() {
  const { services, loading, error } = useStoreServices()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = services.filter((s) => {
    const q = query.toLowerCase()
    return s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q)
  })

  return (
    <div className="p-8">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-white">Servicios</h1>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          <PlusIcon className="w-4 h-4" />
          Nuevo Servicio
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 max-w-sm">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Buscar por nombre o código..."
        />
      </div>

      {error && <ErrorAlert message={error} />}
      {loading && <LoadingSpinner />}

      {!loading && (
        <>
          {filtered.length === 0 ? (
            <EmptyState message="Sin servicios para mostrar" />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filtered.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelected(service)}
                  className="text-left bg-slate-900 rounded-xl border border-slate-800 p-5 hover:border-slate-600 transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-base font-semibold text-white">{service.name}</h3>
                    <Badge
                      label={`${service.durationMinutes} min`}
                      color="slate"
                    />
                  </div>
                  <p className="text-sm text-slate-400 mb-4">{service.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-white font-mono">
                      ${service.price.toLocaleString('es-MX')}
                    </span>
                    <span className="text-xs text-slate-600 font-mono">{service.code}</span>
                  </div>
                </button>
              ))}
            </div>
          )}
        </>
      )}

      {/* Detail modal */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name ?? ''}
      >
        {selected && (
          <div className="space-y-4">
            <p className="text-slate-400 text-sm">{selected.description}</p>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800 rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-1">Precio</p>
                <p className="text-xl font-bold text-white font-mono">
                  ${selected.price.toLocaleString('es-MX')}
                </p>
              </div>
              <div className="bg-slate-800 rounded-lg p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <ClockIcon className="w-3.5 h-3.5 text-slate-500" />
                  <p className="text-xs text-slate-500">Duración</p>
                </div>
                <p className="text-sm font-medium text-white">{selected.durationMinutes} minutos</p>
              </div>
            </div>

            <div className="bg-slate-800 rounded-lg divide-y divide-slate-700">
              <div className="flex justify-between px-3 py-2">
                <span className="text-slate-400 text-sm">Código</span>
                <span className="text-white text-sm font-mono">{selected.code}</span>
              </div>
              <div className="flex justify-between px-3 py-2">
                <span className="text-slate-400 text-sm">IVA</span>
                <span className="text-white text-sm">{(selected.taxRate * 100).toFixed(0)}%</span>
              </div>
              <div className="flex justify-between px-3 py-2">
                <span className="text-slate-400 text-sm">Estado</span>
                <Badge label={selected.active ? 'Activo' : 'Inactivo'} color={selected.active ? 'emerald' : 'slate'} />
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
