import { useState, useMemo } from 'react'
import ModuleHeader from '../components/ModuleHeader'

// ─── EMOTIONS ─────────────────────────────────────────────────
const EMOTIONS = [
  { id:'radiante',    label:'Radiante',      icon:'🌟', color:'#f0c040', value:10, pos:true  },
  { id:'feliz',       label:'Feliz',         icon:'😊', color:'#27ae60', value:9,  pos:true  },
  { id:'agradecida',  label:'Agradecida/o',  icon:'💚', color:'#16a085', value:8,  pos:true  },
  { id:'tranquilo',   label:'Tranquilo/a',   icon:'😌', color:'#4f9eff', value:7,  pos:true  },
  { id:'esperanzado', label:'Esperanzado/a', icon:'🌱', color:'#8bc34a', value:6,  pos:true  },
  { id:'neutro',      label:'Neutral',       icon:'😐', color:'#7f8c8d', value:5,  pos:true  },
  { id:'cansado',     label:'Cansado/a',     icon:'😴', color:'#b07d2a', value:4,  pos:false },
  { id:'ansioso',     label:'Ansioso/a',     icon:'😰', color:'#a855f7', value:3,  pos:false },
  { id:'enojado',     label:'Enojada/o',     icon:'🔥', color:'#e74c3c', value:3,  pos:false },
  { id:'triste',      label:'Triste',        icon:'💧', color:'#2980b9', value:2,  pos:false },
  { id:'confundido',  label:'Confundida/o',  icon:'🌀', color:'#9b59b6', value:2,  pos:false },
  { id:'abrumado',    label:'Abrumado/a',    icon:'🌊', color:'#c44569', value:1,  pos:false },
]

const GENTLE_AFFIRMATIONS = {
  cansado:   'Descansar también es productivo. Tu cuerpo sabe lo que necesita.',
  ansioso:   'Respira. Este momento pasará. Estás más segura/o de lo que crees.',
  enojado:   'Tu enojo tiene razón de ser. Respira antes de actuar — tienes más poder del que sientes.',
  triste:    'Sentir es valiente. Las lágrimas también limpian el alma.',
  confundido:'No necesitas claridad ahora. La luz llega cuando te das espacio.',
  abrumado:  'Un paso a la vez. Solo uno. Eso es todo lo que necesitas hacer ahora mismo.',
}

// ─── ROUTINES ─────────────────────────────────────────────────
const DEFAULT_ROUTINES = [
  { id:1, name:'Despertar',   icon:'☀️', time:'07:00', doneDate:null },
  { id:2, name:'Meditar',     icon:'🧘', time:'07:30', doneDate:null },
  { id:3, name:'Ejercicio',   icon:'💪', time:'08:00', doneDate:null },
]

const ROUTINE_ICONS = ['☀️','🧘','💪','📚','🥗','🚶','🌙','🧹','🏋️','🚿','🧺','☕','🥣','🎵','✍️','🌿','💧','🎯','❤️','🏃','🧠','🌞']

const ROUTINE_PRESETS = [
  { name:'Despertar',      icon:'☀️', time:'07:00' },
  { name:'Meditar',        icon:'🧘', time:'07:30' },
  { name:'Gym',            icon:'🏋️', time:'06:00' },
  { name:'Ejercicio',      icon:'💪', time:'08:00' },
  { name:'Desayuno',       icon:'🥣', time:'08:30' },
  { name:'Caminar',        icon:'🚶', time:'19:00' },
  { name:'Limpiar sala',   icon:'🧹', time:'10:00' },
  { name:'Ordenar armario',icon:'👗', time:'11:00' },
  { name:'Limpiar baño',   icon:'🚿', time:'11:30' },
  { name:'Lavar ropa',     icon:'🧺', time:'12:00' },
  { name:'Leer libro',     icon:'📚', time:'20:00' },
  { name:'Dormir temprano',icon:'🌙', time:'22:00' },
]

const GENTLE_ROUTINES = [
  { name:'Respirar 5 min',   icon:'🌬️', desc:'Cierra los ojos. Inhala 4, sostén 4, suelta 6.' },
  { name:'Tomar agua',       icon:'💧', desc:'Un vaso grande y abre las ventanas.' },
  { name:'Caminar suave',    icon:'🌿', desc:'15 minutos afuera, sin teléfono.' },
  { name:'Música que nutre', icon:'🎵', desc:'Pon algo que te haga sentir contenida/o.' },
  { name:'Escribir sin filtro', icon:'✍️', desc:'Expresa lo que sientes sin juzgarte.' },
]

// ─── SHOPPING ─────────────────────────────────────────────────
const CATEGORIES = [
  { id:'comida',       label:'Comida',       icon:'🛒', color:'#27ae60' },
  { id:'ingredientes', label:'Ingredientes', icon:'🥦', color:'#8bc34a' },
  { id:'ropa',         label:'Ropa',         icon:'👗', color:'#e91e8c' },
  { id:'zapatos',      label:'Zapatos',      icon:'👟', color:'#c9a227' },
  { id:'limpieza',     label:'Limpieza',     icon:'🧼', color:'#4f9eff' },
  { id:'otros',        label:'Otros',        icon:'✦',  color:'#9b7fda' },
]
const LIST_TYPES = [
  { id:'diaria',  label:'Diaria',  icon:'📅' },
  { id:'semanal', label:'Semanal', icon:'📆' },
  { id:'mensual', label:'Mensual', icon:'🗓️' },
]
const catById = Object.fromEntries(CATEGORIES.map(c => [c.id, c]))

// ─── CALENDAR HELPERS ─────────────────────────────────────────
const MONTHS_ES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio',
                   'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
const DOW_ES = ['L','M','X','J','V','S','D']

function buildCal(year, month) {
  const first = new Date(year, month, 1)
  const last  = new Date(year, month + 1, 0)
  const startDow = (first.getDay() + 6) % 7 // Monday start
  const cells = []
  for (let i = 0; i < startDow; i++) cells.push(null)
  for (let d = 1; d <= last.getDate(); d++) cells.push(d)
  return cells
}

// ─── MAIN COMPONENT ───────────────────────────────────────────
export default function EmotionalCheckin() {
  const [tab, setTab] = useState('emotions')
  const todayStr = useMemo(() => new Date().toDateString(), [])

  // ── Emotions state ──────────────────────────────────────────
  const [emotionHistory, setEmotionHistory] = useState(() => {
    try { return JSON.parse(localStorage.getItem('wb_emotions') || '[]') } catch { return [] }
  })
  const [selEmotion, setSelEmotion]   = useState(null)
  const [intensity,  setIntensity]    = useState(5)
  const [eNote,      setENote]        = useState('')
  const [calDate,    setCalDate]      = useState(() => new Date())
  const [detailDay,  setDetailDay]    = useState(null) // { day, entry } for calendar popover

  const todayEmotion  = emotionHistory.find(e => e.dateStr === todayStr)
  const isNegative    = todayEmotion && !todayEmotion.pos

  const saveEmotion = () => {
    if (!selEmotion) return
    const entry = {
      id: Date.now(), dateStr: todayStr,
      date: new Date().toLocaleDateString('es-MX', { day:'numeric', month:'short' }),
      ...selEmotion, intensity, note: eNote.trim(),
    }
    const updated = [entry, ...emotionHistory.filter(e => e.dateStr !== todayStr)].slice(0, 120)
    setEmotionHistory(updated)
    localStorage.setItem('wb_emotions', JSON.stringify(updated))
    setSelEmotion(null); setENote(''); setIntensity(5)
  }

  const calYear  = calDate.getFullYear()
  const calMonth = calDate.getMonth()
  const calCells = useMemo(() => buildCal(calYear, calMonth), [calYear, calMonth])

  // ── Routines state ──────────────────────────────────────────
  const [routines, setRoutines] = useState(() => {
    try { return JSON.parse(localStorage.getItem('wb_routines') || JSON.stringify(DEFAULT_ROUTINES)) } catch { return DEFAULT_ROUTINES }
  })
  const [showAddR,   setShowAddR]   = useState(false)
  const [showPresets, setShowPresets] = useState(false)
  const [newR, setNewR] = useState({ name:'', icon:'☀️', time:'08:00' })

  const doneToday = routines.filter(r => r.doneDate === todayStr).length
  const pct       = routines.length > 0 ? Math.round((doneToday / routines.length) * 100) : 0
  const allDone   = routines.length > 0 && doneToday === routines.length

  const toggleRoutine = id => {
    const updated = routines.map(r =>
      r.id === id ? { ...r, doneDate: r.doneDate === todayStr ? null : todayStr } : r
    )
    setRoutines(updated)
    localStorage.setItem('wb_routines', JSON.stringify(updated))
  }
  const addRoutine = () => {
    if (!newR.name.trim()) return
    const updated = [...routines, { id: Date.now(), ...newR, doneDate: null }]
      .sort((a,b) => a.time.localeCompare(b.time))
    setRoutines(updated)
    localStorage.setItem('wb_routines', JSON.stringify(updated))
    setNewR({ name:'', icon:'☀️', time:'08:00' }); setShowAddR(false)
  }
  const addPreset = p => {
    if (routines.some(r => r.name === p.name)) return
    const updated = [...routines, { id: Date.now(), ...p, doneDate: null }]
      .sort((a,b) => a.time.localeCompare(b.time))
    setRoutines(updated)
    localStorage.setItem('wb_routines', JSON.stringify(updated))
  }
  const deleteRoutine = id => {
    const updated = routines.filter(r => r.id !== id)
    setRoutines(updated)
    localStorage.setItem('wb_routines', JSON.stringify(updated))
  }

  // ── Shopping state ──────────────────────────────────────────
  const [lists,     setLists]     = useState(() => {
    try { return JSON.parse(localStorage.getItem('wb_shopping') || '[]') } catch { return [] }
  })
  const [activeId,  setActiveId]  = useState(null)
  const [showNewL,  setShowNewL]  = useState(false)
  const [newLD,     setNewLD]     = useState({ name:'', type:'semanal' })
  const [newItem,   setNewItem]   = useState({ text:'', category:'comida' })
  const [catFilter, setCatFilter] = useState('all')

  const activeList = lists.find(l => l.id === activeId) || null

  const createList = () => {
    if (!newLD.name.trim()) return
    const list = { id: Date.now(), name: newLD.name.trim(), type: newLD.type,
      createdAt: new Date().toLocaleDateString('es-MX', { day:'numeric', month:'long' }),
      items: [] }
    const updated = [list, ...lists]
    setLists(updated); localStorage.setItem('wb_shopping', JSON.stringify(updated))
    setActiveId(list.id); setNewLD({ name:'', type:'semanal' }); setShowNewL(false)
  }
  const addItem = () => {
    if (!newItem.text.trim() || !activeId) return
    const item = { id: Date.now(), text: newItem.text.trim(), category: newItem.category, done: false }
    const updated = lists.map(l => l.id === activeId ? { ...l, items: [...l.items, item] } : l)
    setLists(updated); localStorage.setItem('wb_shopping', JSON.stringify(updated))
    setNewItem({ ...newItem, text: '' })
  }
  const toggleItem = itemId => {
    const updated = lists.map(l => l.id === activeId
      ? { ...l, items: l.items.map(it => it.id === itemId ? { ...it, done: !it.done } : it) } : l)
    setLists(updated); localStorage.setItem('wb_shopping', JSON.stringify(updated))
  }
  const deleteItem = itemId => {
    const updated = lists.map(l => l.id === activeId
      ? { ...l, items: l.items.filter(it => it.id !== itemId) } : l)
    setLists(updated); localStorage.setItem('wb_shopping', JSON.stringify(updated))
  }
  const deleteList = listId => {
    const updated = lists.filter(l => l.id !== listId)
    setLists(updated); localStorage.setItem('wb_shopping', JSON.stringify(updated))
    if (activeId === listId) setActiveId(null)
  }
  const clearDone = () => {
    const updated = lists.map(l => l.id === activeId
      ? { ...l, items: l.items.filter(it => !it.done) } : l)
    setLists(updated); localStorage.setItem('wb_shopping', JSON.stringify(updated))
  }

  // ─── RENDER ────────────────────────────────────────────────
  return (
    <div className="mod" style={{ maxWidth: 860 }}>
      <ModuleHeader
        icon={<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#2e6050" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>}
        title="Mi Bienestar"
        subtitle="Tu espacio de autocuidado consciente cada día"
      />

      {/* ── Tab bar ── */}
      <div style={{
        display: 'flex', gap: 3, marginBottom: 32,
        background: 'rgba(10,20,60,0.6)', borderRadius: 14, padding: 4,
      }}>
        {[
          { id:'emotions', label:'💜 Emociones' },
          { id:'routines', label:'✅ Rutinas'   },
          { id:'shopping', label:'🛒 Compras'   },
        ].map(t => (
          <button key={t.id} onClick={() => setTab(t.id)} style={{
            flex:1, padding:'11px 8px',
            background: tab === t.id ? 'linear-gradient(135deg,var(--blue),var(--purple))' : 'transparent',
            border:'none', borderRadius:10, cursor:'pointer',
            fontFamily:"'Raleway',sans-serif", fontSize:'0.82rem',
            fontWeight: tab === t.id ? 700 : 400,
            color: tab === t.id ? 'var(--white)' : 'var(--silver-dim)',
            transition:'all 0.2s ease',
            boxShadow: tab === t.id ? '0 2px 12px rgba(107,33,168,0.35)' : 'none',
            whiteSpace:'nowrap',
          }}>{t.label}</button>
        ))}
      </div>

      {/* ════════════════ EMOCIONES ════════════════ */}
      {tab === 'emotions' && (
        <div>
          {/* Today's emotion: if logged show summary, else show picker */}
          {todayEmotion && !selEmotion ? (
            <div style={{
              padding:'28px 28px 22px',
              background:`linear-gradient(135deg,${todayEmotion.color}25,${todayEmotion.color}08)`,
              border:`1px solid ${todayEmotion.color}40`,
              borderRadius:18, marginBottom:28, position:'relative', overflow:'hidden',
            }}>
              <div style={{ position:'absolute', top:0, left:0, right:0, height:2,
                background:`linear-gradient(90deg,transparent,${todayEmotion.color}cc,transparent)` }} />
              <div style={{ display:'flex', alignItems:'center', gap:18, flexWrap:'wrap' }}>
                <div style={{ fontSize:'3rem', filter:`drop-shadow(0 0 14px ${todayEmotion.color})` }}>
                  {todayEmotion.icon}
                </div>
                <div style={{ flex:1 }}>
                  <div style={{ fontSize:'0.65rem', letterSpacing:'0.2em', color:'var(--silver-dim)',
                    fontFamily:"'Cinzel',serif", textTransform:'uppercase', marginBottom:5 }}>
                    Check-in de hoy
                  </div>
                  <div style={{ fontFamily:"'Cinzel',serif", fontSize:'1.15rem', fontWeight:700,
                    color:'var(--white)', marginBottom:6 }}>
                    {todayEmotion.label}
                  </div>
                  <div style={{ fontSize:'0.78rem', color:'var(--silver-dim)' }}>
                    Intensidad: {todayEmotion.intensity}/10
                    {todayEmotion.note && ` · "${todayEmotion.note}"`}
                  </div>
                </div>
                <button onClick={() => setSelEmotion(null)} style={{
                  padding:'7px 16px', borderRadius:100,
                  background:'transparent', border:'1px solid var(--border)',
                  cursor:'pointer', fontSize:'0.75rem', color:'var(--silver-dim)',
                  fontFamily:"'Raleway',sans-serif",
                }}>Actualizar</button>
              </div>
            </div>
          ) : (
            <div style={{ marginBottom:28 }}>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'0.72rem',
                letterSpacing:'0.22em', color:'var(--silver-dim)', textTransform:'uppercase',
                marginBottom:16 }}>¿Cómo te sientes hoy?</p>

              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(88px,1fr))', gap:9 }}>
                {EMOTIONS.map(em => {
                  const active = selEmotion?.id === em.id
                  return (
                    <button key={em.id} onClick={() => setSelEmotion(em)} style={{
                      border: active ? `2px solid ${em.color}` : '1px solid var(--border)',
                      borderRadius:14, padding:'14px 6px',
                      background: active ? `${em.color}22` : 'rgba(10,20,60,0.55)',
                      cursor:'pointer', textAlign:'center',
                      boxShadow: active ? `0 0 16px ${em.color}35` : 'none',
                      transition:'all 0.2s',
                    }}>
                      <div style={{ fontSize:'1.6rem', marginBottom:6,
                        filter: active ? `drop-shadow(0 0 8px ${em.color})` : 'none',
                      }}>{em.icon}</div>
                      <div style={{ fontSize:'0.66rem', fontWeight: active ? 700 : 400,
                        color: active ? 'var(--white)' : 'var(--silver-mid)',
                        lineHeight:1.3,
                      }}>{em.label}</div>
                    </button>
                  )
                })}
              </div>

              {selEmotion && (
                <div style={{ marginTop:20, display:'flex', flexDirection:'column', gap:14, animation:'fadeUp 0.3s ease' }}>
                  {/* Intensity */}
                  <div style={{ padding:'18px 20px', background:'rgba(10,20,60,0.6)',
                    border:`1px solid ${selEmotion.color}30`, borderRadius:14 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', marginBottom:10 }}>
                      <span style={{ fontSize:'0.8rem', color:'var(--silver-mid)' }}>
                        Intensidad de {selEmotion.label}
                      </span>
                      <span style={{ fontFamily:"'Cinzel',serif", fontSize:'1.1rem',
                        color:selEmotion.color, fontWeight:700 }}>{intensity}/10</span>
                    </div>
                    <input type="range" min="1" max="10" value={intensity}
                      onChange={e => setIntensity(+e.target.value)}
                      style={{ width:'100%', accentColor:selEmotion.color, cursor:'pointer' }} />
                    <div style={{ display:'flex', justifyContent:'space-between',
                      fontSize:'0.66rem', color:'var(--silver-dim)', marginTop:5 }}>
                      <span>Leve</span><span>Moderado</span><span>Intenso</span>
                    </div>
                  </div>
                  {/* Note */}
                  <textarea className="inp"
                    placeholder="Nota libre — ¿algo más que quieras recordar de hoy? (opcional)"
                    value={eNote} onChange={e => setENote(e.target.value)}
                    style={{ minHeight:80, fontStyle:'italic' }} />
                  <button onClick={saveEmotion} style={{
                    padding:'13px 28px', borderRadius:100,
                    background:`linear-gradient(135deg,${selEmotion.color}80,${selEmotion.color})`,
                    border:`1px solid ${selEmotion.color}50`, cursor:'pointer',
                    fontFamily:"'Cinzel',serif", fontSize:'0.86rem', fontWeight:600,
                    color:'var(--white)', letterSpacing:'0.08em',
                    boxShadow:`0 0 20px ${selEmotion.color}30`,
                  }}>✨ Guardar check-in</button>
                </div>
              )}
            </div>
          )}

          {/* ── Monthly calendar ── */}
          <div style={{ marginTop: 8 }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:16 }}>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'0.68rem', letterSpacing:'0.22em',
                color:'var(--silver-dim)', textTransform:'uppercase' }}>
                Calendario emocional
              </p>
              <div style={{ display:'flex', alignItems:'center', gap:8 }}>
                <button onClick={() => setCalDate(d => new Date(d.getFullYear(), d.getMonth()-1, 1))}
                  style={calNavBtn}>‹</button>
                <span style={{ fontFamily:"'Cinzel',serif", fontSize:'0.8rem', color:'var(--silver)',
                  minWidth:130, textAlign:'center' }}>
                  {MONTHS_ES[calMonth]} {calYear}
                </span>
                <button onClick={() => setCalDate(d => new Date(d.getFullYear(), d.getMonth()+1, 1))}
                  style={calNavBtn}>›</button>
              </div>
            </div>

            <div style={{ background:'rgba(10,20,60,0.5)', border:'1px solid var(--border)',
              borderRadius:16, padding:'18px 14px' }}>
              {/* Day-of-week headers */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', marginBottom:8 }}>
                {DOW_ES.map(d => (
                  <div key={d} style={{ textAlign:'center', fontSize:'0.65rem',
                    color:'var(--silver-dim)', letterSpacing:'0.1em', padding:'4px 0' }}>
                    {d}
                  </div>
                ))}
              </div>
              {/* Day cells */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:3 }}>
                {calCells.map((day, i) => {
                  if (!day) return <div key={i} />
                  const dateStr = new Date(calYear, calMonth, day).toDateString()
                  const entry   = emotionHistory.find(e => e.dateStr === dateStr)
                  const isToday = dateStr === todayStr
                  const isDetail = detailDay?.day === day && detailDay?.month === calMonth && detailDay?.year === calYear
                  return (
                    <button key={i} onClick={() => {
                      if (entry) setDetailDay(isDetail ? null : { day, month:calMonth, year:calYear, entry })
                    }} style={{
                      position:'relative', padding:'6px 4px',
                      background: isToday ? 'rgba(168,85,247,0.18)' : 'transparent',
                      border: isToday ? '1px solid rgba(168,85,247,0.4)' : '1px solid transparent',
                      borderRadius:8, cursor: entry ? 'pointer' : 'default',
                      textAlign:'center', transition:'all 0.15s',
                    }}>
                      <div style={{ fontSize:'0.7rem', color: isToday ? 'var(--white)' : 'var(--silver-dim)',
                        marginBottom:3, fontWeight: isToday ? 700 : 400 }}>
                        {day}
                      </div>
                      {entry ? (
                        <div style={{ width:10, height:10, borderRadius:'50%',
                          background:entry.color, margin:'0 auto',
                          boxShadow:`0 0 6px ${entry.color}70` }} />
                      ) : (
                        <div style={{ width:10, height:10, margin:'0 auto' }} />
                      )}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Day detail popover */}
            {detailDay?.entry && (
              <div style={{ marginTop:12, padding:'16px 20px',
                background:`${detailDay.entry.color}15`,
                border:`1px solid ${detailDay.entry.color}40`,
                borderRadius:12, display:'flex', alignItems:'center', gap:14,
                animation:'fadeUp 0.2s ease',
              }}>
                <span style={{ fontSize:'1.8rem', filter:`drop-shadow(0 0 8px ${detailDay.entry.color})` }}>
                  {detailDay.entry.icon}
                </span>
                <div>
                  <div style={{ fontFamily:"'Cinzel',serif", fontSize:'0.85rem',
                    color:'var(--white)', marginBottom:3 }}>
                    {detailDay.entry.label}
                    <span style={{ fontSize:'0.72rem', color:'var(--silver-dim)', marginLeft:10 }}>
                      {detailDay.entry.date} · intensidad {detailDay.entry.intensity}/10
                    </span>
                  </div>
                  {detailDay.entry.note && (
                    <div style={{ fontSize:'0.78rem', color:'var(--silver-mid)', fontStyle:'italic' }}>
                      "{detailDay.entry.note}"
                    </div>
                  )}
                </div>
                <button onClick={() => setDetailDay(null)}
                  style={{ marginLeft:'auto', background:'transparent', border:'none',
                    cursor:'pointer', fontSize:'1rem', color:'var(--silver-dim)' }}>×</button>
              </div>
            )}

            {/* Legend */}
            <div style={{ display:'flex', flexWrap:'wrap', gap:10, marginTop:14 }}>
              {EMOTIONS.slice(0,6).map(em => (
                <div key={em.id} style={{ display:'flex', alignItems:'center', gap:5 }}>
                  <div style={{ width:8, height:8, borderRadius:'50%', background:em.color }} />
                  <span style={{ fontSize:'0.62rem', color:'var(--silver-dim)' }}>{em.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ════════════════ RUTINAS ════════════════ */}
      {tab === 'routines' && (
        <div>
          {/* Negative emotion suggestion banner */}
          {isNegative && (
            <div style={{ padding:'20px 22px', marginBottom:22,
              background:'linear-gradient(135deg,rgba(79,158,255,0.12),rgba(79,158,255,0.04))',
              border:'1px solid rgba(79,158,255,0.25)', borderRadius:16, animation:'fadeUp 0.3s ease' }}>
              <div style={{ display:'flex', alignItems:'flex-start', gap:12, marginBottom:16 }}>
                <span style={{ fontSize:'1.5rem' }}>💙</span>
                <div>
                  <div style={{ fontFamily:"'Cinzel',serif", fontSize:'0.82rem',
                    color:'var(--white)', marginBottom:4 }}>
                    Parece que hoy necesitas cuidado suave
                  </div>
                  <p style={{ fontSize:'0.8rem', color:'var(--silver-mid)', lineHeight:1.6,
                    fontStyle:'italic' }}>
                    "{GENTLE_AFFIRMATIONS[todayEmotion?.id] || 'Un paso a la vez. Eso es todo.'}"
                  </p>
                </div>
              </div>
              <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
                {GENTLE_ROUTINES.map(gr => (
                  <div key={gr.name} style={{ padding:'10px 14px',
                    background:'rgba(79,158,255,0.08)', border:'1px solid rgba(79,158,255,0.2)',
                    borderRadius:10, flex:'1', minWidth:130 }}>
                    <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:3 }}>
                      <span style={{ fontSize:'1rem' }}>{gr.icon}</span>
                      <span style={{ fontSize:'0.78rem', fontWeight:600, color:'var(--white)' }}>
                        {gr.name}
                      </span>
                    </div>
                    <p style={{ fontSize:'0.7rem', color:'var(--silver-dim)', lineHeight:1.4 }}>
                      {gr.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progress bar */}
          {routines.length > 0 && (
            <div style={{ marginBottom:22 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
                <span style={{ fontFamily:"'Cinzel',serif", fontSize:'0.68rem',
                  letterSpacing:'0.2em', color:'var(--silver-dim)', textTransform:'uppercase' }}>
                  Progreso del día
                </span>
                <span style={{ fontFamily:"'Cinzel',serif", fontSize:'1.1rem', fontWeight:700,
                  color: pct >= 100 ? '#27ae60' : pct >= 60 ? '#f0c040' : 'var(--silver)' }}>
                  {pct}%
                </span>
              </div>
              <div style={{ height:8, background:'rgba(200,216,236,0.1)', borderRadius:4, overflow:'hidden' }}>
                <div style={{ height:'100%', borderRadius:4, transition:'width 0.4s ease',
                  width:`${pct}%`,
                  background: pct >= 100 ? 'linear-gradient(90deg,#27ae60,#8bc34a)' :
                               pct >= 60  ? 'linear-gradient(90deg,#c9a227,#f0c040)' :
                                            'linear-gradient(90deg,var(--blue),var(--purple))',
                }} />
              </div>
              <div style={{ textAlign:'right', fontSize:'0.7rem', color:'var(--silver-dim)', marginTop:4 }}>
                {doneToday} de {routines.length} completadas
              </div>
            </div>
          )}

          {/* Celebration */}
          {allDone && (
            <div style={{ padding:'32px 24px', marginBottom:22, textAlign:'center',
              background:'linear-gradient(135deg,rgba(39,174,96,0.15),rgba(39,174,96,0.05))',
              border:'1px solid rgba(39,174,96,0.3)', borderRadius:18,
              animation:'fadeUp 0.4s ease' }}>
              <div style={{ fontSize:'3.5rem', marginBottom:12, animation:'float 1.5s ease-in-out infinite' }}>
                🌟
              </div>
              <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'1.1rem', color:'#6fcf97', marginBottom:8 }}>
                ¡Completaste todas tus rutinas!
              </h3>
              <p style={{ fontSize:'0.85rem', color:'var(--silver-mid)', lineHeight:1.6 }}>
                Eso merece reconocimiento. Hoy te cuidaste de verdad. ✦
              </p>
            </div>
          )}

          {/* Routines list */}
          {routines.length === 0 ? (
            <div style={{ padding:'48px 24px', textAlign:'center',
              border:'1px dashed var(--border-hi)', borderRadius:18,
              background:'rgba(10,20,60,0.3)', marginBottom:20 }}>
              <div style={{ fontSize:'2.5rem', marginBottom:12, opacity:0.4 }}>✅</div>
              <p style={{ color:'var(--silver-dim)', marginBottom:16 }}>
                No tienes rutinas todavía.<br/>Agrega las tuyas o elige de las sugerencias.
              </p>
            </div>
          ) : (
            <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:20 }}>
              {routines.map(r => {
                const done = r.doneDate === todayStr
                return (
                  <div key={r.id} style={{
                    display:'flex', alignItems:'center', gap:14,
                    padding:'14px 18px',
                    background: done ? 'rgba(39,174,96,0.1)' : 'var(--glass)',
                    backdropFilter:'blur(14px)',
                    border: done ? '1px solid rgba(39,174,96,0.3)' : '1px solid var(--border)',
                    borderRadius:14, transition:'all 0.2s ease',
                  }}>
                    {/* Checkbox */}
                    <button onClick={() => toggleRoutine(r.id)} style={{
                      width:24, height:24, borderRadius:6, flexShrink:0,
                      background: done ? '#27ae60' : 'transparent',
                      border: done ? '2px solid #27ae60' : '2px solid var(--border-hi)',
                      cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
                      transition:'all 0.2s', fontSize:'0.85rem',
                    }}>{done ? '✓' : ''}</button>

                    {/* Time */}
                    <span style={{ fontSize:'0.72rem', color:'var(--silver-dim)',
                      fontFamily:'monospace', minWidth:36 }}>{r.time}</span>

                    {/* Icon + name */}
                    <span style={{ fontSize:'1.2rem' }}>{r.icon}</span>
                    <span style={{
                      flex:1, fontSize:'0.88rem', fontWeight:600,
                      color: done ? 'var(--silver-dim)' : 'var(--white)',
                      textDecoration: done ? 'line-through' : 'none',
                      transition:'all 0.2s',
                    }}>{r.name}</span>

                    {/* Delete */}
                    <button onClick={() => deleteRoutine(r.id)} style={{
                      background:'transparent', border:'none', cursor:'pointer',
                      fontSize:'0.9rem', color:'var(--silver-dim)', padding:'2px 6px',
                      borderRadius:4, opacity:0.5,
                    }}>×</button>
                  </div>
                )
              })}
            </div>
          )}

          {/* Action buttons */}
          <div style={{ display:'flex', gap:10, flexWrap:'wrap' }}>
            <button onClick={() => setShowAddR(true)} style={{
              flex:1, minWidth:140, padding:'12px 20px',
              background:'linear-gradient(135deg,var(--blue),var(--purple))',
              border:'1px solid rgba(168,85,247,0.4)', borderRadius:100, cursor:'pointer',
              fontFamily:"'Raleway',sans-serif", fontSize:'0.84rem', fontWeight:600,
              color:'var(--white)',
            }}>+ Agregar rutina</button>
            <button onClick={() => setShowPresets(s => !s)} style={{
              flex:1, minWidth:140, padding:'12px 20px',
              background:'transparent', border:'1px solid var(--border-hi)', borderRadius:100, cursor:'pointer',
              fontFamily:"'Raleway',sans-serif", fontSize:'0.84rem', color:'var(--silver-mid)',
            }}>⭐ Sugerencias</button>
          </div>

          {/* Presets panel */}
          {showPresets && (
            <div style={{ marginTop:16, padding:'18px 16px',
              background:'rgba(10,20,60,0.6)', border:'1px solid var(--border)',
              borderRadius:14, animation:'fadeUp 0.3s ease' }}>
              <p style={{ fontFamily:"'Cinzel',serif", fontSize:'0.65rem', letterSpacing:'0.2em',
                color:'var(--silver-dim)', textTransform:'uppercase', marginBottom:12 }}>
                Toca para agregar
              </p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
                {ROUTINE_PRESETS.map(p => {
                  const already = routines.some(r => r.name === p.name)
                  return (
                    <button key={p.name} onClick={() => addPreset(p)} disabled={already} style={{
                      padding:'8px 14px', borderRadius:100,
                      background: already ? 'rgba(39,174,96,0.15)' : 'rgba(200,216,236,0.06)',
                      border: already ? '1px solid rgba(39,174,96,0.35)' : '1px solid var(--border)',
                      cursor: already ? 'default' : 'pointer',
                      fontSize:'0.78rem', color: already ? '#6fcf97' : 'var(--silver-mid)',
                      display:'flex', alignItems:'center', gap:6,
                    }}>
                      {p.icon} {p.name} {already ? '✓' : ''}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ════════════════ COMPRAS ════════════════ */}
      {tab === 'shopping' && (
        <div>
          {/* Header + new list button */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20 }}>
            <p style={{ fontFamily:"'Cinzel',serif", fontSize:'0.68rem',
              letterSpacing:'0.22em', color:'var(--silver-dim)', textTransform:'uppercase' }}>
              {lists.length} lista{lists.length !== 1 ? 's' : ''}
            </p>
            <button onClick={() => setShowNewL(true)} style={{
              padding:'9px 20px', borderRadius:100,
              background:'linear-gradient(135deg,var(--blue),var(--purple))',
              border:'none', cursor:'pointer',
              fontFamily:"'Raleway',sans-serif", fontSize:'0.82rem', fontWeight:600,
              color:'var(--white)',
            }}>+ Nueva lista</button>
          </div>

          {/* Lists */}
          {lists.length === 0 ? (
            <div style={{ padding:'56px 24px', textAlign:'center',
              border:'1px dashed var(--border-hi)', borderRadius:18,
              background:'rgba(10,20,60,0.3)' }}>
              <div style={{ fontSize:'3rem', marginBottom:14, opacity:0.35 }}>🛒</div>
              <p style={{ color:'var(--silver-dim)', marginBottom:16 }}>
                Todavía no tienes listas de compras
              </p>
              <button onClick={() => setShowNewL(true)} style={{
                padding:'10px 24px', borderRadius:100,
                background:'rgba(201,162,39,0.12)', border:'1px solid rgba(201,162,39,0.38)',
                cursor:'pointer', fontSize:'0.85rem', color:'var(--gold)',
                fontFamily:"'Raleway',sans-serif",
              }}>Crear mi primera lista</button>
            </div>
          ) : (
            <>
              {/* List tabs */}
              <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:20 }}>
                {lists.map(l => {
                  const typeInfo = LIST_TYPES.find(t => t.id === l.type)
                  const doneCount = l.items.filter(it => it.done).length
                  const active = l.id === activeId
                  return (
                    <div key={l.id} style={{
                      display:'flex', alignItems:'center', gap:8,
                      padding:'10px 16px',
                      background: active ? 'linear-gradient(135deg,rgba(26,47,122,0.7),rgba(107,33,168,0.4))' : 'rgba(10,20,60,0.55)',
                      border: active ? '1px solid rgba(168,85,247,0.4)' : '1px solid var(--border)',
                      borderRadius:12, cursor:'pointer',
                      transition:'all 0.2s ease',
                      boxShadow: active ? '0 0 16px rgba(107,33,168,0.2)' : 'none',
                    }}
                    onClick={() => setActiveId(active ? null : l.id)}>
                      <span style={{ fontSize:'0.9rem' }}>{typeInfo?.icon}</span>
                      <div>
                        <div style={{ fontSize:'0.82rem', fontWeight:700,
                          color: active ? 'var(--white)' : 'var(--silver-mid)' }}>{l.name}</div>
                        <div style={{ fontSize:'0.65rem', color:'var(--silver-dim)' }}>
                          {doneCount}/{l.items.length} · {typeInfo?.label}
                        </div>
                      </div>
                      <button onClick={e => { e.stopPropagation(); deleteList(l.id) }} style={{
                        background:'transparent', border:'none', cursor:'pointer',
                        fontSize:'0.85rem', color:'var(--silver-dim)', opacity:0.5,
                        padding:'2px 4px',
                      }}>×</button>
                    </div>
                  )
                })}
              </div>

              {/* Active list detail */}
              {activeList && (
                <div style={{ animation:'fadeUp 0.3s ease' }}>
                  {/* Add item form */}
                  <div style={{ display:'flex', gap:8, marginBottom:16, flexWrap:'wrap' }}>
                    <input className="inp"
                      placeholder="Agregar ítem..."
                      value={newItem.text}
                      onChange={e => setNewItem(ni => ({ ...ni, text:e.target.value }))}
                      onKeyDown={e => e.key === 'Enter' && addItem()}
                      style={{ flex:1, minWidth:160 }}
                    />
                    <select value={newItem.category}
                      onChange={e => setNewItem(ni => ({ ...ni, category:e.target.value }))}
                      style={{
                        padding:'11px 12px', borderRadius:10,
                        background:'rgba(10,20,60,0.8)', border:'1px solid var(--border)',
                        color:'var(--white)', fontSize:'0.82rem', cursor:'pointer',
                        fontFamily:"'Raleway',sans-serif",
                      }}>
                      {CATEGORIES.map(c => (
                        <option key={c.id} value={c.id}>{c.icon} {c.label}</option>
                      ))}
                    </select>
                    <button onClick={addItem} style={{
                      padding:'11px 20px', borderRadius:10,
                      background:'linear-gradient(135deg,var(--blue),var(--purple))',
                      border:'none', cursor:'pointer',
                      fontSize:'0.9rem', color:'var(--white)', fontWeight:700,
                    }}>+</button>
                  </div>

                  {/* Category filter */}
                  <div style={{ display:'flex', gap:6, flexWrap:'wrap', marginBottom:16 }}>
                    <button onClick={() => setCatFilter('all')} style={catChip('all', catFilter === 'all', '#7a8ca8')}>
                      Todos ({activeList.items.length})
                    </button>
                    {CATEGORIES.filter(c => activeList.items.some(it => it.category === c.id)).map(c => (
                      <button key={c.id} onClick={() => setCatFilter(c.id)}
                        style={catChip(c.id, catFilter === c.id, c.color)}>
                        {c.icon} {c.label} ({activeList.items.filter(it => it.category === c.id).length})
                      </button>
                    ))}
                  </div>

                  {/* Items */}
                  {activeList.items.length === 0 ? (
                    <div style={{ padding:'32px', textAlign:'center',
                      border:'1px dashed var(--border)', borderRadius:12 }}>
                      <p style={{ color:'var(--silver-dim)', fontSize:'0.85rem' }}>
                        Lista vacía — agrega tu primer ítem arriba
                      </p>
                    </div>
                  ) : (
                    <div style={{ display:'flex', flexDirection:'column', gap:6 }}>
                      {activeList.items
                        .filter(it => catFilter === 'all' || it.category === catFilter)
                        .map(it => {
                          const cat = catById[it.category]
                          return (
                            <div key={it.id} style={{
                              display:'flex', alignItems:'center', gap:12,
                              padding:'11px 16px',
                              background: it.done ? 'rgba(10,20,60,0.3)' : 'rgba(10,20,60,0.6)',
                              border:`1px solid ${it.done ? 'var(--border)' : cat?.color + '25' || 'var(--border)'}`,
                              borderRadius:12, transition:'all 0.2s',
                            }}>
                              <button onClick={() => toggleItem(it.id)} style={{
                                width:20, height:20, borderRadius:4, flexShrink:0,
                                background: it.done ? (cat?.color || '#27ae60') : 'transparent',
                                border:`2px solid ${cat?.color || 'var(--border-hi)'}`,
                                cursor:'pointer', fontSize:'0.75rem', color:'white',
                                display:'flex', alignItems:'center', justifyContent:'center',
                              }}>{it.done ? '✓' : ''}</button>

                              <span style={{ fontSize:'0.85rem', flex:1,
                                color: it.done ? 'var(--silver-dim)' : 'var(--white)',
                                textDecoration: it.done ? 'line-through' : 'none',
                                transition:'all 0.2s',
                              }}>{it.text}</span>

                              <span style={{ padding:'2px 8px', borderRadius:100,
                                background:`${cat?.color}18`, border:`1px solid ${cat?.color}30`,
                                fontSize:'0.62rem', color:cat?.color, whiteSpace:'nowrap' }}>
                                {cat?.icon} {cat?.label}
                              </span>

                              <button onClick={() => deleteItem(it.id)} style={{
                                background:'transparent', border:'none', cursor:'pointer',
                                fontSize:'0.9rem', color:'var(--silver-dim)', opacity:0.5,
                              }}>×</button>
                            </div>
                          )
                        })}
                    </div>
                  )}

                  {/* Clear done */}
                  {activeList.items.some(it => it.done) && (
                    <button onClick={clearDone} style={{
                      marginTop:12, padding:'8px 18px', borderRadius:100,
                      background:'transparent', border:'1px solid var(--border)',
                      cursor:'pointer', fontSize:'0.75rem', color:'var(--silver-dim)',
                      fontFamily:"'Raleway',sans-serif",
                    }}>🗑 Limpiar los comprados</button>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* ════ MODAL: Add routine ════ */}
      {showAddR && (
        <Modal onClose={() => setShowAddR(false)} title="Nueva rutina">
          {/* Icon picker */}
          <p style={modalLabel}>Ícono</p>
          <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:16 }}>
            {ROUTINE_ICONS.map(ic => (
              <button key={ic} onClick={() => setNewR(r => ({ ...r, icon:ic }))} style={{
                width:36, height:36, borderRadius:8, cursor:'pointer',
                background: newR.icon === ic ? 'rgba(168,85,247,0.3)' : 'rgba(10,20,60,0.6)',
                border: newR.icon === ic ? '1px solid rgba(168,85,247,0.6)' : '1px solid var(--border)',
                fontSize:'1.1rem', transition:'all 0.15s',
              }}>{ic}</button>
            ))}
          </div>
          <p style={modalLabel}>Nombre</p>
          <input className="inp" placeholder="Ej: Leer 30 minutos"
            value={newR.name} onChange={e => setNewR(r => ({ ...r, name:e.target.value }))}
            style={{ marginBottom:12 }} />
          <p style={modalLabel}>Hora</p>
          <input type="time" className="inp"
            value={newR.time} onChange={e => setNewR(r => ({ ...r, time:e.target.value }))}
            style={{ marginBottom:20, colorScheme:'dark' }} />
          <div style={{ display:'flex', gap:10 }}>
            <button onClick={addRoutine} disabled={!newR.name.trim()} style={{
              flex:1, padding:'12px', borderRadius:100,
              background: newR.name.trim() ? 'linear-gradient(135deg,var(--blue),var(--purple))' : 'rgba(40,40,70,0.5)',
              border:'none', cursor: newR.name.trim() ? 'pointer' : 'not-allowed',
              fontFamily:"'Raleway',sans-serif", fontSize:'0.85rem', fontWeight:600, color:'var(--white)',
            }}>Agregar</button>
            <button onClick={() => setShowAddR(false)} style={{
              padding:'12px 20px', borderRadius:100,
              background:'transparent', border:'1px solid var(--border)',
              cursor:'pointer', fontSize:'0.85rem', color:'var(--silver-dim)',
              fontFamily:"'Raleway',sans-serif",
            }}>Cancelar</button>
          </div>
        </Modal>
      )}

      {/* ════ MODAL: New shopping list ════ */}
      {showNewL && (
        <Modal onClose={() => setShowNewL(false)} title="Nueva lista">
          <p style={modalLabel}>Nombre de la lista</p>
          <input className="inp" placeholder="Ej: Compras de la semana"
            value={newLD.name} onChange={e => setNewLD(d => ({ ...d, name:e.target.value }))}
            style={{ marginBottom:16 }} />
          <p style={modalLabel}>Frecuencia</p>
          <div style={{ display:'flex', gap:8, marginBottom:20 }}>
            {LIST_TYPES.map(t => (
              <button key={t.id} onClick={() => setNewLD(d => ({ ...d, type:t.id }))} style={{
                flex:1, padding:'11px 8px', borderRadius:12,
                background: newLD.type === t.id ? 'linear-gradient(135deg,var(--blue),var(--purple))' : 'rgba(10,20,60,0.6)',
                border: newLD.type === t.id ? '1px solid rgba(168,85,247,0.4)' : '1px solid var(--border)',
                cursor:'pointer', textAlign:'center',
                fontFamily:"'Raleway',sans-serif", fontSize:'0.8rem', fontWeight:600,
                color: newLD.type === t.id ? 'var(--white)' : 'var(--silver-dim)',
              }}>
                <div style={{ fontSize:'1.2rem', marginBottom:3 }}>{t.icon}</div>
                {t.label}
              </button>
            ))}
          </div>
          <div style={{ display:'flex', gap:10 }}>
            <button onClick={createList} disabled={!newLD.name.trim()} style={{
              flex:1, padding:'12px', borderRadius:100,
              background: newLD.name.trim() ? 'linear-gradient(135deg,var(--blue),var(--purple))' : 'rgba(40,40,70,0.5)',
              border:'none', cursor: newLD.name.trim() ? 'pointer' : 'not-allowed',
              fontFamily:"'Raleway',sans-serif", fontSize:'0.85rem', fontWeight:600, color:'var(--white)',
            }}>Crear lista</button>
            <button onClick={() => setShowNewL(false)} style={{
              padding:'12px 20px', borderRadius:100,
              background:'transparent', border:'1px solid var(--border)',
              cursor:'pointer', fontSize:'0.85rem', color:'var(--silver-dim)',
              fontFamily:"'Raleway',sans-serif",
            }}>Cancelar</button>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ─── MICRO-COMPONENTS ─────────────────────────────────────────
function Modal({ title, onClose, children }) {
  return (
    <div style={{ position:'fixed', inset:0, zIndex:200,
      background:'rgba(3,3,16,0.92)', backdropFilter:'blur(12px)',
      display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div style={{ width:'100%', maxWidth:460, padding:'36px 32px',
        background:'linear-gradient(145deg,var(--dark),var(--deep))',
        border:'1px solid var(--border-hi)', borderRadius:20,
        animation:'fadeUp 0.3s ease', position:'relative' }}>
        <div style={{ position:'absolute', top:0, left:0, right:0, height:2,
          background:'linear-gradient(90deg,transparent,rgba(168,85,247,0.7),transparent)',
          borderRadius:'20px 20px 0 0' }} />
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:22 }}>
          <h3 style={{ fontFamily:"'Cinzel',serif", fontSize:'1rem',
            fontWeight:600, color:'var(--white)', letterSpacing:'0.06em' }}>{title}</h3>
          <button onClick={onClose} style={{ background:'transparent', border:'none',
            cursor:'pointer', fontSize:'1.2rem', color:'var(--silver-dim)' }}>×</button>
        </div>
        {children}
      </div>
    </div>
  )
}

// ─── STYLE HELPERS ────────────────────────────────────────────
const calNavBtn = {
  padding:'4px 10px', borderRadius:8,
  background:'transparent', border:'1px solid var(--border)',
  cursor:'pointer', color:'var(--silver-mid)', fontSize:'1rem',
  fontFamily:"'Cinzel',serif",
}

const modalLabel = {
  fontFamily:"'Cinzel',serif", fontSize:'0.65rem', letterSpacing:'0.18em',
  color:'var(--silver-dim)', textTransform:'uppercase', marginBottom:8,
}

function catChip(id, active, color) {
  return {
    padding:'5px 12px', borderRadius:100,
    background: active ? `${color}22` : 'transparent',
    border: active ? `1px solid ${color}50` : '1px solid var(--border)',
    cursor:'pointer', fontSize:'0.72rem',
    color: active ? 'var(--white)' : 'var(--silver-dim)',
    fontFamily:"'Raleway',sans-serif", transition:'all 0.15s',
  }
}
