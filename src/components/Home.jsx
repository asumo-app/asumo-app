import { useState, useMemo } from 'react'
import { calcDailyNumber, NUMEROLOGY, DAILY_HOME_PHRASES } from '../data/numerologyData'

// ── Moon phase ────────────────────────────────────────────────
function getMoonPhase(date) {
  const known = new Date(2000, 0, 6)
  const days = (date - known) / 86400000
  const pos = ((days % 29.53) + 29.53) % 29.53
  if (pos <  1.85) return { name: 'Luna Nueva',       icon: '🌑', desc: 'Energía de nuevos comienzos y siembra de intenciones.' }
  if (pos <  7.38) return { name: 'Luna Creciente',   icon: '🌒', desc: 'Momento de acción y construcción de tus sueños.' }
  if (pos < 11.07) return { name: 'Cuarto Creciente', icon: '🌓', desc: 'Supera obstáculos con determinación y claridad.' }
  if (pos < 14.77) return { name: 'Gibosa Creciente', icon: '🌔', desc: 'Tu esfuerzo está muy cerca de dar su fruto.' }
  if (pos < 18.46) return { name: 'Luna Llena',       icon: '🌕', desc: 'Plena manifestación y culminación de ciclos.' }
  if (pos < 22.15) return { name: 'Gibosa Menguante', icon: '🌖', desc: 'Gratitud y tiempo de compartir tus logros.' }
  if (pos < 25.84) return { name: 'Cuarto Menguante', icon: '🌗', desc: 'Libera lo que ya no te sirve con amor.' }
  return                  { name: 'Luna Menguante',   icon: '🌘', desc: 'Descanso, reflexión y preparación del nuevo ciclo.' }
}

const MODULES = [
  { id:'zodiac',     icon:'⭐', name:'Signos Zodiacales',  desc:'Afirmación diaria por signo', color:'#c44569' },
  { id:'chat',       icon:'💬', name:'Chat de Apoyo',      desc:'IA empática y presente',     color:'#4f9eff' },
  { id:'numerology', icon:'🔢', name:'Numerología',        desc:'Tu número de vida y del día', color:'#c9a227' },
  { id:'moon',       icon:'🌙', name:'Modo Luna',          desc:'Rituales y energía lunar',   color:'#7f8c8d' },
  { id:'selflove',   icon:'💜', name:'Amor Propio',        desc:'Rituales y afirmaciones',    color:'#a855f7' },
  { id:'music',      icon:'🎵', name:'Musicoterapia',      desc:'Música para el alma',        color:'#c9a227' },
  { id:'goals',      icon:'🎯', name:'Metas & Intenciones', desc:'Calendario mensual',        color:'#16a085' },
  { id:'hobbies',    icon:'🎨', name:'Ritual Creativo',    desc:'Expresión consciente',      color:'#e67e22' },
  { id:'checkin',    icon:'✨', name:'Mi Bienestar Diario',desc:'Emociones y rutinas',        color:'#00bcd4' },
  { id:'letter',     icon:'💌', name:'Carta al Futuro',    desc:'Cápsula del tiempo',         color:'#e91e8c' },
  { id:'vision',     icon:'🔮', name:'Vision Board',       desc:'Tu vida soñada',             color:'#6b21a8' },
]

const DIAS  = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb']
const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
               'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

export default function Home({ onNav }) {
  const now     = useMemo(() => new Date(), [])
  const moon    = useMemo(() => getMoonPhase(now), [now])
  const dayNum  = useMemo(() => calcDailyNumber(now), [now])
  const numData = NUMEROLOGY[dayNum]

  // Load user profile
  const profile   = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('user_profile') || '{}') } catch { return {} }
  }, [])
  const firstName = profile.name?.split(' ')[0] || ''

  // Daily banner — dismissed once per day
  const todayStr = now.toDateString()
  const [bannerDismissed, setBannerDismissed] = useState(() => {
    try {
      const d = JSON.parse(localStorage.getItem('aff_banner_dismissed') || '{}')
      return d.date === todayStr
    } catch { return false }
  })

  const dismissBanner = () => {
    localStorage.setItem('aff_banner_dismissed', JSON.stringify({ date: todayStr }))
    setBannerDismissed(true)
  }

  const greet = () => {
    const h = now.getHours()
    if (h < 12) return 'Buenos días'
    if (h < 19) return 'Buenas tardes'
    return 'Buenas noches'
  }

  return (
    <div className="mod" style={{ maxWidth: 1100 }}>

      {/* ── Daily affirmation banner ── */}
      {!bannerDismissed && (
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 14, flexWrap: 'wrap',
          padding: '16px 22px',
          background: 'linear-gradient(135deg, rgba(201,162,39,0.16), rgba(201,162,39,0.06))',
          border: '1px solid rgba(201,162,39,0.35)',
          borderRadius: 16, marginBottom: 28,
          animation: 'fadeUp 0.4s ease',
          position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.7), transparent)',
          }} />
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: '1.4rem',
              filter: 'drop-shadow(0 0 8px rgba(201,162,39,0.7))',
              animation: 'float 2.5s ease-in-out infinite',
            }}>⭐</span>
            <div>
              <p style={{ fontFamily: "'Cinzel',serif", fontSize: '0.82rem',
                fontWeight: 600, color: 'var(--white)', marginBottom: 2 }}>
                {firstName
                  ? `${firstName}, tu afirmación de hoy te está esperando`
                  : 'Tu afirmación de hoy te está esperando'}
              </p>
              <p style={{ fontSize: '0.72rem', color: 'var(--silver-dim)' }}>
                Un mensaje cósmico para este día ✦
              </p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <button onClick={() => onNav('zodiac')} style={{
              padding: '9px 20px', borderRadius: 100,
              background: 'linear-gradient(135deg, rgba(201,162,39,0.5), rgba(201,162,39,0.3))',
              border: '1px solid rgba(201,162,39,0.5)', cursor: 'pointer',
              fontFamily: "'Cinzel',serif", fontSize: '0.78rem', fontWeight: 600,
              color: 'var(--gold-hi)', letterSpacing: '0.06em',
              whiteSpace: 'nowrap',
            }}>Ver mi afirmación →</button>
            <button onClick={dismissBanner} style={{
              background: 'transparent', border: '1px solid rgba(200,216,236,0.15)',
              borderRadius: '50%', width: 28, height: 28, cursor: 'pointer',
              color: 'var(--silver-dim)', fontSize: '0.9rem',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>×</button>
          </div>
        </div>
      )}

      {/* ── Hero ── */}
      <div style={{ textAlign: 'center', marginBottom: 36 }}>
        <div style={{
          fontSize: '3.5rem', marginBottom: 10,
          animation: 'float 3.5s ease-in-out infinite',
          filter: 'drop-shadow(0 0 24px rgba(201,162,39,0.5))',
        }}>✦</div>
        <h1 style={{
          fontFamily: "'Cinzel',serif",
          fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: 700,
          letterSpacing: '0.12em',
          background: 'linear-gradient(135deg, #e0ecff, #c8d8ec, #c9a227, #e0ecff)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          animation: 'shimmer 4s linear infinite', marginBottom: 8,
        }}>ASUMO</h1>
        <p style={{ color: 'var(--silver-mid)', letterSpacing: '0.25em',
          fontSize: '0.8rem', marginBottom: 18 }}>
          BIENESTAR EMOCIONAL CÓSMICO
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap' }}>
          {firstName && (
            <span className="badge badge-g">✦ {greet()}, {firstName}</span>
          )}
          {!firstName && <span className="badge badge-s">{greet()}</span>}
          <span className="badge badge-g">{moon.icon} {moon.name}</span>
          <span className="badge badge-s">
            {DIAS[now.getDay()]}, {now.getDate()} {MESES[now.getMonth()]} {now.getFullYear()}
          </span>
        </div>
      </div>

      {/* ── Tu energía de hoy ── */}
      <section style={{ marginBottom: 36 }}>
        <h2 style={{ fontFamily: "'Cinzel',serif", fontSize: '0.72rem',
          letterSpacing: '0.28em', color: 'var(--silver-dim)', textTransform: 'uppercase',
          textAlign: 'center', marginBottom: 16 }}>Tu energía de hoy</h2>

        <div className="g2" style={{ gap: 14 }}>
          {/* Moon card */}
          <button onClick={() => onNav('moon')} style={{
            padding: '26px 22px',
            background: 'linear-gradient(135deg, rgba(60,70,120,0.7), rgba(10,20,60,0.85))',
            border: '1px solid rgba(200,216,236,0.18)',
            borderRadius: 18, cursor: 'pointer', textAlign: 'left',
            position: 'relative', overflow: 'hidden',
            transition: 'all 0.25s ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow='0 0 30px rgba(200,216,236,0.1)' }}
          onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none' }}
          >
            <div style={{ position:'absolute', top:0, left:0, right:0, height:2,
              background:'linear-gradient(90deg,transparent,rgba(200,216,236,0.45),transparent)' }} />
            <div style={{ display:'flex', alignItems:'flex-start', gap:14 }}>
              <div style={{ fontSize:'2.6rem', lineHeight:1,
                filter:'drop-shadow(0 0 12px rgba(200,216,236,0.6))',
                animation:'moonGlow 3s ease-in-out infinite' }}>{moon.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:'0.62rem', letterSpacing:'0.2em',
                  color:'var(--silver-dim)', textTransform:'uppercase',
                  fontFamily:"'Cinzel',serif", marginBottom:4 }}>Fase lunar</div>
                <div style={{ fontFamily:"'Cinzel',serif", fontSize:'0.95rem',
                  fontWeight:700, color:'var(--white)', marginBottom:6 }}>{moon.name}</div>
                <p style={{ fontSize:'0.76rem', color:'var(--silver-mid)', lineHeight:1.6 }}>
                  {moon.desc}
                </p>
              </div>
            </div>
          </button>

          {/* Numerology day card */}
          {numData && (
            <button onClick={() => onNav('numerology')} style={{
              padding: '26px 22px',
              background: `linear-gradient(135deg, ${numData.colorDark}80, ${numData.color}12)`,
              border: `1px solid ${numData.color}30`,
              borderRadius: 18, cursor: 'pointer', textAlign: 'left',
              position: 'relative', overflow: 'hidden',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.boxShadow=`0 0 30px ${numData.color}18` }}
            onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.boxShadow='none' }}
            >
              <div style={{ position:'absolute', top:0, left:0, right:0, height:2,
                background:`linear-gradient(90deg,transparent,${numData.color}70,transparent)` }} />
              <div style={{ display:'flex', alignItems:'flex-start', gap:14 }}>
                <div style={{ fontFamily:"'Cinzel',serif", fontSize:'2.6rem',
                  fontWeight:700, lineHeight:1, color:numData.color,
                  textShadow:`0 0 20px ${numData.color}60`, minWidth:46 }}>{dayNum}</div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:'0.62rem', letterSpacing:'0.2em',
                    color:'var(--silver-dim)', textTransform:'uppercase',
                    fontFamily:"'Cinzel',serif", marginBottom:4 }}>Número del día</div>
                  <div style={{ fontFamily:"'Cinzel',serif", fontSize:'0.95rem',
                    fontWeight:700, color:'var(--white)', marginBottom:6 }}>
                    {numData.symbol} {numData.name}
                  </div>
                  <p style={{ fontSize:'0.76rem', color:'var(--silver-mid)',
                    lineHeight:1.6, fontStyle:'italic' }}>
                    {DAILY_HOME_PHRASES[dayNum]}
                  </p>
                </div>
              </div>
            </button>
          )}
        </div>
      </section>

      {/* ── Quote ── */}
      <div className="card" style={{ padding: '22px 28px', marginBottom: 32, textAlign: 'center' }}>
        <p style={{ fontFamily: "'Cinzel',serif", fontSize: '0.98rem',
          color: 'var(--silver)', letterSpacing: '0.04em',
          lineHeight: 1.7, fontStyle: 'italic' }}>
          "Eres un universo entero experimentándose a sí mismo."
        </p>
        <p style={{ color: 'var(--silver-dim)', fontSize: '0.72rem',
          marginTop: 8, letterSpacing: '0.1em' }}>
          ✦ ASUMO — TU BIENESTAR, TU COSMOS ✦
        </p>
      </div>

      {/* ── Module grid ── */}
      <h2 style={{ fontFamily: "'Cinzel',serif", fontSize: '0.72rem',
        letterSpacing: '0.28em', color: 'var(--silver-dim)', marginBottom: 16,
        textAlign: 'center', textTransform: 'uppercase' }}>Tus módulos de bienestar</h2>

      <div style={{ display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 12 }}>
        {MODULES.map(m => (
          <button key={m.id} onClick={() => onNav(m.id)} style={{
            border: '1px solid var(--border)', borderRadius: 16,
            background: 'var(--glass)', backdropFilter: 'blur(16px)',
            padding: '20px 16px', cursor: 'pointer', textAlign: 'center',
            transition: 'all 0.3s ease', position: 'relative', overflow: 'hidden',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform='translateY(-4px)'
            e.currentTarget.style.borderColor=`${m.color}66`
            e.currentTarget.style.boxShadow=`0 12px 32px ${m.color}28`
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform='translateY(0)'
            e.currentTarget.style.borderColor='var(--border)'
            e.currentTarget.style.boxShadow='none'
          }}>
            <div style={{ position:'absolute', top:0, left:0, right:0, height:2,
              background:`linear-gradient(90deg,transparent,${m.color},transparent)` }} />
            <div style={{ fontSize:'1.9rem', marginBottom:8 }}>{m.icon}</div>
            <div style={{ fontFamily:"'Cinzel',serif", fontSize:'0.72rem',
              fontWeight:600, color:'var(--white)', letterSpacing:'0.04em',
              marginBottom:4 }}>{m.name}</div>
            <div style={{ fontSize:'0.66rem', color:'var(--silver-dim)' }}>{m.desc}</div>
          </button>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: 44 }}>
        <div className="divider" />
        <p style={{ color: 'var(--silver-dim)', fontSize: '0.75rem', letterSpacing: '0.12em' }}>
          ✦ &nbsp; CADA DÍA ES UNA NUEVA OPORTUNIDAD DE CRECER &nbsp; ✦
        </p>
      </div>
    </div>
  )
}
