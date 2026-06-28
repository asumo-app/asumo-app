import { useState, useRef, useEffect } from 'react'
import { aiResponses } from '../data/cosmicData'

// =====================================================
// 🌸 NÚMERO DE WHATSAPP DE FABITA
// Pon solo números: código de país + número
// Ej. Argentina: '5491112345678'  México: '5215512345678'
const FABITA_WHATSAPP = '5511978953752'
const FABITA_WA_URL = `https://wa.me/${FABITA_WHATSAPP}?text=Hola%20Fabita%2C%20me%20gustar%C3%ADa%20hablar%20contigo%20%F0%9F%92%9C`

// Quick topic chips — phrased like things a friend would actually say
const TOPICS = [
  { label: 'Estoy muy ansiosa/o', key: 'ansiedad', icon: '😰' },
  { label: 'Estoy pasando un momento difícil', key: 'tristeza', icon: '💧' },
  { label: 'Me siento sola/o', key: 'soledad', icon: '🌑' },
  { label: 'No tengo ganas de nada', key: 'motivacion', icon: '🔥' },
  { label: 'Quiero compartir algo bueno', key: 'gratitud', icon: '🌸' },
]

// Detect the emotional topic from free text
function detectTopic(text) {
  const t = text.toLowerCase()
  if (/(ansios|ansiedad|nervios|pánico|angustia|estresad|no puedo respirar|me ahogo)/.test(t)) return 'ansiedad'
  if (/(trist|llorar|mal|deprimi|dolor|pena|llorando|roto|destrozad)/.test(t)) return 'tristeza'
  if (/(sol[oa]|nadie|aislad|abandon|incomprendid|invisible)/.test(t)) return 'soledad'
  if (/(motivaci|sin ganas|no quiero|agotad|cansad|no puedo|flojera|no me importa)/.test(t)) return 'motivacion'
  if (/(gracias|grat|feliz|alegr|contento|emocionad|bien|bonito|hermoso)/.test(t)) return 'gratitud'
  return 'default'
}

// Pick a response, avoiding the last one shown if possible
function getResponse(text, lastResponse) {
  const topic = detectTopic(text)
  const pool = aiResponses[topic] || aiResponses.default
  const filtered = pool.filter(r => r !== lastResponse)
  const source = filtered.length > 0 ? filtered : pool
  return source[Math.floor(Math.random() * source.length)]
}

// Typing delay that scales naturally with response length
function typingDelay(text) {
  return Math.min(900 + text.length * 18, 3200)
}

const GREETING = {
  id: 0,
  from: 'asumo',
  text: 'Hola 🌙 Aquí estoy.\n\n¿Qué tal está tu día? Cuéntame lo que quieras, sin filtros.',
  time: new Date(),
}

export default function AIChat() {
  const [messages, setMessages] = useState([GREETING])
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [lastResponse, setLastResponse] = useState('')
  const [showFabita, setShowFabita] = useState(false)
  const endRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing])

  const send = (text) => {
    const trimmed = (text || input).trim()
    if (!trimmed || typing) return

    const userMsg = { id: Date.now(), from: 'user', text: trimmed, time: new Date() }
    setMessages(m => [...m, userMsg])
    setInput('')
    setTyping(true)

    const response = getResponse(trimmed, lastResponse)
    const delay = typingDelay(response)

    setTimeout(() => {
      setMessages(m => [...m, {
        id: Date.now() + 1,
        from: 'asumo',
        text: response,
        time: new Date(),
      }])
      setLastResponse(response)
      setTyping(false)
    }, delay)

    inputRef.current?.focus()
  }

  const openFabita = () => {
    if (showFabita) return
    setShowFabita(true)
    // Insert Fabita card naturally in the chat flow
    setTimeout(() => {
      setMessages(m => [...m, {
        id: Date.now() + 99,
        from: 'fabita',
        time: new Date(),
      }])
      endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 400)
  }

  const fmt = (d) => d.toLocaleTimeString('es', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="mod" style={{ maxWidth: 760 }}>
      <div className="mod-hd">
        <span className="mod-icon">💬</span>
        <h1 className="mod-title">Chat de Apoyo</h1>
        <p className="mod-sub">Un lugar seguro. Aquí puedes ser tú sin filtros.</p>
      </div>

      {/* Quick topics */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
        {TOPICS.map(t => (
          <button
            key={t.key}
            className="btn btn-ghost btn-sm"
            onClick={() => send(t.label)}
            disabled={typing}
            style={{ fontSize: '0.8rem' }}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* Fabita soft CTA — sits right above the chat window, feels natural */}
      <button
        onClick={openFabita}
        disabled={showFabita}
        style={{
          width: '100%',
          border: '1px solid rgba(196, 69, 105, 0.3)',
          borderRadius: 12,
          background: 'rgba(196, 69, 105, 0.07)',
          padding: '10px 18px',
          marginBottom: 14,
          cursor: showFabita ? 'default' : 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
          opacity: showFabita ? 0.5 : 1,
          transition: 'all 0.25s',
        }}
        onMouseEnter={e => { if (!showFabita) e.currentTarget.style.background = 'rgba(196,69,105,0.13)' }}
        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(196,69,105,0.07)' }}
      >
        <span style={{
          fontSize: '0.82rem',
          color: 'rgba(230, 160, 185, 0.9)',
          fontFamily: "'Raleway', sans-serif",
        }}>
          💜 ¿Necesitas hablar con alguien real?
        </span>
        <span style={{
          fontSize: '0.75rem',
          color: 'rgba(196, 69, 105, 0.8)',
          fontWeight: 600,
          letterSpacing: '0.04em',
        }}>
          {showFabita ? 'Ya aparece abajo ↓' : 'Conectar con Fabita →'}
        </span>
      </button>

      {/* Chat window */}
      <div className="card" style={{
        height: 460,
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid rgba(200,216,236,0.12)',
      }}>
        {/* Messages area */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '22px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}>
          {messages.map(msg => {
            // — Fabita contact card —
            if (msg.from === 'fabita') return (
              <div key={msg.id} style={{ animation: 'fadeUp 0.4s ease' }}>
                <FabitaCard waUrl={FABITA_WA_URL} />
              </div>
            )

            const isUser = msg.from === 'user'
            return (
              <div key={msg.id} style={{
                display: 'flex',
                flexDirection: isUser ? 'row-reverse' : 'row',
                gap: 10,
                alignItems: 'flex-end',
                animation: 'fadeUp 0.3s ease',
              }}>
                {/* Asumo avatar */}
                {!isUser && (
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #1a2f7a, #6b21a8)',
                    border: '1px solid rgba(168,85,247,0.35)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.8rem', flexShrink: 0,
                    boxShadow: '0 0 10px rgba(168,85,247,0.2)',
                  }}>✦</div>
                )}

                <div style={{ maxWidth: '74%' }}>
                  <div style={{
                    background: isUser
                      ? 'linear-gradient(135deg, #1a2f7a, #6b21a8)'
                      : 'rgba(18, 30, 75, 0.75)',
                    border: `1px solid ${isUser ? 'rgba(168,85,247,0.25)' : 'rgba(200,216,236,0.1)'}`,
                    borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    padding: '11px 15px',
                    backdropFilter: 'blur(12px)',
                  }}>
                    <p style={{
                      color: 'var(--white)',
                      fontSize: '0.88rem',
                      lineHeight: 1.7,
                      margin: 0,
                      whiteSpace: 'pre-wrap',
                    }}>{msg.text}</p>
                  </div>
                  <div style={{
                    fontSize: '0.62rem',
                    color: 'var(--silver-dim)',
                    marginTop: 3,
                    textAlign: isUser ? 'right' : 'left',
                    paddingInline: 4,
                  }}>{fmt(msg.time)}</div>
                </div>
              </div>
            )
          })}

          {/* Typing indicator */}
          {typing && (
            <div style={{
              display: 'flex', gap: 10, alignItems: 'flex-end',
              animation: 'fadeUp 0.25s ease',
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: '50%',
                background: 'linear-gradient(135deg, #1a2f7a, #6b21a8)',
                border: '1px solid rgba(168,85,247,0.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.8rem', flexShrink: 0,
              }}>✦</div>
              <div style={{
                background: 'rgba(18,30,75,0.75)',
                border: '1px solid rgba(200,216,236,0.1)',
                borderRadius: '16px 16px 16px 4px',
                padding: '13px 18px',
                display: 'flex', gap: 5, alignItems: 'center',
              }}>
                {[0, 0.22, 0.44].map((delay, i) => (
                  <div key={i} style={{
                    width: 6, height: 6, borderRadius: '50%',
                    background: 'var(--silver-mid)',
                    animation: `typing 1.1s ease-in-out infinite ${delay}s`,
                  }} />
                ))}
              </div>
            </div>
          )}

          <div ref={endRef} />
        </div>

        {/* Input bar */}
        <div style={{ height: 1, background: 'rgba(200,216,236,0.08)' }} />
        <div style={{ padding: '12px 14px', display: 'flex', gap: 10 }}>
          <input
            ref={inputRef}
            className="inp"
            placeholder="Escríbeme lo que quieras…"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
            disabled={typing}
            style={{ flex: 1, borderRadius: 50 }}
          />
          <button
            className="btn"
            onClick={() => send()}
            disabled={typing || !input.trim()}
            style={{
              flexShrink: 0,
              borderRadius: 50,
              opacity: (!input.trim() || typing) ? 0.4 : 1,
              transition: 'opacity 0.2s',
            }}
          >
            Enviar
          </button>
        </div>
      </div>

      <p style={{
        textAlign: 'center',
        marginTop: 12,
        fontSize: '0.68rem',
        color: 'var(--silver-dim)',
        letterSpacing: '0.04em',
        lineHeight: 1.6,
      }}>
        Este espacio es de acompañamiento. Si estás en crisis, busca apoyo profesional.
      </p>
    </div>
  )
}

// ——— Fabita contact card ———
function FabitaCard({ waUrl }) {
  const isPlaceholder = waUrl.includes('TU_NUMERO_AQUI')

  return (
    <div style={{
      borderRadius: 16,
      border: '1px solid rgba(196, 69, 105, 0.35)',
      background: 'linear-gradient(135deg, rgba(100, 20, 50, 0.3), rgba(30, 15, 60, 0.5))',
      backdropFilter: 'blur(16px)',
      padding: '20px 20px 18px',
      position: 'relative',
      overflow: 'hidden',
      maxWidth: '82%',
    }}>
      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: 'linear-gradient(90deg, transparent, rgba(196,69,105,0.7), transparent)',
      }} />

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
        <div style={{
          width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
          background: 'linear-gradient(135deg, #c44569, #8b2346)',
          border: '1px solid rgba(196,69,105,0.4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.1rem',
          boxShadow: '0 0 12px rgba(196,69,105,0.3)',
        }}>🌸</div>
        <div>
          <div style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '0.88rem', fontWeight: 600,
            color: 'rgba(240, 180, 200, 0.95)',
            letterSpacing: '0.04em',
          }}>Fabita</div>
          <div style={{ fontSize: '0.68rem', color: 'rgba(200,150,170,0.7)' }}>
            Persona real · Escucha de verdad
          </div>
        </div>
      </div>

      <p style={{
        fontSize: '0.84rem',
        color: 'rgba(220, 190, 205, 0.9)',
        lineHeight: 1.65,
        margin: '0 0 16px',
      }}>
        A veces lo que más necesitamos es una persona real del otro lado. Fabita está disponible para escucharte con calma, sin juicios.
      </p>

      {/* CTA */}
      {isPlaceholder ? (
        <div style={{
          background: 'rgba(196,69,105,0.12)',
          border: '1px dashed rgba(196,69,105,0.3)',
          borderRadius: 10,
          padding: '10px 14px',
          fontSize: '0.75rem',
          color: 'rgba(200,150,170,0.7)',
          fontStyle: 'italic',
        }}>
          ⚙️ Configura el número de WhatsApp en <code style={{ background: 'rgba(0,0,0,0.3)', padding: '1px 5px', borderRadius: 4 }}>AIChat.jsx</code> — busca <code style={{ background: 'rgba(0,0,0,0.3)', padding: '1px 5px', borderRadius: 4 }}>FABITA_WHATSAPP</code>
        </div>
      ) : (
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #25d366, #128c7e)',
            borderRadius: 50,
            color: '#fff',
            fontSize: '0.84rem',
            fontWeight: 600,
            textDecoration: 'none',
            fontFamily: "'Raleway', sans-serif",
            letterSpacing: '0.03em',
            transition: 'all 0.2s',
            boxShadow: '0 4px 16px rgba(37,211,102,0.3)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-1px)'
            e.currentTarget.style.boxShadow = '0 6px 20px rgba(37,211,102,0.45)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(37,211,102,0.3)'
          }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Escribirle por WhatsApp
        </a>
      )}
    </div>
  )
}
