import { useMemo, useState } from 'react'
import { RESTAURANT } from './config'
import { categories, products, type Category, type Product } from './data/menu'
import './App.css'

const ALL = 'all'

const categoryById = new Map<string, Category>(
  categories.map((c) => [c.id, c] as const),
)

function normalize(s: string) {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

function App() {
  const [active, setActive] = useState<string>(ALL)
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const q = normalize(query.trim())
    return products.filter((p) => {
      if (active !== ALL && p.category !== active) return false
      if (!q) return true
      return (
        normalize(p.name).includes(q) || normalize(p.description).includes(q)
      )
    })
  }, [active, query])

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

  return (
    <div className="app">
      <header className="hero">
        <div className="hero-top">
          <div className="brand-mini">
            <span className="brand-mini-circle">07</span>
            <span className="brand-mini-label">{RESTAURANT.welcomeLabel}</span>
          </div>
          <span className="hero-place">{RESTAURANT.address}</span>
        </div>

        <h1 className="hero-title">
          <span className="hero-title-1">{RESTAURANT.brandFirst}</span>
          <span className="hero-title-2">{RESTAURANT.brandSecond}</span>
        </h1>

        <p className="hero-tagline">{RESTAURANT.tagline}</p>

        <div className="hero-info">
          <span>{RESTAURANT.address}</span>
          <span className="dot">·</span>
          <span>{RESTAURANT.hours}</span>
          <span className="dot">·</span>
          <span>{RESTAURANT.daysOpen}</span>
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
              placeholder="Rechercher un plat…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Rechercher un plat"
            />
          </label>
        </div>
      </header>

      <nav className="cat-nav" aria-label="Catégories">
        <button
          type="button"
          className={`cat-btn ${active === ALL ? 'active' : ''}`}
          onClick={() => setActive(ALL)}
        >
          Tout
        </button>
        {categories.map((c) => (
          <button
            type="button"
            key={c.id}
            className={`cat-btn ${active === c.id ? 'active' : ''}`}
            onClick={() => setActive(c.id)}
          >
            {c.label}
          </button>
        ))}
      </nav>

      <main className="menu">
        {grouped.length === 0 ? (
          <p className="empty">Aucun plat ne correspond à ta recherche.</p>
        ) : (
          grouped.map(({ category, items }) => (
            <section key={category.id} className="cat-section">
              <div className="cat-section-head">
                <h2 className="cat-title">
                  {category.label.slice(0, -1)}
                  <span className="cat-title-accent">
                    {category.label.slice(-1)}
                  </span>
                </h2>
                {category.subtitle && (
                  <span className="cat-subtitle">{category.subtitle}</span>
                )}
              </div>

              <div className="products">
                {items.map((p) => {
                  const cat = categoryById.get(p.category)
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
                          aria-label={p.name}
                        />
                      ) : (
                        <div
                          className="card-mono"
                          style={{ backgroundColor: cat?.tint ?? '#5a3a28' }}
                          aria-hidden="true"
                        >
                          <span className="card-letter">
                            {p.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                      )}

                      <div className="card-body">
                        <div className="card-head">
                          <h3 className="card-name">{p.name}</h3>
                          {p.badge && (
                            <span className="card-badge">{p.badge}</span>
                          )}
                        </div>
                        <p className="card-desc">{p.description}</p>
                        <div className="card-foot">
                          <span className="price">
                            {p.price}{' '}
                            <span className="currency">
                              {RESTAURANT.currency}
                            </span>
                          </span>
                          {!p.available && (
                            <span className="unavailable-tag">
                              Indisponible
                            </span>
                          )}
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            </section>
          ))
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
        >
          WhatsApp · +{RESTAURANT.whatsapp}
        </a>
        <p className="footer-credit">
          {RESTAURANT.address} · {RESTAURANT.hours} · {RESTAURANT.daysOpen}
        </p>
      </footer>
    </div>
  )
}

export default App
