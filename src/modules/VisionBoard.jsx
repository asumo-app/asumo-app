import { useState } from 'react'

const CATS = [
  { id:'all', label:'Todo', color:'#c8d8ec' },
  { id:'amor', label:'Amor', color:'#c44569' },
  { id:'salud', label:'Salud', color:'#27ae60' },
  { id:'carrera', label:'Carrera', color:'#f39c12' },
  { id:'viajes', label:'Viajes', color:'#4f9eff' },
  { id:'hogar', label:'Hogar', color:'#8e44ad' },
  { id:'crecimiento', label:'Crecimiento', color:'#16a085' },
  { id:'abundancia', label:'Abundancia', color:'#c9a227' },
]

const SIZES = [
  { id:'s', label:'Pequeña', cols: 1 },
  { id:'m', label:'Mediana', cols: 2 },
  { id:'l', label:'Grande', cols: 2 },
]

const INSPIRATIONS = [
  'Soy magnética/o hacia mis sueños más grandes.',
  'Mi vida ideal ya está en camino hacia mí.',
  'Merezco abundancia en todas sus formas.',
  'La versión que visualizo ya existe en otra dimensión.',
  'Cada deseo mío tiene su origen en una posibilidad real.',
  'Mi vision board es un mapa, no un deseo: es un destino.',
]

export default function VisionBoard() {
  const [cards, setCards] = useState(() => {
    try { return JSON.parse(localStorage.getItem('vision_board') || '[]') } catch { return [] }
  })
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState('all')
  const [form, setForm] = useState({ text: '', cat: 'crecimiento', imageUrl: '', affirmation: '', size: 'm' })
  const [inspIdx, setInspIdx] = useState(0)

  const save = (c) => {
    localStorage.setItem('vision_board', JSON.stringify(c))
  }

  const addCard = () => {
    if (!form.text.trim() && !form.imageUrl.trim()) return
    const card = {
      id: Date.now(),
      text: form.text.trim(),
      cat: form.cat,
      imageUrl: form.imageUrl.trim(),
      affirmation: form.affirmation.trim(),
      size: form.size,
      createdAt: new Date().toLocaleDateString('es'),
    }
    const updated = [card, ...cards]
    setCards(updated)
    save(updated)
    setForm({ text: '', cat: 'crecimiento', imageUrl: '', affirmation: '', size: 'm' })
    setShowForm(false)
  }

  const deleteCard = (id) => {
    const updated = cards.filter(c => c.id !== id)
    setCards(updated)
    save(updated)
  }

  const filtered = filter === 'all' ? cards : cards.filter(c => c.cat === filter)
  const catInfo = (id) => CATS.find(c => c.id === id) || CATS[0]

  return (
    <div className="mod">
      <div className="mod-hd">
        <span className="mod-icon">🔮</span>
        <h1 className="mod-title">Vision Board</h1>
        <p className="mod-sub">Visualiza y atrae la vida que mereces</p>
      </div>

      {/* Inspiration quote */}
      <div className="card" style={{
        padding: '20px 28px', marginBottom: 24, textAlign: 'center',
        background: 'linear-gradient(135deg, rgba(107,33,168,0.15), rgba(26,47,122,0.15))',
        border: '1px solid rgba(168,85,247,0.2)',
        cursor: 'pointer',
      }} onClick={() => setInspIdx(i => (i + 1) % INSPIRATIONS.length)}>
        <p style={{
          fontFamily: "'Cinzel',serif", fontStyle: 'italic',
          fontSize: '0.92rem', color: 'var(--silver-hi)',
          lineHeight: 1.7, letterSpacing: '0.03em',
        }}>
          ✦ "{INSPIRATIONS[inspIdx]}"
        </p>
        <p style={{ fontSize: '0.65rem', color: 'var(--silver-dim)', marginTop: 8 }}>
          Haz clic para otra inspiración
        </p>
      </div>

      {/* Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {CATS.map(c => (
            <button key={c.id}
              onClick={() => setFilter(c.id)}
              className="btn btn-sm"
              style={{
                background: filter === c.id ? `${c.color}30` : 'transparent',
                border: filter === c.id ? `1px solid ${c.color}` : '1px solid var(--border)',
                color: filter === c.id ? c.color : 'var(--silver-dim)',
              }}>
              {c.label}
            </button>
          ))}
        </div>
        <button className="btn btn-gold" onClick={() => setShowForm(true)}>
          + Agregar visión
        </button>
      </div>

      {/* Board */}
      {filtered.length === 0 ? (
        <div className="card" style={{
          padding: 60, textAlign: 'center',
          border: '2px dashed rgba(168,85,247,0.2)',
          background: 'rgba(107,33,168,0.05)',
        }}>
          <div style={{ fontSize: '3.5rem', marginBottom: 16, opacity: 0.4 }}>🔮</div>
          <p style={{ color: 'var(--silver-dim)', fontSize: '0.9rem', marginBottom: 16 }}>
            {cards.length === 0
              ? 'Tu tablero de visión está vacío.\n¡Empieza a construir tu vida soñada!'
              : 'No hay visiones en esta categoría aún.'
            }
          </p>
          {cards.length === 0 && (
            <button className="btn btn-gold" onClick={() => setShowForm(true)}>
              ✦ Crear mi primera visión
            </button>
          )}
        </div>
      ) : (
        <div style={{
          columns: '2 280px',
          gap: 14,
        }}>
          {filtered.map(card => {
            const cat = catInfo(card.cat)
            return (
              <div key={card.id} style={{
                breakInside: 'avoid',
                marginBottom: 14,
                position: 'relative',
                borderRadius: 16,
                overflow: 'hidden',
                border: `1px solid ${cat.color}25`,
                background: 'var(--glass)',
                backdropFilter: 'blur(16px)',
                boxShadow: `0 4px 24px ${cat.color}15`,
                transition: 'transform 0.25s, box-shadow 0.25s',
                cursor: 'default',
                animation: 'fadeUp 0.4s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-3px)'
                e.currentTarget.style.boxShadow = `0 12px 36px ${cat.color}30`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = `0 4px 24px ${cat.color}15`
              }}
              >
                {/* Top border */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, transparent, ${cat.color}, transparent)`,
                }} />

                {/* Image */}
                {card.imageUrl && (
                  <div style={{ width: '100%', overflow: 'hidden', maxHeight: 220 }}>
                    <img src={card.imageUrl} alt={card.text}
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                      onError={e => { e.target.style.display = 'none' }}
                    />
                  </div>
                )}

                <div style={{ padding: '18px 18px 16px' }}>
                  {/* Category */}
                  <div style={{ marginBottom: card.text ? 12 : 0 }}>
                    <span className="badge" style={{
                      background: `${cat.color}20`,
                      border: `1px solid ${cat.color}40`,
                      color: cat.color,
                      fontSize: '0.65rem',
                    }}>{cat.label}</span>
                  </div>

                  {/* Text */}
                  {card.text && (
                    <p style={{
                      fontFamily: "'Cinzel',serif",
                      fontSize: '0.9rem', fontWeight: 600,
                      color: 'var(--white)', lineHeight: 1.5,
                      marginBottom: card.affirmation ? 12 : 0,
                    }}>{card.text}</p>
                  )}

                  {/* Affirmation */}
                  {card.affirmation && (
                    <p style={{
                      fontSize: '0.78rem', fontStyle: 'italic',
                      color: 'var(--silver-mid)', lineHeight: 1.6,
                      borderLeft: `2px solid ${cat.color}50`,
                      paddingLeft: 10, marginBottom: 0,
                    }}>{card.affirmation}</p>
                  )}

                  {/* Footer */}
                  <div style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    marginTop: 14, paddingTop: 10,
                    borderTop: '1px solid var(--border)',
                  }}>
                    <span style={{ fontSize: '0.65rem', color: 'var(--silver-dim)' }}>
                      {card.createdAt}
                    </span>
                    <button onClick={() => deleteCard(card.id)}
                      style={{
                        background: 'none', border: 'none', cursor: 'pointer',
                        color: 'var(--silver-dim)', fontSize: '1rem',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = '#c44569'}
                      onMouseLeave={e => e.currentTarget.style.color = 'var(--silver-dim)'}
                    >×</button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Add card modal */}
      {showForm && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(3,3,16,0.88)', backdropFilter: 'blur(10px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
        }}>
          <div className="card" style={{
            padding: '32px', width: '100%', maxWidth: 500,
            animation: 'fadeUp 0.3s ease',
            maxHeight: '90vh', overflowY: 'auto',
          }}>
            <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: '1rem', marginBottom: 22, letterSpacing: '0.08em' }}>
              🔮 Agregar visión a tu tablero
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <input className="inp"
                placeholder="Describe tu visión o meta…"
                value={form.text}
                onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
                autoFocus
              />
              <input className="inp"
                placeholder="Afirmación de apoyo (opcional)"
                value={form.affirmation}
                onChange={e => setForm(f => ({ ...f, affirmation: e.target.value }))}
              />
              <input className="inp"
                placeholder="URL de imagen (opcional)"
                value={form.imageUrl}
                onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))}
              />

              <div>
                <label style={{ fontSize: '0.76rem', color: 'var(--silver-dim)', display: 'block', marginBottom: 8 }}>CATEGORÍA</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {CATS.filter(c => c.id !== 'all').map(c => (
                    <button key={c.id}
                      onClick={() => setForm(f => ({ ...f, cat: c.id }))}
                      className="badge"
                      style={{
                        cursor: 'pointer',
                        background: form.cat === c.id ? `${c.color}25` : 'transparent',
                        border: `1px solid ${form.cat === c.id ? c.color : 'var(--border)'}`,
                        color: form.cat === c.id ? c.color : 'var(--silver-dim)',
                        transition: 'all 0.2s',
                        padding: '5px 12px',
                      }}>
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
              <button className="btn btn-gold" onClick={addCard}>✦ Agregar al tablero</button>
              <button className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
