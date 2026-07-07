import LightWaterHero from './LightWaterHero'

// Shared header for all internal pages — light celadon water animation + title overlay
export default function ModuleHeader({ icon, title, subtitle }) {
  return (
    <div style={{ position: 'relative', marginBottom: 36, borderRadius: 18, overflow: 'hidden' }}>
      <LightWaterHero height={188} />

      {/* Bottom fade so it blends into page bg */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 48,
        background: 'linear-gradient(to bottom, transparent, rgba(9,28,26,0.55))',
        pointerEvents: 'none',
      }} />

      {/* Centered overlay content */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '16px 24px',
        gap: 8,
      }}>
        {/* Icon SVG (stroke, no emoji) */}
        {icon && (
          <div style={{
            width: 44, height: 44, borderRadius: '50%',
            background: 'rgba(255,255,255,0.55)',
            backdropFilter: 'blur(8px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 12px rgba(107,168,142,0.25)',
            marginBottom: 2,
          }}>
            {icon}
          </div>
        )}

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.3rem, 3vw, 1.9rem)',
          fontWeight: 700,
          color: '#173028',
          letterSpacing: '0.06em',
          textAlign: 'center',
          textShadow: '0 1px 6px rgba(255,255,255,0.6)',
          margin: 0,
        }}>{title}</h1>

        {subtitle && (
          <p style={{
            fontFamily: "'Raleway', sans-serif",
            fontSize: '0.80rem',
            fontWeight: 400,
            color: '#2e6050',
            textAlign: 'center',
            letterSpacing: '0.04em',
            lineHeight: 1.5,
            maxWidth: 440,
            margin: 0,
          }}>{subtitle}</p>
        )}
      </div>
    </div>
  )
}
