import { useState, useCallback } from 'react'
import { zodiacSigns, signById, CHAKRA_ICONS } from '../data/zodiacData'
import { ZODIAC_DEEP } from '../data/zodiacDeepData'
import { ZODIAC_EXTENDED } from '../data/zodiacExtendedData'
import ModuleHeader from '../components/ModuleHeader'

const DAY_IDX = new Date().getDate() - 1

function formatToday() {
  const str = new Date().toLocaleDateString('es-MX', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })
  return str.charAt(0).toUpperCase() + str.slice(1)
}
const TODAY_STR = formatToday()

// ─── Canvas share card ─────────────────────────────────────────
function wrapText(ctx, text, x, y, maxW, lineH) {
  const words = text.split(' ')
  let line = '', curY = y
  for (const word of words) {
    const test = line + word + ' '
    if (ctx.measureText(test).width > maxW && line) {
      ctx.fillText(line.trim(), x, curY)
      line = word + ' '
      curY += lineH
    } else { line = test }
  }
  if (line.trim()) ctx.fillText(line.trim(), x, curY)
  return curY
}

async function buildShareCard(sign, affirmation, dateStr) {
  await document.fonts.ready
  const S = 1080
  const canvas = document.createElement('canvas')
  canvas.width = S; canvas.height = S
  const ctx = canvas.getContext('2d')

  // Deep space background
  const bg = ctx.createRadialGradient(S / 2, S * 0.3, 0, S / 2, S / 2, S * 0.85)
  bg.addColorStop(0, '#0d1654'); bg.addColorStop(0.45, '#07072a'); bg.addColorStop(1, '#030310')
  ctx.fillStyle = bg; ctx.fillRect(0, 0, S, S)

  // Stars
  ctx.fillStyle = 'rgba(200,216,236,0.6)'
  for (let i = 0; i < 110; i++) {
    const r = Math.random() * 2.2 + 0.3
    ctx.beginPath(); ctx.arc(Math.random() * S, Math.random() * S, r, 0, Math.PI * 2); ctx.fill()
  }

  // Colored glow behind symbol
  const glow = ctx.createRadialGradient(S / 2, 310, 0, S / 2, 310, 260)
  glow.addColorStop(0, sign.color + '50'); glow.addColorStop(1, 'transparent')
  ctx.fillStyle = glow; ctx.fillRect(0, 0, S, S)

  // Top gold shimmer line
  const topLine = ctx.createLinearGradient(0, 0, S, 0)
  topLine.addColorStop(0, 'transparent'); topLine.addColorStop(0.5, 'rgba(201,162,39,0.85)'); topLine.addColorStop(1, 'transparent')
  ctx.fillStyle = topLine; ctx.fillRect(0, 0, S, 3)

  // ── ASUMO title ──
  ctx.textAlign = 'center'
  ctx.font = '600 46px Cinzel, serif'
  ctx.fillStyle = '#e8c547'
  ctx.fillText('✦  ASUMO  ✦', S / 2, 88)

  // ── Large zodiac symbol ──
  ctx.shadowColor = sign.color; ctx.shadowBlur = 90
  ctx.fillStyle = sign.color
  ctx.font = 'bold 186px serif'
  ctx.fillText(sign.symbol, S / 2, 370)
  ctx.shadowBlur = 0

  // ── Sign name · element ──
  ctx.fillStyle = sign.color
  ctx.font = '500 40px Cinzel, serif'
  ctx.fillText(`${sign.name}  ·  ${sign.element} ${sign.elementIcon}`, S / 2, 445)

  // ── Divider ──
  ctx.strokeStyle = sign.color + '50'; ctx.lineWidth = 2
  ctx.beginPath(); ctx.moveTo(210, 480); ctx.lineTo(S - 210, 480); ctx.stroke()

  // ── "Tu afirmación de hoy" label ──
  ctx.fillStyle = 'rgba(168,188,212,0.75)'
  ctx.font = '300 28px Cinzel, serif'
  ctx.fillText('Tu afirmación de hoy', S / 2, 530)

  // ── Affirmation text (wrapped) ──
  ctx.fillStyle = '#e0ecff'
  ctx.font = 'italic 500 36px Georgia, serif'
  const finalY = wrapText(ctx, `"${affirmation}"`, S / 2, 618, 820, 54)

  // ── Bottom divider ──
  const divY = Math.max(finalY + 52, 856)
  ctx.strokeStyle = 'rgba(200,216,236,0.14)'; ctx.lineWidth = 1
  ctx.beginPath(); ctx.moveTo(200, divY); ctx.lineTo(S - 200, divY); ctx.stroke()

  // ── Date ──
  ctx.fillStyle = 'rgba(122,140,168,0.65)'
  ctx.font = '300 24px Raleway, sans-serif'
  ctx.fillText(dateStr, S / 2, divY + 40)

  // ── Watermark ──
  ctx.fillStyle = 'rgba(122,140,168,0.38)'
  ctx.font = '300 20px Cinzel, serif'
  ctx.fillText('✦  asumo.app  ✦', S / 2, S - 32)

  return canvas
}

function downloadCanvas(canvas) {
  const a = document.createElement('a')
  a.href = canvas.toDataURL('image/png')
  a.download = `asumo-afirmacion-${Date.now()}.png`
  a.click()
}

// ─── Main component ────────────────────────────────────────────
export default function ZodiacAffirmations() {
  const profile  = JSON.parse(localStorage.getItem('user_profile') || '{}')
  const userName = profile.name?.split(' ')[0] || ''

  const [selected,    setSelected]    = useState(null)
  const [tab,         setTab]         = useState('affirmation')
  const [copied,      setCopied]      = useState(false)
  const [shareState,  setShareState]  = useState('idle') // idle | loading | done | error

  const selectSign = (sign) => {
    setSelected(sign)
    setTab('affirmation')
    setCopied(false)
    setShareState('idle')
  }

  const copyAffirmation = () => {
    if (!selected) return
    const text = `"${selected.affirmations[DAY_IDX]}" — Afirmación de ${selected.name} · ${TODAY_STR} ✦ Asumo`
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2200)
    })
  }

  const shareAffirmation = async () => {
    if (!selected || shareState === 'loading') return
    setShareState('loading')
    try {
      const canvas = await buildShareCard(selected, selected.affirmations[DAY_IDX], TODAY_STR)
      canvas.toBlob(async (blob) => {
        if (!blob) { setShareState('error'); return }
        const file = new File([blob], 'asumo-afirmacion.png', { type: 'image/png' })
        const canNativeShare = navigator.share && navigator.canShare?.({ files: [file] })
        if (canNativeShare) {
          try {
            await navigator.share({
              files: [file],
              title: `Mi afirmación de ${selected.name} — Asumo`,
              text: `"${selected.affirmations[DAY_IDX]}" ✦ Asumo`,
            })
          } catch { downloadCanvas(canvas) }
        } else {
          downloadCanvas(canvas)
        }
        setShareState('done')
        setTimeout(() => setShareState('idle'), 3000)
      }, 'image/png')
    } catch {
      setShareState('error')
      setTimeout(() => setShareState('idle'), 2500)
    }
  }

  return (
    <div className="mod">
      <ModuleHeader
        icon={<svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="#2e6050" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><line x1="12" y1="3" x2="12" y2="5.5"/><line x1="12" y1="18.5" x2="12" y2="21"/><line x1="3" y1="12" x2="5.5" y2="12"/><line x1="18.5" y1="12" x2="21" y2="12"/><line x1="5.6" y1="5.6" x2="7.4" y2="7.4"/><line x1="16.6" y1="16.6" x2="18.4" y2="18.4"/><line x1="18.4" y1="5.6" x2="16.6" y2="7.4"/><line x1="7.4" y1="16.6" x2="5.6" y2="18.4"/></svg>}
        title="Afirmaciones Zodiacales"
        subtitle={userName ? `Tu mensaje cósmico del día, ${userName}` : 'Selecciona tu signo y recibe tu mensaje del día'}
      />

      {/* ── Sign grid ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
        gap: 12, marginBottom: 36,
      }}>
        {zodiacSigns.map(sign => {
          const active = selected?.id === sign.id
          return (
            <button
              key={sign.id}
              onClick={() => selectSign(sign)}
              style={{
                border: active ? `2px solid ${sign.color}` : '1px solid var(--border)',
                borderRadius: 14,
                background: active
                  ? `linear-gradient(135deg, ${sign.colorDark}80, ${sign.color}30)`
                  : 'var(--glass)',
                backdropFilter: 'blur(14px)',
                padding: '16px 10px', cursor: 'pointer', textAlign: 'center',
                transition: 'all 0.25s ease',
                boxShadow: active ? `0 0 22px ${sign.color}45` : 'none',
              }}
            >
              <div style={{
                fontSize: '1.7rem', marginBottom: 6,
                filter: active ? `drop-shadow(0 0 9px ${sign.color})` : 'none',
                transition: 'filter 0.25s',
              }}>{sign.symbol}</div>
              <div style={{
                fontFamily: "'Cinzel',serif",
                fontSize: '0.75rem', fontWeight: 600,
                color: active ? 'var(--white)' : 'var(--silver-mid)',
                letterSpacing: '0.05em', marginBottom: 3,
              }}>{sign.name}</div>
              <div style={{ fontSize: '0.62rem', color: 'var(--silver-dim)' }}>{sign.dates}</div>
            </button>
          )
        })}
      </div>

      {/* ── Detail panel ── */}
      {selected ? (
        <div style={{
          background: 'var(--glass)', backdropFilter: 'blur(20px)',
          border: `1px solid ${selected.color}40`, borderRadius: 20,
          boxShadow: `0 0 50px ${selected.color}18`, overflow: 'hidden',
        }}>
          <div style={{ height: 3,
            background: `linear-gradient(90deg, transparent, ${selected.color}, transparent)` }} />

          {/* Sign header */}
          <div style={{ padding: '30px 36px 22px', borderBottom: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 16 }}>
              <span style={{ fontSize: '3.5rem', lineHeight: 1,
                filter: `drop-shadow(0 0 18px ${selected.color})` }}>{selected.symbol}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Cinzel',serif", fontSize: '1.4rem',
                  fontWeight: 700, color: 'var(--white)', letterSpacing: '0.08em', marginBottom: 10 }}>
                  {selected.name}
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <span className="badge">{selected.elementIcon} {selected.element}</span>
                  <span className="badge">{selected.dates}</span>
                  <span className="badge">{selected.planetSymbol} {selected.planet}</span>
                </div>
              </div>
            </div>
            {selected.description && (
              <p style={{ fontSize: '0.88rem', color: 'var(--silver-mid)', lineHeight: 1.75,
                borderTop: `1px solid ${selected.color}20`, paddingTop: 16 }}>
                {selected.description}
              </p>
            )}
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', overflowX: 'auto' }}>
            {[
              { id: 'affirmation', label: '✦ Afirmación' },
              { id: 'explore',     label: '🌌 Tu Signo'  },
              { id: 'chart',       label: '⭐ Carta Astral' },
            ].map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                flex: 1, padding: '14px 12px', whiteSpace: 'nowrap',
                background: tab === t.id
                  ? `linear-gradient(180deg, ${selected.color}18, transparent)` : 'transparent',
                border: 'none',
                borderBottom: tab === t.id ? `2px solid ${selected.color}` : '2px solid transparent',
                cursor: 'pointer', fontFamily: "'Raleway',sans-serif",
                fontSize: '0.84rem', fontWeight: 600,
                color: tab === t.id ? 'var(--white)' : 'var(--silver-dim)',
                letterSpacing: '0.03em', transition: 'all 0.2s ease',
              }}>{t.label}</button>
            ))}
          </div>

          {/* Tab content */}
          <div style={{ padding: '28px 32px' }}>
            {tab === 'affirmation' && (
              <AffirmationTab
                sign={selected}
                userName={userName}
                copied={copied}
                onCopy={copyAffirmation}
                shareState={shareState}
                onShare={shareAffirmation}
              />
            )}
            {tab === 'explore' && <ExploreTab sign={selected} />}
            {tab === 'chart'   && <ChartTab   sign={selected} />}
          </div>
        </div>
      ) : (
        <div style={{
          padding: 56, textAlign: 'center',
          border: '1px dashed var(--border-hi)', borderRadius: 20,
          background: 'rgba(10,20,60,0.3)',
        }}>
          <div style={{ fontSize: '3rem', marginBottom: 16, opacity: 0.4 }}>✦</div>
          <p style={{ color: 'var(--silver-dim)', letterSpacing: '0.08em',
            fontSize: '0.9rem', lineHeight: 1.7 }}>
            Selecciona tu signo zodiacal<br />para revelar tu mensaje cósmico de hoy
          </p>
        </div>
      )}
    </div>
  )
}

// ─── Afirmación del Día ────────────────────────────────────────
function AffirmationTab({ sign, userName, copied, onCopy, shareState, onShare }) {
  const shareLabel = {
    idle:     '✦ Compartir',
    loading:  '⏳ Generando...',
    done:     '✓ ¡Listo!',
    error:    '✗ Reintentar',
  }[shareState]

  return (
    <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
      {/* Date chip */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        background: 'rgba(200,216,236,0.07)', border: '1px solid var(--border)',
        borderRadius: 100, padding: '8px 20px', marginBottom: 26,
      }}>
        <span style={{ fontSize: '0.8rem' }}>📅</span>
        <span style={{ fontFamily: "'Raleway',sans-serif", fontSize: '0.8rem',
          color: 'var(--silver-mid)', letterSpacing: '0.06em' }}>{TODAY_STR}</span>
      </div>

      {/* Label */}
      <p style={{ fontFamily: "'Cinzel',serif", fontSize: '0.68rem',
        letterSpacing: '0.28em', color: sign.color, textTransform: 'uppercase',
        marginBottom: 22 }}>
        {userName ? `Tu afirmación de hoy, ${userName}` : 'Tu afirmación de hoy'}
      </p>

      {/* Affirmation card */}
      <div style={{
        position: 'relative',
        background: `linear-gradient(135deg, ${sign.colorDark}50, ${sign.color}15)`,
        border: `1px solid ${sign.color}45`, borderRadius: 18,
        padding: '40px 36px 36px', marginBottom: 28,
      }}>
        <div style={{
          position: 'absolute', top: 10, left: 20, fontSize: '5rem', lineHeight: 1,
          color: `${sign.color}22`, fontFamily: 'Georgia, serif',
          userSelect: 'none', pointerEvents: 'none',
        }}>"</div>
        <p style={{
          fontFamily: "'Cinzel',serif",
          fontSize: 'clamp(1rem, 2.5vw, 1.22rem)',
          fontWeight: 500, lineHeight: 1.75,
          color: 'var(--silver-hi)', letterSpacing: '0.03em',
          position: 'relative', zIndex: 1,
        }}>
          {sign.affirmations[DAY_IDX]}
        </p>
      </div>

      {/* Action buttons */}
      <div style={{ display: 'flex', gap: 10, justifyContent: 'center',
        flexWrap: 'wrap', marginBottom: 28 }}>
        {/* Copy */}
        <button onClick={onCopy} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '12px 24px',
          background: copied ? `${sign.color}30` : 'transparent',
          border: `1px solid ${sign.color}55`, borderRadius: 100, cursor: 'pointer',
          fontFamily: "'Raleway',sans-serif", fontSize: '0.85rem', fontWeight: 600,
          color: copied ? 'var(--white)' : 'var(--silver-mid)',
          letterSpacing: '0.05em', transition: 'all 0.25s ease',
        }}>
          {copied ? '✓ ¡Copiado!' : '📋 Copiar'}
        </button>

        {/* Share / Download */}
        <button onClick={onShare} disabled={shareState === 'loading'} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '12px 24px',
          background: shareState === 'done'
            ? `${sign.color}30`
            : `linear-gradient(135deg, ${sign.colorDark}60, ${sign.color}30)`,
          border: `1px solid ${sign.color}60`, borderRadius: 100,
          cursor: shareState === 'loading' ? 'wait' : 'pointer',
          fontFamily: "'Raleway',sans-serif", fontSize: '0.85rem', fontWeight: 600,
          color: 'var(--white)', letterSpacing: '0.05em',
          boxShadow: `0 0 16px ${sign.color}25`,
          transition: 'all 0.25s ease',
          opacity: shareState === 'loading' ? 0.7 : 1,
        }}>
          {shareLabel}
        </button>
      </div>

      {/* Share info note */}
      {shareState === 'idle' && (
        <p style={{ fontSize: '0.7rem', color: 'var(--silver-dim)', marginBottom: 16,
          fontStyle: 'italic' }}>
          ✦ Genera una tarjeta lista para Instagram o WhatsApp
        </p>
      )}

      {/* "Regresa mañana" note */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '11px 22px', background: 'rgba(200,216,236,0.04)',
        border: '1px solid var(--border)', borderRadius: 10,
      }}>
        <span style={{ fontSize: '0.9rem' }}>🌙</span>
        <p style={{ fontSize: '0.78rem', color: 'var(--silver-dim)',
          letterSpacing: '0.06em', fontFamily: "'Raleway',sans-serif" }}>
          Regresa mañana para una nueva afirmación
        </p>
      </div>
    </div>
  )
}

// ─── Carta Astral ──────────────────────────────────────────────
function ChartTab({ sign }) {
  const chakraInfo = CHAKRA_ICONS[sign.chakra] || { icon: '✦', desc: '' }

  return (
    <div>
      <div className="g3" style={{ marginBottom: 16 }}>
        <MiniCard label="Planeta regente" color={sign.color}>
          <span style={{ fontSize: '1.1rem' }}>{sign.planetSymbol}</span>
          <span>{sign.planet}</span>
        </MiniCard>
        <MiniCard label="Elemento" color={sign.color}>
          <span>{sign.elementIcon}</span><span>{sign.element}</span>
        </MiniCard>
        <MiniCard label="Color sagrado" color={sign.color}>
          <span style={{
            display: 'inline-block', width: 13, height: 13, borderRadius: '50%',
            background: sign.sacredColorHex, border: '2px solid rgba(255,255,255,0.35)',
            flexShrink: 0,
          }} />
          <span>{sign.sacredColor}</span>
        </MiniCard>
      </div>

      <div className="g2" style={{ marginBottom: 28 }}>
        <MiniCard label="Cristal" color={sign.color}>
          <span>💎</span><span>{sign.crystal}</span>
        </MiniCard>
        <MiniCard label={`Chakra: ${sign.chakra}`} color={sign.chakraColor || sign.color}>
          <span style={{
            display: 'inline-block', width: 13, height: 13, borderRadius: '50%',
            background: sign.chakraColor, border: '2px solid rgba(255,255,255,0.35)',
            flexShrink: 0,
          }} />
          <span>{chakraInfo.icon} {chakraInfo.desc}</span>
        </MiniCard>
      </div>

      <section style={{ marginBottom: 22 }}>
        <p style={sectionLabel}>✦ Fortalezas</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {sign.strengths.map(s => (
            <Tag key={s} bg={`${sign.color}22`} border={`${sign.color}55`}
              color="var(--silver-hi)">{s}</Tag>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 28 }}>
        <p style={sectionLabel}>✦ Áreas de Crecimiento</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {sign.weaknesses.map(w => (
            <Tag key={w} bg="rgba(200,90,90,0.12)" border="rgba(200,90,90,0.32)"
              color="var(--silver-mid)">{w}</Tag>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 32 }}>
        <p style={sectionLabel}>✦ Compatibilidad Amorosa</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {sign.compatibility.map(id => {
            const compat = signById[id]
            if (!compat) return null
            return (
              <div key={id} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 18px',
                background: `linear-gradient(135deg, ${compat.colorDark}70, ${compat.color}20)`,
                border: `1px solid ${compat.color}55`, borderRadius: 12,
              }}>
                <span style={{ fontSize: '1.4rem',
                  filter: `drop-shadow(0 0 7px ${compat.color})` }}>{compat.symbol}</span>
                <div>
                  <div style={{ fontFamily: "'Cinzel',serif", fontSize: '0.8rem',
                    fontWeight: 600, color: 'var(--white)', marginBottom: 2 }}>{compat.name}</div>
                  <div style={{ fontSize: '0.65rem', color: 'var(--silver-dim)' }}>
                    {compat.elementIcon} {compat.element}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <div style={{
        padding: '32px 36px',
        background: `linear-gradient(135deg, ${sign.colorDark}50, ${sign.color}12)`,
        border: `1px solid ${sign.color}35`, borderRadius: 18,
        textAlign: 'center', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)', width: 200, height: 200,
          background: `radial-gradient(circle, ${sign.color}12, transparent 70%)`,
          pointerEvents: 'none',
        }} />
        <p style={{ fontFamily: "'Cinzel',serif", fontSize: '0.68rem',
          letterSpacing: '0.28em', color: sign.color, textTransform: 'uppercase',
          marginBottom: 16, position: 'relative', zIndex: 1 }}>✦ Frase del Alma</p>
        <p style={{ fontFamily: "'Cinzel',serif",
          fontSize: 'clamp(0.95rem, 2vw, 1.12rem)', fontStyle: 'italic',
          color: 'var(--silver-hi)', lineHeight: 1.8, letterSpacing: '0.03em',
          position: 'relative', zIndex: 1 }}>
          "{sign.soulPhrase}"
        </p>
      </div>
    </div>
  )
}

// ─── Micro-components ──────────────────────────────────────────
function MiniCard({ label, color, children }) {
  return (
    <div style={{ background: 'rgba(10,20,60,0.55)', border: `1px solid ${color}28`,
      borderRadius: 12, padding: '16px 14px', textAlign: 'center' }}>
      <div style={{ fontFamily: "'Cinzel',serif", fontSize: '0.62rem',
        letterSpacing: '0.18em', color: 'var(--silver-dim)', textTransform: 'uppercase',
        marginBottom: 9 }}>{label}</div>
      <div style={{ fontFamily: "'Raleway',sans-serif", fontSize: '0.88rem',
        fontWeight: 600, color: 'var(--silver-hi)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, flexWrap: 'wrap' }}>
        {children}
      </div>
    </div>
  )
}

function Tag({ bg, border, color, children }) {
  return (
    <span style={{ padding: '5px 14px', background: bg,
      border: `1px solid ${border}`, borderRadius: 100,
      fontSize: '0.8rem', color, fontFamily: "'Raleway',sans-serif",
      letterSpacing: '0.03em' }}>{children}</span>
  )
}

const sectionLabel = {
  fontFamily: "'Cinzel',serif", fontSize: '0.68rem', letterSpacing: '0.22em',
  color: 'var(--silver-dim)', textTransform: 'uppercase', marginBottom: 12,
}

// ═══════════════════════════════════════════════════════════════
//  EXPLORAR TU SIGNO — 5 secciones interactivas
// ═══════════════════════════════════════════════════════════════

function ExploreTab({ sign }) {
  const [open, setOpen] = useState('casa')
  const deep = ZODIAC_DEEP[sign.id]
  const ext  = ZODIAC_EXTENDED[sign.id]

  const GROUP_A = [
    { id:'casa',         icon:'🏛️', title:`Casa ${ext?.casa.number}: ${ext?.casa.name?.split('—')[1]?.trim() || 'Astrológica'}` },
    { id:'mision',       icon:'✦',  title:'Misión de Vida'      },
    { id:'sombra',       icon:'🌑', title:'La Sombra del Signo' },
    { id:'norte',        icon:'🧭', title:'Norte Lunar'         },
  ]
  const GROUP_B = [
    { id:'talentos',     icon:'⭐', title:'Habilidades Naturales' },
    { id:'vocaciones',   icon:'🎯', title:'Vocaciones y Talentos' },
    { id:'compatdeep',   icon:'💫', title:'Compatibilidad Profunda' },
    { id:'crecimiento',  icon:'🌱', title:'Camino de Crecimiento' },
  ]
  const GROUP_C = [
    { id:'elemento',         icon: deep?.element?.icon || '✦', title:`Elemento: ${deep?.element?.name || ''}` },
    { id:'planeta',          icon:'🪐', title:`Planeta: ${sign.planet}` },
    { id:'cristales',        icon:'💎', title:'Cristales'             },
    { id:'colores',          icon:'🎨', title:'Colores y Energía'      },
    { id:'autoconocimiento', icon:'📖', title:'Diario de Autoconocimiento' },
  ]

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:10 }}>

      {/* ── Tu Alma ── */}
      <SectionGroupLabel color={sign.color} label="Tu Alma" />
      {GROUP_A.map(s => (
        <Accordion key={s.id} id={s.id} icon={s.icon} title={s.title}
          color={sign.color} open={open} onToggle={setOpen}>
          {s.id === 'casa'     && <CasaSection      ext={ext}  sign={sign} />}
          {s.id === 'mision'   && <MisionSection    ext={ext}  sign={sign} />}
          {s.id === 'sombra'   && <ShadowSection    ext={ext}  sign={sign} />}
          {s.id === 'norte'    && <NorteSection     ext={ext}  sign={sign} />}
        </Accordion>
      ))}

      {/* ── Tu Propósito ── */}
      <SectionGroupLabel color={sign.color} label="Tu Propósito" />
      {GROUP_B.map(s => (
        <Accordion key={s.id} id={s.id} icon={s.icon} title={s.title}
          color={sign.color} open={open} onToggle={setOpen}>
          {s.id === 'talentos'    && <TalentsSection    ext={ext}  sign={sign} />}
          {s.id === 'vocaciones'  && <VocationsSection  ext={ext}  sign={sign} />}
          {s.id === 'compatdeep'  && <DeepCompatSection ext={ext}  sign={sign} />}
          {s.id === 'crecimiento' && <GrowthSection     ext={ext}  sign={sign} />}
        </Accordion>
      ))}

      {/* ── Tu Esencia ── */}
      <SectionGroupLabel color={sign.color} label="Tu Esencia" />
      {GROUP_C.map(s => (
        <Accordion key={s.id} id={s.id} icon={s.icon} title={s.title}
          color={sign.color} open={open} onToggle={setOpen}>
          {s.id === 'elemento'         && deep && <ElementSection   deep={deep} sign={sign} />}
          {s.id === 'planeta'          && deep && <PlanetSection    deep={deep} sign={sign} />}
          {s.id === 'cristales'        && deep && <CrystalsSection  deep={deep} sign={sign} />}
          {s.id === 'colores'          && deep && <ColorsSection    deep={deep} sign={sign} />}
          {s.id === 'autoconocimiento' && deep && <JournalSection   deep={deep} sign={sign} />}
        </Accordion>
      ))}
    </div>
  )
}

function SectionGroupLabel({ color, label }) {
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10, padding:'4px 2px', marginTop:8 }}>
      <div style={{ flex:1, height:1,
        background:`linear-gradient(90deg, ${color}50, transparent)` }} />
      <span style={{ fontFamily:"'Cinzel',serif", fontSize:'0.62rem',
        letterSpacing:'0.22em', color, textTransform:'uppercase' }}>{label}</span>
      <div style={{ flex:1, height:1,
        background:`linear-gradient(90deg, transparent, ${color}50)` }} />
    </div>
  )
}

// ── Accordion wrapper ──────────────────────────────────────────
function Accordion({ id, icon, title, color, open, onToggle, children }) {
  const isOpen = open === id
  return (
    <div style={{ border:`1px solid ${isOpen ? color+'45' : 'var(--border)'}`,
      borderRadius:16, overflow:'hidden',
      boxShadow: isOpen ? `0 0 20px ${color}12` : 'none',
      transition:'box-shadow 0.3s ease' }}>
      <button onClick={() => onToggle(isOpen ? null : id)} style={{
        width:'100%', display:'flex', alignItems:'center', gap:14,
        padding:'18px 20px',
        background: isOpen
          ? `linear-gradient(135deg, ${color}18, ${color}06)` : 'rgba(10,20,60,0.55)',
        border:'none', cursor:'pointer', textAlign:'left',
        transition:'background 0.2s',
      }}>
        <span style={{ fontSize:'1.3rem',
          filter: isOpen ? `drop-shadow(0 0 8px ${color})` : 'none',
          transition:'filter 0.2s' }}>{icon}</span>
        <span style={{ flex:1, fontFamily:"'Cinzel',serif", fontSize:'0.85rem',
          fontWeight:600, color: isOpen ? 'var(--white)' : 'var(--silver-mid)',
          letterSpacing:'0.05em', transition:'color 0.2s' }}>{title}</span>
        <span style={{ fontSize:'0.9rem', color: isOpen ? color : 'var(--silver-dim)',
          transform: isOpen ? 'rotate(180deg)' : 'none', transition:'all 0.25s ease' }}>↓</span>
      </button>
      {isOpen && (
        <div style={{ padding:'22px 24px', borderTop:`1px solid ${color}20`,
          animation:'fadeUp 0.3s ease' }}>
          {children}
        </div>
      )}
    </div>
  )
}

// ── 1. Elemento ────────────────────────────────────────────────
function ElementSection({ deep, sign }) {
  const el = deep.element
  return (
    <div>
      <p style={deepBody}>{el.essence}</p>

      <DeepLabel color={sign.color}>Cómo usarlo en tu vida diaria</DeepLabel>
      <div style={{ display:'flex', flexDirection:'column', gap:8, marginBottom:20 }}>
        {el.daily.map((tip,i) => (
          <div key={i} style={{ display:'flex', gap:12, padding:'12px 14px',
            background:`${sign.color}10`, border:`1px solid ${sign.color}20`, borderRadius:10 }}>
            <span style={{ color:sign.color, fontWeight:700, flexShrink:0 }}>{i+1}.</span>
            <p style={{ fontSize:'0.84rem', color:'var(--silver)', lineHeight:1.6 }}>{tip}</p>
          </div>
        ))}
      </div>

      <DeepLabel color={sign.color}>Cómo influye en tu personalidad</DeepLabel>
      <p style={{ ...deepBody, marginBottom:20 }}>{el.personality}</p>

      <div style={{ background:`linear-gradient(135deg,${sign.colorDark}50,${sign.color}12)`,
        border:`1px solid ${sign.color}30`, borderRadius:14, padding:'20px 20px' }}>
        <p style={{ fontFamily:"'Cinzel',serif", fontSize:'0.68rem', letterSpacing:'0.2em',
          color:sign.color, textTransform:'uppercase', marginBottom:12 }}>
          ✦ {el.exercise.title}
        </p>
        <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
          {el.exercise.steps.map((s,i) => (
            <div key={i} style={{ display:'flex', gap:10, alignItems:'flex-start' }}>
              <span style={{ width:22, height:22, borderRadius:'50%', flexShrink:0,
                background:sign.color, display:'inline-flex', alignItems:'center',
                justifyContent:'center', fontSize:'0.7rem', fontWeight:700,
                color:'var(--white)' }}>{i+1}</span>
              <p style={{ fontSize:'0.84rem', color:'var(--silver-hi)', lineHeight:1.6 }}>{s}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── 2. Planeta ─────────────────────────────────────────────────
function PlanetSection({ deep, sign }) {
  const p = deep.planet
  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:20 }}>
        <div style={{ fontSize:'3rem', filter:`drop-shadow(0 0 14px ${sign.color})` }}>
          {sign.planetSymbol}
        </div>
        <div>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:'1rem', fontWeight:700,
            color:'var(--white)', marginBottom:3 }}>{sign.planet}</div>
          <div style={{ fontSize:'0.75rem', color:sign.color }}>Planeta regente de {sign.name}</div>
        </div>
      </div>

      {[
        { label:'¿Qué es?',                  text: p.what },
        { label:'¿Por qué rige a '+sign.name+'?', text: p.whyRules },
        { label:'Energía que te aporta',     text: p.energyGift },
      ].map(item => (
        <div key={item.label} style={{ marginBottom:18 }}>
          <DeepLabel color={sign.color}>{item.label}</DeepLabel>
          <p style={deepBody}>{item.text}</p>
        </div>
      ))}

      <div style={{ padding:'18px 20px', background:'rgba(200,216,236,0.05)',
        border:'1px solid rgba(200,216,236,0.15)', borderRadius:12, marginTop:4 }}>
        <p style={{ fontFamily:"'Cinzel',serif", fontSize:'0.66rem', letterSpacing:'0.18em',
          color:'var(--silver-dim)', textTransform:'uppercase', marginBottom:8 }}>
          🔄 Cuando {sign.planet} está retrógrado
        </p>
        <p style={{ fontSize:'0.84rem', color:'var(--silver)', lineHeight:1.7,
          fontStyle:'italic' }}>{p.retrograde}</p>
      </div>
    </div>
  )
}

// ── 3. Cristales ───────────────────────────────────────────────
function CrystalsSection({ deep, sign }) {
  const [activeC, setActiveC] = useState(0)
  const crystals = deep.crystals
  const c = crystals[activeC]

  return (
    <div>
      {/* Crystal selector */}
      <div style={{ display:'flex', gap:8, marginBottom:20, flexWrap:'wrap' }}>
        {crystals.map((cr,i) => (
          <button key={cr.name} onClick={() => setActiveC(i)} style={{
            padding:'9px 18px', borderRadius:100, cursor:'pointer',
            background: i === activeC ? `linear-gradient(135deg,${sign.colorDark},${sign.color})` : 'rgba(10,20,60,0.6)',
            border: i === activeC ? `1px solid ${sign.color}60` : '1px solid var(--border)',
            fontFamily:"'Raleway',sans-serif", fontSize:'0.82rem', fontWeight: i === activeC ? 700 : 400,
            color: i === activeC ? 'var(--white)' : 'var(--silver-dim)',
            transition:'all 0.2s ease',
          }}>
            {cr.emoji} {cr.name}
          </button>
        ))}
      </div>

      {/* Crystal detail */}
      <div style={{ animation:'fadeUp 0.3s ease' }}>
        {/* Header */}
        <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:20,
          padding:'16px 18px', background:`${c.color}15`,
          border:`1px solid ${c.color}35`, borderRadius:14 }}>
          <div style={{ fontSize:'2.5rem', filter:`drop-shadow(0 0 12px ${c.color})` }}>
            {c.emoji}
          </div>
          <div>
            <div style={{ fontFamily:"'Cinzel',serif", fontSize:'1rem', fontWeight:700,
              color:'var(--white)', marginBottom:4 }}>{c.name}</div>
            <p style={{ fontSize:'0.8rem', color:'var(--silver-mid)', lineHeight:1.5 }}>
              {c.properties}
            </p>
          </div>
        </div>

        {/* How-to grid */}
        <div className="g2" style={{ gap:12, marginBottom:16 }}>
          {[
            { label:'Cómo sostenerla', icon:'🙌', text: c.howToHold },
            { label:'Dónde en el cuerpo', icon:'✨', text: c.bodyPlacement },
          ].map(item => (
            <div key={item.label} style={{ padding:'14px 16px',
              background:'rgba(10,20,60,0.6)', border:'1px solid var(--border)', borderRadius:12 }}>
              <div style={{ fontFamily:"'Cinzel',serif", fontSize:'0.62rem',
                letterSpacing:'0.15em', color:'var(--silver-dim)', textTransform:'uppercase',
                marginBottom:8 }}>{item.icon} {item.label}</div>
              <p style={{ fontSize:'0.8rem', color:'var(--silver)', lineHeight:1.6 }}>{item.text}</p>
            </div>
          ))}
        </div>

        <div style={{ padding:'14px 16px', marginBottom:16,
          background:'rgba(200,216,236,0.04)', border:'1px solid var(--border)', borderRadius:12 }}>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:'0.62rem',
            letterSpacing:'0.15em', color:'var(--silver-dim)', textTransform:'uppercase',
            marginBottom:8 }}>🌕 Cómo limpiarla con la luna</div>
          <p style={{ fontSize:'0.8rem', color:'var(--silver)', lineHeight:1.6 }}>
            {c.moonCleansing}
          </p>
        </div>

        <DeepLabel color={sign.color}>Úsala especialmente cuando...</DeepLabel>
        <div style={{ display:'flex', flexWrap:'wrap', gap:8, marginBottom:20 }}>
          {c.bestFor.map(bf => (
            <span key={bf} style={{ padding:'6px 14px', borderRadius:100,
              background:`${sign.color}18`, border:`1px solid ${sign.color}35`,
              fontSize:'0.78rem', color:'var(--silver-hi)' }}>{bf}</span>
          ))}
        </div>

        <div style={{ padding:'16px 20px', textAlign:'center',
          background:`linear-gradient(135deg,${sign.colorDark}50,${sign.color}10)`,
          border:`1px solid ${sign.color}30`, borderRadius:12 }}>
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:'0.65rem', letterSpacing:'0.2em',
            color:sign.color, textTransform:'uppercase', marginBottom:8 }}>
            ✦ Afirmación para activarla
          </p>
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:'0.88rem', fontStyle:'italic',
            color:'var(--silver-hi)', lineHeight:1.7 }}>"{c.affirmation}"</p>
        </div>
      </div>
    </div>
  )
}

// ── 4. Colores ─────────────────────────────────────────────────
function ColorsSection({ deep, sign }) {
  const col = deep.colors
  return (
    <div>
      {/* Sacred color */}
      <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:20 }}>
        <div style={{ width:52, height:52, borderRadius:12, flexShrink:0,
          background:col.sacred.hex,
          boxShadow:`0 0 20px ${col.sacred.hex}60`,
          border:'2px solid rgba(255,255,255,0.2)' }} />
        <div>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:'0.95rem', fontWeight:700,
            color:'var(--white)', marginBottom:3 }}>{col.sacred.name}</div>
          <div style={{ fontSize:'0.72rem', color:'var(--silver-dim)' }}>Color sagrado de {sign.name}</div>
        </div>
      </div>

      <p style={deepBody}>{col.sacred.why}</p>

      <div className="g2" style={{ gap:12, marginBottom:28 }}>
        <div style={{ padding:'14px 16px', background:'rgba(10,20,60,0.6)',
          border:'1px solid var(--border)', borderRadius:12 }}>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:'0.62rem', letterSpacing:'0.15em',
            color:'var(--silver-dim)', textTransform:'uppercase', marginBottom:6 }}>
            👗 En tu ropa
          </div>
          <p style={{ fontSize:'0.8rem', color:'var(--silver)', lineHeight:1.6 }}>{col.sacred.clothing}</p>
        </div>
        <div style={{ padding:'14px 16px', background:'rgba(10,20,60,0.6)',
          border:'1px solid var(--border)', borderRadius:12 }}>
          <div style={{ fontFamily:"'Cinzel',serif", fontSize:'0.62rem', letterSpacing:'0.15em',
            color:'var(--silver-dim)', textTransform:'uppercase', marginBottom:6 }}>
            🏡 En tu decoración
          </div>
          <p style={{ fontSize:'0.8rem', color:'var(--silver)', lineHeight:1.6 }}>{col.sacred.decor}</p>
        </div>
      </div>

      {/* Weekly colors */}
      <DeepLabel color={sign.color}>Color y energía para cada día</DeepLabel>
      <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
        {col.weekly.map(w => (
          <div key={w.day} style={{ display:'flex', alignItems:'center', gap:12,
            padding:'11px 14px', background:'rgba(10,20,60,0.5)',
            border:'1px solid var(--border)', borderRadius:12,
            transition:'all 0.15s' }}>
            <div style={{ width:32, height:32, borderRadius:'50%', flexShrink:0,
              background:w.hex, border:'2px solid rgba(255,255,255,0.2)',
              boxShadow:`0 0 10px ${w.hex}50` }} />
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', alignItems:'center', gap:8, marginBottom:2 }}>
                <span style={{ fontFamily:"'Cinzel',serif", fontSize:'0.72rem', fontWeight:700,
                  color:'var(--white)' }}>{w.day}</span>
                <span style={{ fontSize:'0.68rem', color:'var(--silver-dim)' }}>· {w.color}</span>
              </div>
              <p style={{ fontSize:'0.75rem', color:'var(--silver-mid)', lineHeight:1.4,
                fontStyle:'italic' }}>{w.intention}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── 5. Autoconocimiento ────────────────────────────────────────
function JournalSection({ deep, sign }) {
  const storageKey = `zodiac_journal_${sign.id}`
  const [answers, setAnswers] = useState(() => {
    try { return JSON.parse(localStorage.getItem(storageKey) || '{}') } catch { return {} }
  })

  const saveAnswer = (idx, val) => {
    const updated = { ...answers, [`q${idx}`]: val }
    setAnswers(updated)
    localStorage.setItem(storageKey, JSON.stringify(updated))
  }

  const answeredCount = Object.values(answers).filter(a => a && a.trim()).length

  return (
    <div>
      <p style={{ ...deepBody, marginBottom:8 }}>
        Estas preguntas son solo para ti. No hay respuestas correctas — solo verdades que ya viven en ti esperando ser nombradas.
      </p>
      <div style={{ display:'inline-flex', alignItems:'center', gap:6, marginBottom:24,
        padding:'6px 14px', borderRadius:100,
        background:`${sign.color}14`, border:`1px solid ${sign.color}30` }}>
        <span style={{ fontSize:'0.72rem', color:sign.color }}>
          {answeredCount} de {deep.selfKnowledge.length} respondidas
        </span>
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:20 }}>
        {deep.selfKnowledge.map((item, i) => (
          <div key={i} style={{ padding:'20px 20px',
            background:`linear-gradient(135deg,${sign.colorDark}35,${sign.color}08)`,
            border:`1px solid ${sign.color}25`, borderRadius:14 }}>
            {/* Question number */}
            <div style={{ display:'flex', alignItems:'flex-start', gap:12, marginBottom:14 }}>
              <div style={{ width:26, height:26, borderRadius:'50%', flexShrink:0,
                background:sign.color, display:'flex', alignItems:'center',
                justifyContent:'center', fontSize:'0.72rem', fontWeight:700,
                color:'var(--white)', marginTop:2 }}>{i+1}</div>
              <div>
                <p style={{ fontFamily:"'Cinzel',serif", fontSize:'0.9rem', fontWeight:500,
                  color:'var(--white)', lineHeight:1.65, marginBottom:6 }}>{item.q}</p>
                <p style={{ fontSize:'0.75rem', color:'var(--silver-dim)', fontStyle:'italic',
                  lineHeight:1.5 }}>{item.context}</p>
              </div>
            </div>
            <textarea
              value={answers[`q${i}`] || ''}
              onChange={e => saveAnswer(i, e.target.value)}
              placeholder="Escribe desde el corazón... se guarda automáticamente."
              style={{
                width:'100%', minHeight:90,
                background:'rgba(6,10,38,0.8)',
                border:`1px solid ${answers[`q${i}`]?.trim() ? sign.color+'45' : 'var(--border)'}`,
                borderRadius:10, padding:'12px 14px',
                color:'var(--silver-hi)', fontSize:'0.85rem',
                fontFamily:"'Raleway',sans-serif", fontStyle:'italic',
                lineHeight:1.7, resize:'vertical', outline:'none',
                boxSizing:'border-box',
                transition:'border-color 0.2s',
              }}
            />
            {answers[`q${i}`]?.trim() && (
              <p style={{ fontSize:'0.68rem', color:sign.color, marginTop:6, textAlign:'right' }}>
                ✓ Guardado
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Shared deep-section styles ─────────────────────────────────
function DeepLabel({ color, children }) {
  return (
    <p style={{ fontFamily:"'Cinzel',serif", fontSize:'0.65rem', letterSpacing:'0.2em',
      color: color, textTransform:'uppercase', marginBottom:10 }}>
      ✦ {children}
    </p>
  )
}

const deepBody = {
  fontSize:'0.86rem', color:'var(--silver)', lineHeight:1.8,
  fontFamily:"'Raleway',sans-serif", marginBottom:16,
}

// ═══════════════════════════════════════════════════════════════
//  8 NUEVAS SECCIONES — Tu Alma + Tu Propósito
// ═══════════════════════════════════════════════════════════════

// ── Casa Astrológica ───────────────────────────────────────────
function CasaSection({ ext, sign }) {
  if (!ext?.casa) return null
  const c = ext.casa
  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', gap:16, marginBottom:22 }}>
        <div style={{
          width:64, height:64, borderRadius:16, flexShrink:0,
          background:`linear-gradient(135deg,${sign.colorDark},${sign.color})`,
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:`0 0 24px ${sign.color}40`,
        }}>
          <span style={{ fontFamily:"'Cinzel',serif", fontSize:'1.6rem',
            fontWeight:700, color:'var(--white)' }}>{c.number}</span>
        </div>
        <div>
          <p style={{ fontFamily:"'Cinzel',serif", fontSize:'1rem', fontWeight:700,
            color:'var(--white)', marginBottom:4, letterSpacing:'0.05em' }}>{c.name}</p>
          <p style={{ fontSize:'0.75rem', color:sign.color }}>Casa regida por {sign.name}</p>
        </div>
      </div>
      {[
        { label:'¿Qué gobierna?',              text: c.governs    },
        { label:'Lecciones de esta casa',       text: c.lessons    },
        { label:'Cómo influye en tu carácter',  text: c.influence  },
      ].map(item => (
        <div key={item.label} style={{ marginBottom:16 }}>
          <DeepLabel color={sign.color}>{item.label}</DeepLabel>
          <p style={deepBody}>{item.text}</p>
        </div>
      ))}
    </div>
  )
}

// ── Misión de Vida ─────────────────────────────────────────────
function MisionSection({ ext, sign }) {
  if (!ext?.lifeMission) return null
  return (
    <div>
      <div style={{ position:'relative', padding:'32px 28px',
        background:`linear-gradient(135deg,${sign.colorDark}55,${sign.color}12)`,
        border:`1px solid ${sign.color}35`, borderRadius:16, marginBottom:20 }}>
        <div style={{ position:'absolute', top:12, left:18, fontSize:'5rem',
          lineHeight:1, color:`${sign.color}18`, fontFamily:'Georgia,serif',
          userSelect:'none' }}>"</div>
        <p style={{ fontFamily:"'Cinzel',serif", fontSize:'clamp(0.9rem,2vw,1.08rem)',
          fontStyle:'italic', color:'var(--silver-hi)', lineHeight:1.85,
          letterSpacing:'0.02em', position:'relative', zIndex:1 }}>
          {ext.lifeMission}
        </p>
      </div>
      <p style={{ fontSize:'0.78rem', color:sign.color, textAlign:'center',
        letterSpacing:'0.1em', fontFamily:"'Cinzel',serif" }}>
        ✦ Esta es la esencia de tu propósito en este ciclo de vida ✦
      </p>
    </div>
  )
}

// ── La Sombra ──────────────────────────────────────────────────
function ShadowSection({ ext, sign }) {
  if (!ext?.shadow) return null
  return (
    <div>
      <div style={{ padding:'10px 16px', marginBottom:18,
        background:'rgba(200,216,236,0.05)', border:'1px solid rgba(200,216,236,0.12)',
        borderRadius:10 }}>
        <p style={{ fontSize:'0.78rem', color:'var(--silver-dim)', lineHeight:1.6,
          fontStyle:'italic' }}>
          La sombra no es tu enemiga — es la parte que más necesita amor. Reconocerla sin juicio es el primer paso hacia tu versión más completa.
        </p>
      </div>
      <p style={deepBody}>{ext.shadow}</p>
      <div style={{ padding:'16px 18px', borderRadius:12,
        background:`${sign.color}0e`, border:`1px solid ${sign.color}25` }}>
        <p style={{ fontFamily:"'Cinzel',serif", fontSize:'0.65rem', letterSpacing:'0.18em',
          color:sign.color, textTransform:'uppercase', marginBottom:8 }}>
          ✦ Invitación para trabajarla
        </p>
        <p style={{ fontSize:'0.82rem', color:'var(--silver-mid)', lineHeight:1.7,
          fontStyle:'italic' }}>
          Observa esta sombra cuando aparezca sin castigarte. Solo pregunta: "¿Qué necesito que no estoy reconociendo?" La respuesta honesta es el inicio de la sanación.
        </p>
      </div>
    </div>
  )
}

// ── Norte Lunar ────────────────────────────────────────────────
function NorteSection({ ext, sign }) {
  if (!ext?.northLuna) return null
  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:18 }}>
        <span style={{ fontSize:'2rem',
          filter:`drop-shadow(0 0 10px ${sign.color})`,
          animation:'moonGlow 3s ease-in-out infinite' }}>🧭</span>
        <p style={{ fontFamily:"'Cinzel',serif", fontSize:'0.8rem', color:'var(--silver-mid)',
          letterSpacing:'0.05em', lineHeight:1.5 }}>
          Hacia dónde está llamada/o a crecer tu alma en esta vida
        </p>
      </div>
      <div style={{ padding:'24px 22px',
        background:`linear-gradient(135deg,rgba(26,47,122,0.5),${sign.color}10)`,
        border:`1px solid ${sign.color}30`, borderRadius:14, marginBottom:0 }}>
        <p style={{ fontFamily:"'Raleway',sans-serif", fontSize:'0.88rem',
          color:'var(--silver-hi)', lineHeight:1.85 }}>
          {ext.northLuna}
        </p>
      </div>
    </div>
  )
}

// ── Habilidades Naturales ──────────────────────────────────────
function TalentsSection({ ext, sign }) {
  if (!ext?.naturalTalents) return null
  return (
    <div>
      <p style={{ ...deepBody, marginBottom:20 }}>
        Estos son los dones que llevas contigo desde que naciste. Los das por sentados porque son naturales para ti — pero para la mayoría de las personas son extraordinarios.
      </p>
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {ext.naturalTalents.map((t, i) => (
          <div key={i} style={{ display:'flex', alignItems:'flex-start', gap:12,
            padding:'14px 16px',
            background:`${sign.color}10`, border:`1px solid ${sign.color}22`, borderRadius:12 }}>
            <div style={{ width:28, height:28, borderRadius:'50%', flexShrink:0,
              background:`linear-gradient(135deg,${sign.colorDark},${sign.color})`,
              display:'flex', alignItems:'center', justifyContent:'center',
              fontSize:'0.72rem', fontWeight:700, color:'var(--white)',
              boxShadow:`0 0 10px ${sign.color}40` }}>
              {i + 1}
            </div>
            <p style={{ fontSize:'0.86rem', color:'var(--silver-hi)', lineHeight:1.6,
              fontFamily:"'Raleway',sans-serif" }}>{t}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Vocaciones ─────────────────────────────────────────────────
function VocationsSection({ ext, sign }) {
  if (!ext?.vocations) return null
  return (
    <div>
      <p style={{ ...deepBody, marginBottom:20 }}>
        Estas son las áreas donde tu energía fluye de forma natural. No significa que debas dedicarte a todas — pero sí que en alguna de estas encontrarás el menor obstáculo y el mayor significado.
      </p>
      <div style={{ display:'flex', flexWrap:'wrap', gap:9 }}>
        {ext.vocations.map((v, i) => (
          <div key={i} style={{ display:'flex', alignItems:'center', gap:8,
            padding:'9px 16px',
            background:`${sign.color}14`, border:`1px solid ${sign.color}30`, borderRadius:100 }}>
            <span style={{ color:sign.color, fontSize:'0.9rem' }}>✦</span>
            <span style={{ fontSize:'0.82rem', color:'var(--silver-hi)',
              fontFamily:"'Raleway',sans-serif" }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Compatibilidad Profunda ────────────────────────────────────
function DeepCompatSection({ ext, sign }) {
  if (!ext?.deepCompatibility) return null
  const dc = ext.deepCompatibility
  return (
    <div>
      {/* Best matches */}
      <DeepLabel color={sign.color}>Donde fluyes con más naturalidad</DeepLabel>
      <div style={{ display:'flex', flexDirection:'column', gap:12, marginBottom:24 }}>
        {dc.best.map(b => {
          const other = signById[b.sign]
          if (!other) return null
          return (
            <div key={b.sign} style={{ padding:'18px 18px',
              background:`linear-gradient(135deg,${other.colorDark}50,${other.color}14)`,
              border:`1px solid ${other.color}40`, borderRadius:14 }}>
              <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:10 }}>
                <span style={{ fontSize:'1.8rem',
                  filter:`drop-shadow(0 0 10px ${other.color})` }}>{other.symbol}</span>
                <div>
                  <span style={{ fontFamily:"'Cinzel',serif", fontSize:'0.9rem',
                    fontWeight:700, color:'var(--white)' }}>{other.name}</span>
                  <span style={{ fontSize:'0.7rem', color:other.color, marginLeft:8 }}>
                    {other.elementIcon} {other.element}
                  </span>
                </div>
              </div>
              <p style={{ fontSize:'0.82rem', color:'var(--silver)', lineHeight:1.65,
                marginBottom:10 }}>{b.why}</p>
              <div style={{ padding:'10px 14px', background:`${other.color}10`,
                border:`1px solid ${other.color}25`, borderRadius:10 }}>
                <p style={{ fontFamily:"'Cinzel',serif", fontSize:'0.62rem',
                  letterSpacing:'0.15em', color:other.color, textTransform:'uppercase',
                  marginBottom:6 }}>Cómo conectar mejor</p>
                <p style={{ fontSize:'0.8rem', color:'var(--silver-mid)', lineHeight:1.6,
                  fontStyle:'italic' }}>{b.howToConnect}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Challenging */}
      <DeepLabel color={sign.color}>Donde la relación te enseña más</DeepLabel>
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {dc.challenging.map(b => {
          const other = signById[b.sign]
          if (!other) return null
          return (
            <div key={b.sign} style={{ padding:'16px 18px',
              background:'rgba(200,216,236,0.04)', border:'1px solid var(--border)',
              borderRadius:12, display:'flex', gap:14, alignItems:'flex-start' }}>
              <span style={{ fontSize:'1.4rem', flexShrink:0,
                filter:`drop-shadow(0 0 6px ${other.color}80)` }}>{other.symbol}</span>
              <div>
                <p style={{ fontFamily:"'Cinzel',serif", fontSize:'0.8rem',
                  fontWeight:600, color:'var(--silver-hi)', marginBottom:6 }}>{other.name}</p>
                <p style={{ fontSize:'0.8rem', color:'var(--silver-mid)', lineHeight:1.65,
                  fontStyle:'italic' }}>{b.lesson}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Camino de Crecimiento ──────────────────────────────────────
function GrowthSection({ ext, sign }) {
  if (!ext?.growthPath) return null
  return (
    <div>
      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:20 }}>
        <span style={{ fontSize:'1.8rem',
          filter:`drop-shadow(0 0 10px ${sign.color})` }}>🌱</span>
        <p style={{ fontFamily:"'Cinzel',serif", fontSize:'0.78rem',
          color:'var(--silver-mid)', letterSpacing:'0.04em', lineHeight:1.5 }}>
          Hacia dónde necesitas evolucionar para llegar a tu versión más elevada
        </p>
      </div>
      <p style={deepBody}>{ext.growthPath}</p>
      <div style={{ padding:'18px 20px', textAlign:'center',
        background:`linear-gradient(135deg,${sign.colorDark}55,${sign.color}12)`,
        border:`1px solid ${sign.color}35`, borderRadius:14 }}>
        <p style={{ fontFamily:"'Cinzel',serif", fontSize:'0.65rem', letterSpacing:'0.2em',
          color:sign.color, textTransform:'uppercase', marginBottom:10 }}>
          ✦ Recuerda
        </p>
        <p style={{ fontFamily:"'Cinzel',serif", fontSize:'0.88rem', fontStyle:'italic',
          color:'var(--silver-hi)', lineHeight:1.8 }}>
          El crecimiento no es arreglarte. Es convertirte más plenamente en quien ya eres.
        </p>
      </div>
    </div>
  )
}
