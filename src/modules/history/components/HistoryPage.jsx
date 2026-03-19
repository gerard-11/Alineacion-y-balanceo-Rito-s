import { useState, useMemo } from 'react'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/react'
import { useSalesHistory } from '../hooks/useSalesHistory'
import { useServiceHistory } from '../hooks/useServiceHistory'
import { SearchInput, LoadingSpinner, ErrorAlert, Badge, Modal, EmptyState } from '@shared/components'

const fmt = (n) =>
  Number(n).toLocaleString('es-MX', { minimumFractionDigits: 2 })

const fmtDate = (iso) =>
  new Date(iso).toLocaleString('es-MX', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

function FiltersBar({ query, onQuery, dateFrom, onDateFrom, dateTo, onDateTo }) {
  return (
    <div className="flex flex-wrap gap-3 mb-5">
      <div className="w-64">
        <SearchInput value={query} onChange={onQuery} placeholder="Buscar..." />
      </div>
      <input
        type="date"
        value={dateFrom}
        onChange={(e) => onDateFrom(e.target.value)}
        className="bg-slate-800 border border-slate-700 text-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <input
        type="date"
        value={dateTo}
        onChange={(e) => onDateTo(e.target.value)}
        className="bg-slate-800 border border-slate-700 text-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      {(query || dateFrom || dateTo) && (
        <button
          onClick={() => { onQuery(''); onDateFrom(''); onDateTo('') }}
          className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
        >
          Limpiar filtros
        </button>
      )}
    </div>
  )
}

function SalesTab() {
  const [query, setQuery] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [selected, setSelected] = useState(null)

  const filters = useMemo(
    () => ({ query, dateFrom, dateTo }),
    [query, dateFrom, dateTo]
  )
  const { records, loading, error } = useSalesHistory(filters)

  return (
    <>
      <FiltersBar
        query={query} onQuery={setQuery}
        dateFrom={dateFrom} onDateFrom={setDateFrom}
        dateTo={dateTo} onDateTo={setDateTo}
      />

      {error && <ErrorAlert message={error} />}
      {loading && <LoadingSpinner />}

      {!loading && records.length === 0 && <EmptyState message="Sin ventas para mostrar" />}

      {!loading && records.length > 0 && (
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Folio</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Fecha</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Cliente</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Total</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Estado</th>
              </tr>
            </thead>
            <tbody>
              {records.map((sale) => (
                <tr
                  key={sale.id}
                  onClick={() => setSelected(sale)}
                  className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  <td className="px-5 py-3.5 text-sm font-mono text-indigo-400">{sale.folio}</td>
                  <td className="px-5 py-3.5 text-sm text-slate-400">{fmtDate(sale.createdAt)}</td>
                  <td className="px-5 py-3.5 text-sm text-white">
                    {sale.client
                      ? `${sale.client.firstName} ${sale.client.lastName}`
                      : <span className="text-slate-500">Sin cliente</span>}
                  </td>
                  <td className="px-5 py-3.5 text-sm font-bold text-white font-mono text-right">
                    ${fmt(sale.totalAmount)}
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge label={sale.status} color="emerald" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.folio ?? ''}>
        {selected && (
          <div className="space-y-4">
            <div className="flex justify-between text-sm text-slate-400">
              <span>{fmtDate(selected.createdAt)}</span>
              <Badge label={selected.status} color="emerald" />
            </div>
            {selected.client && (
              <p className="text-sm text-slate-300">
                Cliente: <span className="text-white">{selected.client.firstName} {selected.client.lastName}</span>
              </p>
            )}
            <div className="bg-slate-800 rounded-lg divide-y divide-slate-700">
              {selected.items.map((item, idx) => (
                <div key={idx} className="flex justify-between px-3 py-2.5">
                  <div>
                    <p className="text-sm text-white">{item.qty}× {item.name}</p>
                    <p className="text-xs text-slate-500">${fmt(item.unitPrice)} c/u</p>
                  </div>
                  <span className="text-sm font-mono text-white">${fmt(item.subtotal)}</span>
                </div>
              ))}
            </div>
            <div className="space-y-1">
              <div className="flex justify-between text-sm text-slate-400">
                <span>Subtotal</span><span className="font-mono">${fmt(selected.subtotalAmount)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-400">
                <span>IVA</span><span className="font-mono">${fmt(selected.taxAmount)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-1 border-t border-slate-700">
                <span>Total</span><span className="font-mono">${fmt(selected.totalAmount)}</span>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}

function ServiceRecordsTab() {
  const [query, setQuery] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [selected, setSelected] = useState(null)

  const filters = useMemo(
    () => ({ query, dateFrom, dateTo }),
    [query, dateFrom, dateTo]
  )
  const { records, loading, error } = useServiceHistory(filters)

  return (
    <>
      <FiltersBar
        query={query} onQuery={setQuery}
        dateFrom={dateFrom} onDateFrom={setDateFrom}
        dateTo={dateTo} onDateTo={setDateTo}
      />

      {error && <ErrorAlert message={error} />}
      {loading && <LoadingSpinner />}

      {!loading && records.length === 0 && <EmptyState message="Sin registros para mostrar" />}

      {!loading && records.length > 0 && (
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Fecha</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Servicio</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Cliente</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Vehículo</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Técnico</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Monto</th>
              </tr>
            </thead>
            <tbody>
              {records.map((rec) => (
                <tr
                  key={rec.id}
                  onClick={() => setSelected(rec)}
                  className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors cursor-pointer"
                >
                  <td className="px-5 py-3.5 text-sm text-slate-400 whitespace-nowrap">{fmtDate(rec.date)}</td>
                  <td className="px-5 py-3.5 text-sm font-medium text-white">{rec.service.name}</td>
                  <td className="px-5 py-3.5 text-sm text-slate-300">
                    {rec.client
                      ? `${rec.client.firstName} ${rec.client.lastName}`
                      : <span className="text-slate-500">Sin cliente</span>}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-slate-400">{rec.vehicle}</td>
                  <td className="px-5 py-3.5 text-sm text-slate-400">{rec.technicianName}</td>
                  <td className="px-5 py-3.5 text-sm font-bold text-white font-mono text-right">
                    ${fmt(rec.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal open={!!selected} onClose={() => setSelected(null)} title="Registro de Servicio">
        {selected && (
          <div className="space-y-4">
            <div className="bg-slate-800 rounded-lg divide-y divide-slate-700">
              <div className="flex justify-between px-3 py-2.5">
                <span className="text-slate-400 text-sm">Servicio</span>
                <span className="text-white text-sm font-medium">{selected.service.name}</span>
              </div>
              <div className="flex justify-between px-3 py-2.5">
                <span className="text-slate-400 text-sm">Fecha</span>
                <span className="text-white text-sm">{fmtDate(selected.date)}</span>
              </div>
              <div className="flex justify-between px-3 py-2.5">
                <span className="text-slate-400 text-sm">Cliente</span>
                <span className="text-white text-sm">
                  {selected.client
                    ? `${selected.client.firstName} ${selected.client.lastName}`
                    : '—'}
                </span>
              </div>
              <div className="flex justify-between px-3 py-2.5">
                <span className="text-slate-400 text-sm">Vehículo</span>
                <span className="text-white text-sm text-right max-w-xs">{selected.vehicle}</span>
              </div>
              <div className="flex justify-between px-3 py-2.5">
                <span className="text-slate-400 text-sm">Técnico</span>
                <span className="text-white text-sm">{selected.technicianName}</span>
              </div>
              <div className="flex justify-between px-3 py-2.5">
                <span className="text-slate-400 text-sm">Monto</span>
                <span className="text-white text-sm font-bold font-mono">${fmt(selected.amount)}</span>
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
    </>
  )
}

export default function HistoryPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold text-white mb-6">Historial</h1>

      <TabGroup>
        <TabList className="flex gap-1 mb-6">
          {['Ventas', 'Registros de Servicio'].map((label) => (
            <Tab
              key={label}
              className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors focus:outline-none data-[selected]:bg-indigo-600 data-[selected]:text-white text-slate-400 hover:text-slate-200 cursor-pointer"
            >
              {label}
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          <TabPanel><SalesTab /></TabPanel>
          <TabPanel><ServiceRecordsTab /></TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  )
}
