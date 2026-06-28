import { useState, useMemo } from 'react'
import { moonPhases } from '../data/cosmicData'

function getMoonData(date) {
  const known = new Date(2000, 0, 6)
  const days = (date - known) / 86400000
  const pos = ((days % 29.53) + 29.53) % 29.53
  const pct = Math.round((pos / 29.53) * 100)
  let idx = 0
  if (pos < 1.85) idx = 0
  else if (pos < 7.38) idx = 1
  else if (pos < 11.07) idx = 2
  else if (pos < 14.77) idx = 3
  else if (pos < 18.46) idx = 4
  else if (pos < 22.15) idx = 5
  else if (pos < 25.84) idx = 6
  else idx = 7
  return { phase: moonPhases[idx], pct, pos: Math.round(pos) }
}

export default function MoonMode() {
  const today = new Date()
  const { phase, pct, pos } = useMemo(() => getMoonData(today), [])
  const [intention, setIntention] = useState('')
  const [saved, setSaved] = useState(false)
  const [tab, setTab] = useState('fase')

  const TABS = [
    { id:'fase', label:'🌙 Mi Luna' },
    { id:'rituales', label:'✦ Rituales' },
    { id:'cristales', label:'💎 Cristales' },
    { id:'intenciones', label:'📜 Intenciones' },
  ]

  const nextFull = useMemo(() => {
    const d = new Date(today)
    const remaining = 14.77 - pos
    if (remaining > 0) d.setDate(d.getDate() + Math.round(remaining))
    else d.setDate(d.getDate() + Math.round(29.53 - pos + 14.77))
    return d.toLocaleDateString('es-ES', { day: 'numeric', month: 'long' })
  }, [pos])

  return (
    <div className="mod" style={{ maxWidth: 820 }}>
      <div className="mod-hd">
        <span className="mod-icon" style={{ animation: 'moonGlow 3s ease-in-out infinite' }}>🌙</span>
        <h1 className="mod-title">Modo Luna</h1>
        <p className="mod-sub">Alinéate con los ciclos lunares para potenciar tu bienestar</p>
      </div>

      {/* Current moon hero */}
      <div className="card" style={{
        padding: '36px 32px',
        textAlign: 'center',
        marginBottom: 28,
        background: 'radial-gradient(ellipse at 50% 0%, rgba(13,22,84,0.8) 0%, var(--glass) 60%)',
        border: '1px solid rgba(200,216,236,0.2)',
        boxShadow: '0 0 60px rgba(200,216,236,0.08)',
      }}>
        <div style={{
          fontSize: '5rem',
          marginBottom: 16,
          animation: 'moonGlow 3s ease-in-out infinite',
          filter: 'drop-shadow(0 0 20px rgba(200,216,236,0.6))',
        }}>{phase.icon}</div>

        <h2 style={{
          fontFamily: "'Cinzel',serif",
          fontSize: '1.6rem', fontWeight: 600,
          letterSpacing: '0.1em', marginBottom: 8,
          textShadow: '0 0 20px rgba(200,216,236,0.5)',
        }}>{phase.name}</h2>

        <p style={{ color: 'var(--silver-mid)', marginBottom: 20, fontSize: '0.88rem', letterSpacing: '0.06em' }}>
          {phase.energy}
        </p>

        {/* Phase progress */}
        <div style={{ maxWidth: 340, margin: '0 auto 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--silver-dim)', marginBottom: 8 }}>
            <span>🌑 Luna Nueva</span>
            <span>Ciclo: {pos}/29 días</span>
            <span>🌕 Luna Llena</span>
          </div>
          <div style={{ background: 'rgba(10,20,60,0.8)', borderRadius: 99, height: 10, overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 99,
              width: `${pct}%`,
              background: 'linear-gradient(90deg, rgba(200,216,236,0.3), rgba(200,216,236,0.9))',
              boxShadow: '0 0 12px rgba(200,216,236,0.5)',
              transition: 'width 0.6s ease',
            }} />
          </div>
          <div style={{ textAlign: 'center', marginTop: 8, fontSize: '0.75rem', color: 'var(--silver-mid)' }}>
            {pct}% del ciclo lunar
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          <span className="badge badge-s">Próxima Luna Llena: {nextFull}</span>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 24, flexWrap: 'wrap' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`btn btn-sm ${tab === t.id ? '' : 'btn-ghost'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Phase info */}
      {tab === 'fase' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, animation: 'fadeUp 0.4s ease' }}>
          <div className="card-l" style={{ padding: '24px' }}>
            <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: '0.85rem', letterSpacing: '0.12em', color: 'var(--silver)', marginBottom: 14 }}>
              ✦ SOBRE ESTA FASE
            </h3>
            <p style={{ color: 'var(--silver-mid)', fontSize: '0.88rem', lineHeight: 1.75 }}>
              {phase.description}
            </p>
          </div>

          <div className="card" style={{
            padding: '24px 28px', textAlign: 'center',
            border: '1px solid rgba(200,216,236,0.15)',
          }}>
            <p style={{ fontSize: '0.72rem', color: 'var(--silver-dim)', letterSpacing: '0.1em', marginBottom: 12 }}>
              AFIRMACIÓN LUNAR
            </p>
            <p style={{
              fontFamily: "'Cinzel',serif",
              fontStyle: 'italic', fontSize: '1.05rem',
              color: 'var(--silver-hi)', lineHeight: 1.7, letterSpacing: '0.03em',
            }}>
              "{phase.affirmation}"
            </p>
          </div>
        </div>
      )}

      {/* Rituals */}
      {tab === 'rituales' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, animation: 'fadeUp 0.4s ease' }}>
          <p style={{ fontSize: '0.82rem', color: 'var(--silver-mid)', marginBottom: 4 }}>
            Rituales recomendados para la {phase.name}:
          </p>
          {phase.rituals.map((r, i) => (
            <div key={i} className="card-l" style={{
              padding: '16px 20px',
              display: 'flex', alignItems: 'flex-start', gap: 14,
            }}>
              <div style={{
                width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, rgba(13,22,84,0.8), rgba(107,33,168,0.3))',
                border: '1px solid rgba(200,216,236,0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.75rem', color: 'var(--silver-mid)', fontWeight: 700,
              }}>{i + 1}</div>
              <p style={{ color: 'var(--silver)', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}>{r}</p>
            </div>
          ))}
        </div>
      )}

      {/* Crystals */}
      {tab === 'cristales' && (
        <div style={{ animation: 'fadeUp 0.4s ease' }}>
          <p style={{ fontSize: '0.82rem', color: 'var(--silver-mid)', marginBottom: 20 }}>
            Cristales alineados con la energía de la {phase.name}:
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: 14,
          }}>
            {phase.crystals.map((c, i) => (
              <div key={i} className="card" style={{
                padding: '24px 18px', textAlign: 'center',
                border: '1px solid rgba(200,216,236,0.12)',
              }}>
                <div style={{
                  fontSize: '2rem', marginBottom: 10,
                  filter: 'drop-shadow(0 0 12px rgba(200,216,236,0.4))',
                }}>💎</div>
                <div style={{
                  fontFamily: "'Cinzel',serif", fontSize: '0.78rem',
                  fontWeight: 600, letterSpacing: '0.06em',
                  color: 'var(--silver-hi)',
                }}>{c}</div>
              </div>
            ))}
          </div>

          <div className="card-l" style={{ padding: '20px 24px', marginTop: 20 }}>
            <h4 style={{ fontFamily: "'Cinzel',serif", fontSize: '0.8rem', letterSpacing: '0.12em', color: 'var(--silver)', marginBottom: 12 }}>
              ✦ CÓMO USAR TUS CRISTALES
            </h4>
            <p style={{ fontSize: '0.82rem', color: 'var(--silver-mid)', lineHeight: 1.7 }}>
              Durante la luna llena, coloca tus cristales bajo la luz de la luna por una noche completa para recargarlos.
              En otras fases, tenlos cerca mientras meditas o escribes tus intenciones. Programa cada cristal con una intención específica sosteniéndolo entre tus manos y visualizando tu deseo.
            </p>
          </div>
        </div>
      )}

      {/* Intentions */}
      {tab === 'intenciones' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, animation: 'fadeUp 0.4s ease' }}>
          <div className="card-l" style={{ padding: '18px 22px' }}>
            <p style={{ fontSize: '0.82rem', color: 'var(--silver-mid)', lineHeight: 1.7 }}>
              La {phase.name} es el momento perfecto para <strong style={{ color: 'var(--white)' }}>{phase.energy.toLowerCase()}</strong>.
              Escribe tu intención consciente para este ciclo:
            </p>
          </div>

          <textarea className="inp" style={{ minHeight: 150 }}
            placeholder={`Mi intención para esta ${phase.name} es…`}
            value={intention}
            onChange={e => { setIntention(e.target.value); setSaved(false) }}
          />

          <button className="btn btn-lg" onClick={() => {
            if (intention.trim()) {
              const intents = JSON.parse(localStorage.getItem('moon_intents') || '[]')
              intents.unshift({
                text: intention,
                phase: phase.name,
                icon: phase.icon,
                date: new Date().toLocaleDateString('es'),
              })
              localStorage.setItem('moon_intents', JSON.stringify(intents.slice(0, 24)))
              setSaved(true)
            }
          }} style={{ background: 'linear-gradient(135deg, var(--navy), rgba(200,216,236,0.2))' }}>
            {saved ? '✓ Intención guardada' : '🌙 Sellar intención lunar'}
          </button>
        </div>
      )}
    </div>
  )
}
