import { useState, useMemo } from 'react'

// ─── Tone starters ────────────────────────────────────────────
const TONES = [
  {
    id: 'amor',
    label: 'Desde el Amor',
    icon: '💗',
    color: '#c45578',
    colorDark: '#6b1830',
    desc: 'Para recordarte cuánto te quieres',
    for: 'Para quien está aprendiendo a amarse sin condiciones.',
    opening:
      'Querida yo,\n\nSi pudiera abrazarte ahora mismo, lo haría largo y sin decir nada. Solo quiero que sientas que, en este momento exacto, me siento llena/o de amor por quien eres. No por quien serás, no por lo que lograrás. Por ti, exactamente como estás hoy.\n\nHay cosas que quiero que sepas...',
  },
  {
    id: 'poder',
    label: 'Desde el Poder',
    icon: '✨',
    color: '#c9a227',
    colorDark: '#6b4f08',
    desc: 'Para honrar lo que estás construyendo',
    for: 'Para quien confía en su proceso aunque no lo vea claro todavía.',
    opening:
      'Hola, yo futura/o.\n\nEstoy escribiendo esto desde un lugar de claridad. Hoy sé quién soy y lo que soy capaz de crear. Las dudas existen, sí, pero también existe algo más grande: la certeza de que voy por buen camino.\n\nQuiero contarte lo que está pasando en mi vida ahora mismo...',
  },
  {
    id: 'ternura',
    label: 'Desde la Ternura',
    icon: '🌸',
    color: '#9b7fda',
    colorDark: '#3d1e8a',
    desc: 'Para hablarte con la suavidad que mereces',
    for: 'Para quien necesita que le hablen con la misma gentileza que da a los demás.',
    opening:
      'Mi alma querida,\n\nHoy te escribo con una ternura que a veces olvido darme. Con la misma paciencia que le darías a alguien que amas profundamente. Porque eso es lo que mereces: ternura sin condiciones.\n\nHay algo que quiero que recuerdes cuando leas esto...',
  },
]

// ─── Time presets ─────────────────────────────────────────────
const TIME_PRESETS = [
  { id: '3m', label: '3 meses', icon: '🌱', days: 90,  hint: 'Un primer vistazo al futuro cercano' },
  { id: '6m', label: '6 meses', icon: '🌙', days: 180, hint: 'El punto medio hacia un nuevo ciclo' },
  { id: '1y', label: '1 año',   icon: '⭐', days: 365, hint: 'Una vuelta completa al sol' },
]

function addDays(n) {
  const d = new Date()
  d.setDate(d.getDate() + n)
  return d
}
function fmtDate(d) {
  return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'long', year: 'numeric' })
}

// ─── Main component ───────────────────────────────────────────
export default function FutureLetter() {
  const [letters, setLetters] = useState(() => {
    try { return JSON.parse(localStorage.getItem('future_letters') || '[]') } catch { return [] }
  })
  const [view,        setView]        = useState('write')   // write | archive
  const [writePhase,  setWritePhase]  = useState('choose')  // choose | compose
  const [selectedTone, setSelectedTone] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [text,        setText]        = useState('')
  const [openLetter,  setOpenLetter]  = useState(null)
  const [justSealed,  setJustSealed]  = useState(false)

  // Compute future dates once per component mount
  const timeOptions = useMemo(() =>
    TIME_PRESETS.map(p => ({ ...p, date: addDays(p.days), dateStr: fmtDate(addDays(p.days)) }))
  , [])

  /* ── Actions ── */
  const chooseTone = (tone) => {
    setSelectedTone(tone)
    setText(tone.opening)
    setSelectedTime(null)
    setWritePhase('compose')
  }

  const backToChoose = () => {
    setWritePhase('choose')
    setSelectedTone(null)
    setSelectedTime(null)
    setText('')
  }

  const sealLetter = () => {
    if (!text.trim() || !selectedTime) return
    const letter = {
      id: Date.now(),
      toneId:    selectedTone.id,
      toneLabel: selectedTone.label,
      toneIcon:  selectedTone.icon,
      toneColor: selectedTone.color,
      timeLabel: selectedTime.label,
      text,
      openDate:    selectedTime.date.toISOString().split('T')[0],
      writtenDate: fmtDate(new Date()),
      isOpen: false,
    }
    const updated = [letter, ...letters]
    setLetters(updated)
    localStorage.setItem('future_letters', JSON.stringify(updated))
    setJustSealed(true)
    setTimeout(() => {
      setJustSealed(false)
      backToChoose()
    }, 3400)
  }

  const canOpen   = (l) => new Date() >= new Date(l.openDate)

  const openLetterFn = (l) => {
    if (!canOpen(l)) return
    setOpenLetter(l)
    const updated = letters.map(x => x.id === l.id ? { ...x, isOpen: true } : x)
    setLetters(updated)
    localStorage.setItem('future_letters', JSON.stringify(updated))
  }

  const deleteLetter = (id) => {
    const updated = letters.filter(l => l.id !== id)
    setLetters(updated)
    localStorage.setItem('future_letters', JSON.stringify(updated))
  }

  /* ── Render ── */
  return (
    <div className="mod" style={{ maxWidth: 820 }}>

      {/* Header */}
      <div className="mod-hd">
        <span className="mod-icon">💌</span>
        <h1 className="mod-title">Carta a Mi Yo Futura</h1>
        <p className="mod-sub">Un espacio íntimo para escribirte — palabras que esperarán el momento perfecto</p>
      </div>

      {/* Top navigation */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 34 }}>
        {[
          { id: 'write',   label: '✍️ Escribir carta' },
          { id: 'archive', label: `📬 Mis cartas${letters.length ? ` (${letters.length})` : ''}` },
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setView(t.id)}
            style={{
              padding: '10px 24px',
              background: view === t.id ? 'rgba(201,162,39,0.14)' : 'transparent',
              border: view === t.id ? '1px solid rgba(201,162,39,0.4)' : '1px solid var(--border)',
              borderRadius: 100, cursor: 'pointer',
              fontFamily: "'Raleway',sans-serif",
              fontSize: '0.88rem', fontWeight: 600,
              color: view === t.id ? 'var(--gold-hi)' : 'var(--silver-dim)',
              letterSpacing: '0.04em',
              transition: 'all 0.2s ease',
            }}
          >{t.label}</button>
        ))}
      </div>

      {/* ══ WRITE VIEW ══ */}
      {view === 'write' && (
        <>
          {/* Just-sealed celebration */}
          {justSealed && <SealedCelebration tone={selectedTone} time={selectedTime} />}

          {/* Phase 1 — Choose tone */}
          {!justSealed && writePhase === 'choose' && (
            <ChooseTone tones={TONES} onChoose={chooseTone} />
          )}

          {/* Phase 2 — Compose */}
          {!justSealed && writePhase === 'compose' && selectedTone && (
            <ComposeArea
              tone={selectedTone}
              timeOptions={timeOptions}
              selectedTime={selectedTime}
              onSelectTime={setSelectedTime}
              text={text}
              onTextChange={setText}
              onBack={backToChoose}
              onSeal={sealLetter}
            />
          )}
        </>
      )}

      {/* ══ ARCHIVE VIEW ══ */}
      {view === 'archive' && (
        <ArchiveView
          letters={letters}
          canOpen={canOpen}
          onOpen={openLetterFn}
          onDelete={deleteLetter}
          onGoWrite={() => setView('write')}
        />
      )}

      {/* Open-letter modal */}
      {openLetter && (
        <LetterModal letter={openLetter} onClose={() => setOpenLetter(null)} />
      )}
    </div>
  )
}

// ─── Choose Tone ──────────────────────────────────────────────
function ChooseTone({ tones, onChoose }) {
  const [hovered, setHovered] = useState(null)

  return (
    <div>
      <p style={{
        fontFamily: "'Cinzel',serif",
        fontSize: '0.72rem', letterSpacing: '0.24em',
        color: 'var(--silver-dim)', textTransform: 'uppercase',
        textAlign: 'center', marginBottom: 30,
      }}>¿Desde dónde quieres escribirte hoy?</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(226px, 1fr))',
        gap: 16,
      }}>
        {tones.map(tone => {
          const active = hovered === tone.id
          return (
            <button
              key={tone.id}
              onClick={() => onChoose(tone)}
              onMouseEnter={() => setHovered(tone.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                padding: '34px 28px 30px',
                background: active
                  ? `linear-gradient(155deg, ${tone.colorDark}90, ${tone.color}22)`
                  : `linear-gradient(155deg, ${tone.colorDark}55, ${tone.color}10)`,
                border: `1px solid ${active ? tone.color + '60' : tone.color + '28'}`,
                borderRadius: 20,
                cursor: 'pointer',
                textAlign: 'left',
                position: 'relative', overflow: 'hidden',
                boxShadow: active ? `0 8px 40px ${tone.color}28` : 'none',
                transform: active ? 'translateY(-4px)' : 'translateY(0)',
                transition: 'all 0.3s ease',
              }}
            >
              {/* Top shimmer line */}
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, transparent, ${tone.color}${active ? 'cc' : '55'}, transparent)`,
                transition: 'all 0.3s',
              }} />

              {/* Radial glow (active) */}
              {active && (
                <div style={{
                  position: 'absolute', top: -20, right: -20,
                  width: 120, height: 120,
                  background: `radial-gradient(circle, ${tone.color}18, transparent 70%)`,
                  pointerEvents: 'none',
                }} />
              )}

              {/* Icon */}
              <div style={{
                fontSize: '2.6rem', marginBottom: 18,
                filter: active ? `drop-shadow(0 0 14px ${tone.color})` : 'none',
                transition: 'filter 0.3s',
              }}>{tone.icon}</div>

              {/* Title */}
              <div style={{
                fontFamily: "'Cinzel',serif",
                fontSize: '1rem', fontWeight: 700,
                color: 'var(--white)', letterSpacing: '0.06em',
                marginBottom: 8,
              }}>{tone.label}</div>

              {/* Desc */}
              <div style={{
                fontSize: '0.8rem',
                color: active ? 'var(--silver-mid)' : 'var(--silver-dim)',
                fontFamily: "'Raleway',sans-serif",
                lineHeight: 1.55, marginBottom: 22,
                transition: 'color 0.2s',
              }}>{tone.desc}</div>

              {/* "For" quote */}
              <div style={{
                padding: '11px 14px',
                background: `${tone.color}${active ? '18' : '0d'}`,
                border: `1px solid ${tone.color}${active ? '35' : '20'}`,
                borderRadius: 10,
                fontSize: '0.76rem', fontStyle: 'italic',
                color: active ? 'var(--silver-mid)' : 'var(--silver-dim)',
                fontFamily: "'Raleway',sans-serif",
                lineHeight: 1.6,
                transition: 'all 0.2s',
              }}>{tone.for}</div>

              {/* CTA arrow */}
              <div style={{
                marginTop: 18, fontSize: '0.78rem',
                color: active ? tone.color : 'transparent',
                fontFamily: "'Cinzel',serif",
                letterSpacing: '0.12em',
                transition: 'color 0.2s',
              }}>Elegir esta ›</div>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── Compose Area ─────────────────────────────────────────────
function ComposeArea({ tone, timeOptions, selectedTime, onSelectTime, text, onTextChange, onBack, onSeal }) {
  const canSeal = text.trim().length > 0 && selectedTime !== null

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>

      {/* Back + tone badge */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <button
          onClick={onBack}
          style={{
            padding: '8px 18px',
            background: 'transparent',
            border: '1px solid var(--border)',
            borderRadius: 100, cursor: 'pointer',
            fontFamily: "'Raleway',sans-serif",
            fontSize: '0.8rem', color: 'var(--silver-dim)',
            transition: 'all 0.2s',
          }}
        >← Elegir otro tono</button>

        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '8px 18px',
          background: `${tone.color}14`,
          border: `1px solid ${tone.color}40`,
          borderRadius: 100,
        }}>
          <span style={{ fontSize: '1rem' }}>{tone.icon}</span>
          <span style={{
            fontFamily: "'Raleway',sans-serif",
            fontSize: '0.8rem', fontWeight: 600,
            color: 'var(--silver-mid)',
          }}>{tone.label}</span>
        </div>
      </div>

      {/* Time selector */}
      <div>
        <p style={labelStyle}>¿Cuándo quieres recibir esta carta?</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {timeOptions.map(t => {
            const active = selectedTime?.id === t.id
            return (
              <button
                key={t.id}
                onClick={() => onSelectTime(t)}
                style={{
                  flex: 1, minWidth: 150, padding: '20px 16px',
                  background: active
                    ? `linear-gradient(145deg, ${tone.colorDark}80, ${tone.color}28)`
                    : 'rgba(10,20,60,0.55)',
                  border: active ? `1px solid ${tone.color}65` : '1px solid var(--border)',
                  borderRadius: 14, cursor: 'pointer',
                  textAlign: 'center',
                  boxShadow: active ? `0 0 22px ${tone.color}22` : 'none',
                  transition: 'all 0.22s ease',
                }}
              >
                <div style={{
                  fontSize: '1.7rem', marginBottom: 7,
                  filter: active ? `drop-shadow(0 0 9px ${tone.color})` : 'none',
                  transition: 'filter 0.22s',
                }}>{t.icon}</div>
                <div style={{
                  fontFamily: "'Cinzel',serif",
                  fontSize: '0.9rem', fontWeight: 700,
                  color: active ? 'var(--white)' : 'var(--silver-mid)',
                  marginBottom: 5,
                }}>{t.label}</div>
                <div style={{
                  fontSize: '0.72rem',
                  color: active ? tone.color : 'var(--silver-dim)',
                  fontFamily: "'Raleway',sans-serif",
                  marginBottom: 4,
                  transition: 'color 0.22s',
                }}>{t.dateStr}</div>
                <div style={{
                  fontSize: '0.66rem',
                  color: 'var(--silver-dim)', fontStyle: 'italic',
                  fontFamily: "'Raleway',sans-serif",
                  opacity: active ? 0.9 : 0.6,
                }}>{t.hint}</div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Writing area */}
      <div>
        <p style={labelStyle}>Tu carta</p>

        {/* Paper */}
        <div style={{
          position: 'relative',
          background: 'rgba(6,10,38,0.92)',
          border: `1px solid ${tone.color}30`,
          borderRadius: 18,
          overflow: 'hidden',
          boxShadow: `0 0 40px ${tone.color}0a, inset 0 0 80px rgba(0,0,0,0.25)`,
        }}>
          {/* Top glow */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: `linear-gradient(90deg, transparent, ${tone.color}80, transparent)`,
            zIndex: 2,
          }} />

          {/* Left margin rule */}
          <div style={{
            position: 'absolute', left: 54, top: 0, bottom: 0, width: 1,
            background: `linear-gradient(180deg, transparent 5%, ${tone.color}30 30%, ${tone.color}30 70%, transparent 95%)`,
            zIndex: 1, pointerEvents: 'none',
          }} />

          <textarea
            value={text}
            onChange={e => onTextChange(e.target.value)}
            placeholder={`${tone.opening.split('\n')[0]}\n\n(Edita libremente desde aquí...)`}
            style={{
              display: 'block',
              width: '100%', minHeight: 340,
              padding: '26px 30px 32px 72px',
              background: 'transparent',
              border: 'none', outline: 'none', resize: 'vertical',
              fontFamily: "'Raleway', serif",
              fontSize: '0.95rem', fontStyle: 'italic',
              color: 'var(--silver-hi)',
              lineHeight: '32px',
              letterSpacing: '0.02em',
              backgroundImage: 'repeating-linear-gradient(transparent, transparent 31px, rgba(180,140,20,0.08) 31px, rgba(180,140,20,0.08) 32px)',
              backgroundSize: '100% 32px',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* Word count */}
        <p style={{
          marginTop: 8, fontSize: '0.7rem', color: 'var(--silver-dim)',
          textAlign: 'right', fontFamily: "'Raleway',sans-serif",
          letterSpacing: '0.05em',
        }}>
          {text.trim().split(/\s+/).filter(Boolean).length} palabras
        </p>
      </div>

      {/* Seal button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <button
          onClick={onSeal}
          disabled={!canSeal}
          style={{
            padding: '14px 36px',
            background: canSeal
              ? `linear-gradient(135deg, ${tone.colorDark}, ${tone.color})`
              : 'rgba(40,40,70,0.5)',
            border: canSeal ? `1px solid ${tone.color}70` : '1px solid var(--border)',
            borderRadius: 100,
            cursor: canSeal ? 'pointer' : 'not-allowed',
            fontFamily: "'Cinzel',serif",
            fontSize: '0.88rem', fontWeight: 600,
            color: canSeal ? 'var(--white)' : 'var(--silver-dim)',
            letterSpacing: '0.1em',
            boxShadow: canSeal ? `0 0 28px ${tone.color}28` : 'none',
            transition: 'all 0.25s ease',
          }}
        >💌 Sellar carta</button>

        {!selectedTime && text.trim() && (
          <p style={{
            fontSize: '0.78rem', color: 'var(--silver-dim)',
            fontStyle: 'italic', fontFamily: "'Raleway',sans-serif",
          }}>
            ← Elige cuándo quieres recibirla
          </p>
        )}
      </div>
    </div>
  )
}

// ─── Sealed Celebration ───────────────────────────────────────
function SealedCelebration({ tone, time }) {
  if (!tone || !time) return null
  return (
    <div style={{
      textAlign: 'center', padding: '64px 40px',
      background: `linear-gradient(145deg, ${tone.colorDark}55, ${tone.color}10)`,
      border: `1px solid ${tone.color}35`,
      borderRadius: 20,
      animation: 'fadeUp 0.5s ease',
      position: 'relative', overflow: 'hidden',
    }}>
      {/* Radial glow */}
      <div style={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 320, height: 320,
        background: `radial-gradient(circle, ${tone.color}14, transparent 70%)`,
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${tone.color}cc, transparent)`,
      }} />

      <div style={{
        fontSize: '4rem', marginBottom: 22,
        animation: 'float 2.5s ease-in-out infinite',
        filter: `drop-shadow(0 0 20px ${tone.color})`,
        position: 'relative', zIndex: 1,
      }}>💌</div>

      <h3 style={{
        fontFamily: "'Cinzel',serif",
        fontSize: '1.3rem', letterSpacing: '0.1em',
        color: 'var(--white)', marginBottom: 14,
        position: 'relative', zIndex: 1,
      }}>Carta sellada con amor</h3>

      <p style={{
        color: 'var(--silver-mid)', fontSize: '0.9rem',
        lineHeight: 1.75, maxWidth: 420, margin: '0 auto 28px',
        fontFamily: "'Raleway',sans-serif",
        position: 'relative', zIndex: 1,
      }}>
        Tu carta espera su momento en silencio.<br />
        Cuando llegue el día, sabrás exactamente lo que necesitabas escucharte decir.
      </p>

      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 10,
        padding: '11px 26px',
        background: `${tone.color}18`,
        border: `1px solid ${tone.color}45`,
        borderRadius: 100,
        position: 'relative', zIndex: 1,
      }}>
        <span style={{ fontSize: '1rem' }}>{time.icon}</span>
        <span style={{
          fontSize: '0.83rem', color: 'var(--silver-mid)',
          fontFamily: "'Cinzel',serif", letterSpacing: '0.06em',
        }}>Se abrirá el {time.dateStr}</span>
      </div>
    </div>
  )
}

// ─── Archive View ─────────────────────────────────────────────
function ArchiveView({ letters, canOpen, onOpen, onDelete, onGoWrite }) {
  if (letters.length === 0) {
    return (
      <div style={{
        padding: 60, textAlign: 'center',
        border: '1px dashed var(--border-hi)', borderRadius: 20,
        background: 'rgba(10,20,60,0.3)',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: 16, opacity: 0.35 }}>💌</div>
        <p style={{ color: 'var(--silver-dim)', marginBottom: 18 }}>
          Aún no has escrito ninguna carta
        </p>
        <button
          onClick={onGoWrite}
          style={{
            padding: '10px 26px',
            background: 'rgba(201,162,39,0.12)',
            border: '1px solid rgba(201,162,39,0.38)',
            borderRadius: 100, cursor: 'pointer',
            fontSize: '0.85rem', color: 'var(--gold)',
            fontFamily: "'Raleway',sans-serif",
          }}
        >Escribir mi primera carta</button>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      {letters.map(l => {
        const openable = canOpen(l)
        const openDateFmt = new Date(l.openDate).toLocaleDateString('es-MX', {
          day: 'numeric', month: 'long', year: 'numeric',
        })
        return (
          <div
            key={l.id}
            onClick={() => openable && onOpen(l)}
            style={{
              padding: '22px 26px',
              background: 'var(--glass)', backdropFilter: 'blur(16px)',
              border: openable && !l.isOpen
                ? `1px solid ${l.toneColor}55`
                : '1px solid var(--border)',
              borderRadius: 16, overflow: 'hidden',
              cursor: openable ? 'pointer' : 'default',
              boxShadow: openable && !l.isOpen ? `0 0 28px ${l.toneColor}1a` : 'none',
              position: 'relative',
              transition: 'all 0.2s ease',
            }}
          >
            {openable && !l.isOpen && (
              <div style={{
                position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                background: `linear-gradient(90deg, transparent, ${l.toneColor}aa, transparent)`,
              }} />
            )}

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 10 }}>
              {/* Left side */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <span style={{
                  fontSize: '1.6rem',
                  filter: openable && !l.isOpen ? `drop-shadow(0 0 9px ${l.toneColor})` : 'none',
                }}>
                  {l.isOpen ? '💌' : openable ? '✉️' : '🔒'}
                </span>
                <div>
                  <div style={{
                    fontFamily: "'Cinzel',serif",
                    fontSize: '0.88rem', fontWeight: 600,
                    color: 'var(--white)', marginBottom: 4,
                  }}>
                    {l.toneIcon} {l.toneLabel}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--silver-dim)' }}>
                    Escrita el {l.writtenDate} · sellada por {l.timeLabel}
                  </div>
                </div>
              </div>

              {/* Right side */}
              <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
                {l.isOpen ? (
                  <StatusBadge bg="rgba(39,174,96,0.14)" border="rgba(39,174,96,0.38)" color="#6fcf97">
                    Abierta ✓
                  </StatusBadge>
                ) : openable ? (
                  <StatusBadge bg={`${l.toneColor}1a`} border={`${l.toneColor}55`} color={l.toneColor}>
                    ¡Lista para abrir!
                  </StatusBadge>
                ) : (
                  <StatusBadge bg="rgba(200,216,236,0.06)" border="var(--border)" color="var(--silver-dim)">
                    Abrir: {openDateFmt}
                  </StatusBadge>
                )}
                <button
                  onClick={e => { e.stopPropagation(); onDelete(l.id) }}
                  style={{
                    padding: '4px 12px', borderRadius: 100,
                    background: 'transparent', border: '1px solid var(--border)',
                    cursor: 'pointer', fontSize: '0.72rem', color: 'var(--silver-dim)',
                  }}
                >×</button>
              </div>
            </div>

            {openable && !l.isOpen && (
              <p style={{
                marginTop: 10, fontSize: '0.75rem',
                color: l.toneColor, fontStyle: 'italic',
                fontFamily: "'Raleway',sans-serif",
              }}>✦ Haz clic para abrir tu carta</p>
            )}

            {l.isOpen && (
              <div style={{
                marginTop: 14, padding: '16px 18px',
                background: 'rgba(6,10,38,0.7)',
                borderRadius: 10,
                borderLeft: `3px solid ${l.toneColor}55`,
                fontSize: '0.85rem', color: 'var(--silver)',
                fontStyle: 'italic', lineHeight: 1.85,
                whiteSpace: 'pre-wrap',
                fontFamily: "'Raleway', serif",
              }}>{l.text}</div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─── Open Letter Modal ────────────────────────────────────────
function LetterModal({ letter, onClose }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(3,3,16,0.94)', backdropFilter: 'blur(16px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20,
    }}>
      <div style={{
        padding: '44px 40px', width: '100%', maxWidth: 580,
        background: 'linear-gradient(145deg, var(--dark), var(--deep))',
        border: `1px solid ${letter.toneColor}40`,
        borderRadius: 24,
        boxShadow: `0 0 90px ${letter.toneColor}20`,
        animation: 'fadeUp 0.4s ease',
        position: 'relative', overflow: 'hidden',
        maxHeight: '90vh', overflowY: 'auto',
      }}>
        {/* Top glow */}
        <div style={{
          position: 'sticky', top: -44, left: 0, right: 0, height: 2,
          background: `linear-gradient(90deg, transparent, ${letter.toneColor}dd, transparent)`,
          marginBottom: 0, zIndex: 2,
        }} />

        {/* Background radial */}
        <div style={{
          position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)',
          width: 400, height: 300,
          background: `radial-gradient(ellipse at 50% 0%, ${letter.toneColor}10, transparent 65%)`,
          pointerEvents: 'none',
        }} />

        {/* Icon + header */}
        <div style={{ textAlign: 'center', marginBottom: 28, position: 'relative' }}>
          <div style={{
            fontSize: '3.5rem', marginBottom: 14,
            filter: `drop-shadow(0 0 16px ${letter.toneColor})`,
          }}>{letter.toneIcon}</div>
          <h3 style={{
            fontFamily: "'Cinzel',serif",
            fontSize: '1.1rem', letterSpacing: '0.1em',
            color: letter.toneColor, marginBottom: 6,
          }}>{letter.toneLabel}</h3>
          <p style={{ fontSize: '0.74rem', color: 'var(--silver-dim)' }}>
            Escrita el {letter.writtenDate}
          </p>
        </div>

        <div className="divider" />

        {/* Letter text */}
        <div style={{
          padding: '22px 8px',
          fontSize: '0.9rem', color: 'var(--silver)',
          fontStyle: 'italic', lineHeight: 1.95,
          whiteSpace: 'pre-wrap',
          fontFamily: "'Raleway', serif",
          letterSpacing: '0.02em',
        }}>{letter.text}</div>

        <div className="divider" />

        {/* Close */}
        <div style={{ textAlign: 'center', paddingTop: 4 }}>
          <button
            onClick={onClose}
            style={{
              padding: '12px 36px',
              background: `linear-gradient(135deg, ${letter.toneColor}40, ${letter.toneColor}18)`,
              border: `1px solid ${letter.toneColor}55`,
              borderRadius: 100, cursor: 'pointer',
              fontFamily: "'Cinzel',serif",
              fontSize: '0.85rem', fontWeight: 600,
              color: 'var(--white)', letterSpacing: '0.1em',
            }}
          >Cerrar con amor ✦</button>
        </div>
      </div>
    </div>
  )
}

// ─── Micro-components ─────────────────────────────────────────
function StatusBadge({ bg, border, color, children }) {
  return (
    <span style={{
      padding: '4px 12px', borderRadius: 100,
      background: bg, border: `1px solid ${border}`,
      fontSize: '0.72rem', color,
      fontFamily: "'Raleway',sans-serif",
      whiteSpace: 'nowrap',
    }}>{children}</span>
  )
}

// ─── Shared style ─────────────────────────────────────────────
const labelStyle = {
  fontFamily: "'Cinzel',serif",
  fontSize: '0.68rem', letterSpacing: '0.22em',
  color: 'var(--silver-dim)', textTransform: 'uppercase',
  marginBottom: 14,
}
