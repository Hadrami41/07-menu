import { useCallback, useEffect, useState } from 'react'
import type { Product } from './data/menu'

/** Panier : map identifiant produit -> quantité. */
export type Cart = Record<string, number>

export type CartLine = { product: Product; qty: number }

const STORAGE_KEY = '07food-cart'

function load(): Cart {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    if (parsed && typeof parsed === 'object') return parsed as Cart
  } catch {
    // localStorage indisponible ou JSON corrompu : on repart d'un panier vide.
  }
  return {}
}

/** Gère l'état du panier et le persiste dans localStorage. */
export function useCart() {
  const [items, setItems] = useState<Cart>(load)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      // Stockage indisponible (mode privé, quota) : on ignore.
    }
  }, [items])

  const add = useCallback((id: string) => {
    setItems((prev) => ({ ...prev, [id]: (prev[id] ?? 0) + 1 }))
  }, [])

  const remove = useCallback((id: string) => {
    setItems((prev) => {
      const qty = (prev[id] ?? 0) - 1
      const next = { ...prev }
      if (qty <= 0) delete next[id]
      else next[id] = qty
      return next
    })
  }, [])

  const clear = useCallback(() => setItems({}), [])

  return { items, add, remove, clear }
}
