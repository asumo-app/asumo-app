import { useState, useMemo } from 'react'

const CATS = [
  { id:'salud', label:'Salud', color:'#27ae60', icon:'💚' },
  { id:'amor', label:'Amor', color:'#c44569', icon:'❤️' },
  { id:'carrera', label:'Carrera', color:'#f39c12', icon:'⭐' },
  { id:'espiritual', label:'Espiritual', color:'#a855f7', icon:'✦' },
  { id:'familia', label:'Familia', color:'#4f9eff', icon:'🌙' },
  { id:'personal', label:'Personal', color:'#16a085', icon:'🌿' },
]

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre']
const DIAS_HDR = ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb']

export default function GoalsCalendar() {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())
  const [goals, setGoals] = useState(() => {
    try { return JSON.parse(localStorage.getItem('goals_v2') || '[]') } catch { return [] }
  })
  const [intention, setIntention] = useState(() => localStorage.getItem('goal_intention') || '')
  const [selectedDay, setSelectedDay] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ text: '', cat: 'personal', day: '' })

  const saveGoals = (g) => {
    setGoals(g)
    localStorage.setItem('goals_v2', JSON.stringify(g))
  }

  const calDays = useMemo(() => {
    const first = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    return { first, daysInMonth }
  }, [year, month])

  const goalsForDay = (d) => goals.filter(g => g.year === year && g.month === month && g.day === d)

  const addGoal = () => {
    if (!form.text.trim() || !form.day) return
    const newGoal = {
      id: Date.now(),
      text: form.text.trim(),
      cat: form.cat,
      day: parseInt(form.day),
      month, year,
      done: false,
    }
    saveGoals([...goals, newGoal])
    setForm({ text: '', cat: 'personal', day: form.day })
    setShowForm(false)
  }

  const toggleGoal = (id) => {
    saveGoals(goals.map(g => g.id === id ? { ...g, done: !g.done } : g))
  }

  const deleteGoal = (id) => saveGoals(goals.filter(g => g.id !== id))

  const prevMonth = () => {
    if (month === 0) { setMonth(11); setYear(y => y - 1) }
    else setMonth(m => m - 1)
    setSelectedDay(null)
  }
  const nextMonth = () => {
    if (month === 11) { setMonth(0); setYear(y => y + 1) }
    else setMonth(m => m + 1)
    setSelectedDay(null)
  }

  const monthGoals = goals.filter(g => g.year === year && g.month === month)
  const doneCount = monthGoals.filter(g => g.done).length

  return (
    <div className="mod">
      <div className="mod-hd">
        <span className="mod-icon">🎯</span>
        <h1 className="mod-title">Metas & Intenciones</h1>
        <p className="mod-sub">Tu calendario cósmico de propósitos mensuales</p>
      </div>

      {/* Monthly intention */}
      <div className="card" style={{ padding: '20px 24px', marginBottom: 28 }}>
        <label style={{ fontSize: '0.78rem', letterSpacing: '0.12em', color: 'var(--silver-dim)', display: 'block', marginBottom: 10 }}>
          ✦ INTENCIÓN DEL MES
        </label>
        <input className="inp"
          placeholder={`¿Cuál es tu intención principal para ${MESES[month]}?`}
          value={intention}
          onChange={e => {
            setIntention(e.target.value)
            localStorage.setItem('goal_intention', e.target.value)
          }}
        />
      </div>

      {/* Month nav + stats */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <button className="btn btn-ghost btn-sm" onClick={prevMonth}>‹</button>
          <h2 style={{ fontFamily: "'Cinzel',serif", fontSize: '1.1rem', letterSpacing: '0.1em' }}>
            {MESES[month]} {year}
          </h2>
          <button className="btn btn-ghost btn-sm" onClick={nextMonth}>›</button>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <span className="badge badge-g">{doneCount}/{monthGoals.length} completadas</span>
          <button className="btn btn-sm" onClick={() => { setShowForm(true); setForm(f => ({ ...f, day: today.getDate().toString() })) }}>
            + Agregar meta
          </button>
        </div>
      </div>

      {/* Calendar */}
      <div className="card" style={{ padding: 20, marginBottom: 28 }}>
        {/* Day headers */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4, marginBottom: 8 }}>
          {DIAS_HDR.map(d => (
            <div key={d} style={{
              textAlign: 'center', fontSize: '0.7rem',
              color: 'var(--silver-dim)', letterSpacing: '0.08em', padding: '4px 0',
            }}>{d}</div>
          ))}
        </div>

        {/* Days */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4 }}>
          {Array.from({ length: calDays.first }, (_, i) => (
            <div key={`e${i}`} />
          ))}
          {Array.from({ length: calDays.daysInMonth }, (_, i) => {
            const d = i + 1
            const dayGoals = goalsForDay(d)
            const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear()
            const isSelected = selectedDay === d

            return (
              <button key={d}
                onClick={() => setSelectedDay(isSelected ? null : d)}
                style={{
                  border: isSelected ? '1px solid rgba(168,85,247,0.6)' : isToday ? '1px solid rgba(201,162,39,0.5)' : '1px solid var(--border)',
                  borderRadius: 10,
                  background: isSelected ? 'rgba(107,33,168,0.2)' : isToday ? 'rgba(201,162,39,0.1)' : 'transparent',
                  padding: '8px 4px',
                  cursor: 'pointer',
                  minHeight: 54,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                  transition: 'all 0.2s',
                }}
                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = 'rgba(200,216,236,0.05)' }}
                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = isToday ? 'rgba(201,162,39,0.1)' : 'transparent' }}
              >
                <span style={{
                  fontSize: '0.82rem',
                  fontWeight: isToday ? 700 : 400,
                  color: isToday ? 'var(--gold)' : isSelected ? 'var(--white)' : 'var(--silver-mid)',
                }}>{d}</span>
                <div style={{ display: 'flex', gap: 2, flexWrap: 'wrap', justifyContent: 'center' }}>
                  {dayGoals.slice(0, 3).map(g => {
                    const cat = CATS.find(c => c.id === g.cat)
                    return (
                      <div key={g.id} style={{
                        width: 6, height: 6, borderRadius: '50%',
                        background: cat?.color || 'var(--silver)',
                        opacity: g.done ? 0.4 : 1,
                      }} />
                    )
                  })}
                  {dayGoals.length > 3 && (
                    <span style={{ fontSize: '0.55rem', color: 'var(--silver-dim)' }}>+{dayGoals.length - 3}</span>
                  )}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Selected day goals */}
      {selectedDay && (
        <div style={{ animation: 'fadeUp 0.3s ease', marginBottom: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: '0.9rem', letterSpacing: '0.1em' }}>
              {MESES[month]} {selectedDay}
            </h3>
            <button className="btn btn-sm" onClick={() => {
              setShowForm(true)
              setForm(f => ({ ...f, day: selectedDay.toString() }))
            }}>+ Agregar</button>
          </div>

          {goalsForDay(selectedDay).length === 0 ? (
            <div className="card-l" style={{ padding: '20px', textAlign: 'center' }}>
              <p style={{ color: 'var(--silver-dim)', fontSize: '0.85rem' }}>Sin metas para este día. ¡Agrega una!</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {goalsForDay(selectedDay).map(g => {
                const cat = CATS.find(c => c.id === g.cat)
                return (
                  <div key={g.id} className="card-l" style={{
                    padding: '14px 18px',
                    display: 'flex', alignItems: 'center', gap: 12,
                    opacity: g.done ? 0.6 : 1,
                  }}>
                    <button onClick={() => toggleGoal(g.id)} style={{
                      width: 22, height: 22, borderRadius: '50%',
                      background: g.done ? cat?.color || 'var(--blue)' : 'transparent',
                      border: `2px solid ${cat?.color || 'var(--border-hi)'}`,
                      cursor: 'pointer', flexShrink: 0,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.7rem', color: 'var(--white)',
                      transition: 'all 0.2s',
                    }}>{g.done ? '✓' : ''}</button>
                    <span style={{
                      flex: 1, fontSize: '0.88rem', color: 'var(--white)',
                      textDecoration: g.done ? 'line-through' : 'none',
                    }}>{g.text}</span>
                    <span className="badge" style={{ background: `${cat?.color}20`, color: cat?.color, fontSize: '0.65rem' }}>
                      {cat?.icon} {cat?.label}
                    </span>
                    <button onClick={() => deleteGoal(g.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--silver-dim)', fontSize: '1rem' }}>
                      ×
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )}

      {/* Add goal modal */}
      {showForm && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 200,
          background: 'rgba(3,3,16,0.85)', backdropFilter: 'blur(8px)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
        }}>
          <div className="card" style={{ padding: 32, width: '100%', maxWidth: 480, animation: 'fadeUp 0.3s ease' }}>
            <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: '1rem', marginBottom: 22, letterSpacing: '0.08em' }}>
              ✦ Nueva Meta
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <input className="inp" placeholder="¿Cuál es tu meta o intención?"
                value={form.text} onChange={e => setForm(f => ({ ...f, text: e.target.value }))}
                autoFocus
              />
              <div>
                <label style={{ fontSize: '0.76rem', color: 'var(--silver-dim)', display: 'block', marginBottom: 8 }}>CATEGORÍA</label>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {CATS.map(c => (
                    <button key={c.id}
                      onClick={() => setForm(f => ({ ...f, cat: c.id }))}
                      className="badge"
                      style={{
                        cursor: 'pointer',
                        background: form.cat === c.id ? `${c.color}30` : 'transparent',
                        border: `1px solid ${form.cat === c.id ? c.color : 'var(--border)'}`,
                        color: form.cat === c.id ? c.color : 'var(--silver-mid)',
                        transition: 'all 0.2s',
                      }}>
                      {c.icon} {c.label}
                    </button>
                  ))}
                </div>
              </div>
              <input className="inp" type="number" placeholder="Día del mes"
                min="1" max={calDays.daysInMonth}
                value={form.day} onChange={e => setForm(f => ({ ...f, day: e.target.value }))}
              />
            </div>
            <div style={{ display: 'flex', gap: 10, marginTop: 22 }}>
              <button className="btn btn-gold" onClick={addGoal}>✦ Guardar meta</button>
              <button className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
