import { useState } from 'react'

const NAV_ITEMS = [
  { id: 'home',     icon: '✦',  label: 'Inicio' },
  { id: 'zodiac',   icon: '♈',  label: 'Signos Zodiacales' },
  { id: 'chat',     icon: '💬',  label: 'Chat de Apoyo' },
  { id: 'selflove', icon: '💜',  label: 'Amor Propio' },
  { id: 'music',    icon: '🎵',  label: 'Musicoterapia' },
  { id: 'goals',    icon: '🎯',  label: 'Metas & Intenciones' },
  { id: 'hobbies',  icon: '🎨',  label: 'Hobbies Creativos' },
  { id: 'moon',     icon: '🌙',  label: 'Modo Luna' },
  { id: 'checkin',  icon: '✨',  label: 'Check-in Emocional' },
  { id: 'letter',   icon: '💌',  label: 'Carta al Futuro' },
  { id: 'vision',   icon: '🔮',  label: 'Vision Board' },
]

export default function Navigation({ current, onNav }) {
  const [collapsed, setCollapsed] = useState(false)

  const w = collapsed ? '64px' : 'var(--nav-w)'

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, bottom: 0,
      width: w, zIndex: 100,
      background: 'rgba(7,7,42,0.92)',
      backdropFilter: 'blur(20px)',
      borderRight: '1px solid rgba(200,216,236,0.1)',
      display: 'flex', flexDirection: 'column',
      transition: 'width 0.3s cubic-bezier(0.4,0,0.2,1)',
      overflow: 'hidden',
    }}>
      {/* Logo */}
      <div style={{
        padding: collapsed ? '24px 0' : '24px 20px',
        display: 'flex', alignItems: 'center', gap: 12,
        borderBottom: '1px solid rgba(200,216,236,0.08)',
        cursor: 'pointer',
        justifyContent: collapsed ? 'center' : 'flex-start',
      }} onClick={() => setCollapsed(c => !c)}>
        <div style={{
          width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #1a2f7a, #6b21a8)',
          border: '1px solid rgba(200,216,236,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, boxShadow: '0 0 16px rgba(168,85,247,0.35)',
        }}>✦</div>
        {!collapsed && (
          <div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: '1.1rem',
              fontWeight: 700, letterSpacing: '0.12em', color: '#e0ecff',
              lineHeight: 1,
            }}>ASUMO</div>
            <div style={{ fontSize: '0.6rem', color: 'var(--silver-dim)', letterSpacing: '0.2em', marginTop: 2 }}>
              BIENESTAR CÓSMICO
            </div>
          </div>
        )}
      </div>

      {/* Nav items */}
      <div style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden', padding: '12px 0' }}>
        {NAV_ITEMS.map(item => {
          const active = current === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNav(item.id)}
              title={collapsed ? item.label : ''}
              style={{
                width: '100%', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center',
                gap: 12,
                padding: collapsed ? '11px 0' : '11px 18px',
                justifyContent: collapsed ? 'center' : 'flex-start',
                background: active
                  ? 'linear-gradient(90deg, rgba(26,47,122,0.6), rgba(107,33,168,0.4))'
                  : 'transparent',
                borderLeft: active ? '2px solid rgba(168,85,247,0.8)' : '2px solid transparent',
                transition: 'all 0.2s ease',
                position: 'relative',
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.background = 'rgba(200,216,236,0.05)' }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent' }}
            >
              <span style={{
                fontSize: item.id === 'home' ? '1rem' : '1.15rem',
                flexShrink: 0,
                filter: active ? 'drop-shadow(0 0 6px rgba(168,85,247,0.8))' : 'none',
                transition: 'filter 0.2s',
                width: 24, textAlign: 'center',
              }}>{item.icon}</span>
              {!collapsed && (
                <span style={{
                  fontSize: '0.8rem',
                  fontWeight: active ? 600 : 400,
                  color: active ? 'var(--silver-hi)' : 'var(--silver-mid)',
                  letterSpacing: '0.03em',
                  whiteSpace: 'nowrap',
                  fontFamily: "'Raleway', sans-serif",
                  transition: 'color 0.2s',
                }}>{item.label}</span>
              )}
              {active && !collapsed && (
                <div style={{
                  marginLeft: 'auto',
                  width: 5, height: 5, borderRadius: '50%',
                  background: 'var(--purple-l)',
                  boxShadow: '0 0 8px var(--purple-l)',
                  flexShrink: 0,
                }} />
              )}
            </button>
          )
        })}
      </div>

      {/* Footer */}
      {!collapsed && (
        <div style={{
          padding: '14px 18px',
          borderTop: '1px solid rgba(200,216,236,0.08)',
          fontSize: '0.67rem', color: 'var(--silver-dim)',
          letterSpacing: '0.08em', textAlign: 'center',
          lineHeight: 1.6,
        }}>
          ✦ Hoy es un buen día<br/>para crecer ✦
        </div>
      )}
    </nav>
  )
}
