import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useClients } from '../hooks/useClients'
import {
  ErrorAlert,
  LoadingSpinner,
  SearchInput,
  Modal,
  EmptyState,
} from '@shared/components'

export default function ClientsPage() {
  const { clients, loading, error } = useClients()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = clients.filter((c) => {
    const q = query.toLowerCase()
    return (
      c.firstName.toLowerCase().includes(q) ||
      c.lastName.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      (c.email ?? '').toLowerCase().includes(q)
    )
  })

  return (
    <div className="p-8">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-white">Clientes</h1>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          <PlusIcon className="w-4 h-4" />
          Nuevo Cliente
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 max-w-sm">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Buscar por nombre, teléfono o email..."
        />
      </div>

      {error && <ErrorAlert message={error} />}
      {loading && <LoadingSpinner />}

      {!loading && (
        <>
          {filtered.length === 0 ? (
            <EmptyState message="Sin clientes para mostrar" />
          ) : (
            <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Nombre</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Teléfono</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Email</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">RFC</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Notas</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((client) => (
                    <tr
                      key={client.id}
                      onClick={() => setSelected(client)}
                      className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors cursor-pointer"
                    >
                      <td className="px-5 py-3.5 text-sm font-medium text-white">
                        {client.firstName} {client.lastName}
                      </td>
                      <td className="px-5 py-3.5 text-sm text-slate-300">{client.phone}</td>
                      <td className="px-5 py-3.5 text-sm text-slate-400">{client.email || '—'}</td>
                      <td className="px-5 py-3.5 text-sm text-slate-500 font-mono">{client.rfc || '—'}</td>
                      <td className="px-5 py-3.5 text-sm text-slate-500 max-w-xs truncate">{client.notes || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}

      {/* Detail modal */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected ? `${selected.firstName} ${selected.lastName}` : ''}
      >
        {selected && (
          <div className="space-y-4">
            <div className="bg-slate-800 rounded-lg divide-y divide-slate-700">
              <div className="flex justify-between px-3 py-2.5">
                <span className="text-slate-400 text-sm">Teléfono</span>
                <span className="text-white text-sm">{selected.phone}</span>
              </div>
              <div className="flex justify-between px-3 py-2.5">
                <span className="text-slate-400 text-sm">Email</span>
                <span className="text-white text-sm">{selected.email || '—'}</span>
              </div>
              <div className="flex justify-between px-3 py-2.5">
                <span className="text-slate-400 text-sm">RFC</span>
                <span className="text-white text-sm font-mono">{selected.rfc || '—'}</span>
              </div>
              <div className="flex justify-between px-3 py-2.5">
                <span className="text-slate-400 text-sm">Dirección</span>
                <span className="text-white text-sm text-right max-w-xs">{selected.address || '—'}</span>
              </div>
            </div>

            {selected.notes && (
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Notas</p>
                <p className="text-sm text-slate-300 bg-slate-800 rounded-lg px-3 py-2.5">{selected.notes}</p>
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  )
}
