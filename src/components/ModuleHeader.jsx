// Header for internal pages — floats on the full-page LightPageBackground
export default function ModuleHeader({ icon, title, subtitle }) {
  return (
    <div style={{
      textAlign: 'center',
      padding: '48px 24px 36px',
      marginBottom: 24,
    }}>
      {icon && (
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          background: 'rgba(255,255,255,0.75)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          border: '1.5px solid rgba(107,168,142,0.35)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 20px rgba(107,168,142,0.22)',
          margin: '0 auto 16px',
        }}>
          {icon}
        </div>
      )}

      <h1 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(1.5rem, 4vw, 2.2rem)',
        fontWeight: 700,
        color: '#0e3d2e',
        letterSpacing: '0.06em',
        textShadow: '0 2px 10px rgba(255,255,255,0.8)',
        margin: '0 0 8px',
      }}>{title}</h1>

      {subtitle && (
        <p style={{
          fontFamily: "'Raleway', sans-serif",
          fontSize: '0.84rem',
          fontWeight: 400,
          color: '#2e6050',
          letterSpacing: '0.04em',
          lineHeight: 1.6,
          maxWidth: 420,
          margin: '0 auto',
        }}>{subtitle}</p>
      )}

      <div style={{
        width: 60, height: 1.5,
        background: 'linear-gradient(90deg, transparent, rgba(74,170,144,0.7), transparent)',
        margin: '20px auto 0',
        borderRadius: 1,
      }} />
    </div>
  )
}
