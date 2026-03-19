import { useState } from 'react'
import { PlusIcon, MinusIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { useInventory } from '../hooks/useInventory'
import { ErrorAlert, LoadingSpinner, SearchInput, Badge, Modal } from '@shared/components'

const CATEGORY_COLOR = {
  tires: 'indigo',
  oil: 'emerald',
  spare_parts: 'amber',
  accessories: 'slate',
}

const CATEGORY_LABEL = {
  tires: 'Llantas',
  oil: 'Aceites',
  spare_parts: 'Refacciones',
  accessories: 'Accesorios',
}

const ADJUST_REASONS = [
  'Entrada de mercancía',
  'Corrección de inventario',
  'Merma / daño',
  'Devolución de cliente',
  'Otro',
]

export default function InventoryPage() {
  const { inventory, loading, error, adjusting, adjustStock } = useInventory()
  const [query, setQuery] = useState('')
  const [adjustTarget, setAdjustTarget] = useState(null) // inventory item being adjusted
  const [delta, setDelta] = useState('')
  const [reason, setReason] = useState(ADJUST_REASONS[0])
  const [adjustError, setAdjustError] = useState(null)

  const filtered = inventory.filter((item) => {
    const q = query.toLowerCase()
    return (
      item.productName.toLowerCase().includes(q) ||
      item.sku.toLowerCase().includes(q) ||
      item.brand.toLowerCase().includes(q)
    )
  })

  const lowStockCount = inventory.filter(
    (i) => i.stockCurrent <= i.stockMinimum
  ).length

  const openAdjust = (item) => {
    setAdjustTarget(item)
    setDelta('')
    setReason(ADJUST_REASONS[0])
    setAdjustError(null)
  }

  const handleAdjust = async () => {
    const n = parseInt(delta, 10)
    if (!n || n === 0) {
      setAdjustError('Ingresa una cantidad distinta de cero.')
      return
    }
    try {
      await adjustStock(adjustTarget.id, n, reason)
      setAdjustTarget(null)
    } catch (err) {
      setAdjustError(err.message)
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-2xl font-semibold text-white">Inventario</h1>
      </div>

      {lowStockCount > 0 && (
        <div className="flex items-center gap-2 bg-amber-950 border border-amber-800 rounded-lg px-4 py-2.5 mb-6 text-amber-300 text-sm">
          <ExclamationTriangleIcon className="w-4 h-4 shrink-0" />
          {lowStockCount} producto{lowStockCount > 1 ? 's' : ''} con stock bajo o agotado
        </div>
      )}

      {/* Search */}
      <div className="mb-5 max-w-sm">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Buscar por nombre, SKU o marca..."
        />
      </div>

      {error && <ErrorAlert message={error} />}
      {loading && <LoadingSpinner />}

      {!loading && (
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Producto</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Categoría</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Stock</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Mínimo</th>
                <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wider">Ubicación</th>
                <th className="px-5 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wider">Costo</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody>
              {filtered.map((item) => {
                const isLow = item.stockCurrent <= item.stockMinimum
                return (
                  <tr
                    key={item.id}
                    className="border-b border-slate-800 hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <p className="text-sm font-medium text-white leading-snug">{item.productName}</p>
                      <p className="text-xs text-slate-500 font-mono mt-0.5">{item.sku}</p>
                    </td>
                    <td className="px-5 py-3.5">
                      <Badge
                        label={CATEGORY_LABEL[item.category] || item.category}
                        color={CATEGORY_COLOR[item.category] || 'slate'}
                      />
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <span className={`text-sm font-bold font-mono ${isLow ? 'text-amber-400' : 'text-white'}`}>
                        {item.stockCurrent}
                      </span>
                      {isLow && (
                        <ExclamationTriangleIcon className="w-3.5 h-3.5 text-amber-400 inline ml-1 mb-0.5" />
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-right text-sm text-slate-500">{item.stockMinimum}</td>
                    <td className="px-5 py-3.5 text-sm text-slate-400">{item.location}</td>
                    <td className="px-5 py-3.5 text-right text-sm text-slate-300 font-mono">
                      ${item.cost.toLocaleString('es-MX')}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <button
                        onClick={() => openAdjust(item)}
                        className="text-xs font-medium text-indigo-400 hover:text-indigo-300 transition-colors"
                      >
                        Ajustar
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Adjust modal */}
      <Modal
        open={!!adjustTarget}
        onClose={() => setAdjustTarget(null)}
        title="Ajuste de Stock"
      >
        {adjustTarget && (
          <div className="space-y-4">
            <div className="bg-slate-800 rounded-lg px-4 py-3">
              <p className="text-white text-sm font-medium">{adjustTarget.productName}</p>
              <p className="text-slate-500 text-xs font-mono mt-0.5">{adjustTarget.sku}</p>
              <p className="text-slate-400 text-xs mt-1">
                Stock actual: <span className="text-white font-bold">{adjustTarget.stockCurrent}</span>
              </p>
            </div>

            {/* Delta input */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">
                Cantidad (positivo = entrada, negativo = salida)
              </label>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDelta((v) => String((parseInt(v, 10) || 0) - 1))}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
                >
                  <MinusIcon className="w-4 h-4" />
                </button>
                <input
                  type="number"
                  value={delta}
                  onChange={(e) => setDelta(e.target.value)}
                  placeholder="0"
                  className="flex-1 bg-slate-800 border border-slate-700 text-white text-center rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  onClick={() => setDelta((v) => String((parseInt(v, 10) || 0) + 1))}
                  className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center transition-colors"
                >
                  <PlusIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Reason */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Motivo</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {ADJUST_REASONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            {adjustError && (
              <p className="text-red-400 text-sm">{adjustError}</p>
            )}

            <div className="flex gap-3 pt-1">
              <button
                onClick={() => setAdjustTarget(null)}
                className="flex-1 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium py-2 rounded-lg transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleAdjust}
                disabled={adjusting}
                className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-medium py-2 rounded-lg transition-colors"
              >
                {adjusting ? 'Guardando…' : 'Confirmar'}
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
