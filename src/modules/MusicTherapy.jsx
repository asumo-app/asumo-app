import { useState } from 'react'
import { musicMoods } from '../data/cosmicData'

export default function MusicTherapy() {
  const [selected, setSelected] = useState(null)
  const [playing, setPlaying] = useState(null)

  const COLORS = {
    paz: '#4f9eff',
    energia: '#e8c547',
    sanacion: '#c44569',
    creatividad: '#a855f7',
    sueno: '#4a6fa5',
  }

  return (
    <div className="mod">
      <div className="mod-hd">
        <span className="mod-icon">🎵</span>
        <h1 className="mod-title">Musicoterapia</h1>
        <p className="mod-sub">Música y frecuencias para cada estado del alma</p>
      </div>

      {/* Mood selector */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 14, marginBottom: 32 }}>
        {musicMoods.map(mood => (
          <button key={mood.id}
            onClick={() => setSelected(mood)}
            style={{
              border: selected?.id === mood.id ? `2px solid ${mood.color}` : '1px solid var(--border)',
              borderRadius: 16, background: selected?.id === mood.id
                ? `rgba(${hexToRgb(mood.color)}, 0.15)`
                : 'var(--glass)',
              backdropFilter: 'blur(14px)',
              padding: '24px 16px', cursor: 'pointer', textAlign: 'center',
              transition: 'all 0.25s ease',
              boxShadow: selected?.id === mood.id ? `0 0 24px ${mood.color}40` : 'none',
            }}>
            <div style={{
              fontSize: '2rem', marginBottom: 10,
              filter: selected?.id === mood.id ? `drop-shadow(0 0 10px ${mood.color})` : 'none',
            }}>{mood.icon}</div>
            <div style={{
              fontFamily: "'Cinzel',serif", fontSize: '0.78rem',
              fontWeight: 600, letterSpacing: '0.06em',
              color: selected?.id === mood.id ? 'var(--white)' : 'var(--silver-mid)',
            }}>{mood.name}</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--silver-dim)', marginTop: 4 }}>
              {mood.description}
            </div>
          </button>
        ))}
      </div>

      {selected ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, animation: 'fadeUp 0.4s ease' }}>
          {/* Visualizer */}
          <div className="card" style={{
            padding: '32px 28px',
            border: `1px solid ${selected.color}30`,
            boxShadow: `0 0 40px ${selected.color}18`,
          }}>
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0, height: 2,
              background: `linear-gradient(90deg, transparent, ${selected.color}, transparent)`,
            }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 24 }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: `radial-gradient(circle, ${selected.color}40, transparent)`,
                border: `2px solid ${selected.color}60`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.8rem',
                boxShadow: playing ? `0 0 24px ${selected.color}60` : 'none',
                animation: playing ? 'glowPulse 2s ease-in-out infinite' : 'none',
              }}>{selected.icon}</div>
              <div>
                <h2 style={{ fontFamily: "'Cinzel',serif", fontSize: '1.1rem', fontWeight: 600, marginBottom: 4 }}>
                  {selected.name}
                </h2>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {selected.genres.map(g => (
                    <span key={g} className="badge badge-s" style={{ fontSize: '0.65rem' }}>{g}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Sound bars */}
            <div style={{
              display: 'flex', alignItems: 'flex-end', gap: 3,
              height: 48, justifyContent: 'center', marginBottom: 20,
            }}>
              {Array.from({ length: 24 }, (_, i) => {
                const h = playing
                  ? 8 + Math.sin(i * 0.8) * 20 + Math.random() * 15
                  : 6 + Math.sin(i * 0.5) * 8
                return (
                  <div key={i} style={{
                    width: 4, height: `${h}px`,
                    borderRadius: 2,
                    background: playing
                      ? `linear-gradient(180deg, ${selected.color}, ${selected.color}60)`
                      : 'var(--border-hi)',
                    transition: 'all 0.3s',
                    animation: playing ? `float ${0.8 + i * 0.07}s ease-in-out infinite alternate` : 'none',
                  }} />
                )
              })}
            </div>

            <div style={{ textAlign: 'center' }}>
              <button className="btn btn-lg" onClick={() => setPlaying(p => !p)}
                style={{ background: `linear-gradient(135deg, ${selected.color}80, ${selected.color})` }}>
                {playing ? '⏸ Pausar' : '▶ Reproducir ambiente'}
              </button>
              {playing && (
                <p style={{ fontSize: '0.73rem', color: 'var(--silver-dim)', marginTop: 10 }}>
                  Reproduciendo ambiente visual · Busca la canción en tu app de música
                </p>
              )}
            </div>
          </div>

          {/* Recommendations */}
          <h3 style={{
            fontFamily: "'Cinzel',serif", fontSize: '0.85rem',
            letterSpacing: '0.15em', color: 'var(--silver-mid)',
          }}>RECOMENDACIONES PARA {selected.name.toUpperCase()}</h3>
          <div className="g2">
            {selected.recommendations.map((rec, i) => (
              <div key={i} className="card-l" style={{ padding: '18px 20px' }}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 10, flexShrink: 0,
                    background: `linear-gradient(135deg, ${selected.color}40, ${selected.color}20)`,
                    border: `1px solid ${selected.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '1.1rem',
                  }}>🎵</div>
                  <div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--white)', marginBottom: 2 }}>
                      {rec.title}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: selected.color, marginBottom: 4 }}>
                      {rec.artist}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--silver-dim)', lineHeight: 1.5 }}>
                      {rec.note}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Frequencies */}
          <div className="card-l" style={{ padding: '20px 24px' }}>
            <h4 style={{ fontFamily: "'Cinzel',serif", fontSize: '0.8rem', letterSpacing: '0.12em', color: 'var(--silver)', marginBottom: 14 }}>
              ✦ FRECUENCIAS DE SANACIÓN
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {selected.frequencies.map((f, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '10px 14px',
                  background: 'rgba(10,20,60,0.6)',
                  borderRadius: 10, border: '1px solid var(--border)',
                }}>
                  <div style={{
                    width: 8, height: 8, borderRadius: '50%',
                    background: selected.color,
                    boxShadow: `0 0 8px ${selected.color}`,
                    flexShrink: 0,
                  }} />
                  <span style={{ fontSize: '0.82rem', color: 'var(--silver-mid)' }}>{f}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Affirmation */}
          <div className="card" style={{
            padding: '24px 28px', textAlign: 'center',
            border: `1px solid ${selected.color}25`,
          }}>
            <p style={{
              fontFamily: "'Cinzel',serif", fontStyle: 'italic',
              fontSize: '0.95rem', color: 'var(--silver-hi)',
              lineHeight: 1.7, letterSpacing: '0.03em',
            }}>
              "{selected.affirmation}"
            </p>
          </div>
        </div>
      ) : (
        <div className="card" style={{ padding: 48, textAlign: 'center', border: '1px dashed var(--border-hi)' }}>
          <div style={{ fontSize: '3rem', marginBottom: 16, opacity: 0.5 }}>🎵</div>
          <p style={{ color: 'var(--silver-dim)', fontSize: '0.9rem' }}>
            Selecciona un estado de ánimo para<br/>descubrir tu música terapéutica
          </p>
        </div>
      )}
    </div>
  )
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}
