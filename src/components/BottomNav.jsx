import { useState } from 'react'

// Items always visible in the bar
const BAR_ITEMS = [
  { id: 'home',   icon: '✦',  label: 'Inicio' },
  { id: 'zodiac', icon: '⭐', label: 'Signos' },
  { id: 'chat',   icon: '💬', label: 'Chat' },
  { id: 'moon',   icon: '🌙', label: 'Luna' },
]

// Items inside the "Más" drawer
const MORE_ITEMS = [
  { id: 'numerology', icon: '🔢', label: 'Numerología',    color: '#c9a227' },
  { id: 'selflove',   icon: '💜', label: 'Amor Propio',    color: '#a855f7' },
  { id: 'music',      icon: '🎵', label: 'Musicoterapia',  color: '#c9a227' },
  { id: 'goals',      icon: '🎯', label: 'Metas',          color: '#16a085' },
  { id: 'hobbies',    icon: '🎨', label: 'Hobbies',        color: '#e67e22' },
  { id: 'checkin',    icon: '✨', label: 'Bienestar',      color: '#00bcd4' },
  { id: 'letter',     icon: '💌', label: 'Carta Futura',   color: '#e91e8c' },
  { id: 'vision',     icon: '🔮', label: 'Vision Board',   color: '#6b21a8' },
  { id: 'about',      icon: '💫', label: 'Sobre Asumo',    color: '#c9a227' },
]

export default function BottomNav({ current, onNav }) {
  const [moreOpen, setMoreOpen] = useState(false)

  const navigate = (id) => {
    setMoreOpen(false)
    onNav(id)
  }

  // Is current page one of the "Más" items?
  const moreActive = MORE_ITEMS.some(i => i.id === current)

  return (
    <>
      {/* ── "Más" backdrop ── */}
      {moreOpen && (
        <div
          onClick={() => setMoreOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 110,
            background: 'rgba(3,3,16,0.75)',
            backdropFilter: 'blur(6px)',
          }}
        />
      )}

      {/* ── "Más" drawer ── */}
      <div style={{
        position: 'fixed', bottom: 64, left: 0, right: 0,
        zIndex: 120,
        background: 'rgba(7,7,42,0.97)',
        backdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(200,216,236,0.15)',
        borderRadius: '20px 20px 0 0',
        padding: '20px 16px 16px',
        transform: moreOpen ? 'translateY(0)' : 'translateY(100%)',
        opacity: moreOpen ? 1 : 0,
        transition: 'transform 0.35s cubic-bezier(0.32,0.72,0,1), opacity 0.25s ease',
        pointerEvents: moreOpen ? 'auto' : 'none',
      }}>
        {/* Handle bar */}
        <div style={{
          width: 36, height: 4, borderRadius: 2,
          background: 'rgba(200,216,236,0.2)',
          margin: '0 auto 20px',
        }} />

        <p style={{
          fontFamily: "'Cinzel',serif",
          fontSize: '0.68rem', letterSpacing: '0.22em',
          color: 'var(--silver-dim)', textTransform: 'uppercase',
          textAlign: 'center', marginBottom: 18,
        }}>Todos los módulos</p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 10,
          maxWidth: 360, margin: '0 auto',
        }}>
          {MORE_ITEMS.map(item => {
            const active = current === item.id
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                style={{
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', gap: 6,
                  padding: '14px 8px',
                  background: active ? `${item.color}20` : 'rgba(255,255,255,0.03)',
                  border: active ? `1px solid ${item.color}55` : '1px solid rgba(200,216,236,0.08)',
                  borderRadius: 14, cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: active ? `0 0 14px ${item.color}25` : 'none',
                }}
              >
                <span style={{
                  fontSize: '1.5rem',
                  filter: active ? `drop-shadow(0 0 8px ${item.color})` : 'none',
                }}>{item.icon}</span>
                <span style={{
                  fontFamily: "'Raleway',sans-serif",
                  fontSize: '0.65rem', fontWeight: active ? 700 : 400,
                  color: active ? 'var(--white)' : 'var(--silver-dim)',
                  letterSpacing: '0.02em', textAlign: 'center',
                  lineHeight: 1.2,
                }}>{item.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <nav style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        height: 64, zIndex: 130,
        background: 'rgba(5,5,28,0.97)',
        backdropFilter: 'blur(24px)',
        borderTop: '1px solid rgba(200,216,236,0.12)',
        display: 'flex', alignItems: 'stretch',
        boxShadow: '0 -4px 30px rgba(0,0,0,0.4)',
      }}>
        {BAR_ITEMS.map(item => {
          const active = current === item.id
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.id)}
              style={{
                flex: 1, display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 3,
                background: 'transparent', border: 'none', cursor: 'pointer',
                position: 'relative',
                transition: 'all 0.2s ease',
              }}
            >
              {/* Active top indicator */}
              {active && (
                <div style={{
                  position: 'absolute', top: 0, left: '20%', right: '20%', height: 2,
                  background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.9), transparent)',
                  borderRadius: '0 0 2px 2px',
                }} />
              )}
              <span style={{
                fontSize: '1.2rem',
                filter: active
                  ? 'drop-shadow(0 0 8px rgba(168,85,247,0.9))'
                  : 'none',
                transform: active ? 'scale(1.15)' : 'scale(1)',
                transition: 'all 0.2s ease',
              }}>{item.icon}</span>
              <span style={{
                fontFamily: "'Raleway',sans-serif",
                fontSize: '0.6rem',
                fontWeight: active ? 700 : 400,
                color: active ? 'var(--white)' : 'var(--silver-dim)',
                letterSpacing: '0.04em',
                transition: 'color 0.2s',
              }}>{item.label}</span>
            </button>
          )
        })}

        {/* Más button */}
        <button
          onClick={() => setMoreOpen(o => !o)}
          style={{
            flex: 1, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 3,
            background: 'transparent', border: 'none', cursor: 'pointer',
            position: 'relative',
            transition: 'all 0.2s ease',
          }}
        >
          {(moreActive || moreOpen) && (
            <div style={{
              position: 'absolute', top: 0, left: '20%', right: '20%', height: 2,
              background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.9), transparent)',
              borderRadius: '0 0 2px 2px',
            }} />
          )}
          {/* Dots icon */}
          <span style={{
            display: 'flex', gap: 2, alignItems: 'center',
            transform: moreOpen ? 'rotate(90deg) scale(1.1)' : 'scale(1)',
            transition: 'transform 0.25s ease',
            marginBottom: 1,
          }}>
            {[0,1,2].map(i => (
              <span key={i} style={{
                width: 4, height: 4, borderRadius: '50%',
                background: (moreActive || moreOpen) ? 'var(--white)' : 'var(--silver-dim)',
                transition: 'background 0.2s',
                display: 'block',
              }} />
            ))}
          </span>
          <span style={{
            fontFamily: "'Raleway',sans-serif",
            fontSize: '0.6rem',
            fontWeight: (moreActive || moreOpen) ? 700 : 400,
            color: (moreActive || moreOpen) ? 'var(--white)' : 'var(--silver-dim)',
            letterSpacing: '0.04em',
            transition: 'color 0.2s',
          }}>Más</span>
        </button>
      </nav>
    </>
  )
}
