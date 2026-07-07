import { useEffect, useRef } from 'react'

// Lily pad positions for header strip (rx=0-1, ry=0-1 relative to canvas)
const PADS = [
  { rx: 0.10, ry: 0.55, rs: 0.06, angle: 0.6,  hasLotus: true,  lPhase: 0.0  },
  { rx: 0.30, ry: 0.40, rs: 0.05, angle: -0.3, hasLotus: false                },
  { rx: 0.50, ry: 0.60, rs: 0.07, angle: 0.9,  hasLotus: false, isMain: true  },
  { rx: 0.70, ry: 0.38, rs: 0.055, angle: -0.8, hasLotus: true, lPhase: 1.8  },
  { rx: 0.88, ry: 0.58, rs: 0.05, angle: 1.3,  hasLotus: false                },
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
  g.addColorStop(0, 'rgba(100, 175, 130, 0.72)')
  g.addColorStop(0.6, 'rgba(70, 140, 100, 0.62)')
  g.addColorStop(1, 'rgba(50, 110, 78, 0.48)')
  ctx.fillStyle = g
  ctx.fill()
  ctx.strokeStyle = 'rgba(130, 190, 150, 0.35)'
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

  // outer petals — white/cream on light bg
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2
    ctx.save()
    ctx.rotate(a)
    ctx.beginPath()
    ctx.ellipse(0, -size * 0.58, size * 0.18, size * 0.42, 0, 0, Math.PI * 2)
    const pg = ctx.createLinearGradient(0, -size, 0, -size * 0.05)
    pg.addColorStop(0, 'rgba(255, 255, 255, 0.98)')
    pg.addColorStop(0.6, 'rgba(240, 252, 248, 0.90)')
    pg.addColorStop(1, 'rgba(200, 235, 225, 0.55)')
    ctx.fillStyle = pg
    ctx.fill()
    ctx.strokeStyle = 'rgba(107, 168, 142, 0.30)'
    ctx.lineWidth = 0.5
    ctx.stroke()
    ctx.restore()
  }

  // inner petals
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 + 0.4
    ctx.save()
    ctx.rotate(a)
    ctx.beginPath()
    ctx.ellipse(0, -size * 0.28, size * 0.11, size * 0.24, 0, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(240, 255, 250, 0.95)'
    ctx.fill()
    ctx.restore()
  }

  // center
  ctx.beginPath()
  ctx.arc(0, 0, size * 0.13, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(255, 245, 200, 0.97)'
  ctx.fill()
  ctx.beginPath()
  ctx.arc(0, 0, size * 0.07, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(180, 140, 50, 0.75)'
  ctx.fill()

  ctx.globalAlpha = 1
  ctx.restore()
}

export default function LightWaterHero({ height = 200 }) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    const ctx = canvas.getContext('2d')
    let animId, t = 0

    const resize = () => {
      canvas.width  = container.offsetWidth
      canvas.height = height
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)

    const W = () => canvas.width
    const H = () => canvas.height

    // Sparkles (stable positions)
    const SPARKLES = Array.from({ length: 50 }, (_, i) => ({
      rx: (i * 137.5) % 1,
      ry: (i * 97.3 + i * i * 0.003) % 1,
      phase: i * 0.8,
      speed: 0.02 + (i % 4) * 0.007,
      size: 0.7 + (i % 3) * 0.4,
    }))

    const ripples = []
    const CYCLE = 200
    let cycleTimer = CYCLE * 0.5
    const mainPad = PADS.find(p => p.isMain)
    let drop = { active: false }
    let mainLotus = { size: 0, opacity: 0, growing: false, timer: 0, shown: false }

    function spawnRipple(x, y) {
      for (let i = 0; i < 3; i++) {
        ripples.push({ x, y, radius: 3 + i * 10, maxRadius: 80 + i * 35, speed: 1.2 - i * 0.2, opacity: 0.9 - i * 0.2 })
      }
    }

    function tick() {
      t++
      ctx.clearRect(0, 0, W(), H())

      // Light water background
      const bg = ctx.createLinearGradient(0, 0, 0, H())
      bg.addColorStop(0, '#daf0e8')
      bg.addColorStop(0.5, '#EAF5F0')
      bg.addColorStop(1, '#cfe8de')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W(), H())

      // Subtle center glow
      const cg = ctx.createRadialGradient(W() * 0.5, H() * 0.5, 0, W() * 0.5, H() * 0.5, W() * 0.4)
      cg.addColorStop(0, 'rgba(255,255,255,0.35)')
      cg.addColorStop(1, 'transparent')
      ctx.fillStyle = cg
      ctx.fillRect(0, 0, W(), H())

      // Sparkles (celadon-tinted)
      for (const s of SPARKLES) {
        const flicker = 0.15 + 0.6 * Math.abs(Math.sin(t * s.speed + s.phase))
        ctx.beginPath()
        ctx.arc(s.rx * W(), s.ry * H(), s.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(107, 168, 142, ${flicker * 0.55})`
        ctx.fill()
      }

      // Update + draw ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].radius += ripples[i].speed
        if (ripples[i].radius >= ripples[i].maxRadius) { ripples.splice(i, 1); continue }
        const r = ripples[i]
        const alpha = r.opacity * Math.pow(1 - r.radius / r.maxRadius, 2)
        if (alpha > 0.005) {
          ctx.beginPath()
          ctx.ellipse(r.x, r.y, r.radius, r.radius * 0.36, 0, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(107, 168, 142, ${alpha * 0.75})`
          ctx.lineWidth = 1.3
          ctx.stroke()
        }
      }

      let rippleForce = ripples.reduce((acc, r) => acc + (1 - r.radius / r.maxRadius) * 0.05, 0)

      // Pads
      for (let i = 0; i < PADS.length; i++) {
        const p = PADS[i]
        const x = p.rx * W(), y = p.ry * H()
        const size = p.rs * H()
        const sway = Math.sin(t * 0.013 + i * 1.5) * 0.055 + rippleForce * 0.35
        drawPad(ctx, x, y, size, p.angle, sway)
      }

      // Permanent lotuses
      for (let i = 0; i < PADS.length; i++) {
        const p = PADS[i]
        if (!p.hasLotus) continue
        const x = p.rx * W(), y = p.ry * H()
        const padSize = p.rs * H()
        const lotusSize = padSize * 0.8
        const sway = Math.sin(t * 0.015 + p.lPhase) * 0.04 + rippleForce * 0.06
        drawLotus(ctx, x, y - padSize * 0.08, lotusSize, 1, sway)
      }

      // Cycle: drop → ripple → main lotus
      cycleTimer++
      if (cycleTimer >= CYCLE && !drop.active) {
        const tx = mainPad.rx * W()
        const ty = mainPad.ry * H()
        drop = { active: true, x: tx, y: 0, vy: 2.5, tx, ty, hit: false }
        mainLotus = { size: 0, opacity: 0, growing: false, timer: 0, shown: false }
        cycleTimer = 0
      }

      if (drop.active) {
        drop.y += drop.vy
        drop.vy += 0.12
        // draw drop
        ctx.save()
        ctx.translate(drop.x, drop.y)
        ctx.beginPath()
        ctx.arc(0, 0, 3, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(107, 168, 142, 0.85)'
        ctx.fill()
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(0, -Math.min(11, drop.vy * 2.2))
        ctx.strokeStyle = 'rgba(107, 168, 142, 0.38)'
        ctx.lineWidth = 1.8
        ctx.stroke()
        ctx.restore()
        if (!drop.hit && drop.y >= drop.ty) {
          drop.hit = true
          drop.active = false
          spawnRipple(drop.tx, drop.ty)
          mainLotus.growing = true
        }
      }

      if (mainLotus.growing) {
        mainLotus.timer++
        const prog = Math.min(mainLotus.timer / 50, 1)
        const eased = 1 - Math.pow(1 - prog, 3)
        const padSize = mainPad.rs * H()
        mainLotus.size = eased * padSize * 0.82
        mainLotus.opacity = eased
        if (prog >= 1) { mainLotus.growing = false; mainLotus.shown = true }
      }

      if (mainLotus.shown && !mainLotus.growing && cycleTimer > CYCLE * 0.70) {
        const fade = (cycleTimer - CYCLE * 0.70) / (CYCLE * 0.30)
        mainLotus.opacity = Math.max(0, 1 - fade)
        mainLotus.size = mainLotus.opacity * mainPad.rs * H() * 0.82
      }

      if (mainLotus.size > 0) {
        const x = mainPad.rx * W(), y = mainPad.ry * H()
        const padSize = mainPad.rs * H()
        const sway = Math.sin(t * 0.016 + 2.1) * 0.045 + rippleForce * 0.10
        drawLotus(ctx, x, y - padSize * 0.08, mainLotus.size, mainLotus.opacity, sway)
      }

      animId = requestAnimationFrame(tick)
    }

    tick()
    return () => { cancelAnimationFrame(animId); ro.disconnect() }
  }, [height])

  return (
    <div ref={containerRef} style={{ width: '100%', height, position: 'relative' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  )
}
