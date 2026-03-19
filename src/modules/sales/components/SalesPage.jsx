import { useState } from 'react'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/react'
import {
  PlusIcon,
  TrashIcon,
  UserIcon,
  XMarkIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline'
import { useStoreProducts } from '@modules/store/hooks/useStoreProducts'
import { useStoreServices } from '@modules/store/hooks/useStoreServices'
import { useClients } from '@modules/clients/hooks/useClients'
import { useSaleCreate } from '../hooks/useSaleCreate'
import {
  useCartStore,
  selectSubtotal,
  selectTax,
  selectTotal,
  selectItemCount,
} from '@store/cartStore'
import { SearchInput, Badge, LoadingSpinner, ErrorAlert, Modal } from '@shared/components'

const CATEGORY_COLOR = { tires: 'indigo', oil: 'emerald', spare_parts: 'amber', accessories: 'slate' }
const CATEGORY_LABEL = { tires: 'Llantas', oil: 'Aceites', spare_parts: 'Refacciones', accessories: 'Accesorios' }

const fmt = (n) => n.toLocaleString('es-MX', { minimumFractionDigits: 2 })

export default function SalesPage() {
  const { products, loading: loadingProducts } = useStoreProducts()
  const { services, loading: loadingServices } = useStoreServices()
  const { clients } = useClients()
  const { createSale, creating, error: saleError } = useSaleCreate()

  // Cart state from Zustand
  const items = useCartStore((s) => s.items)
  const client = useCartStore((s) => s.client)
  const addItem = useCartStore((s) => s.addItem)
  const removeItem = useCartStore((s) => s.removeItem)
  const updateQty = useCartStore((s) => s.updateQty)
  const setClient = useCartStore((s) => s.setClient)
  const clearCart = useCartStore((s) => s.clearCart)
  const subtotal = useCartStore(selectSubtotal)
  const tax = useCartStore(selectTax)
  const total = useCartStore(selectTotal)
  const itemCount = useCartStore(selectItemCount)

  const [catalogQuery, setCatalogQuery] = useState('')
  const [clientQuery, setClientQuery] = useState('')
  const [showClientDropdown, setShowClientDropdown] = useState(false)
  const [confirmedSale, setConfirmedSale] = useState(null)

  // Catalog filters
  const filteredProducts = products.filter((p) => {
    const q = catalogQuery.toLowerCase()
    return p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)
  })
  const filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(catalogQuery.toLowerCase())
  )

  // Client search
  const filteredClients = clients.filter((c) => {
    const q = clientQuery.toLowerCase()
    return (
      c.firstName.toLowerCase().includes(q) ||
      c.lastName.toLowerCase().includes(q) ||
      c.phone.includes(q)
    )
  })

  const handleConfirm = async () => {
    if (items.length === 0) return
    const saleData = {
      client: client ? { id: client.id, firstName: client.firstName, lastName: client.lastName } : null,
      items: items.map((i) => ({
        type: i.type,
        refId: i.id,
        name: i.name,
        qty: i.qty,
        unitPrice: i.unitPrice,
        taxRate: i.taxRate ?? 0.16,
        subtotal: i.unitPrice * i.qty,
      })),
    }
    try {
      const result = await createSale(saleData)
      setConfirmedSale(result)
      clearCart()
    } catch {
      // error shown via saleError
    }
  }

  return (
    <div className="p-8 flex gap-6 h-[calc(100vh-2rem)] max-h-screen">
      {/* ── Left: Catalog ───────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0">
        <h1 className="text-2xl font-semibold text-white mb-5">Nueva Venta</h1>

        <div className="mb-4 max-w-sm">
          <SearchInput
            value={catalogQuery}
            onChange={setCatalogQuery}
            placeholder="Buscar producto o servicio..."
          />
        </div>

        <TabGroup className="flex flex-col flex-1 min-h-0">
          <TabList className="flex gap-1 mb-4 shrink-0">
            {['Productos', 'Servicios'].map((label) => (
              <Tab
                key={label}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors focus:outline-none data-[selected]:bg-indigo-600 data-[selected]:text-white text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                {label}
              </Tab>
            ))}
          </TabList>

          <TabPanels className="flex-1 overflow-y-auto">
            {/* Products tab */}
            <TabPanel>
              {loadingProducts ? (
                <LoadingSpinner />
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-start justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <p className="text-sm font-medium text-white leading-snug">{product.name}</p>
                          <Badge
                            label={CATEGORY_LABEL[product.category] || product.category}
                            color={CATEGORY_COLOR[product.category] || 'slate'}
                          />
                        </div>
                        <p className="text-xs text-slate-500 font-mono">{product.sku}</p>
                        <p className="text-base font-bold text-white font-mono mt-1">
                          ${fmt(product.price)}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          addItem({
                            id: product.id,
                            type: 'product',
                            name: product.name,
                            unitPrice: product.price,
                            taxRate: product.taxRate ?? 0.16,
                            sku: product.sku,
                          })
                        }
                        className="shrink-0 w-8 h-8 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center transition-colors"
                      >
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </TabPanel>

            {/* Services tab */}
            <TabPanel>
              {loadingServices ? (
                <LoadingSpinner />
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                  {filteredServices.map((service) => (
                    <div
                      key={service.id}
                      className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-start justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-white">{service.name}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{service.description}</p>
                        <p className="text-base font-bold text-white font-mono mt-1">
                          ${fmt(service.price)}
                        </p>
                      </div>
                      <button
                        onClick={() =>
                          addItem({
                            id: service.id,
                            type: 'service',
                            name: service.name,
                            unitPrice: service.price,
                            taxRate: service.taxRate ?? 0.16,
                          })
                        }
                        className="shrink-0 w-8 h-8 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white flex items-center justify-center transition-colors"
                      >
                        <PlusIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>

      {/* ── Right: Cart ─────────────────────────────── */}
      <div className="w-80 shrink-0 flex flex-col bg-slate-900 rounded-xl border border-slate-800">
        {/* Client selector */}
        <div className="px-4 pt-4 pb-3 border-b border-slate-800 relative">
          <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Cliente</p>
          {client ? (
            <div className="flex items-center justify-between bg-slate-800 rounded-lg px-3 py-2">
              <div>
                <p className="text-sm font-medium text-white">{client.firstName} {client.lastName}</p>
                <p className="text-xs text-slate-500">{client.phone}</p>
              </div>
              <button onClick={() => setClient(null)} className="text-slate-500 hover:text-white transition-colors">
                <XMarkIcon className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="relative">
              <div className="relative">
                <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
                <input
                  type="text"
                  value={clientQuery}
                  onChange={(e) => { setClientQuery(e.target.value); setShowClientDropdown(true) }}
                  onFocus={() => setShowClientDropdown(true)}
                  placeholder="Buscar cliente (opcional)..."
                  className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              {showClientDropdown && filteredClients.length > 0 && (
                <div className="absolute z-20 w-full mt-1 bg-slate-800 border border-slate-700 rounded-lg shadow-xl overflow-hidden">
                  {filteredClients.slice(0, 5).map((c) => (
                    <button
                      key={c.id}
                      onClick={() => { setClient(c); setClientQuery(''); setShowClientDropdown(false) }}
                      className="w-full text-left px-3 py-2 hover:bg-slate-700 transition-colors"
                    >
                      <p className="text-sm text-white">{c.firstName} {c.lastName}</p>
                      <p className="text-xs text-slate-500">{c.phone}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
          {items.length === 0 ? (
            <p className="text-slate-600 text-sm text-center py-8">El carrito está vacío</p>
          ) : (
            items.map((item) => (
              <div key={`${item.type}-${item.id}`} className="flex items-start gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white leading-snug">{item.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">${fmt(item.unitPrice)} c/u</p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => updateQty(item.type, item.id, item.qty - 1)}
                    className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 flex items-center justify-center text-xs transition-colors"
                  >
                    −
                  </button>
                  <span className="text-white text-sm w-5 text-center">{item.qty}</span>
                  <button
                    onClick={() => updateQty(item.type, item.id, item.qty + 1)}
                    className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 flex items-center justify-center text-xs transition-colors"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.type, item.id)}
                    className="w-6 h-6 rounded hover:bg-slate-800 text-slate-600 hover:text-red-400 flex items-center justify-center transition-colors ml-0.5"
                  >
                    <TrashIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Totals + confirm */}
        <div className="px-4 pb-4 pt-3 border-t border-slate-800 space-y-2">
          {itemCount > 0 && (
            <>
              <div className="flex justify-between text-sm text-slate-400">
                <span>Subtotal</span>
                <span className="text-white font-mono">${fmt(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-400">
                <span>IVA (16%)</span>
                <span className="text-white font-mono">${fmt(tax)}</span>
              </div>
              <div className="flex justify-between text-base font-bold text-white pt-1 border-t border-slate-800">
                <span>Total</span>
                <span className="font-mono">${fmt(total)}</span>
              </div>
            </>
          )}

          {saleError && <p className="text-red-400 text-xs">{saleError}</p>}

          <button
            onClick={handleConfirm}
            disabled={items.length === 0 || creating}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 rounded-lg transition-colors mt-1"
          >
            {creating ? 'Registrando…' : `Confirmar Venta${itemCount > 0 ? ` (${itemCount})` : ''}`}
          </button>

          {itemCount > 0 && (
            <button
              onClick={clearCart}
              className="w-full text-slate-500 hover:text-slate-300 text-xs py-1 transition-colors"
            >
              Limpiar carrito
            </button>
          )}
        </div>
      </div>

      {/* Sale confirmed modal */}
      <Modal
        open={!!confirmedSale}
        onClose={() => setConfirmedSale(null)}
        title="Venta Registrada"
      >
        {confirmedSale && (
          <div className="space-y-4 text-center">
            <CheckCircleIcon className="w-12 h-12 text-emerald-400 mx-auto" />
            <div>
              <p className="text-white font-semibold text-lg">{confirmedSale.folio}</p>
              <p className="text-slate-400 text-sm">
                {confirmedSale.client
                  ? `${confirmedSale.client.firstName} ${confirmedSale.client.lastName}`
                  : 'Venta rápida'}
              </p>
            </div>
            <div className="bg-slate-800 rounded-lg px-4 py-3 text-left space-y-1.5">
              {(confirmedSale.items ?? []).map((item, idx) => (
                <div key={idx} className="flex justify-between text-sm">
                  <span className="text-slate-300">{item.qty}× {item.name}</span>
                  <span className="text-white font-mono">${fmt(item.subtotal)}</span>
                </div>
              ))}
            </div>
            <div className="text-2xl font-bold text-white font-mono">
              ${fmt(confirmedSale.totalAmount)}
            </div>
            <button
              onClick={() => setConfirmedSale(null)}
              className="w-full bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium py-2.5 rounded-lg transition-colors"
            >
              Cerrar
            </button>
          </div>
        )}
      </Modal>
    </div>
  )
}
