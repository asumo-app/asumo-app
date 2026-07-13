import { useMemo } from 'react'
import { zodiacSigns } from '../data/zodiacData'
import { NUMEROLOGY } from '../data/numerologyData'

// ── Helpers ──────────────────────────────────────────────────────
function getMoonPhase(date) {
  const known = new Date(2000, 0, 6)
  const days  = (date - known) / 86400000
  const pos   = ((days % 29.53) + 29.53) % 29.53
  if (pos <  1.85) return { name: 'Luna Nueva',       icon: 'new',      desc: 'Energía de nuevos comienzos.' }
  if (pos <  7.38) return { name: 'Luna Creciente',   icon: 'crescent', desc: 'Momento de acción y construcción.' }
  if (pos < 11.07) return { name: 'Cuarto Creciente', icon: 'quarter',  desc: 'Supera obstáculos con claridad.' }
  if (pos < 14.77) return { name: 'Gibosa Creciente', icon: 'gibbous',  desc: 'Tu esfuerzo está cerca del fruto.' }
  if (pos < 18.46) return { name: 'Luna Llena',       icon: 'full',     desc: 'Plena manifestación de ciclos.' }
  if (pos < 22.15) return { name: 'Gibosa Menguante', icon: 'waning-g', desc: 'Gratitud y tiempo de compartir.' }
  if (pos < 25.84) return { name: 'Cuarto Menguante', icon: 'waning-q', desc: 'Libera lo que ya no te sirve.' }
  return               { name: 'Luna Menguante',   icon: 'waning',   desc: 'Descanso y reflexión interior.' }
}

function calcLifePath(day, month, year) {
  if (!day || !month || !year) return null
  const digits = `${day}${month}${year}`.split('').map(Number)
  let sum = digits.reduce((a, b) => a + b, 0)
  while (sum > 9 && sum !== 11 && sum !== 22) {
    sum = String(sum).split('').reduce((a, b) => a + Number(b), 0)
  }
  return sum
}

const LIFE_PATH_NAMES = {
  1: 'El Pionero', 2: 'El Diplomático', 3: 'El Creativo',
  4: 'El Constructor', 5: 'El Aventurero', 6: 'El Cuidador',
  7: 'El Místico', 8: 'El Manifestador', 9: 'El Sabio',
  11: 'El Iluminado', 22: 'El Maestro Constructor',
}

const LIFE_PATH_DESC = {
  1: 'Naciste para liderar e iniciar caminos nuevos.',
  2: 'Tu don es crear paz y unir a las personas.',
  3: 'Expresas el mundo de formas que otros no pueden.',
  4: 'Construyes con paciencia lo que dura para siempre.',
  5: 'La libertad y el cambio son tu medicina.',
  6: 'Cuidas y nutres con un amor sin igual.',
  7: 'Buscas verdades profundas que pocos ven.',
  8: 'Tienes el poder de crear abundancia real.',
  9: 'Amas la humanidad y sirves desde el corazón.',
  11: 'Tu intuición ilumina caminos para todos.',
  22: 'Manifiestas sueños grandes en el mundo físico.',
}

const COSMIC_COLORS = {
  1:  { name: 'Celadón Dorado',   hex: '#4aaa88', hex2: '#2d7a62' },
  2:  { name: 'Agua de Luna',     hex: '#7fcbb5', hex2: '#4a9a82' },
  3:  { name: 'Jade Brillante',   hex: '#3d9a7c', hex2: '#246050' },
  4:  { name: 'Mar Profundo',     hex: '#2a7a6a', hex2: '#1a5548' },
  5:  { name: 'Aguamarina',       hex: '#5ab8a0', hex2: '#368a72' },
  6:  { name: 'Celadón Rosa',     hex: '#8fd4be', hex2: '#60a890' },
  7:  { name: 'Esmeralda Suave',  hex: '#4ab895', hex2: '#2e8068' },
  8:  { name: 'Océano Profundo',  hex: '#1f7a62', hex2: '#124a3c' },
  9:  { name: 'Turquesa Mística', hex: '#60c4ac', hex2: '#3a9282' },
  11: { name: 'Cristal de Mar',   hex: '#a0e0cc', hex2: '#6ab8a4' },
  22: { name: 'Celadón Eterno',   hex: '#2a9878', hex2: '#1a6852' },
}

const DIAS  = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb']
const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
               'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']

const MODULES = [
  { id:'zodiac',     icon:'zodiac',  name:'Signos Zodiacales', desc:'Afirmación diaria por signo', color:'#3d9a7c' },
  { id:'numerology', icon:'number',  name:'Numerología',       desc:'Tu número de vida y del día', color:'#2a7a6a' },
  { id:'music',      icon:'music',   name:'Musicoterapia',     desc:'Música para el alma',         color:'#4ab895' },
  { id:'checkin',    icon:'checkin', name:'Bienestar',         desc:'Emociones y registro',        color:'#5ab8a0' },
  { id:'letter',     icon:'letter',  name:'Carta al Futuro',   desc:'Cápsula del tiempo',          color:'#7fcbb5' },
]

// ── Stroke SVG icons ──────────────────────────────────────────────
function Icon({ name, size = 22, color = 'currentColor' }) {
  const s = { width: size, height: size, strokeWidth: 1.5, stroke: color, fill: 'none',
    strokeLinecap: 'round', strokeLinejoin: 'round', display: 'block', flexShrink: 0 }
  switch (name) {
    case 'new':      return <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="9"/></svg>
    case 'crescent': return <svg viewBox="0 0 24 24" style={s}><path d="M20 12a9 9 0 1 1-9-9 7 7 0 1 0 9 9z"/></svg>
    case 'quarter':  return <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="9"/><line x1="12" y1="3" x2="12" y2="21"/></svg>
    case 'gibbous':  return <svg viewBox="0 0 24 24" style={s}><path d="M12 3a9 9 0 1 1 0 18A5.5 5.5 0 0 1 12 3z"/></svg>
    case 'full':     return <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5" style={{fill:color, strokeWidth:0}}/></svg>
    case 'waning-g': return <svg viewBox="0 0 24 24" style={s}><path d="M12 3a9 9 0 1 0 0 18A5.5 5.5 0 0 0 12 3z"/></svg>
    case 'waning-q': return <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="9"/><line x1="12" y1="3" x2="12" y2="21"/></svg>
    case 'waning':   return <svg viewBox="0 0 24 24" style={s}><path d="M4 12a9 9 0 1 1 9 9 7 7 0 1 0-9-9z"/></svg>
    case 'number':   return <svg viewBox="0 0 24 24" style={s}><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/><circle cx="9" cy="7" r="2.2"/><circle cx="15" cy="12" r="2.2"/><circle cx="9" cy="17" r="2.2"/></svg>
    case 'zodiac':   return <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="9"/><line x1="12" y1="3" x2="12" y2="5.5"/><line x1="12" y1="18.5" x2="12" y2="21"/><line x1="3" y1="12" x2="5.5" y2="12"/><line x1="18.5" y1="12" x2="21" y2="12"/><line x1="5.6" y1="5.6" x2="7.4" y2="7.4"/><line x1="16.6" y1="16.6" x2="18.4" y2="18.4"/><line x1="18.4" y1="5.6" x2="16.6" y2="7.4"/><line x1="7.4" y1="16.6" x2="5.6" y2="18.4"/></svg>
    case 'music':    return <svg viewBox="0 0 24 24" style={s}><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
    case 'checkin':  return <svg viewBox="0 0 24 24" style={s}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
    case 'letter':   return <svg viewBox="0 0 24 24" style={s}><path d="M3 8l7.89 5.26a2 2 0 0 0 2.22 0L21 8M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"/></svg>
    case 'star':     return <svg viewBox="0 0 24 24" style={s}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    default:         return <svg viewBox="0 0 24 24" style={s}><circle cx="12" cy="12" r="9"/></svg>
  }
}

// ── Design tokens ─────────────────────────────────────────────────
const C = {
  card:     'rgba(13, 38, 34, 0.78)',
  cardHov:  'rgba(18, 52, 46, 0.90)',
  border:   'rgba(74, 170, 144, 0.20)',
  borderHi: 'rgba(100, 200, 170, 0.42)',
  accent:   '#4aaa88',
  accentL:  '#7fcbb5',
  text:     '#EAF5F0',
  textMid:  '#a8d4c4',
  textDim:  '#6a9888',
}

const cardBase = {
  background: C.card,
  backdropFilter: 'blur(22px)',
  WebkitBackdropFilter: 'blur(22px)',
  border: `1px solid ${C.border}`,
  borderRadius: 14,
  padding: '22px 18px',
  position: 'relative',
  overflow: 'hidden',
}

// ── Main ──────────────────────────────────────────────────────────
export default function Home({ onNav }) {
  const now  = useMemo(() => new Date(), [])
  const moon = useMemo(() => getMoonPhase(now), [now])

  const profile = useMemo(() => {
    try { return JSON.parse(localStorage.getItem('user_profile') || '{}') } catch { return {} }
  }, [])
  const firstName = profile.name?.split(' ')[0] || ''

  const lifePath    = useMemo(() => calcLifePath(profile.birthDay, profile.birthMonth, profile.birthYear), [profile])
  const cosmicColor = lifePath ? COSMIC_COLORS[lifePath] : COSMIC_COLORS[3]

  const userSign  = useMemo(() => zodiacSigns.find(s => s.id === profile.sign) || null, [profile])
  const dailyAff  = userSign?.affirmations?.[now.getDate() - 1] || null

  const dayNum = useMemo(() => {
    let sum = `${now.getDate()}${now.getMonth()+1}${now.getFullYear()}`.split('').reduce((a,b)=>a+Number(b),0)
    while (sum > 9) sum = String(sum).split('').reduce((a,b)=>a+Number(b),0)
    return sum
  }, [now])

  const greet = () => {
    const h = now.getHours()
    return h < 12 ? 'Buenos días' : h < 19 ? 'Buenas tardes' : 'Buenas noches'
  }

  return (
    <div style={{ maxWidth: 1080, margin: '0 auto', padding: '56px 20px 80px' }}>

      {/* ── Hero ──────────────────────────────────────────────── */}
      <div style={{ textAlign: 'center', marginBottom: 56 }}>
        {/* Lotus icon with glow */}
        <div style={{
          width: 76, height: 76, borderRadius: '50%', margin: '0 auto 22px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'radial-gradient(circle, rgba(74,170,144,0.28) 0%, transparent 70%)',
          boxShadow: '0 0 40px rgba(74,170,144,0.18)',
        }}>
          {/* Lotus SVG stroke */}
          <svg viewBox="0 0 48 48" width="46" height="46" fill="none" stroke={C.accent}
            strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M24 40 C24 40 10 32 10 22 C10 15 16 8 24 8 C32 8 38 15 38 22 C38 32 24 40 24 40Z"/>
            <path d="M24 8 C24 8 16 16 16 26"/>
            <path d="M24 8 C24 8 32 16 32 26"/>
            <path d="M10 22 C10 22 18 20 24 24"/>
            <path d="M38 22 C38 22 30 20 24 24"/>
            <circle cx="24" cy="26" r="2.5"/>
          </svg>
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2.4rem, 5.5vw, 3.8rem)',
          fontWeight: 700, letterSpacing: '0.20em',
          color: C.text,
          textShadow: '0 0 50px rgba(74,170,144,0.50), 0 2px 20px rgba(0,0,0,0.4)',
          marginBottom: 10,
        }}>ASUMO</h1>

        <p style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: '0.72rem', letterSpacing: '0.34em',
          color: C.textDim, textTransform: 'uppercase', marginBottom: 24,
        }}>Bienestar · Conciencia · Cosmos</p>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Chip>{firstName ? `${greet()}, ${firstName}` : greet()}</Chip>
          <Chip>{DIAS[now.getDay()]}, {now.getDate()} de {MESES[now.getMonth()]}</Chip>
        </div>
      </div>

      {/* ── Tu energía de hoy — 4 cards ──────────────────────── */}
      <section style={{ marginBottom: 50 }}>
        <SectionLabel>Tu energía de hoy</SectionLabel>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 12,
          gridAutoRows: '1fr',
        }}
        className="energy-grid">

          {/* 1 · Fase lunar */}
          <div style={cardBase}>
            <TopLine color={C.accent} />
            <div style={{ marginBottom: 14 }}>
              <Icon name={moon.icon} size={26} color={C.accentL} />
            </div>
            <p style={lbl}>Fase lunar</p>
            <p style={val}>{moon.name}</p>
            <p style={dsc}>{moon.desc}</p>
          </div>

          {/* 2 · Número de vida */}
          <div style={cardBase}>
            <TopLine color={C.accent} />
            {lifePath ? (
              <>
                <div style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '2.6rem', fontWeight: 700,
                  color: C.accentL, lineHeight: 1,
                  marginBottom: 10,
                  textShadow: '0 0 24px rgba(127,203,181,0.55)',
                }}>{lifePath}</div>
                <p style={lbl}>Número de vida</p>
                <p style={val}>{LIFE_PATH_NAMES[lifePath]}</p>
                <p style={dsc}>{LIFE_PATH_DESC[lifePath]}</p>
              </>
            ) : (
              <>
                <div style={{ marginBottom: 14 }}>
                  <Icon name="number" size={26} color={C.accentL} />
                </div>
                <p style={lbl}>Número del día</p>
                <p style={val}>{dayNum}</p>
                <p style={dsc}>{NUMEROLOGY[dayNum]?.name || '—'}</p>
              </>
            )}
          </div>

          {/* 3 · Afirmación */}
          <div style={cardBase}>
            <TopLine color={C.accent} />
            <div style={{ marginBottom: 14 }}>
              <Icon name="star" size={26} color={C.accentL} />
            </div>
            <p style={lbl}>Afirmación del día</p>
            {dailyAff
              ? <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'0.82rem', fontStyle:'italic', color:C.text, lineHeight:1.65, marginTop:6 }}>"{dailyAff}"</p>
              : <p style={dsc}><button onClick={()=>onNav('zodiac')} style={{ background:'none', border:'none', cursor:'pointer', color:C.accentL, fontSize:'inherit', fontFamily:'inherit', padding:0, textDecoration:'underline' }}>Elige tu signo</button> para ver tu mensaje</p>
            }
          </div>

          {/* 4 · Color cósmico */}
          <div style={cardBase}>
            <TopLine color={cosmicColor.hex} />
            <div style={{
              width: 38, height: 38, borderRadius: '50%',
              background: `radial-gradient(circle at 35% 35%, ${cosmicColor.hex}, ${cosmicColor.hex2})`,
              boxShadow: `0 0 20px ${cosmicColor.hex}55`,
              border: `1.5px solid ${cosmicColor.hex}44`,
              marginBottom: 14,
            }}/>
            <p style={lbl}>Tu color cósmico</p>
            <p style={val}>{cosmicColor.name}</p>
            <p style={dsc}>Llévalo hoy y comparte tu energía ✦</p>
          </div>
        </div>
      </section>

      {/* ── Módulos ───────────────────────────────────────────── */}
      <section>
        <SectionLabel>Módulos de bienestar</SectionLabel>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(148px, 1fr))',
          gap: 10,
        }}
        className="modules-grid">
          {MODULES.map(m => (
            <button key={m.id} onClick={() => onNav(m.id)} style={{
              ...cardBase,
              cursor: 'pointer', textAlign: 'left',
              padding: '18px 15px',
              transition: 'all 0.22s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = C.cardHov
              e.currentTarget.style.borderColor = C.borderHi
              e.currentTarget.style.transform = 'translateY(-3px)'
              e.currentTarget.style.boxShadow = '0 8px 26px rgba(74,170,144,0.14)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = C.card
              e.currentTarget.style.borderColor = C.border
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = 'none'
            }}>
              <TopLine color={m.color} />
              <div style={{ marginBottom: 11 }}>
                <Icon name={m.icon} size={22} color={m.color} />
              </div>
              <p style={{ fontFamily:"'Playfair Display',serif", fontSize:'0.80rem', fontWeight:600, color:C.text, marginBottom:3, lineHeight:1.3 }}>{m.name}</p>
              <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.68rem', color:C.textDim }}>{m.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Footer */}
      <div style={{ textAlign:'center', marginTop:50 }}>
        <div style={{ height:1, background:`linear-gradient(90deg,transparent,rgba(74,170,144,0.25),transparent)`, marginBottom:18 }}/>
        <p style={{ fontFamily:"'Raleway',sans-serif", color:C.textDim, fontSize:'0.68rem', letterSpacing:'0.16em' }}>
          ✦ &nbsp; CADA DÍA ES UNA NUEVA OPORTUNIDAD DE CRECER &nbsp; ✦
        </p>
      </div>
    </div>
  )
}

// ── Micro-components ──────────────────────────────────────────────
function TopLine({ color }) {
  return <div style={{ position:'absolute', top:0, left:0, right:0, height:1.5,
    background:`linear-gradient(90deg,transparent,${color},transparent)` }}/>
}

function Chip({ children }) {
  return <span style={{
    display:'inline-flex', alignItems:'center', padding:'5px 14px',
    background:'rgba(74,170,144,0.09)', border:'1px solid rgba(74,170,144,0.20)',
    borderRadius:100, fontFamily:"'Raleway',sans-serif",
    fontSize:'0.76rem', fontWeight:500, color:'#a8d4c4', letterSpacing:'0.04em',
  }}>{children}</span>
}

function SectionLabel({ children }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:16 }}>
      <div style={{ flex:1, height:1, background:'linear-gradient(90deg,transparent,rgba(74,170,144,0.28))' }}/>
      <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.62rem', fontWeight:600,
        letterSpacing:'0.26em', color:'#6a9888', textTransform:'uppercase', whiteSpace:'nowrap' }}>{children}</p>
      <div style={{ flex:1, height:1, background:'linear-gradient(90deg,rgba(74,170,144,0.28),transparent)' }}/>
    </div>
  )
}

const lbl = { fontFamily:"'Raleway',sans-serif", fontSize:'0.58rem', fontWeight:600,
  letterSpacing:'0.20em', color:'#6a9888', textTransform:'uppercase', marginBottom:5 }
const val = { fontFamily:"'Playfair Display',serif", fontSize:'0.86rem', fontWeight:600,
  color:'#EAF5F0', marginBottom:5, lineHeight:1.3 }
const dsc = { fontFamily:"'Raleway',sans-serif", fontSize:'0.70rem', color:'#a8d4c4', lineHeight:1.55 }
