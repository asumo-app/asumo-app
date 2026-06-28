import { useState } from 'react'
import { zodiacSigns } from '../data/zodiacData'

const STEPS = ['nombre', 'signo', 'nacimiento', 'listo']

export default function Onboarding({ onComplete }) {
  const [step,    setStep]    = useState(0)
  const [fading,  setFading]  = useState(false)
  const [name,    setName]    = useState('')
  const [zodiac,  setZodiac]  = useState(null)
  const [day,     setDay]     = useState('')
  const [month,   setMonth]   = useState('')
  const [year,    setYear]    = useState('')

  const firstName = name.trim().split(' ')[0]

  const advance = (nextStep) => {
    setFading(true)
    setTimeout(() => {
      setStep(nextStep)
      setFading(false)
    }, 320)
  }

  const handleFinish = () => {
    const profile = {
      name: name.trim(),
      zodiacId: zodiac?.id || '',
      birthDay:   parseInt(day)   || 1,
      birthMonth: parseInt(month) || 1,
      birthYear:  parseInt(year)  || 2000,
    }
    // Pre-populate numerology birthdate
    localStorage.setItem('num_day',   String(profile.birthDay))
    localStorage.setItem('num_month', String(profile.birthMonth))
    localStorage.setItem('num_year',  String(profile.birthYear))
    localStorage.setItem('num_birth', `${profile.birthDay}/${profile.birthMonth}/${profile.birthYear}`)
    onComplete(profile)
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 300,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '24px 16px',
      background: 'var(--void)',
      overflowY: 'auto',
    }}>
      {/* Stars */}
      <StarField />

      {/* Card */}
      <div style={{
        width: '100%', maxWidth: 480,
        background: 'rgba(7,7,42,0.92)',
        backdropFilter: 'blur(24px)',
        border: '1px solid rgba(200,216,236,0.15)',
        borderRadius: 24,
        padding: '44px 36px 40px',
        position: 'relative', overflow: 'hidden',
        opacity: fading ? 0 : 1,
        transform: fading ? 'translateY(12px)' : 'translateY(0)',
        transition: 'opacity 0.32s ease, transform 0.32s ease',
        zIndex: 1,
      }}>
        {/* Top gold line */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.8), transparent)',
        }} />

        {/* Step dots */}
        <div style={{
          display: 'flex', gap: 7, justifyContent: 'center', marginBottom: 36,
        }}>
          {[0,1,2].map(i => (
            <div key={i} style={{
              width: i === Math.min(step, 2) ? 20 : 7, height: 7,
              borderRadius: 4,
              background: i <= Math.min(step, 2)
                ? 'linear-gradient(90deg, #c9a227, #e8c547)'
                : 'rgba(200,216,236,0.15)',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>

        {/* ── STEP 0: Nombre ── */}
        {step === 0 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 32 }}>
              <div style={{ fontSize: '3rem', marginBottom: 16,
                filter: 'drop-shadow(0 0 20px rgba(201,162,39,0.6))',
                animation: 'float 3s ease-in-out infinite',
              }}>✦</div>
              <h1 style={{
                fontFamily: "'Cinzel',serif", fontSize: '1.6rem',
                fontWeight: 700, letterSpacing: '0.1em',
                background: 'linear-gradient(135deg, #e0ecff, #c9a227)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                marginBottom: 10,
              }}>Bienvenida a Asumo</h1>
              <p style={{ color: 'var(--silver-mid)', fontSize: '0.88rem',
                lineHeight: 1.7, letterSpacing: '0.04em' }}>
                Tu espacio de bienestar cósmico y emocional.<br/>
                Cuéntanos un poco sobre ti para personalizar tu experiencia.
              </p>
            </div>
            <label style={labelStyle}>¿Cómo te llamas?</label>
            <input
              className="inp"
              placeholder="Tu nombre..."
              value={name}
              onChange={e => setName(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && name.trim() && advance(1)}
              style={{ marginBottom: 22, fontSize: '1rem', textAlign: 'center' }}
              autoFocus
            />
            <button
              onClick={() => advance(1)}
              disabled={!name.trim()}
              style={primaryBtn(!!name.trim())}
            >Continuar →</button>
          </div>
        )}

        {/* ── STEP 1: Signo zodiacal ── */}
        {step === 1 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: '2rem', marginBottom: 10 }}>🌙</div>
              <h2 style={{ fontFamily: "'Cinzel',serif", fontSize: '1.2rem',
                color: 'var(--white)', letterSpacing: '0.08em', marginBottom: 8 }}>
                Hola, {firstName}
              </h2>
              <p style={{ color: 'var(--silver-dim)', fontSize: '0.82rem' }}>
                ¿Cuál es tu signo zodiacal?
              </p>
            </div>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
              gap: 8, marginBottom: 22,
            }}>
              {zodiacSigns.map(sign => {
                const active = zodiac?.id === sign.id
                return (
                  <button key={sign.id} onClick={() => setZodiac(sign)} style={{
                    padding: '12px 6px', borderRadius: 12,
                    background: active
                      ? `linear-gradient(135deg, ${sign.colorDark}80, ${sign.color}30)`
                      : 'rgba(10,20,60,0.6)',
                    border: active ? `2px solid ${sign.color}` : '1px solid var(--border)',
                    cursor: 'pointer', textAlign: 'center',
                    boxShadow: active ? `0 0 16px ${sign.color}40` : 'none',
                    transition: 'all 0.2s ease',
                  }}>
                    <div style={{ fontSize: '1.3rem', marginBottom: 4,
                      filter: active ? `drop-shadow(0 0 6px ${sign.color})` : 'none',
                    }}>{sign.symbol}</div>
                    <div style={{ fontSize: '0.58rem', fontFamily: "'Cinzel',serif",
                      color: active ? 'var(--white)' : 'var(--silver-dim)',
                      letterSpacing: '0.04em', lineHeight: 1.2,
                    }}>{sign.name}</div>
                  </button>
                )
              })}
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => advance(0)} style={ghostBtn}>← Atrás</button>
              <button onClick={() => advance(2)} disabled={!zodiac}
                style={{ ...primaryBtn(!!zodiac), flex: 1 }}>Continuar →</button>
            </div>
          </div>
        )}

        {/* ── STEP 2: Fecha de nacimiento ── */}
        {step === 2 && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <div style={{ fontSize: '2rem', marginBottom: 10 }}>
                {zodiac?.symbol}
              </div>
              <h2 style={{ fontFamily: "'Cinzel',serif", fontSize: '1.1rem',
                color: 'var(--white)', letterSpacing: '0.08em', marginBottom: 8 }}>
                Perfecto, {firstName}
              </h2>
              <p style={{ color: 'var(--silver-dim)', fontSize: '0.82rem', lineHeight: 1.6 }}>
                ¿Cuándo naciste?<br/>
                <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>
                  Esto nos permite calcular tu número de vida
                </span>
              </p>
            </div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 22 }}>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Día</label>
                <input type="number" min="1" max="31" placeholder="DD"
                  value={day} onChange={e => setDay(e.target.value)}
                  className="inp" style={{ textAlign: 'center', fontSize: '1rem' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={labelStyle}>Mes</label>
                <input type="number" min="1" max="12" placeholder="MM"
                  value={month} onChange={e => setMonth(e.target.value)}
                  className="inp" style={{ textAlign: 'center', fontSize: '1rem' }} />
              </div>
              <div style={{ flex: 1.6 }}>
                <label style={labelStyle}>Año</label>
                <input type="number" min="1900" max="2025" placeholder="AAAA"
                  value={year} onChange={e => setYear(e.target.value)}
                  className="inp" style={{ textAlign: 'center', fontSize: '1rem' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => advance(1)} style={ghostBtn}>← Atrás</button>
              <button
                onClick={() => advance(3)}
                disabled={!day || !month || !year}
                style={{ ...primaryBtn(!!(day && month && year)), flex: 1 }}
              >Ver mi cosmos →</button>
            </div>
            <p style={{ textAlign: 'center', marginTop: 12, fontSize: '0.72rem',
              color: 'var(--silver-dim)' }}>
              También puedes continuar sin fecha →{' '}
              <button onClick={() => advance(3)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: 'var(--silver-dim)', textDecoration: 'underline',
                fontSize: '0.72rem',
              }}>omitir</button>
            </p>
          </div>
        )}

        {/* ── STEP 3: Listo ── */}
        {step === 3 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: 20,
              filter: zodiac ? `drop-shadow(0 0 24px ${zodiac.color})` : 'drop-shadow(0 0 24px rgba(201,162,39,0.6))',
              animation: 'float 2.5s ease-in-out infinite',
            }}>{zodiac?.symbol || '✦'}</div>
            <h2 style={{ fontFamily: "'Cinzel',serif", fontSize: '1.4rem',
              fontWeight: 700, letterSpacing: '0.08em',
              background: 'linear-gradient(135deg, var(--white), var(--gold-hi))',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              marginBottom: 12 }}>
              Bienvenida, {firstName} ✦
            </h2>
            {zodiac && (
              <p style={{ color: 'var(--silver-mid)', fontSize: '0.88rem',
                lineHeight: 1.7, marginBottom: 8 }}>
                {zodiac.name} · {zodiac.element} {zodiac.elementIcon}
              </p>
            )}
            <p style={{ color: 'var(--silver-dim)', fontSize: '0.82rem',
              lineHeight: 1.7, marginBottom: 32, maxWidth: 320, margin: '0 auto 32px' }}>
              Tu cosmos personal está listo.<br/>
              Cada día encontrarás aquí tu afirmación, tus rituales y tu bienestar.
            </p>
            <button onClick={handleFinish} style={primaryBtn(true)}>
              ✦ Entrar a Asumo
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Decorative stars ──────────────────────────────────────────
function StarField() {
  const stars = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    dur: Math.random() * 3 + 2,
  }))
  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {stars.map(s => (
        <div key={s.id} style={{
          position: 'absolute',
          left: `${s.x}%`, top: `${s.y}%`,
          width: s.size, height: s.size,
          borderRadius: '50%',
          background: 'rgba(200,216,236,0.7)',
          animation: `twinkle ${s.dur}s ease-in-out infinite`,
          animationDelay: `${Math.random() * 3}s`,
        }} />
      ))}
    </div>
  )
}

// ── Style helpers ─────────────────────────────────────────────
const labelStyle = {
  display: 'block',
  fontFamily: "'Cinzel',serif",
  fontSize: '0.65rem', letterSpacing: '0.18em',
  color: 'var(--silver-dim)', textTransform: 'uppercase',
  marginBottom: 8,
}

const primaryBtn = (enabled) => ({
  width: '100%', padding: '14px',
  background: enabled
    ? 'linear-gradient(135deg, var(--blue), var(--purple))'
    : 'rgba(40,40,70,0.5)',
  border: enabled ? '1px solid rgba(168,85,247,0.4)' : '1px solid var(--border)',
  borderRadius: 100, cursor: enabled ? 'pointer' : 'not-allowed',
  fontFamily: "'Cinzel',serif", fontSize: '0.9rem', fontWeight: 600,
  color: enabled ? 'var(--white)' : 'var(--silver-dim)',
  letterSpacing: '0.08em',
  boxShadow: enabled ? '0 0 24px rgba(107,33,168,0.3)' : 'none',
  transition: 'all 0.2s ease',
})

const ghostBtn = {
  padding: '14px 20px', borderRadius: 100,
  background: 'transparent', border: '1px solid var(--border)',
  cursor: 'pointer', fontSize: '0.84rem', color: 'var(--silver-dim)',
  fontFamily: "'Raleway',sans-serif", transition: 'all 0.2s',
}
