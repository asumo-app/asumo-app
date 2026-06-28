import { useMemo } from 'react'

export default function StarBackground() {
  const stars = useMemo(() => {
    return Array.from({ length: 160 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.2 + 0.4,
      duration: Math.random() * 4 + 2,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.6 + 0.2,
    }))
  }, [])

  const nebulas = useMemo(() => [
    { cx: 25, cy: 20, color: 'rgba(106,33,168,0.07)', r: 30 },
    { cx: 75, cy: 70, color: 'rgba(13,22,84,0.12)', r: 35 },
    { cx: 60, cy: 15, color: 'rgba(74,144,226,0.06)', r: 25 },
    { cx: 10, cy: 75, color: 'rgba(196,69,105,0.05)', r: 28 },
  ], [])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none',
      background: 'linear-gradient(160deg, #030310 0%, #07072a 40%, #0a0a38 70%, #030310 100%)',
    }}>
      {nebulas.map((n, i) => (
        <div key={i} style={{
          position: 'absolute',
          left: `${n.cx}%`, top: `${n.cy}%`,
          width: `${n.r * 2}vw`, height: `${n.r * 2}vw`,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${n.color} 0%, transparent 70%)`,
          transform: 'translate(-50%,-50%)',
        }} />
      ))}
      {stars.map(s => (
        <div key={s.id} style={{
          position: 'absolute',
          left: `${s.x}%`,
          top: `${s.y}%`,
          width: `${s.size}px`,
          height: `${s.size}px`,
          borderRadius: '50%',
          background: s.size > 1.8
            ? `rgba(200,216,236,${s.opacity})`
            : `rgba(240,244,255,${s.opacity})`,
          boxShadow: s.size > 1.8 ? `0 0 ${s.size * 2}px rgba(200,216,236,0.6)` : 'none',
          animation: `twinkle ${s.duration}s ease-in-out infinite ${s.delay}s`,
        }} />
      ))}
    </div>
  )
}
