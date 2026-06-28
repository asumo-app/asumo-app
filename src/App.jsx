import { useState } from 'react'
import StarBackground from './components/StarBackground'
import BottomNav from './components/BottomNav'
import Onboarding from './components/Onboarding'
import Home from './components/Home'
import ZodiacAffirmations from './modules/ZodiacAffirmations'
import AIChat from './modules/AIChat'
import SelfLove from './modules/SelfLove'
import MusicTherapy from './modules/MusicTherapy'
import GoalsCalendar from './modules/GoalsCalendar'
import CreativeHobbies from './modules/CreativeHobbies'
import MoonMode from './modules/MoonMode'
import EmotionalCheckin from './modules/EmotionalCheckin'
import FutureLetter from './modules/FutureLetter'
import VisionBoard from './modules/VisionBoard'
import Numerology from './modules/Numerology'
import AboutAsumo from './modules/AboutAsumo'

function renderModule(id, nav) {
  switch (id) {
    case 'zodiac':     return <ZodiacAffirmations />
    case 'chat':       return <AIChat />
    case 'selflove':   return <SelfLove />
    case 'music':      return <MusicTherapy />
    case 'goals':      return <GoalsCalendar />
    case 'hobbies':    return <CreativeHobbies />
    case 'moon':       return <MoonMode />
    case 'checkin':    return <EmotionalCheckin />
    case 'letter':     return <FutureLetter />
    case 'vision':     return <VisionBoard />
    case 'numerology': return <Numerology />
    case 'about':      return <AboutAsumo />
    default:           return <Home onNav={nav} />
  }
}

export default function App() {
  const [current, setCurrent] = useState('home')
  const [profile, setProfile] = useState(() => {
    try { return JSON.parse(localStorage.getItem('user_profile') || 'null') } catch { return null }
  })

  const handleOnboardingComplete = (p) => {
    localStorage.setItem('user_profile', JSON.stringify(p))
    setProfile(p)
  }

  // First-time user: show onboarding
  if (!profile) {
    return (
      <div className="app">
        <StarBackground />
        <Onboarding onComplete={handleOnboardingComplete} />
      </div>
    )
  }

  return (
    <div className="app">
      <StarBackground />
      <main className="app-main" key={current}>
        {renderModule(current, setCurrent)}
      </main>
      <BottomNav current={current} onNav={setCurrent} />
    </div>
  )
}
