import { useState, useEffect, useRef } from 'react'
import { selfLoveRituals, selfLoveAffirmations, journalPrompts } from '../data/cosmicData'

export default function SelfLove() {
  const [tab, setTab] = useState('rituales')
  const [done, setDone] = useState(() => {
    try { return JSON.parse(localStorage.getItem('sl_done') || '[]') } catch { return [] }
  })
  const [affIdx, setAffIdx] = useState(0)
  const [journalIdx, setJournalIdx] = useState(0)
  const [journal, setJournal] = useState('')
  const [breathing, setBreathing] = useState(false)
  const [breathPhase, setBreathPhase] = useState('inhala')
  const [breathCount, setBreathCount] = useState(0)
  const [timer, setTimer] = useState(0)
  const intervalRef = useRef(null)

  const toggleDone = (id) => {
    const newDone = done.includes(id) ? done.filter(d => d !== id) : [...done, id]
    setDone(newDone)
    localStorage.setItem('sl_done', JSON.stringify(newDone))
  }

  const startBreathing = () => {
    setBreathing(true)
    setBreathPhase('inhala')
    setBreathCount(0)
    setTimer(4)
    const phases = [
      { name: 'inhala', dur: 4 },
      { name: 'sostén', dur: 7 },
      { name: 'exhala', dur: 8 },
    ]
    let pi = 0, t = phases[0].dur, cycles = 0
    intervalRef.current = setInterval(() => {
      t -= 1
      setTimer(t)
      if (t <= 0) {
        pi = (pi + 1) % 3
        if (pi === 0) { cycles++; setBreathCount(cycles) }
        if (cycles >= 4) {
          clearInterval(intervalRef.current)
          setBreathing(false)
          return
        }
        t = phases[pi].dur
        setBreathPhase(phases[pi].name)
        setTimer(t)
      }
    }, 1000)
  }

  useEffect(() => () => clearInterval(intervalRef.current), [])

  const TABS = [
    { id:'rituales', label:'✦ Rituales' },
    { id:'afirmaciones', label:'💜 Afirmaciones' },
    { id:'respiracion', label:'🌬️ Respiración' },
    { id:'diario', label:'📓 Diario' },
  ]

  const progress = Math.round((done.length / selfLoveRituals.length) * 100)

  return (
    <div className="mod" style={{ maxWidth: 820 }}>
      <div className="mod-hd">
        <span className="mod-icon">💜</span>
        <h1 className="mod-title">Amor Propio</h1>
        <p className="mod-sub">Rituales, afirmaciones y prácticas para nutrir tu relación contigo mismo/a</p>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 28, flexWrap: 'wrap' }}>
        {TABS.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`btn ${tab === t.id ? '' : 'btn-ghost'} btn-sm`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* RITUALES */}
      {tab === 'rituales' && (
        <div>
          {/* Progress */}
          <div className="card" style={{ padding: '18px 24px', marginBottom: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--silver-mid)' }}>Progreso del día</span>
              <span style={{ fontSize: '0.82rem', color: 'var(--gold)' }}>{done.length}/{selfLoveRituals.length} rituales</span>
            </div>
            <div style={{ background: 'rgba(10,20,60,0.8)', borderRadius: 99, height: 8, overflow: 'hidden' }}>
              <div style={{
                height: '100%', borderRadius: 99,
                width: `${progress}%`,
                background: 'linear-gradient(90deg, var(--blue), var(--purple-l))',
                transition: 'width 0.4s ease',
                boxShadow: '0 0 10px var(--glow-p)',
              }} />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {selfLoveRituals.map(r => (
              <div key={r.id} className="card-l" style={{
                padding: '18px 20px',
                display: 'flex', alignItems: 'flex-start', gap: 16,
                opacity: done.includes(r.id) ? 0.7 : 1,
                transition: 'opacity 0.3s',
                cursor: 'pointer',
              }} onClick={() => toggleDone(r.id)}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                  background: done.includes(r.id) ? 'linear-gradient(135deg,var(--blue),var(--purple))' : 'rgba(10,20,60,0.8)',
                  border: `1px solid ${done.includes(r.id) ? 'rgba(168,85,247,0.5)' : 'var(--border)'}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.2rem',
                  transition: 'all 0.3s',
                  boxShadow: done.includes(r.id) ? '0 0 12px var(--glow-p)' : 'none',
                }}>{done.includes(r.id) ? '✓' : r.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '0.9rem', fontWeight: 600, color: 'var(--white)',
                    marginBottom: 4,
                    textDecoration: done.includes(r.id) ? 'line-through' : 'none',
                  }}>{r.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--silver-mid)', lineHeight: 1.5 }}>{r.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {done.length === selfLoveRituals.length && (
            <div className="card" style={{
              padding: 28, textAlign: 'center', marginTop: 20,
              border: '1px solid rgba(201,162,39,0.4)',
              boxShadow: '0 0 30px rgba(201,162,39,0.15)',
            }}>
              <div style={{ fontSize: '2.5rem', marginBottom: 10 }}>✨</div>
              <p style={{ fontFamily: "'Cinzel',serif", color: 'var(--gold)', letterSpacing: '0.06em' }}>
                ¡Completaste todos tus rituales hoy!<br/>
                <span style={{ fontSize: '0.85rem', color: 'var(--silver-mid)', fontFamily: "'Raleway',sans-serif" }}>
                  Eres increíble. Date un abrazo enorme.
                </span>
              </p>
            </div>
          )}
        </div>
      )}

      {/* AFIRMACIONES */}
      {tab === 'afirmaciones' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div className="card" style={{
            padding: '48px 36px', textAlign: 'center',
            border: '1px solid rgba(168,85,247,0.2)',
          }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 20 }}>💜</div>
            <p style={{
              fontFamily: "'Cinzel',serif",
              fontSize: 'clamp(1rem,2.5vw,1.3rem)',
              fontWeight: 500, lineHeight: 1.7,
              color: 'var(--silver-hi)',
              letterSpacing: '0.03em',
              marginBottom: 32,
            }}>
              "{selfLoveAffirmations[affIdx]}"
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-lg" style={{
                background: 'linear-gradient(135deg, var(--purple-d), var(--purple))',
              }} onClick={() => setAffIdx(i => (i + 1) % selfLoveAffirmations.length)}>
                💜 Nueva afirmación
              </button>
            </div>
            <p style={{ marginTop: 20, fontSize: '0.75rem', color: 'var(--silver-dim)' }}>
              {affIdx + 1} / {selfLoveAffirmations.length}
            </p>
          </div>

          <div className="card-l" style={{ padding: '20px 24px' }}>
            <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: '0.85rem', letterSpacing: '0.12em', color: 'var(--silver)', marginBottom: 14 }}>
              🪞 PRÁCTICA DEL ESPEJO
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--silver-mid)', lineHeight: 1.7 }}>
              Párate frente al espejo, mírate directamente a los ojos durante 2 minutos y repite con convicción:<br/>
              <span style={{ color: 'var(--white)', fontStyle: 'italic', fontWeight: 500 }}>
                "Soy suficiente. Soy amado/a. Soy capaz. Me elijo a mí mismo/a."
              </span><br/>
              Hazlo aunque se sienta incómodo. La incomodidad es donde comienza el cambio.
            </p>
          </div>
        </div>
      )}

      {/* RESPIRACION */}
      {tab === 'respiracion' && (
        <div className="card" style={{ padding: '48px 32px', textAlign: 'center' }}>
          <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: '1rem', letterSpacing: '0.1em', color: 'var(--silver)', marginBottom: 8 }}>
            TÉCNICA 4-7-8
          </h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--silver-dim)', marginBottom: 36 }}>
            Inhala 4 seg · Sostén 7 seg · Exhala 8 seg · 4 ciclos
          </p>

          <div style={{
            width: 160, height: 160, borderRadius: '50%', margin: '0 auto 32px',
            border: '2px solid rgba(168,85,247,0.3)',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            position: 'relative',
            boxShadow: breathing ? '0 0 40px var(--glow-p)' : '0 0 20px rgba(10,20,60,0.5)',
            transition: 'box-shadow 0.3s',
            background: breathing ? 'rgba(107,33,168,0.15)' : 'rgba(10,20,60,0.4)',
          }}>
            {breathing && (
              <div style={{
                position: 'absolute', inset: -8, borderRadius: '50%',
                border: '1px solid rgba(168,85,247,0.2)',
                animation: 'glowPulse 2s ease-in-out infinite',
              }} />
            )}
            <div style={{
              fontFamily: "'Cinzel',serif",
              fontSize: breathing ? '1.1rem' : '0.9rem',
              color: 'var(--purple-l)',
              fontWeight: 600,
              textTransform: 'capitalize',
            }}>
              {breathing ? breathPhase : '🌬️'}
            </div>
            {breathing && (
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--white)', marginTop: 4 }}>
                {timer}
              </div>
            )}
            {!breathing && (
              <div style={{ fontSize: '0.75rem', color: 'var(--silver-dim)', marginTop: 8 }}>
                Listo para<br/>comenzar
              </div>
            )}
          </div>

          {breathing && (
            <div style={{ marginBottom: 24, display: 'flex', gap: 6, justifyContent: 'center' }}>
              {[0,1,2,3].map(i => (
                <div key={i} style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: i < breathCount ? 'var(--purple-l)' : 'var(--border)',
                  boxShadow: i < breathCount ? '0 0 8px var(--glow-p)' : 'none',
                  transition: 'all 0.3s',
                }} />
              ))}
            </div>
          )}

          {!breathing ? (
            <button className="btn btn-lg" style={{
              background: 'linear-gradient(135deg, var(--navy), var(--purple))',
            }} onClick={startBreathing}>
              🌬️ Comenzar práctica
            </button>
          ) : (
            <button className="btn btn-ghost" onClick={() => {
              clearInterval(intervalRef.current)
              setBreathing(false)
            }}>Detener</button>
          )}
        </div>
      )}

      {/* DIARIO */}
      {tab === 'diario' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div className="card-l" style={{ padding: '20px 24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--silver-mid)' }}>Pregunta de reflexión:</span>
              <button className="btn btn-sm btn-ghost" onClick={() => setJournalIdx(i => (i + 1) % journalPrompts.length)}>
                Nueva ↺
              </button>
            </div>
            <p style={{
              fontStyle: 'italic', color: 'var(--silver)',
              fontSize: '0.9rem', lineHeight: 1.6,
            }}>
              {journalPrompts[journalIdx]}
            </p>
          </div>

          <textarea className="inp" style={{ minHeight: 180 }}
            placeholder="Escribe libremente aquí…"
            value={journal}
            onChange={e => setJournal(e.target.value)}
          />

          <div style={{ display: 'flex', gap: 10 }}>
            <button className="btn" onClick={() => {
              if (journal.trim()) {
                const entries = JSON.parse(localStorage.getItem('sl_journal') || '[]')
                entries.unshift({ text: journal, prompt: journalPrompts[journalIdx], date: new Date().toISOString() })
                localStorage.setItem('sl_journal', JSON.stringify(entries.slice(0, 30)))
                setJournal('')
              }
            }}>✦ Guardar entrada</button>
            <button className="btn btn-ghost" onClick={() => setJournal('')}>Limpiar</button>
          </div>
        </div>
      )}
    </div>
  )
}
