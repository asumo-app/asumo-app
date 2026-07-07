import { useState, useMemo } from 'react'
import { NUMEROLOGY, calcLifePath, calcDailyNumber } from '../data/numerologyData'
import { SACRED_CODE_CATEGORIES, HOW_TO_USE } from '../data/sacredCodesData'
import ModuleHeader from '../components/ModuleHeader'

const MONTHS_ES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
                   'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

function formatDate(d) {
  return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })
}

// ─── Main component ───────────────────────────────────────────
export default function Numerology() {
  const [birthInput, setBirthInput] = useState(() =>
    localStorage.getItem('num_birth') || ''
  )
  const [confirmed, setConfirmed] = useState(() =>
    !!localStorage.getItem('num_birth')
  )
  const [day, setDay]     = useState(() => localStorage.getItem('num_day')   || '')
  const [month, setMonth] = useState(() => localStorage.getItem('num_month') || '')
  const [year, setYear]   = useState(() => localStorage.getItem('num_year')  || '')
  const [error, setError] = useState('')

  const today = useMemo(() => new Date(), [])
  const dailyNumber = useMemo(() => calcDailyNumber(today), [today])
  const dailyData   = NUMEROLOGY[dailyNumber]

  // Day-of-month for affirmation rotation (0-based)
  const affIdx = today.getDate() % 7

  let lifePath = null
  let lifeData = null
  if (confirmed && day && month && year) {
    lifePath = calcLifePath(parseInt(day), parseInt(month), parseInt(year))
    lifeData = NUMEROLOGY[lifePath]
  }

  const handleCalculate = () => {
    const d = parseInt(day), m = parseInt(month), y = parseInt(year)
    if (!d || !m || !y || d < 1 || d > 31 || m < 1 || m > 12 || y < 1900 || y > 2025) {
      setError('Por favor ingresa una fecha válida.')
      return
    }
    setError('')
    localStorage.setItem('num_day', day)
    localStorage.setItem('num_month', month)
    localStorage.setItem('num_year', year)
    localStorage.setItem('num_birth', `${d}/${m}/${y}`)
    setConfirmed(true)
  }

  const handleReset = () => {
    setConfirmed(false)
    setDay(''); setMonth(''); setYear('')
    localStorage.removeItem('num_birth')
    localStorage.removeItem('num_day')
    localStorage.removeItem('num_month')
    localStorage.removeItem('num_year')
  }

  return (
    <div className="mod" style={{ maxWidth: 820 }}>
      <ModuleHeader
        icon={<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#2e6050" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/><circle cx="9" cy="7" r="2.2"/><circle cx="15" cy="12" r="2.2"/><circle cx="9" cy="17" r="2.2"/></svg>}
        title="Numerología"
        subtitle="Los números que guían tu camino y vibran en cada día"
      />

      {/* ── Daily number (always visible) ── */}
      <DailyCard number={dailyNumber} data={dailyData} today={today} affIdx={affIdx} />

      {/* ── Life path section ── */}
      {!confirmed ? (
        <BirthForm
          day={day} month={month} year={year}
          onDay={setDay} onMonth={setMonth} onYear={setYear}
          onCalculate={handleCalculate}
          error={error}
        />
      ) : (
        lifeData && (
          <LifePathCard
            number={lifePath}
            data={lifeData}
            day={day} month={month} year={year}
            affIdx={affIdx}
            onReset={handleReset}
          />
        )
      )}
    </div>
  )
}

// ─── Daily Number Card ────────────────────────────────────────
function DailyCard({ number, data, today, affIdx }) {
  if (!data) return null
  return (
    <div style={{
      background: `linear-gradient(135deg, ${data.colorDark}80, ${data.color}18)`,
      border: `1px solid ${data.color}40`,
      borderRadius: 20, padding: '32px 36px',
      marginBottom: 32, position: 'relative', overflow: 'hidden',
    }}>
      {/* Top glow */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${data.color}, transparent)`,
      }} />
      {/* Radial */}
      <div style={{
        position: 'absolute', top: -40, right: -40, width: 200, height: 200,
        background: `radial-gradient(circle, ${data.color}15, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
        {/* Number display */}
        <div style={{ textAlign: 'center', minWidth: 90 }}>
          <div style={{
            fontFamily: "'Cinzel',serif",
            fontSize: '3.8rem', fontWeight: 700, lineHeight: 1,
            color: data.color,
            textShadow: `0 0 30px ${data.color}60`,
          }}>{number}</div>
          {data.isMaster && (
            <div style={{
              fontSize: '0.62rem', letterSpacing: '0.2em',
              color: data.color, marginTop: 4,
              fontFamily: "'Cinzel',serif",
            }}>MAESTRO</div>
          )}
        </div>

        {/* Info */}
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: "'Cinzel',serif",
            fontSize: '0.68rem', letterSpacing: '0.22em',
            color: 'var(--silver-dim)', textTransform: 'uppercase', marginBottom: 6,
          }}>Número del día · {formatDate(today)}</div>
          <div style={{
            fontFamily: "'Cinzel',serif",
            fontSize: '1.1rem', fontWeight: 700,
            color: 'var(--white)', letterSpacing: '0.05em', marginBottom: 4,
          }}>{data.symbol} {data.name}</div>
          <div style={{ fontSize: '0.82rem', color: 'var(--silver-mid)', marginBottom: 12 }}>
            {data.essence}
          </div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 16px',
            background: `${data.color}14`,
            border: `1px solid ${data.color}35`,
            borderRadius: 100,
          }}>
            <span style={{ fontSize: '0.85rem' }}>✦</span>
            <span style={{
              fontSize: '0.82rem', color: 'var(--silver-hi)',
              fontFamily: "'Raleway',sans-serif", fontStyle: 'italic',
            }}>{data.todayMessage}</span>
          </div>
        </div>
      </div>

      {/* Daily affirmation */}
      <div style={{
        marginTop: 22, padding: '16px 20px',
        background: 'rgba(0,0,0,0.2)',
        border: `1px solid ${data.color}20`,
        borderRadius: 12,
      }}>
        <div style={{
          fontSize: '0.65rem', letterSpacing: '0.2em',
          color: 'var(--silver-dim)', marginBottom: 8,
          fontFamily: "'Cinzel',serif",
        }}>✦ AFIRMACIÓN DEL DÍA</div>
        <p style={{
          fontFamily: "'Cinzel',serif",
          fontSize: '0.9rem', fontStyle: 'italic',
          color: 'var(--silver-hi)', lineHeight: 1.7,
        }}>"{data.affirmations[affIdx]}"</p>
      </div>
    </div>
  )
}

// ─── Birth Date Form ──────────────────────────────────────────
function BirthForm({ day, month, year, onDay, onMonth, onYear, onCalculate, error }) {
  return (
    <div style={{
      background: 'var(--glass)', backdropFilter: 'blur(18px)',
      border: '1px solid var(--border)',
      borderRadius: 20, padding: '40px 36px',
      textAlign: 'center',
    }}>
      <div style={{ fontSize: '3rem', marginBottom: 16, opacity: 0.7 }}>🌌</div>
      <h3 style={{
        fontFamily: "'Cinzel',serif",
        fontSize: '1.1rem', letterSpacing: '0.08em',
        color: 'var(--white)', marginBottom: 8,
      }}>Descubre tu Número de Vida</h3>
      <p style={{
        color: 'var(--silver-dim)', fontSize: '0.85rem',
        lineHeight: 1.7, maxWidth: 420, margin: '0 auto 32px',
      }}>
        Tu número de vida es una vibración permanente calculada a partir de tu fecha de nacimiento.
        Revela tu propósito esencial y las energías que te acompañan toda la vida.
      </p>

      {/* Date inputs */}
      <div style={{
        display: 'flex', gap: 12, justifyContent: 'center',
        flexWrap: 'wrap', marginBottom: 24, maxWidth: 400, margin: '0 auto 24px',
      }}>
        <div style={{ flex: 1, minWidth: 70 }}>
          <label style={inputLabelStyle}>Día</label>
          <input
            type="number" min="1" max="31"
            placeholder="DD"
            value={day}
            onChange={e => onDay(e.target.value)}
            className="inp"
            style={{ textAlign: 'center', fontSize: '1.1rem', padding: '12px' }}
          />
        </div>
        <div style={{ flex: 1, minWidth: 70 }}>
          <label style={inputLabelStyle}>Mes</label>
          <input
            type="number" min="1" max="12"
            placeholder="MM"
            value={month}
            onChange={e => onMonth(e.target.value)}
            className="inp"
            style={{ textAlign: 'center', fontSize: '1.1rem', padding: '12px' }}
          />
        </div>
        <div style={{ flex: 1.5, minWidth: 90 }}>
          <label style={inputLabelStyle}>Año</label>
          <input
            type="number" min="1900" max="2025"
            placeholder="AAAA"
            value={year}
            onChange={e => onYear(e.target.value)}
            className="inp"
            style={{ textAlign: 'center', fontSize: '1.1rem', padding: '12px' }}
          />
        </div>
      </div>

      {error && (
        <p style={{ color: '#e74c3c', fontSize: '0.8rem', marginBottom: 16 }}>{error}</p>
      )}

      <button
        onClick={onCalculate}
        disabled={!day || !month || !year}
        style={{
          padding: '13px 36px',
          background: day && month && year
            ? 'linear-gradient(135deg, #1a2f7a, #6b21a8)'
            : 'rgba(40,40,70,0.5)',
          border: day && month && year
            ? '1px solid rgba(168,85,247,0.5)'
            : '1px solid var(--border)',
          borderRadius: 100, cursor: day && month && year ? 'pointer' : 'not-allowed',
          fontFamily: "'Cinzel',serif",
          fontSize: '0.88rem', fontWeight: 600,
          color: day && month && year ? 'var(--white)' : 'var(--silver-dim)',
          letterSpacing: '0.1em',
        }}
      >🔢 Calcular mi número de vida</button>
    </div>
  )
}

// ─── Life Path Card ───────────────────────────────────────────
function LifePathCard({ number, data, day, month, year, affIdx, onReset }) {
  const [expanded, setExpanded] = useState(false)
  const birthStr = `${day} de ${MONTHS_ES[parseInt(month) - 1]} de ${year}`

  return (
    <div style={{ animation: 'fadeUp 0.4s ease' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <p style={{
          fontFamily: "'Cinzel',serif",
          fontSize: '0.68rem', letterSpacing: '0.22em',
          color: 'var(--silver-dim)', textTransform: 'uppercase',
        }}>Tu número de vida</p>
        <button
          onClick={onReset}
          style={{
            padding: '6px 14px', borderRadius: 100,
            background: 'transparent', border: '1px solid var(--border)',
            cursor: 'pointer', fontSize: '0.72rem', color: 'var(--silver-dim)',
            fontFamily: "'Raleway',sans-serif",
          }}
        >Cambiar fecha</button>
      </div>

      {/* Main card */}
      <div style={{
        background: `linear-gradient(145deg, ${data.colorDark}90, ${data.color}14)`,
        border: `1px solid ${data.color}50`,
        borderRadius: 20, overflow: 'hidden',
        boxShadow: `0 0 50px ${data.color}18`,
        marginBottom: 24,
      }}>
        {/* Glow bar */}
        <div style={{
          height: 3,
          background: `linear-gradient(90deg, transparent, ${data.color}, transparent)`,
        }} />

        <div style={{ padding: '32px 36px' }}>
          {/* Number + name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, marginBottom: 24, flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                fontFamily: "'Cinzel',serif",
                fontSize: '5rem', fontWeight: 700, lineHeight: 1,
                color: data.color,
                textShadow: `0 0 40px ${data.color}70`,
              }}>{number}</div>
              {data.isMaster && (
                <div style={{
                  fontSize: '0.6rem', letterSpacing: '0.25em',
                  color: data.color, marginTop: 4, fontFamily: "'Cinzel',serif",
                }}>NÚMERO MAESTRO</div>
              )}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{
                fontFamily: "'Cinzel',serif",
                fontSize: '1.5rem', fontWeight: 700,
                color: 'var(--white)', letterSpacing: '0.06em', marginBottom: 6,
              }}>{data.symbol} {data.name}</div>
              <div style={{ fontSize: '0.85rem', color: data.color, marginBottom: 8 }}>
                {data.essence}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--silver-dim)' }}>
                Nacida/o el {birthStr}
              </div>
            </div>
          </div>

          {/* Meaning */}
          <div className="divider" />
          <p style={{
            color: 'var(--silver)', fontSize: '0.88rem',
            lineHeight: 1.8, marginBottom: 20,
            fontFamily: "'Raleway',sans-serif",
          }}>{data.meaning}</p>

          {/* Purpose */}
          <div style={{
            padding: '16px 20px',
            background: `${data.color}10`,
            border: `1px solid ${data.color}25`,
            borderRadius: 12, marginBottom: 24,
          }}>
            <div style={{
              fontSize: '0.65rem', letterSpacing: '0.2em',
              color: data.color, marginBottom: 8,
              fontFamily: "'Cinzel',serif",
            }}>✦ TU PROPÓSITO DE VIDA</div>
            <p style={{
              color: 'var(--silver-hi)', fontSize: '0.88rem',
              lineHeight: 1.7, fontStyle: 'italic',
            }}>{data.purpose}</p>
          </div>

          {/* Strengths + Challenges */}
          <div className="g2" style={{ gap: 16, marginBottom: 24 }}>
            <div>
              <p style={tagSectionLabel}>✦ Fortalezas</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {data.strengths.map(s => (
                  <span key={s} style={{
                    padding: '4px 12px', borderRadius: 100,
                    background: `${data.color}18`, border: `1px solid ${data.color}40`,
                    fontSize: '0.76rem', color: 'var(--silver-hi)',
                  }}>{s}</span>
                ))}
              </div>
            </div>
            <div>
              <p style={tagSectionLabel}>✦ Áreas de crecimiento</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
                {data.challenges.map(c => (
                  <span key={c} style={{
                    padding: '4px 12px', borderRadius: 100,
                    background: 'rgba(200,80,80,0.1)', border: '1px solid rgba(200,80,80,0.28)',
                    fontSize: '0.76rem', color: 'var(--silver-mid)',
                  }}>{c}</span>
                ))}
              </div>
            </div>
          </div>

          {/* Affirmations */}
          <div>
            <p style={tagSectionLabel}>✦ Afirmaciones de tu número</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {(expanded ? data.affirmations : data.affirmations.slice(0, 3)).map((a, i) => (
                <div key={i} style={{
                  padding: '12px 16px',
                  background: 'rgba(0,0,0,0.2)',
                  border: `1px solid ${data.color}18`,
                  borderRadius: 10,
                  fontSize: '0.85rem', color: 'var(--silver)',
                  fontStyle: 'italic', lineHeight: 1.6,
                  fontFamily: "'Cinzel',serif",
                }}>
                  "{a}"
                </div>
              ))}
            </div>
            {data.affirmations.length > 3 && (
              <button
                onClick={() => setExpanded(e => !e)}
                style={{
                  marginTop: 10, padding: '8px 20px',
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  borderRadius: 100, cursor: 'pointer',
                  fontSize: '0.78rem', color: 'var(--silver-dim)',
                  fontFamily: "'Raleway',sans-serif",
                }}
              >{expanded ? '↑ Ver menos' : `↓ Ver ${data.affirmations.length - 3} más`}</button>
            )}
          </div>
        </div>
      </div>
      {/* ── Sacred Codes Section ── */}
      <SacredCodesSection />
    </div>
  )
}

// ─── Sacred Codes ─────────────────────────────────────────────
function SacredCodesSection() {
  const [activeCategory, setActiveCategory] = useState(null)
  const [copiedCode, setCopiedCode] = useState(null)

  const copyCode = (code) => {
    navigator.clipboard?.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <div style={{ marginTop: 48 }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(201,162,39,0.12), rgba(168,85,247,0.08))',
        border: '1px solid rgba(201,162,39,0.25)',
        borderRadius: 20, padding: '32px 36px', marginBottom: 28,
      }}>
        <div style={{
          fontFamily: "'Cinzel',serif", fontSize: '0.68rem',
          letterSpacing: '0.22em', color: '#c9a227',
          textTransform: 'uppercase', marginBottom: 10,
        }}>✦ Códigos Sagrados</div>
        <h2 style={{
          fontFamily: "'Cinzel',serif", fontSize: '1.3rem',
          color: 'var(--white)', marginBottom: 12,
        }}>Números que transforman tu realidad</h2>
        <p style={{ color: 'var(--silver-mid)', fontSize: '0.88rem', lineHeight: 1.75, marginBottom: 24 }}>
          Los códigos sagrados son secuencias numéricas que usas como herramienta de enfoque y meditación.
          No hay magia complicada: eliges el número, lo repites (mentalmente o por escrito) y visualizas
          lo que deseas como si ya fuera real. Es una práctica de intención y consciencia.
        </p>

        {/* Cómo usarlos */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
          {HOW_TO_USE.map(item => (
            <div key={item.step} style={{
              background: 'rgba(0,0,0,0.2)', borderRadius: 12,
              padding: '14px 16px', border: '1px solid rgba(201,162,39,0.15)',
            }}>
              <div style={{
                width: 28, height: 28, borderRadius: '50%',
                background: 'linear-gradient(135deg, #c9a227, #a07a10)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.75rem', fontWeight: 700, color: 'white',
                marginBottom: 8,
              }}>{item.step}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--white)', marginBottom: 4 }}>{item.title}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--silver-dim)', lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Category selector */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 24 }}>
        {SACRED_CODE_CATEGORIES.map(cat => {
          const active = activeCategory?.id === cat.id
          return (
            <button key={cat.id} onClick={() => setActiveCategory(active ? null : cat)}
              style={{
                padding: '9px 18px',
                background: active ? `linear-gradient(135deg, ${cat.color}60, ${cat.color}30)` : 'var(--glass)',
                border: active ? `1px solid ${cat.color}70` : '1px solid var(--border)',
                borderRadius: 50, cursor: 'pointer',
                fontFamily: "'Raleway',sans-serif",
                fontSize: '0.82rem', fontWeight: active ? 700 : 400,
                color: active ? 'var(--white)' : 'var(--silver-mid)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s',
                boxShadow: active ? `0 0 16px ${cat.color}30` : 'none',
              }}>
              {cat.icon} {cat.name}
            </button>
          )
        })}
      </div>

      {/* Codes grid */}
      {activeCategory ? (
        <div style={{ animation: 'fadeUp 0.3s ease' }}>
          <div style={{
            background: `linear-gradient(135deg, ${activeCategory.color}12, rgba(0,0,0,0.1))`,
            border: `1px solid ${activeCategory.color}30`,
            borderRadius: 16, padding: '20px 24px', marginBottom: 20,
          }}>
            <p style={{ fontSize: '0.86rem', color: 'var(--silver-mid)', lineHeight: 1.7 }}>
              {activeCategory.description}
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 14 }}>
            {activeCategory.codes.map(item => (
              <div key={item.code} style={{
                background: 'var(--glass)', backdropFilter: 'blur(14px)',
                border: `1px solid ${activeCategory.color}25`,
                borderRadius: 14, padding: '18px 20px',
                transition: 'all 0.2s',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{
                    fontFamily: "'Cinzel',serif", fontSize: '1.5rem',
                    fontWeight: 700, color: activeCategory.color,
                    textShadow: `0 0 16px ${activeCategory.color}50`,
                  }}>{item.code}</span>
                  <button onClick={() => copyCode(item.code)} style={{
                    background: copiedCode === item.code ? `${activeCategory.color}30` : 'rgba(255,255,255,0.06)',
                    border: `1px solid ${activeCategory.color}30`,
                    borderRadius: 8, padding: '4px 10px', cursor: 'pointer',
                    fontSize: '0.68rem', color: 'var(--silver-dim)',
                    fontFamily: "'Raleway',sans-serif",
                    transition: 'all 0.2s',
                  }}>
                    {copiedCode === item.code ? '✓ Copiado' : 'Copiar'}
                  </button>
                </div>
                <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--white)', marginBottom: 5 }}>
                  {item.name}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--silver-dim)', lineHeight: 1.5 }}>
                  {item.use}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{
          padding: '36px', textAlign: 'center',
          border: '1px dashed rgba(201,162,39,0.2)',
          borderRadius: 16,
        }}>
          <div style={{ fontSize: '2rem', marginBottom: 10, opacity: 0.5 }}>✦</div>
          <p style={{ color: 'var(--silver-dim)', fontSize: '0.88rem' }}>
            Elige una categoría para ver sus códigos sagrados
          </p>
        </div>
      )}
    </div>
  )
}

// ── Shared styles ─────────────────────────────────────────────
const inputLabelStyle = {
  display: 'block',
  fontFamily: "'Cinzel',serif",
  fontSize: '0.62rem', letterSpacing: '0.18em',
  color: 'var(--silver-dim)', textTransform: 'uppercase',
  marginBottom: 6,
}

const tagSectionLabel = {
  fontFamily: "'Cinzel',serif",
  fontSize: '0.65rem', letterSpacing: '0.2em',
  color: 'var(--silver-dim)', textTransform: 'uppercase',
  marginBottom: 10,
}
