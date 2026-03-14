import { useState } from 'react'
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/react'
import { PlusIcon } from '@heroicons/react/24/outline'
import { useStoreProducts } from '../hooks/useStoreProducts'
import {
  ErrorAlert,
  LoadingSpinner,
  SearchInput,
  Badge,
  Modal,
  EmptyState,
} from '@shared/components'

const TABS = [
  { label: 'Todos', value: null },
  { label: 'Llantas', value: 'tires' },
  { label: 'Aceites', value: 'oil' },
  { label: 'Refacciones', value: 'spare_parts' },
  { label: 'Accesorios', value: 'accessories' },
]

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

const ATTR_LABEL = {
  width: 'Ancho',
  profile: 'Perfil',
  rim: 'Rin',
  speed_index: 'Índice velocidad',
  load_index: 'Índice carga',
  viscosity: 'Viscosidad',
  liters: 'Litros',
  type: 'Tipo',
}

export default function ProductsPage() {
  const { products, loading, error } = useStoreProducts()
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = products.filter((p) => {
    const q = query.toLowerCase()
    return (
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q)
    )
  })

  return (
    <div className="p-8">
      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold text-white">Productos</h1>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          <PlusIcon className="w-4 h-4" />
          Nuevo Producto
        </button>
      </div>

      {/* Search */}
      <div className="mb-6 max-w-sm">
        <SearchInput
          value={query}
          onChange={setQuery}
          placeholder="Buscar por nombre, SKU o marca..."
        />
      </div>

      {error && <ErrorAlert message={error} />}
      {loading && <LoadingSpinner />}

      {!loading && (
        <TabGroup>
          <TabList className="flex gap-1 mb-6">
            {TABS.map((tab) => (
              <Tab
                key={tab.label}
                className="px-4 py-1.5 rounded-full text-sm font-medium transition-colors focus:outline-none data-[selected]:bg-indigo-600 data-[selected]:text-white text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                {tab.label}
              </Tab>
            ))}
          </TabList>

          <TabPanels>
            {TABS.map((tab) => {
              const items = tab.value
                ? filtered.filter((p) => p.category === tab.value)
                : filtered

              return (
                <TabPanel key={tab.label}>
                  {items.length === 0 ? (
                    <EmptyState message="Sin productos para mostrar" />
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {items.map((product) => (
                        <button
                          key={product.id}
                          onClick={() => setSelected(product)}
                          className="text-left bg-slate-900 rounded-xl border border-slate-800 p-5 hover:border-slate-600 transition-colors cursor-pointer"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="text-sm font-semibold text-white leading-snug">
                              {product.name}
                            </h3>
                            <Badge
                              label={CATEGORY_LABEL[product.category] || product.category}
                              color={CATEGORY_COLOR[product.category] || 'slate'}
                            />
                          </div>
                          <p className="text-xs text-slate-500 font-mono mb-3">{product.sku}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-lg font-bold text-white font-mono">
                              ${product.price.toLocaleString('es-MX')}
                            </span>
                            <span className="text-xs text-slate-500">{product.brand}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </TabPanel>
              )
            })}
          </TabPanels>
        </TabGroup>
      )}

      {/* Detail modal */}
      <Modal
        open={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.name ?? ''}
      >
        {selected && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge
                label={CATEGORY_LABEL[selected.category] || selected.category}
                color={CATEGORY_COLOR[selected.category] || 'slate'}
              />
              <span className="text-slate-500 text-xs font-mono">{selected.sku}</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-slate-800 rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-1">Precio</p>
                <p className="text-xl font-bold text-white font-mono">
                  ${selected.price.toLocaleString('es-MX')}
                </p>
              </div>
              <div className="bg-slate-800 rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-1">Marca</p>
                <p className="text-sm font-medium text-white">{selected.brand}</p>
              </div>
            </div>

            {selected.attributes && Object.keys(selected.attributes).length > 0 && (
              <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">
                  Atributos
                </p>
                <div className="bg-slate-800 rounded-lg divide-y divide-slate-700">
                  {Object.entries(selected.attributes).map(([key, val]) => (
                    <div key={key} className="flex justify-between px-3 py-2">
                      <span className="text-slate-400 text-sm">
                        {ATTR_LABEL[key] || key}
                      </span>
                      <span className="text-white text-sm font-medium">{String(val)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-between text-sm text-slate-500 pt-1">
              <span>Unidad: <span className="text-slate-300">{selected.unit}</span></span>
              <span>IVA: <span className="text-slate-300">{(selected.taxRate * 100).toFixed(0)}%</span></span>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
