import { create } from 'zustand'

/**
 * Cart store for the sales module.
 *
 * Item shape:
 *   { id, type: 'product'|'service', name, unitPrice, taxRate, qty, sku? }
 *
 * Client shape (nullable):
 *   { id, firstName, lastName }
 */
export const useCartStore = create((set) => ({
  items: [],
  client: null,

  addItem: (item) =>
    set((state) => {
      const existing = state.items.find(
        (i) => i.id === item.id && i.type === item.type
      )
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === item.id && i.type === item.type
              ? { ...i, qty: i.qty + 1 }
              : i
          ),
        }
      }
      return { items: [...state.items, { ...item, qty: 1 }] }
    }),

  removeItem: (type, id) =>
    set((state) => ({
      items: state.items.filter((i) => !(i.type === type && i.id === id)),
    })),

  updateQty: (type, id, qty) =>
    set((state) => ({
      items:
        qty <= 0
          ? state.items.filter((i) => !(i.type === type && i.id === id))
          : state.items.map((i) =>
              i.type === type && i.id === id ? { ...i, qty } : i
            ),
    })),

  setClient: (client) => set({ client }),

  clearCart: () => set({ items: [], client: null }),
}))

// ─── Selectors ────────────────────────────────────────────────────────────────

export const selectSubtotal = (state) =>
  state.items.reduce((sum, i) => sum + i.unitPrice * i.qty, 0)

export const selectTax = (state) =>
  state.items.reduce(
    (sum, i) => sum + i.unitPrice * i.qty * (i.taxRate ?? 0.16),
    0
  )

export const selectTotal = (state) => selectSubtotal(state) + selectTax(state)

export const selectItemCount = (state) =>
  state.items.reduce((sum, i) => sum + i.qty, 0)
