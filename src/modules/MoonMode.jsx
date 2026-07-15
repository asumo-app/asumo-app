import { useState, useMemo, useEffect, useRef } from 'react'
import ModuleHeader from '../components/ModuleHeader'

// ── Moon phase calculation ────────────────────────────────────────
function getMoonPhase(date) {
  const known = new Date(2000, 0, 6)
  const days  = (date - known) / 86400000
  const pos   = ((days % 29.53) + 29.53) % 29.53
  if (pos < 3.7)  return 0  // Nueva
  if (pos < 11.1) return 1  // Creciente
  if (pos < 18.5) return 2  // Llena
  return 3                   // Menguante
}

// ── Phase data ────────────────────────────────────────────────────
const PHASES = [
  {
    id: 'nueva',
    name: 'Luna Nueva',
    emoji: '🌑',
    tagline: 'Tiempo de sembrar intenciones',
    color: '#2e3d5f',
    glow: 'rgba(100,130,200,0.35)',
    border: 'rgba(150,180,255,0.25)',
    items: [
      { icon: '✂️', cat: 'Cabello',    text: 'No cortarlo, es momento de aplicar tratamientos reparadores e hidratación profunda.' },
      { icon: '🧴', cat: 'Piel',       text: 'Iniciar nuevos tratamientos de belleza y nuevos hábitos saludables.' },
      { icon: '💅', cat: 'Uñas',       text: 'No cortarlas, dejar que se regeneren.' },
      { icon: '🪒', cat: 'Depilación', text: 'No recomendada en esta fase.' },
      { icon: '🕯️', cat: 'Ritual',     text: 'Escribe tus intenciones del nuevo ciclo en un papel y léelas en voz alta.' },
      { icon: '🥛', cat: 'Manifestación con agua', text: 'Llena un vaso hasta la mitad representando tu situación actual. El segundo vaso vacío representa tu deseo. Concéntrate en cómo te sentirías si tu deseo ya fuera real. Pasa el agua del primer vaso al segundo mientras dices tu deseo en voz alta en presente. Bebe el agua del segundo vaso agradeciendo al universo. Hazlo cada noche antes de dormir durante el ciclo de Luna Nueva.' },
    ],
  },
  {
    id: 'creciente',
    name: 'Luna Creciente',
    emoji: '🌒',
    tagline: 'Tiempo de actuar y crecer',
    color: '#2a4a3a',
    glow: 'rgba(74,170,144,0.35)',
    border: 'rgba(107,200,160,0.28)',
    items: [
      { icon: '✂️', cat: 'Cabello',    text: 'Mejor momento para cortarlo si quieres que crezca rápido y fuerte.' },
      { icon: '🧴', cat: 'Piel',       text: 'Hidratación profunda, la piel absorbe mejor los tratamientos en esta fase.' },
      { icon: '💅', cat: 'Uñas',       text: 'Cortarlas para que crezcan más rápido.' },
      { icon: '🪒', cat: 'Depilación', text: 'Evitarla, el vello crece más rápido en esta fase.' },
      { icon: '🕯️', cat: 'Ritual',     text: 'Toma una acción concreta hacia tus metas cada día.' },
      { icon: '🥛', cat: 'Manifestación con agua', text: 'Escribe tu afirmación en positivo en una nota adhesiva y pégala en un vaso con agua. Frota tus manos para activar tu energía. Abraza el vaso transmitiendo tu energía positiva. Bebe el agua agradeciendo por el deseo cumplido.' },
    ],
  },
  {
    id: 'llena',
    name: 'Luna Llena',
    emoji: '🌕',
    tagline: 'Tiempo de celebrar y recibir',
    color: '#3d3520',
    glow: 'rgba(201,162,39,0.35)',
    border: 'rgba(230,195,80,0.28)',
    items: [
      { icon: '✂️', cat: 'Cabello',    text: 'Cortarlo para mayor volumen, densidad y fuerza. Lavar y aplicar mascarilla capilar.' },
      { icon: '🧴', cat: 'Piel',       text: 'Mascarilla desintoxicante y baño con sales para purificar el cuerpo.' },
      { icon: '💅', cat: 'Uñas',       text: 'Hacerse manicura para uñas más fuertes.' },
      { icon: '🪒', cat: 'Depilación', text: 'Evitarla en esta fase.' },
      { icon: '💎', cat: 'Cristales',  text: 'Cargar tus cristales bajo la luz de la luna llena. Limpiarlos con infusión de salvia y dejarlos donde toquen tierra y reciban luz lunar durante 48 horas.' },
      { icon: '🕯️', cat: 'Ritual',     text: 'Sal al aire libre, mira la luna y di en voz alta 3 cosas que agradeces de este ciclo.' },
    ],
  },
  {
    id: 'menguante',
    name: 'Luna Menguante',
    emoji: '🌘',
    tagline: 'Tiempo de soltar y limpiar',
    color: '#3a2a4a',
    glow: 'rgba(168,85,247,0.30)',
    border: 'rgba(200,140,255,0.25)',
    items: [
      { icon: '✂️', cat: 'Cabello',    text: 'Cortarlo si quieres mantener el corte más tiempo. Ideal para teñirlo y que el color dure más.' },
      { icon: '🧴', cat: 'Piel',       text: 'Exfoliación profunda, mascarilla de arcilla, limpieza y purificación.' },
      { icon: '💅', cat: 'Uñas',       text: 'Cortarlas para que crezcan más lento y fuertes.' },
      { icon: '🪒', cat: 'Depilación', text: 'Mejor momento para depilarse, el vello tarda más en crecer y es menos doloroso.' },
      { icon: '🕯️', cat: 'Ritual',     text: 'Escribe lo que quieres soltar en un papel y rómpelo como símbolo de liberación.' },
    ],
  },
]

// ── Popup component ───────────────────────────────────────────────
function PhasePopup({ phase, cardRect, onClose }) {
  const overlayRef = useRef(null)

  // Close on overlay click
  const handleOverlay = (e) => {
    if (e.target === overlayRef.current) onClose()
  }

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Prevent body scroll while popup open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlay}
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
        background: 'rgba(5, 10, 30, 0.55)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px 16px',
        animation: 'fadeIn 0.18s ease',
      }}
    >
      <div style={{
        position: 'relative',
        background: 'rgba(10, 16, 40, 0.82)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        border: `1px solid ${phase.border}`,
        borderRadius: 20,
        padding: '28px 24px 24px',
        maxWidth: 420,
        width: '100%',
        maxHeight: '80vh',
        overflowY: 'auto',
        boxShadow: `0 8px 48px rgba(0,0,0,0.55), 0 0 0 1px ${phase.border}`,
        animation: 'popupIn 0.22s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        {/* Top accent line */}
        <div style={{
          position: 'absolute', top: 0, left: '15%', right: '15%', height: 2,
          background: `linear-gradient(90deg, transparent, ${phase.glow.replace('0.35','0.9')}, transparent)`,
          borderRadius: 2,
        }} />

        {/* Close button */}
        <button onClick={onClose} style={{
          position: 'absolute', top: 14, right: 14,
          width: 30, height: 30, borderRadius: '50%',
          background: 'rgba(255,255,255,0.08)',
          border: '1px solid rgba(255,255,255,0.12)',
          color: 'rgba(200,216,236,0.7)',
          fontSize: '1rem', lineHeight: 1,
          cursor: 'pointer', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          transition: 'all 0.15s',
        }}
        onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.16)'}
        onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
        >✕</button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 22, paddingRight: 20 }}>
          <div style={{
            fontSize: '2.6rem', marginBottom: 8,
            filter: `drop-shadow(0 0 16px ${phase.glow})`,
          }}>{phase.emoji}</div>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.25rem', fontWeight: 700,
            color: '#f0f4ff', marginBottom: 4, letterSpacing: '0.04em',
          }}>{phase.name}</h2>
          <p style={{
            fontSize: '0.76rem', color: 'rgba(160,200,180,0.75)',
            letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>{phase.tagline}</p>
        </div>

        {/* Divider */}
        <div style={{
          height: 1, margin: '0 0 20px',
          background: `linear-gradient(90deg, transparent, ${phase.border}, transparent)`,
        }} />

        {/* Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          {phase.items.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
              <span style={{
                fontSize: '1.2rem', flexShrink: 0,
                marginTop: 1,
                filter: `drop-shadow(0 0 6px ${phase.glow})`,
              }}>{item.icon}</span>
              <div>
                <p style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: '0.7rem', fontWeight: 700,
                  letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'rgba(160,200,180,0.65)', marginBottom: 3,
                }}>{item.cat}</p>
                <p style={{
                  fontFamily: "'Raleway', sans-serif",
                  fontSize: '0.83rem', color: 'rgba(200,220,210,0.9)',
                  lineHeight: 1.65,
                }}>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Phase card ────────────────────────────────────────────────────
function PhaseCard({ phase, isActive, onClick }) {
  const ref = useRef(null)
  const [rect, setRect] = useState(null)

  const handleClick = () => {
    if (ref.current) setRect(ref.current.getBoundingClientRect())
    onClick()
  }

  return (
    <button
      ref={ref}
      onClick={handleClick}
      style={{
        flex: '1 1 0',
        minWidth: 0,
        background: isActive
          ? `linear-gradient(160deg, ${phase.color}cc, rgba(5,10,30,0.85))`
          : 'rgba(10,16,40,0.60)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${isActive ? phase.border : 'rgba(200,216,236,0.10)'}`,
        borderRadius: 16,
        padding: '22px 12px 18px',
        cursor: 'pointer',
        textAlign: 'center',
        transition: 'all 0.25s ease',
        boxShadow: isActive ? `0 4px 28px ${phase.glow}` : 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={e => {
        if (!isActive) {
          e.currentTarget.style.background = `linear-gradient(160deg, ${phase.color}88, rgba(5,10,30,0.75))`
          e.currentTarget.style.borderColor = phase.border
          e.currentTarget.style.transform = 'translateY(-3px)'
        }
      }}
      onMouseLeave={e => {
        if (!isActive) {
          e.currentTarget.style.background = 'rgba(10,16,40,0.60)'
          e.currentTarget.style.borderColor = 'rgba(200,216,236,0.10)'
          e.currentTarget.style.transform = 'translateY(0)'
        }
      }}
    >
      {isActive && (
        <div style={{
          position: 'absolute', top: 0, left: '10%', right: '10%', height: 1.5,
          background: `linear-gradient(90deg, transparent, ${phase.glow.replace('0.35','1')}, transparent)`,
        }} />
      )}

      <div style={{
        fontSize: 'clamp(1.8rem, 5vw, 2.4rem)',
        marginBottom: 10,
        filter: isActive ? `drop-shadow(0 0 14px ${phase.glow})` : 'none',
        transition: 'filter 0.25s',
      }}>{phase.emoji}</div>

      <p style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(0.68rem, 1.8vw, 0.82rem)',
        fontWeight: 600,
        color: isActive ? '#f0f4ff' : 'rgba(180,200,220,0.70)',
        lineHeight: 1.3,
        marginBottom: 6,
        letterSpacing: '0.01em',
      }}>{phase.name}</p>

      <p style={{
        fontFamily: "'Raleway', sans-serif",
        fontSize: 'clamp(0.58rem, 1.3vw, 0.66rem)',
        color: isActive ? 'rgba(160,210,185,0.85)' : 'rgba(130,160,150,0.55)',
        lineHeight: 1.4,
        letterSpacing: '0.02em',
      }}>{phase.tagline}</p>

      {isActive && (
        <div style={{
          marginTop: 12,
          display: 'inline-block',
          width: 6, height: 6, borderRadius: '50%',
          background: phase.glow.replace('0.35','0.9'),
          boxShadow: `0 0 8px ${phase.glow}`,
        }} />
      )}
    </button>
  )
}

// ── Main ──────────────────────────────────────────────────────────
export default function MoonMode() {
  const today = useMemo(() => new Date(), [])
  const currentPhaseIdx = useMemo(() => getMoonPhase(today), [today])
  const [openIdx, setOpenIdx] = useState(null)

  const handleCardClick = (idx) => {
    setOpenIdx(prev => prev === idx ? null : idx)
  }

  return (
    <div className="mod" style={{ maxWidth: 820 }}>
      <ModuleHeader
        icon={
          <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
            stroke="#2e6050" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
          </svg>
        }
        title="Modo Luna"
        subtitle="Alinéate con los ciclos lunares para potenciar tu bienestar"
      />

      {/* Current phase indicator */}
      <div style={{
        textAlign: 'center',
        marginBottom: 28,
        padding: '12px 0',
      }}>
        <p style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: '0.70rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(107,168,142,0.75)',
          marginBottom: 4,
        }}>Fase actual</p>
        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: '1rem',
          color: '#0e3d2e',
          fontWeight: 600,
        }}>
          {PHASES[currentPhaseIdx].emoji} {PHASES[currentPhaseIdx].name}
        </p>
      </div>

      {/* 4 phase cards */}
      <div style={{
        display: 'flex',
        gap: 10,
        marginBottom: 16,
      }}>
        {PHASES.map((phase, idx) => (
          <PhaseCard
            key={phase.id}
            phase={phase}
            isActive={currentPhaseIdx === idx}
            onClick={() => handleCardClick(idx)}
          />
        ))}
      </div>

      <p style={{
        textAlign: 'center',
        fontFamily: "'Raleway', sans-serif",
        fontSize: '0.72rem',
        color: 'rgba(46,96,80,0.55)',
        letterSpacing: '0.06em',
        marginTop: 8,
      }}>Toca cualquier fase para ver rituales y consejos ✦</p>

      {/* Popup */}
      {openIdx !== null && (
        <PhasePopup
          phase={PHASES[openIdx]}
          onClose={() => setOpenIdx(null)}
        />
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0 }
          to   { opacity: 1 }
        }
        @keyframes popupIn {
          from { opacity: 0; transform: scale(0.92) translateY(8px) }
          to   { opacity: 1; transform: scale(1) translateY(0) }
        }
      `}</style>
    </div>
  )
}
