import { useState } from 'react'
import StarBackground from './components/StarBackground'
import WaterBackground from './components/WaterBackground'
import LightPageBackground from './components/LightPageBackground'
import Onboarding from './components/Onboarding'
import Home from './components/Home'
import ZodiacAffirmations from './modules/ZodiacAffirmations'
import MusicTherapy from './modules/MusicTherapy'
import EmotionalCheckin from './modules/EmotionalCheckin'
import FutureLetter from './modules/FutureLetter'
import Numerology from './modules/Numerology'
import AboutAsumo from './modules/AboutAsumo'

const NAV_ITEMS = [
  { id: 'home',       label: 'Inicio' },
  { id: 'zodiac',     label: 'Signos' },
  { id: 'music',      label: 'Musicoterapia' },
  { id: 'checkin',    label: 'Bienestar' },
  { id: 'letter',     label: 'Carta Futura' },
  { id: 'numerology', label: 'Numerología' },
  { id: 'about',      label: 'Sobre Asumo' },
]

function renderModule(id, nav) {
  switch (id) {
    case 'zodiac':     return <ZodiacAffirmations />
    case 'music':      return <MusicTherapy />
    case 'checkin':    return <EmotionalCheckin />
    case 'letter':     return <FutureLetter />
    case 'numerology': return <Numerology />
    case 'about':      return <AboutAsumo />
    default:           return <Home onNav={nav} />
  }
}

// Celadon design tokens for nav
const isHome = (id) => id === 'home'

export default function App() {
  const [current, setCurrent] = useState('home')
  const [profile, setProfile] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user_profile') || 'null') } catch { return null }
  })

  const handleOnboardingComplete = (p) => {
    localStorage.setItem('user_profile', JSON.stringify(p))
    setProfile(p)
  }

  if (!profile) {
    return (
      <div className="app">
        <StarBackground />
        <Onboarding onComplete={handleOnboardingComplete} />
      </div>
    )
  }

  const onHome = isHome(current)

  // Nav colors: dark celadon on home, light celadon on other modules
  const navBg     = onHome ? 'rgba(9, 28, 26, 0.88)'           : 'rgba(255,255,255,0.72)'
  const navBorder = onHome ? 'rgba(74,170,144,0.18)'            : 'rgba(74,170,144,0.30)'
  const navActive = onHome ? '#EAF5F0'                          : '#0e3d2e'
  const navDim    = onHome ? 'rgba(100,180,155,0.65)'           : 'rgba(46,96,80,0.60)'
  const navUnderline = 'linear-gradient(90deg,transparent,rgba(74,200,160,0.9),transparent)'

  return (
    <div className={`app${onHome ? '' : ' light-theme'}`}>
      {onHome ? <WaterBackground /> : <LightPageBackground />}

      {/* Top navigation */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: navBg,
        backdropFilter: 'blur(22px)',
        WebkitBackdropFilter: 'blur(22px)',
        borderBottom: `1px solid ${navBorder}`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexWrap: 'wrap', gap: '2px',
        padding: '0 12px',
        minHeight: 48,
        transition: 'background 0.4s, border-color 0.4s',
      }}>
        {NAV_ITEMS.map(item => {
          const active = current === item.id
          return (
            <button
              key={item.id}
              onClick={() => setCurrent(item.id)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '10px 11px',
                fontFamily: "'Raleway', sans-serif",
                fontSize: '0.67rem',
                fontWeight: active ? 700 : 400,
                letterSpacing: '0.07em',
                color: active ? navActive : navDim,
                textTransform: 'uppercase',
                position: 'relative',
                transition: 'color 0.2s',
                whiteSpace: 'nowrap',
              }}
            >
              {item.label}
              {active && (
                <span style={{
                  position: 'absolute', bottom: 5, left: '18%', right: '18%',
                  height: 1.5,
                  background: navUnderline,
                  borderRadius: 1,
                  display: 'block',
                }} />
              )}
            </button>
          )
        })}
      </nav>

      <main className="app-main" key={current} style={{ paddingBottom: 24 }}>
        {renderModule(current, setCurrent)}
      </main>
    </div>
  )
}
