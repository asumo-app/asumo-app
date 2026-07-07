import { useEffect, useRef } from 'react'

// Full-viewport light celadon water background (internal pages)
const PADS = [
  { rx: 0.05, ry: 0.12, rs: 0.030, angle: 0.6,  hasLotus: true,  lSize: 0.022, lPhase: 0.0  },
  { rx: 0.22, ry: 0.28, rs: 0.028, angle: -0.4, hasLotus: false                              },
  { rx: 0.40, ry: 0.10, rs: 0.025, angle: 1.1,  hasLotus: true,  lSize: 0.018, lPhase: 1.4  },
  { rx: 0.60, ry: 0.22, rs: 0.032, angle: -0.8, hasLotus: false                              },
  { rx: 0.78, ry: 0.08, rs: 0.027, angle: 0.3,  hasLotus: true,  lSize: 0.020, lPhase: 2.5  },
  { rx: 0.92, ry: 0.18, rs: 0.024, angle: -1.2, hasLotus: false                              },
  { rx: 0.08, ry: 0.50, rs: 0.026, angle: 0.9,  hasLotus: false                              },
  { rx: 0.30, ry: 0.60, rs: 0.038, angle: 0.5,  hasLotus: true,  lSize: 0.028, lPhase: 3.1  },
  { rx: 0.52, ry: 0.45, rs: 0.042, angle: -0.3, hasLotus: false, isMain: true               },
  { rx: 0.70, ry: 0.58, rs: 0.034, angle: 1.4,  hasLotus: true,  lSize: 0.025, lPhase: 1.0  },
  { rx: 0.88, ry: 0.44, rs: 0.030, angle: -0.7, hasLotus: false                              },
  { rx: 0.15, ry: 0.80, rs: 0.028, angle: 0.2,  hasLotus: true,  lSize: 0.020, lPhase: 2.0  },
  { rx: 0.38, ry: 0.88, rs: 0.032, angle: -0.5, hasLotus: false                              },
  { rx: 0.62, ry: 0.78, rs: 0.036, angle: 1.0,  hasLotus: true,  lSize: 0.026, lPhase: 0.6  },
  { rx: 0.85, ry: 0.82, rs: 0.026, angle: -1.0, hasLotus: false                              },
]

function drawPad(ctx, x, y, size, baseAngle, sway) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(baseAngle + sway)
  const notch = 0.28
  ctx.beginPath()
  ctx.arc(0, 0, size, notch, Math.PI * 2 - notch)
  ctx.lineTo(0, 0)
  ctx.closePath()
  const g = ctx.createRadialGradient(-size * 0.2, -size * 0.2, 0, 0, 0, size)
  g.addColorStop(0, 'rgba(90, 160, 120, 0.65)')
  g.addColorStop(0.6, 'rgba(60, 125, 88, 0.55)')
  g.addColorStop(1, 'rgba(40, 95, 65, 0.40)')
  ctx.fillStyle = g
  ctx.fill()
  ctx.strokeStyle = 'rgba(110, 175, 135, 0.28)'
  ctx.lineWidth = 0.7
  for (let v = 0; v < 6; v++) {
    const va = notch + (v / 5) * (Math.PI * 2 - notch * 2 - 0.2)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(Math.cos(va) * size * 0.87, Math.sin(va) * size * 0.87)
    ctx.stroke()
  }
  ctx.restore()
}

function drawLotus(ctx, x, y, size, opacity, sway) {
  if (opacity <= 0 || size <= 0) return
  ctx.save()
  ctx.globalAlpha = opacity
  ctx.translate(x, y)
  ctx.rotate(sway)
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2
    ctx.save()
    ctx.rotate(a)
    ctx.beginPath()
    ctx.ellipse(0, -size * 0.56, size * 0.17, size * 0.40, 0, 0, Math.PI * 2)
    const pg = ctx.createLinearGradient(0, -size, 0, -size * 0.05)
    pg.addColorStop(0, 'rgba(255,255,255,0.97)')
    pg.addColorStop(0.6, 'rgba(238,252,248,0.88)')
    pg.addColorStop(1, 'rgba(195,232,220,0.48)')
    ctx.fillStyle = pg
    ctx.fill()
    ctx.strokeStyle = 'rgba(107,168,142,0.25)'
    ctx.lineWidth = 0.5
    ctx.stroke()
    ctx.restore()
  }
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 + 0.4
    ctx.save()
    ctx.rotate(a)
    ctx.beginPath()
    ctx.ellipse(0, -size * 0.27, size * 0.10, size * 0.23, 0, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(240,255,250,0.94)'
    ctx.fill()
    ctx.restore()
  }
  ctx.beginPath()
  ctx.arc(0, 0, size * 0.12, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(255,245,190,0.96)'
  ctx.fill()
  ctx.beginPath()
  ctx.arc(0, 0, size * 0.065, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(175,135,45,0.72)'
  ctx.fill()
  ctx.globalAlpha = 1
  ctx.restore()
}

export default function LightPageBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId, t = 0

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const W = () => canvas.width
    const H = () => canvas.height

    const SPARKLES = Array.from({ length: 70 }, (_, i) => ({
      rx: (i * 137.5) % 1,
      ry: (i * 97.3 + i * i * 0.003) % 1,
      phase: i * 0.8,
      speed: 0.016 + (i % 4) * 0.006,
      size: 0.6 + (i % 3) * 0.4,
    }))

    const ripples = []
    const CYCLE = 280
    let cycleTimer = CYCLE * 0.55
    const mainPad = PADS.find(p => p.isMain)
    let drop = { active: false }
    let mainLotus = { size: 0, opacity: 0, growing: false, timer: 0, shown: false }

    function spawnRipple(x, y) {
      for (let i = 0; i < 4; i++) {
        ripples.push({ x, y, radius: 4 + i * 14, maxRadius: 110 + i * 45, speed: 1.4 - i * 0.22, opacity: 0.85 - i * 0.18 })
      }
    }

    function tick() {
      t++
      ctx.clearRect(0, 0, W(), H())

      // Light celadon water gradient
      const bg = ctx.createLinearGradient(0, 0, 0, H())
      bg.addColorStop(0, '#d8ede5')
      bg.addColorStop(0.3, '#e4f2eb')
      bg.addColorStop(0.65, '#EAF5F0')
      bg.addColorStop(1, '#cfe8de')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W(), H())

      // Soft radial glow
      const cg = ctx.createRadialGradient(W() * 0.5, H() * 0.4, 0, W() * 0.5, H() * 0.4, W() * 0.55)
      cg.addColorStop(0, 'rgba(255,255,255,0.28)')
      cg.addColorStop(1, 'transparent')
      ctx.fillStyle = cg
      ctx.fillRect(0, 0, W(), H())

      // Sparkles
      for (const s of SPARKLES) {
        const flicker = 0.12 + 0.55 * Math.abs(Math.sin(t * s.speed + s.phase))
        ctx.beginPath()
        ctx.arc(s.rx * W(), s.ry * H(), s.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(107, 168, 142, ${flicker * 0.48})`
        ctx.fill()
      }

      // Ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].radius += ripples[i].speed
        if (ripples[i].radius >= ripples[i].maxRadius) { ripples.splice(i, 1); continue }
        const r = ripples[i]
        const alpha = r.opacity * Math.pow(1 - r.radius / r.maxRadius, 2)
        if (alpha > 0.005) {
          ctx.beginPath()
          ctx.ellipse(r.x, r.y, r.radius, r.radius * 0.36, 0, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(107, 168, 142, ${alpha * 0.70})`
          ctx.lineWidth = 1.2
          ctx.stroke()
        }
      }

      let rippleForce = ripples.reduce((a, r) => a + (1 - r.radius / r.maxRadius) * 0.045, 0)

      // Pads
      for (let i = 0; i < PADS.length; i++) {
        const p = PADS[i]
        const x = p.rx * W(), y = p.ry * H()
        const size = p.rs * Math.min(W(), H())
        const sway = Math.sin(t * 0.012 + i * 1.4) * 0.05 + rippleForce * 0.35
        drawPad(ctx, x, y, size, p.angle, sway)
      }

      // Permanent lotuses
      for (let i = 0; i < PADS.length; i++) {
        const p = PADS[i]
        if (!p.hasLotus) continue
        const x = p.rx * W(), y = p.ry * H()
        const padSize = p.rs * Math.min(W(), H())
        const lotusSize = p.lSize * Math.min(W(), H())
        const sway = Math.sin(t * 0.015 + p.lPhase) * 0.04 + rippleForce * 0.06
        drawLotus(ctx, x, y - padSize * 0.07, lotusSize, 1, sway)
      }

      // Cycle: drop → ripple → main lotus
      cycleTimer++
      if (cycleTimer >= CYCLE && !drop.active) {
        const tx = mainPad.rx * W()
        const ty = mainPad.ry * H()
        drop = { active: true, x: tx, y: 0, vy: 3, tx, ty, hit: false }
        mainLotus = { size: 0, opacity: 0, growing: false, timer: 0, shown: false }
        cycleTimer = 0
      }

      if (drop.active) {
        drop.y += drop.vy
        drop.vy += 0.15
        ctx.save()
        ctx.translate(drop.x, drop.y)
        ctx.beginPath()
        ctx.arc(0, 0, 3, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(107, 168, 142, 0.82)'
        ctx.fill()
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(0, -Math.min(12, drop.vy * 2))
        ctx.strokeStyle = 'rgba(107, 168, 142, 0.36)'
        ctx.lineWidth = 1.8
        ctx.stroke()
        ctx.restore()
        if (!drop.hit && drop.y >= drop.ty) {
          drop.hit = true; drop.active = false
          spawnRipple(drop.tx, drop.ty)
          mainLotus.growing = true
        }
      }

      if (mainLotus.growing) {
        mainLotus.timer++
        const prog = Math.min(mainLotus.timer / 55, 1)
        const eased = 1 - Math.pow(1 - prog, 3)
        mainLotus.size = eased * 0.042 * Math.min(W(), H())
        mainLotus.opacity = eased
        if (prog >= 1) { mainLotus.growing = false; mainLotus.shown = true }
      }

      if (mainLotus.shown && !mainLotus.growing && cycleTimer > CYCLE * 0.72) {
        const fade = (cycleTimer - CYCLE * 0.72) / (CYCLE * 0.28)
        mainLotus.opacity = Math.max(0, 1 - fade)
        mainLotus.size = mainLotus.opacity * 0.042 * Math.min(W(), H())
      }

      if (mainLotus.size > 0) {
        const x = mainPad.rx * W(), y = mainPad.ry * H()
        const padSize = mainPad.rs * Math.min(W(), H())
        const sway = Math.sin(t * 0.016 + 2.1) * 0.04 + rippleForce * 0.10
        drawLotus(ctx, x, y - padSize * 0.07, mainLotus.size, mainLotus.opacity, sway)
      }

      animId = requestAnimationFrame(tick)
    }

    tick()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
