import { useEffect, useRef } from 'react'

// Lily pad positions (relative 0–1 of viewport)
const PADS = [
  { rx: 0.18, ry: 0.28, rs: 0.038, angle: 0.5,  hasLotus: true,  lSize: 0.030, lPhase: 0.0  },
  { rx: 0.72, ry: 0.22, rs: 0.034, angle: -0.4, hasLotus: true,  lSize: 0.026, lPhase: 1.4  },
  { rx: 0.50, ry: 0.48, rs: 0.050, angle: 1.1,  hasLotus: false, isMain: true               },
  { rx: 0.14, ry: 0.60, rs: 0.040, angle: 0.8,  hasLotus: true,  lSize: 0.028, lPhase: 2.5  },
  { rx: 0.82, ry: 0.55, rs: 0.042, angle: -0.7, hasLotus: true,  lSize: 0.032, lPhase: 0.9  },
  { rx: 0.40, ry: 0.78, rs: 0.036, angle: 0.3,  hasLotus: false                              },
  { rx: 0.88, ry: 0.35, rs: 0.032, angle: -1.1, hasLotus: true,  lSize: 0.024, lPhase: 3.2  },
  { rx: 0.62, ry: 0.72, rs: 0.044, angle: 1.6,  hasLotus: true,  lSize: 0.030, lPhase: 1.7  },
  { rx: 0.28, ry: 0.88, rs: 0.033, angle: 0.2,  hasLotus: false                              },
  { rx: 0.06, ry: 0.42, rs: 0.028, angle: -0.3, hasLotus: false                              },
]

function drawLilyPad(ctx, x, y, size, baseAngle, sway) {
  ctx.save()
  ctx.translate(x, y)
  ctx.rotate(baseAngle + sway)
  const notch = 0.3
  ctx.beginPath()
  ctx.arc(0, 0, size, notch, Math.PI * 2 - notch)
  ctx.lineTo(0, 0)
  ctx.closePath()
  const g = ctx.createRadialGradient(-size * 0.25, -size * 0.25, 0, 0, 0, size)
  g.addColorStop(0, 'rgba(55, 110, 75, 0.88)')
  g.addColorStop(0.65, 'rgba(25, 72, 48, 0.82)')
  g.addColorStop(1, 'rgba(12, 45, 30, 0.70)')
  ctx.fillStyle = g
  ctx.fill()
  // veins
  ctx.strokeStyle = 'rgba(90, 155, 110, 0.32)'
  ctx.lineWidth = 0.9
  for (let v = 0; v < 7; v++) {
    const va = notch + (v / 6) * (Math.PI * 2 - notch * 2 - 0.2)
    ctx.beginPath()
    ctx.moveTo(0, 0)
    ctx.lineTo(Math.cos(va) * size * 0.88, Math.sin(va) * size * 0.88)
    ctx.stroke()
  }
  // rim highlight
  ctx.beginPath()
  ctx.arc(0, 0, size, notch, Math.PI * 0.8)
  ctx.strokeStyle = 'rgba(120, 190, 140, 0.22)'
  ctx.lineWidth = 1.2
  ctx.stroke()
  ctx.restore()
}

function drawLotus(ctx, x, y, size, opacity, sway) {
  if (opacity <= 0 || size <= 0) return
  ctx.save()
  ctx.globalAlpha = opacity
  ctx.translate(x, y)
  ctx.rotate(sway)

  // outer petals
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2
    ctx.save()
    ctx.rotate(a)
    ctx.beginPath()
    ctx.ellipse(0, -size * 0.58, size * 0.19, size * 0.42, 0, 0, Math.PI * 2)
    const pg = ctx.createLinearGradient(0, -size, 0, -size * 0.1)
    pg.addColorStop(0, 'rgba(255, 232, 225, 0.96)')
    pg.addColorStop(0.5, 'rgba(245, 200, 190, 0.85)')
    pg.addColorStop(1, 'rgba(220, 160, 150, 0.55)')
    ctx.fillStyle = pg
    ctx.fill()
    ctx.strokeStyle = 'rgba(255, 200, 185, 0.35)'
    ctx.lineWidth = 0.5
    ctx.stroke()
    ctx.restore()
  }

  // inner petals
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2 + 0.35
    ctx.save()
    ctx.rotate(a)
    ctx.beginPath()
    ctx.ellipse(0, -size * 0.30, size * 0.12, size * 0.26, 0, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255, 215, 205, 0.92)'
    ctx.fill()
    ctx.restore()
  }

  // center
  ctx.beginPath()
  ctx.arc(0, 0, size * 0.14, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(255, 240, 170, 0.97)'
  ctx.fill()
  ctx.beginPath()
  ctx.arc(0, 0, size * 0.07, 0, Math.PI * 2)
  ctx.fillStyle = 'rgba(200, 155, 50, 0.9)'
  ctx.fill()

  // stamens dots
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2
    ctx.beginPath()
    ctx.arc(Math.cos(a) * size * 0.09, Math.sin(a) * size * 0.09, 1.5, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(220, 170, 60, 0.8)'
    ctx.fill()
  }

  ctx.globalAlpha = 1
  ctx.restore()
}

function drawRipples(ctx, ripples) {
  for (const r of ripples) {
    const prog = r.radius / r.maxRadius
    const alpha = r.opacity * (1 - prog) * (1 - prog)
    if (alpha <= 0.005) continue
    ctx.beginPath()
    ctx.ellipse(r.x, r.y, r.radius, r.radius * 0.38, 0, 0, Math.PI * 2)
    ctx.strokeStyle = `rgba(100, 200, 175, ${alpha * 0.65})`
    ctx.lineWidth = 1.4
    ctx.stroke()
  }
}

export default function WaterBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId
    let t = 0

    const W = () => canvas.width
    const H = () => canvas.height

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // Sparkle seeds (stable across frames)
    const SPARKLES = Array.from({ length: 90 }, (_, i) => ({
      rx: (i * 137.508 % 1),
      ry: (i * 97.31 + i * i * 0.0031) % 1,
      phase: i * 0.73,
      speed: 0.018 + (i % 5) * 0.006,
      size: 0.8 + (i % 3) * 0.5,
    }))

    const ripples = []
    const CYCLE = 260  // frames ≈ 4.3s at 60fps
    let cycleTimer = CYCLE * 0.6  // start first cycle sooner
    const mainPad = PADS.find(p => p.isMain)

    // Drop state
    let drop = { active: false, x: 0, y: -60, vy: 0, tx: 0, ty: 0, hit: false }

    // Main lotus (animates on each cycle)
    let mainLotus = { size: 0, opacity: 0, growing: false, timer: 0, shown: false }

    function spawnRipple(x, y) {
      for (let i = 0; i < 4; i++) {
        ripples.push({
          x, y,
          radius: 4 + i * 12,
          maxRadius: 100 + i * 55,
          speed: 1.5 - i * 0.22,
          opacity: 1 - i * 0.18,
        })
      }
    }

    function tick() {
      t++
      ctx.clearRect(0, 0, W(), H())

      // ── Water background ──
      const wg = ctx.createLinearGradient(0, 0, 0, H())
      wg.addColorStop(0, '#091918')
      wg.addColorStop(0.35, '#0d1f1e')
      wg.addColorStop(0.75, '#0b1c1b')
      wg.addColorStop(1, '#061210')
      ctx.fillStyle = wg
      ctx.fillRect(0, 0, W(), H())

      // Subtle radial glow center
      const cg = ctx.createRadialGradient(W() * 0.5, H() * 0.45, 0, W() * 0.5, H() * 0.45, W() * 0.55)
      cg.addColorStop(0, 'rgba(40, 120, 100, 0.12)')
      cg.addColorStop(1, 'transparent')
      ctx.fillStyle = cg
      ctx.fillRect(0, 0, W(), H())

      // Sparkles
      for (const s of SPARKLES) {
        const flicker = 0.2 + 0.8 * Math.abs(Math.sin(t * s.speed + s.phase))
        ctx.beginPath()
        ctx.arc(s.rx * W(), s.ry * H(), s.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(140, 220, 195, ${flicker * 0.45})`
        ctx.fill()
      }

      // ── Update ripples ──
      for (let i = ripples.length - 1; i >= 0; i--) {
        ripples[i].radius += ripples[i].speed
        if (ripples[i].radius >= ripples[i].maxRadius) ripples.splice(i, 1)
      }

      // Ripple influence for lotus sway
      let rippleForce = 0
      for (const r of ripples) rippleForce += (1 - r.radius / r.maxRadius) * 0.05

      // Draw ripples (below pads)
      drawRipples(ctx, ripples)

      // ── Pads ──
      for (let i = 0; i < PADS.length; i++) {
        const p = PADS[i]
        const x = p.rx * W(), y = p.ry * H()
        const size = p.rs * Math.min(W(), H())
        const sway = Math.sin(t * 0.012 + i * 1.4) * 0.05 + rippleForce * 0.4
        drawLilyPad(ctx, x, y, size, p.angle, sway)
      }

      // ── Permanent lotuses ──
      for (let i = 0; i < PADS.length; i++) {
        const p = PADS[i]
        if (!p.hasLotus) continue
        const x = p.rx * W(), y = p.ry * H()
        const padSize = p.rs * Math.min(W(), H())
        const lotusSize = p.lSize * Math.min(W(), H())
        const sway = Math.sin(t * 0.014 + p.lPhase) * 0.042 + rippleForce * 0.07
        drawLotus(ctx, x, y - padSize * 0.08, lotusSize, 1, sway)
      }

      // ── Cycle: drop → ripple → main lotus ──
      cycleTimer++
      if (cycleTimer >= CYCLE && !drop.active) {
        const tx = mainPad.rx * W()
        const ty = mainPad.ry * H()
        drop = { active: true, x: tx, y: H() * 0.05, vy: 3.5, tx, ty, hit: false }
        mainLotus = { size: 0, opacity: 0, growing: false, timer: 0, shown: false }
        cycleTimer = 0
      }

      if (drop.active) {
        drop.y += drop.vy
        drop.vy += 0.18
        // draw drop
        ctx.save()
        ctx.translate(drop.x, drop.y)
        ctx.beginPath()
        ctx.arc(0, 0, 3.5, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(150, 230, 210, 0.92)'
        ctx.fill()
        // tail
        ctx.beginPath()
        ctx.moveTo(0, 0)
        ctx.lineTo(0, -Math.min(14, drop.vy * 2.2))
        ctx.strokeStyle = 'rgba(150, 230, 210, 0.40)'
        ctx.lineWidth = 2
        ctx.stroke()
        ctx.restore()

        if (!drop.hit && drop.y >= drop.ty) {
          drop.hit = true
          drop.active = false
          spawnRipple(drop.tx, drop.ty)
          mainLotus.growing = true
        }
      }

      // Grow main lotus
      if (mainLotus.growing) {
        mainLotus.timer++
        const prog = Math.min(mainLotus.timer / 55, 1)
        const eased = 1 - Math.pow(1 - prog, 3)
        mainLotus.size = eased * 0.048 * Math.min(W(), H())
        mainLotus.opacity = eased
        if (prog >= 1) { mainLotus.growing = false; mainLotus.shown = true }
      }

      // Fade out main lotus toward end of cycle
      if (mainLotus.shown && !mainLotus.growing && cycleTimer > CYCLE * 0.72) {
        const fadeProgress = (cycleTimer - CYCLE * 0.72) / (CYCLE * 0.28)
        mainLotus.opacity = Math.max(0, 1 - fadeProgress)
        mainLotus.size = mainLotus.opacity * 0.048 * Math.min(W(), H())
      }

      if (mainLotus.size > 0) {
        const x = mainPad.rx * W(), y = mainPad.ry * H()
        const padSize = mainPad.rs * Math.min(W(), H())
        const sway = Math.sin(t * 0.016 + 1.8) * 0.05 + rippleForce * 0.12
        drawLotus(ctx, x, y - padSize * 0.08, mainLotus.size, mainLotus.opacity, sway)
      }

      animId = requestAnimationFrame(tick)
    }

    tick()
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }}
    />
  )
}
