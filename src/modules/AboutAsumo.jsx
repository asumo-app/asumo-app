// ════════════════════════════════════════
//  SOBRE ASUMO — Página personal de Fabita
//  Personaliza los textos con tu información real
// ════════════════════════════════════════

const INSTAGRAM_URL = 'https://www.instagram.com/tu_usuario/'  // ← cambia tu usuario
const INSTAGRAM_HANDLE = '@tu_usuario'                          // ← cambia tu usuario

export default function AboutAsumo() {
  return (
    <div className="mod" style={{ maxWidth: 740 }}>

      {/* ── Hero ── */}
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <div style={{
          fontSize: '3.5rem', marginBottom: 14,
          filter: 'drop-shadow(0 0 22px rgba(201,162,39,0.6))',
          animation: 'float 3.5s ease-in-out infinite',
        }}>✦</div>
        <h1 style={{
          fontFamily: "'Cinzel',serif",
          fontSize: 'clamp(1.6rem, 4vw, 2.4rem)', fontWeight: 700,
          letterSpacing: '0.12em',
          background: 'linear-gradient(135deg, #e0ecff, #c8d8ec, #c9a227)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          animation: 'shimmer 4s linear infinite',
          marginBottom: 10,
        }}>ASUMO</h1>
        <p style={{ color: 'var(--silver-mid)', letterSpacing: '0.22em',
          fontSize: '0.8rem' }}>BIENESTAR EMOCIONAL CÓSMICO</p>
      </div>

      {/* ── Foto + Nombre ── */}
      <section style={{ textAlign: 'center', marginBottom: 48 }}>
        {/* Foto — reemplaza el src con tu imagen real */}
        <div style={{
          width: 160, height: 160, borderRadius: '50%',
          margin: '0 auto 20px',
          background: 'linear-gradient(135deg, #1a2f7a, #6b21a8)',
          border: '3px solid rgba(201,162,39,0.5)',
          boxShadow: '0 0 40px rgba(201,162,39,0.2), 0 0 0 6px rgba(201,162,39,0.08)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          overflow: 'hidden', position: 'relative',
        }}>
          {/* Reemplaza este div con <img src="tu-foto.jpg" ... /> */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: 4 }}>🌙</div>
            <div style={{ fontSize: '0.6rem', color: 'rgba(200,216,236,0.5)',
              letterSpacing: '0.1em' }}>tu foto</div>
          </div>
        </div>

        <h2 style={{ fontFamily: "'Cinzel',serif", fontSize: '1.4rem',
          fontWeight: 700, letterSpacing: '0.08em', color: 'var(--white)',
          marginBottom: 6 }}>
          Fabita
        </h2>
        <p style={{ color: 'var(--gold)', fontSize: '0.82rem',
          letterSpacing: '0.12em', marginBottom: 16 }}>
          Creadora de Asumo · Guía de bienestar emocional
        </p>

        {/* Instagram */}
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '12px 28px',
          background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)',
          border: 'none', borderRadius: 100,
          fontFamily: "'Raleway',sans-serif", fontSize: '0.88rem',
          fontWeight: 700, color: 'white', textDecoration: 'none',
          boxShadow: '0 4px 20px rgba(253,29,29,0.3)',
          transition: 'all 0.2s ease',
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
          {INSTAGRAM_HANDLE}
        </a>
      </section>

      {/* ── Quién es Fabita ── */}
      <ContentCard title="Quién soy" icon="🌙" color="#a855f7">
        <p style={bodyText}>
          {/* ✏️ EDITA ESTE TEXTO CON TU HISTORIA REAL */}
          Soy Fabita, guía de bienestar emocional y exploradora del mundo interior.
          Creo profundamente que cada persona lleva dentro de sí un cosmos entero —
          con sus propias lunas, sus propias tormentas y sus propias estrellas.
        </p>
        <p style={{ ...bodyText, marginTop: 12 }}>
          Mi camino hacia el bienestar emocional no fue lineal ni perfecto.
          Fue exactamente como la luna: con fases de oscuridad y fases de luz plena.
          Y fue en ese camino donde aprendí que el autoconocimiento es la herramienta
          más poderosa que tenemos.
        </p>
      </ContentCard>

      {/* ── Historia de Asumo ── */}
      <ContentCard title="Cómo nació Asumo" icon="✨" color="#c9a227">
        <p style={bodyText}>
          {/* ✏️ EDITA ESTE TEXTO CON LA HISTORIA REAL DE LA APP */}
          Asumo nació de una necesidad profundamente personal: la de tener un espacio
          íntimo y sagrado donde procesar emociones, celebrar pequeños avances y
          recordarme cada día que merezco cuidado.
        </p>
        <p style={{ ...bodyText, marginTop: 12 }}>
          No quería otra app de productividad. Quería algo que se sintiera como
          abrir un diario cósmico — con la calidez de una amiga que te conoce,
          la sabiduría de las estrellas y la practicidad de lo cotidiano.
          Así nació Asumo.
        </p>
      </ContentCard>

      {/* ── Misión ── */}
      <ContentCard title="Nuestra misión" icon="💫" color="#4f9eff">
        <p style={bodyText}>
          {/* ✏️ EDITA ESTE TEXTO */}
          Asumo existe para recordarte que el bienestar emocional no es un lujo —
          es una necesidad. Que cuidarte no es egoísmo. Que tienes un cosmos
          entero dentro de ti que merece ser explorado con amor y curiosidad.
        </p>
        <div style={{
          display: 'flex', flexDirection: 'column', gap: 10, marginTop: 18,
        }}>
          {[
            '✦ Que cada persona encuentre su propio ritmo de autocuidado',
            '✦ Que las emociones se sientan, no se eviten',
            '✦ Que el bienestar sea accesible, íntimo y auténtico',
            '✦ Que cada día tenga al menos un momento tuyo',
          ].map((item, i) => (
            <div key={i} style={{
              padding: '10px 16px',
              background: 'rgba(79,158,255,0.08)',
              border: '1px solid rgba(79,158,255,0.18)',
              borderRadius: 10,
              fontSize: '0.84rem', color: 'var(--silver)',
              fontFamily: "'Raleway',sans-serif", lineHeight: 1.5,
            }}>{item}</div>
          ))}
        </div>
      </ContentCard>

      {/* ── CTA final ── */}
      <div style={{
        textAlign: 'center', marginTop: 48, padding: '36px 24px',
        background: 'linear-gradient(135deg, rgba(26,47,122,0.3), rgba(107,33,168,0.2))',
        border: '1px solid rgba(168,85,247,0.2)',
        borderRadius: 20, position: 'relative', overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'linear-gradient(90deg, transparent, rgba(201,162,39,0.6), transparent)',
        }} />
        <div style={{ fontSize: '2rem', marginBottom: 14 }}>🌸</div>
        <p style={{ fontFamily: "'Cinzel',serif", fontSize: '1rem',
          color: 'var(--silver-hi)', lineHeight: 1.8, marginBottom: 20,
          fontStyle: 'italic' }}>
          "Gracias por estar aquí.<br/>
          Este espacio lo creé pensando en ti."
        </p>
        <p style={{ fontSize: '0.78rem', color: 'var(--silver-dim)', marginBottom: 20,
          letterSpacing: '0.1em' }}>— Fabita</p>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" style={{
          display: 'inline-flex', alignItems: 'center', gap: 10,
          padding: '12px 28px',
          background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)',
          borderRadius: 100,
          fontFamily: "'Raleway',sans-serif", fontSize: '0.86rem',
          fontWeight: 700, color: 'white', textDecoration: 'none',
        }}>
          Sígueme en Instagram ✦
        </a>
      </div>

      <div style={{ textAlign: 'center', marginTop: 40 }}>
        <div className="divider" />
        <p style={{ fontSize: '0.72rem', color: 'var(--silver-dim)', letterSpacing: '0.12em' }}>
          ✦ &nbsp; ASUMO — Hecho con amor y estrellas &nbsp; ✦
        </p>
      </div>
    </div>
  )
}

// ─── Content card ─────────────────────────────────────────────
function ContentCard({ title, icon, color, children }) {
  return (
    <div style={{
      background: 'var(--glass)', backdropFilter: 'blur(18px)',
      border: `1px solid ${color}20`,
      borderRadius: 18, padding: '28px 28px 24px',
      marginBottom: 20, position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${color}60, transparent)`,
      }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
        <span style={{ fontSize: '1.4rem',
          filter: `drop-shadow(0 0 8px ${color})` }}>{icon}</span>
        <h3 style={{ fontFamily: "'Cinzel',serif", fontSize: '0.9rem',
          fontWeight: 600, color: 'var(--white)', letterSpacing: '0.08em' }}>{title}</h3>
      </div>
      {children}
    </div>
  )
}

const bodyText = {
  fontSize: '0.88rem', color: 'var(--silver)',
  lineHeight: 1.85, fontFamily: "'Raleway',sans-serif",
}
