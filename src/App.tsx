import { useEffect, useMemo, useState, type CSSProperties } from 'react'
import { RESTAURANT } from './config'
import { categories, products, type Category, type Product } from './data/menu'
import { categoryAr, productAr } from './data/menu.ar'
import { LANGS, STRINGS, type Lang } from './i18n'
import { useCart, type CartLine } from './cart'
import './App.css'

const ALL = 'all'
const LANG_KEY = '07food-lang'
const THEME_KEY = '07food-theme'

const THEMES = [
  { id: 'classic', dot: '#f08938' },
  { id: 'vert', dot: '#1f9d57' },
] as const
type Theme = (typeof THEMES)[number]['id']

const categoryById = new Map<string, Category>(
  categories.map((c) => [c.id, c] as const),
)

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

function loadLang(): Lang {
  try {
    const s = localStorage.getItem(LANG_KEY)
    if (s === 'ar' || s === 'fr') return s
  } catch {
    // ignore
  }
  return 'fr'
}

function loadTheme(): Theme {
  try {
    const s = localStorage.getItem(THEME_KEY)
    if (s === 'classic' || s === 'vert') return s
  } catch {
    // ignore
  }
  return 'classic'
}

function App() {
  const [active, setActive] = useState<string>(ALL)
  const [query, setQuery] = useState('')
  const [cartOpen, setCartOpen] = useState(false)
  const [delivery, setDelivery] = useState(true)
  const [lang, setLang] = useState<Lang>(loadLang)
  const [theme, setTheme] = useState<Theme>(loadTheme)
  const { items, add, remove, clear } = useCart()

  useEffect(() => {
    try {
      localStorage.setItem(LANG_KEY, lang)
    } catch {
      // ignore
    }
  }, [lang])

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem(THEME_KEY, theme)
    } catch {
      // ignore
    }
  }, [theme])

  const tr = STRINGS[lang]
  const ar = lang === 'ar'
  const dir = ar ? 'rtl' : 'ltr'

  // Helpers de traduction : retombent sur le français si l'arabe manque.
  const nameOf = (p: Product) => (ar ? productAr[p.id]?.name ?? p.name : p.name)
  const descOf = (p: Product) =>
    ar ? productAr[p.id]?.description ?? p.description : p.description
  const catLabel = (c: Category) => (ar ? categoryAr[c.id]?.label ?? c.label : c.label)
  const catSub = (c: Category) =>
    ar ? categoryAr[c.id]?.subtitle ?? c.subtitle : c.subtitle

  const filtered = useMemo(() => {
    const q = normalize(query.trim())
    return products.filter((p) => {
      if (active !== ALL && p.category !== active) return false
      if (!q) return true
      const name = ar ? productAr[p.id]?.name ?? p.name : p.name
      const desc = ar ? productAr[p.id]?.description ?? p.description : p.description
      return normalize(name).includes(q) || normalize(desc).includes(q)
    })
  }, [active, query, ar])

  const grouped = useMemo(() => {
    const map = new Map<string, Product[]>()
    for (const p of filtered) {
      const arr = map.get(p.category) ?? []
      arr.push(p)
      map.set(p.category, arr)
    }
    return categories
      .filter((c) => map.has(c.id))
      .map((c) => ({ category: c, items: map.get(c.id)! }))
  }, [filtered])

  // Lignes du panier, dans l'ordre du menu.
  const lines = useMemo<CartLine[]>(
    () =>
      products
        .filter((p) => items[p.id])
        .map((p) => ({ product: p, qty: items[p.id] })),
    [items],
  )
  const count = useMemo(() => lines.reduce((n, l) => n + l.qty, 0), [lines])
  const total = useMemo(
    () => lines.reduce((s, l) => s + l.qty * l.product.price, 0),
    [lines],
  )

  // Commande pré-remplie envoyée sur WhatsApp (dans la langue active).
  const orderHref = useMemo(() => {
    const intro = tr.orderIntro(RESTAURANT.name)
    const body = lines
      .map((l) => {
        const name = ar ? productAr[l.product.id]?.name ?? l.product.name : l.product.name
        return `- ${l.qty}× ${name} (${l.qty * l.product.price} ${RESTAURANT.currency})`
      })
      .join('\n')
    const mode = delivery ? tr.modeWith : tr.modeWithout
    const msg = `${intro}\n${body}\n\n${tr.total} : ${total} ${RESTAURANT.currency}\n${tr.orderModeLabel} : ${mode}`
    return `https://wa.me/${RESTAURANT.whatsapp}?text=${encodeURIComponent(msg)}`
  }, [lines, total, delivery, tr, ar])

  return (
    <div className="app" dir={dir}>
      <header className="hero">
        <div className="hero-top">
          <div className="brand-mini">
            <span className="brand-mini-circle">07</span>
            <span className="brand-mini-label">{tr.welcome}</span>
          </div>
          <div className="hero-top-end">
            <div className="theme-switch" role="group" aria-label={tr.themeAria}>
              {THEMES.map((t) => (
                <button
                  type="button"
                  key={t.id}
                  className={`theme-btn ${theme === t.id ? 'active' : ''}`}
                  style={{ ['--dot']: t.dot } as CSSProperties}
                  onClick={() => setTheme(t.id)}
                  aria-pressed={theme === t.id}
                  aria-label={t.id}
                />
              ))}
            </div>
            <div className="lang-switch" role="group" aria-label={tr.langAria}>
              {LANGS.map((l) => (
                <button
                  type="button"
                  key={l.code}
                  className={`lang-btn ${lang === l.code ? 'active' : ''}`}
                  onClick={() => setLang(l.code)}
                  aria-pressed={lang === l.code}
                >
                  {l.label}
                </button>
              ))}
            </div>
            <span className="hero-place">{tr.address}</span>
          </div>
        </div>

        <h1 className="hero-title">
          <span className="hero-title-1">{RESTAURANT.brandFirst}</span>
          <span className="hero-title-2">{RESTAURANT.brandSecond}</span>
        </h1>

        <p className="hero-tagline">{tr.tagline}</p>

        <div className="hero-info">
          <span>{tr.address}</span>
          <span className="dot">·</span>
          <span dir="ltr">{RESTAURANT.hours}</span>
          <span className="dot">·</span>
          <span>{tr.days}</span>
        </div>

        <div className="search-wrap">
          <label className="search">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-4.3-4.3M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Z"
              />
            </svg>
            <input
              type="search"
              placeholder={tr.searchPlaceholder}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label={tr.searchAria}
            />
          </label>
        </div>
      </header>

      <nav className="cat-nav" aria-label={tr.categoriesAria}>
        <button
          type="button"
          className={`cat-btn ${active === ALL ? 'active' : ''}`}
          onClick={() => setActive(ALL)}
        >
          {tr.all}
        </button>
        {categories.map((c) => (
          <button
            type="button"
            key={c.id}
            className={`cat-btn ${active === c.id ? 'active' : ''}`}
            onClick={() => setActive(c.id)}
          >
            {catLabel(c)}
          </button>
        ))}
      </nav>

      <main className="menu">
        {grouped.length === 0 ? (
          <p className="empty">{tr.empty}</p>
        ) : (
          grouped.map(({ category, items: catItems }) => {
            const label = catLabel(category)
            return (
              <section key={category.id} className="cat-section">
                <div className="cat-section-head">
                  {ar ? (
                    <h2 className="cat-title">{label}</h2>
                  ) : (
                    <h2 className="cat-title">
                      {label.slice(0, -1)}
                      <span className="cat-title-accent">{label.slice(-1)}</span>
                    </h2>
                  )}
                  {catSub(category) && (
                    <span className="cat-subtitle">{catSub(category)}</span>
                  )}
                </div>

                <div className="products">
                  {catItems.map((p) => {
                    const cat = categoryById.get(p.category)
                    const qty = items[p.id] ?? 0
                    const name = nameOf(p)
                    return (
                      <article
                        key={p.id}
                        className={`card ${!p.available ? 'unavailable' : ''}`}
                      >
                        {p.image ? (
                          <div
                            className="card-mono"
                            style={{ backgroundImage: `url(${p.image})` }}
                            role="img"
                            aria-label={name}
                          />
                        ) : (
                          <div
                            className="card-mono"
                            style={{ backgroundColor: cat?.tint ?? '#5a3a28' }}
                            aria-hidden="true"
                          >
                            <span className="card-letter">
                              {name.charAt(0).toUpperCase()}
                            </span>
                          </div>
                        )}

                        <div className="card-body">
                          <div className="card-head">
                            <h3 className="card-name">{name}</h3>
                            {p.badge && (
                              <span className="card-badge">
                                {tr.badges[p.badge as keyof typeof tr.badges] ??
                                  p.badge}
                              </span>
                            )}
                          </div>
                          <p className="card-desc">{descOf(p)}</p>
                          <div className="card-foot">
                            <span className="price">
                              {p.price}{' '}
                              <span className="currency">
                                {RESTAURANT.currency}
                              </span>
                            </span>
                            {!p.available ? (
                              <span className="unavailable-tag">
                                {tr.unavailable}
                              </span>
                            ) : qty > 0 ? (
                              <div className="qty">
                                <button
                                  type="button"
                                  className="qty-btn"
                                  onClick={() => remove(p.id)}
                                  aria-label={`${tr.removeOne} ${name}`}
                                >
                                  −
                                </button>
                                <span className="qty-num">{qty}</span>
                                <button
                                  type="button"
                                  className="qty-btn"
                                  onClick={() => add(p.id)}
                                  aria-label={`${tr.addOne} ${name}`}
                                >
                                  +
                                </button>
                              </div>
                            ) : (
                              <button
                                type="button"
                                className="add-btn"
                                onClick={() => add(p.id)}
                              >
                                {tr.add}
                              </button>
                            )}
                          </div>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </section>
            )
          })
        )}
      </main>

      <footer className="footer">
        <h2 className="footer-brand">
          <span className="footer-brand-1">{RESTAURANT.brandFirst}</span>
          <span className="footer-brand-2">{RESTAURANT.brandSecond}</span>
        </h2>
        <a
          className="footer-wa"
          href={`https://wa.me/${RESTAURANT.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          dir="ltr"
        >
          WhatsApp · +{RESTAURANT.whatsapp}
        </a>
        <p className="footer-credit">
          {tr.address} · <span dir="ltr">{RESTAURANT.hours}</span> · {tr.days}
        </p>
      </footer>

      {count > 0 && <div className="cart-spacer" aria-hidden="true" />}

      {count > 0 && (
        <button
          type="button"
          className="cart-bar"
          onClick={() => setCartOpen(true)}
        >
          <span className="cart-bar-count">{count}</span>
          <span className="cart-bar-label">{tr.viewCart}</span>
          <span className="cart-bar-total">
            {total} {RESTAURANT.currency}
          </span>
        </button>
      )}

      {cartOpen && (
        <div
          className="cart-overlay"
          onClick={() => setCartOpen(false)}
          role="presentation"
        >
          <div
            className="cart-panel"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={tr.myCart}
            dir={dir}
          >
            <div className="cart-head">
              <h2 className="cart-title">{tr.myCart}</h2>
              <button
                type="button"
                className="cart-close"
                onClick={() => setCartOpen(false)}
                aria-label={tr.closeCart}
              >
                ×
              </button>
            </div>

            {lines.length === 0 ? (
              <p className="cart-empty">{tr.cartEmpty}</p>
            ) : (
              <>
                <ul className="cart-lines">
                  {lines.map((l) => {
                    const name = nameOf(l.product)
                    return (
                      <li key={l.product.id} className="cart-line">
                        <div className="cart-line-info">
                          <span className="cart-line-name">{name}</span>
                          <span className="cart-line-unit">
                            {l.product.price} {RESTAURANT.currency}
                          </span>
                        </div>
                        <div className="qty">
                          <button
                            type="button"
                            className="qty-btn"
                            onClick={() => remove(l.product.id)}
                            aria-label={`${tr.removeOne} ${name}`}
                          >
                            −
                          </button>
                          <span className="qty-num">{l.qty}</span>
                          <button
                            type="button"
                            className="qty-btn"
                            onClick={() => add(l.product.id)}
                            aria-label={`${tr.addOne} ${name}`}
                          >
                            +
                          </button>
                        </div>
                        <span className="cart-line-sub">
                          {l.qty * l.product.price} {RESTAURANT.currency}
                        </span>
                      </li>
                    )
                  })}
                </ul>

                <div className="cart-foot">
                  <div className="cart-delivery">
                    <span className="cart-delivery-label">{tr.delivery}</span>
                    <div
                      className="delivery-toggle"
                      role="group"
                      aria-label={tr.deliveryAria}
                    >
                      <button
                        type="button"
                        className={`delivery-opt ${delivery ? 'active' : ''}`}
                        onClick={() => setDelivery(true)}
                        aria-pressed={delivery}
                      >
                        {tr.withDelivery}
                      </button>
                      <button
                        type="button"
                        className={`delivery-opt ${!delivery ? 'active' : ''}`}
                        onClick={() => setDelivery(false)}
                        aria-pressed={!delivery}
                      >
                        {tr.withoutDelivery}
                      </button>
                    </div>
                  </div>

                  <div className="cart-total-row">
                    <span>{tr.total}</span>
                    <strong>
                      {total} {RESTAURANT.currency}
                    </strong>
                  </div>
                  <a
                    className="cart-order"
                    href={orderHref}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {tr.order}
                  </a>
                  <button
                    type="button"
                    className="cart-clear"
                    onClick={clear}
                  >
                    {tr.clearCart}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default App
