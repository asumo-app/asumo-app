import { useState, useEffect } from 'react'

// ─── Hobby energies ───────────────────────────────────────────
// Each has 7 entries that rotate by day-of-week (dayOfMonth % 7)
const HOBBY_ENERGIES = [
  {
    id: 'arte',
    label: 'Arte Visual',
    subtitle: 'Tu visión hecha color',
    icon: '🎨',
    color: '#e67e22',
    colorDark: '#5a2a00',
    question: '¿Qué color representa lo que sientes ahora?',
    inspirations: [
      'Hoy el universo te invita a pintar sin rumbo — el camino es la obra.',
      'Tu paleta de colores es única: nadie más ve el mundo como tú lo ves.',
      'Crear sin juzgar es el acto más valiente que existe.',
      'Las formas que emergen de tus manos son mensajes de tu alma.',
      'Hoy deja que el color hable lo que las palabras no pueden.',
      'Un trazo imperfecto tiene más vida que uno perfecto.',
      'Tu expresión visual es un portal hacia tu mundo interior.',
    ],
    challenges: [
      'Crea un mandala de 15 minutos usando solo formas que representen tu estado de ánimo.',
      'Dibuja 5 cosas que ves ahora mismo, pero cámbiales el color por uno que "se sientan".',
      'Haz un collage rápido con lo que tengas a mano: recortes, colores, lo que sea.',
      'Pinta con los dedos o improvisa con lo que tengas — sin pinceles, sin reglas.',
      'Crea una paleta de colores de tu día de hoy: ¿qué colores lo representan?',
      'Dibuja tu estado emocional actual como un paisaje abstracto.',
      'Crea un pequeño altar visual con objetos de colores que te nutran hoy.',
    ],
    affirmations: [
      'Mi creatividad visual es un canal sagrado de autoexpresión.',
      'Cada creación mía tiene valor, independientemente del resultado.',
      'Me permito crear sin metas — el proceso es el regalo.',
      'Mis manos trasladan al mundo lo que vive dentro de mí.',
      'El arte no necesita ser perfecto para ser profundo.',
      'Creo belleza porque soy belleza en movimiento.',
      'Mi visión del mundo merece existir en forma visible.',
    ],
    reflections: [
      '¿Qué parte de ti apareció en lo que creaste hoy?',
      '¿Qué te sorprendió del proceso creativo de esta sesión?',
      '¿Qué emoción expresaste sin palabras en este ejercicio?',
      '¿Qué colores o formas llamaron más tu atención y por qué?',
      '¿Cómo se siente tu cuerpo después de crear algo con las manos?',
      '¿Qué quería decir esta creación que tú aún no habías podido decir?',
      '¿Qué parte de ti necesita más expresión visual en tu vida cotidiana?',
    ],
  },
  {
    id: 'escritura',
    label: 'Escritura',
    subtitle: 'Tus palabras, tu poder',
    icon: '✍️',
    color: '#4f9eff',
    colorDark: '#0a2060',
    question: '¿Qué historia quiere ser contada hoy desde dentro de ti?',
    inspirations: [
      'Las palabras son semillas — cada una que escribes transforma algo.',
      'Hoy escribe sin borrar. Lo crudo también es hermoso.',
      'Tu historia importa, incluso —especialmente— las partes que nadie conoce.',
      'Escribir es escucharte a ti misma/o con más claridad que nunca.',
      'Una sola página honesta puede cambiar el día entero.',
      'Hoy las palabras correctas ya están dentro de ti — solo necesitan salir.',
      'Escribir es el acto más íntimo de conocerse a uno mismo.',
    ],
    challenges: [
      'Escribe una carta de amor a la parte de ti que más criticas.',
      'Escribe un microcuento de 6 palabras que resuma cómo te sientes hoy.',
      'Empieza una historia con "Había una vez una versión de mí que..."',
      'Escribe 15 minutos sin parar, sin corregir, sin juzgar. Solo fluye.',
      'Crea un poema con 5 palabras que describes tu día de hoy.',
      'Escribe una carta para tu yo de hace 5 años.',
      'Describe tu mañana ideal con todos los sentidos: ¿qué ves, hueles, escuchas?',
    ],
    affirmations: [
      'Mis palabras tienen el poder de sanar, iluminar y transformar.',
      'Me permito escribir sin filtros — mi voz es válida.',
      'No necesito escribir perfectamente para escribir poderosamente.',
      'Cada cosa que escribo es un acto de conocimiento propio.',
      'Mi historia merece ser contada con honestidad y ternura.',
      'Escribo para conocerme, no para impresionar a nadie.',
      'Las palabras que fluyen de mí llevan sabiduría genuina.',
    ],
    reflections: [
      '¿Qué descubriste de ti misma/o al escribir hoy?',
      '¿Hubo algo que apareció en el texto que te sorprendió?',
      '¿Qué parte de lo que escribiste resonó más contigo?',
      '¿Qué emociones liberaste a través de las palabras hoy?',
      '¿Qué historia quiere seguir siendo contada?',
      '¿Cómo se siente tu interior después de darle voz a algo que no habías expresado?',
      '¿Qué parte de tu escritura de hoy quisieras recordar o guardar?',
    ],
  },
  {
    id: 'musica',
    label: 'Música',
    subtitle: 'Vibra en tu frecuencia',
    icon: '🎵',
    color: '#c9a227',
    colorDark: '#4a3000',
    question: '¿Qué sonido vive dentro de ti buscando salir?',
    inspirations: [
      'Tu cuerpo vibra con la música mucho antes de que tu mente lo entienda.',
      'Hoy canta aunque creas que no sabes — el alma no desafina.',
      'La música que te mueve hoy es un mapa de tu estado interior.',
      'Cada ritmo que sientes es una conversación entre tú y el universo.',
      'Crear una playlist es un acto de autoconocimiento profundo.',
      'Hoy permite que la música mueva lo que las palabras no pueden.',
      'Tu voz, tu ritmo, tu frecuencia — todo eso es tuyo y es sagrado.',
    ],
    challenges: [
      'Crea una playlist de 15 minutos que represente exactamente cómo te sientes ahora.',
      'Canta una canción que conozcas bien pero esta vez con toda la emoción que puedas.',
      'Improvisa un ritmo con lo que tengas cerca: manos, mesa, objetos del cuarto.',
      'Escucha una pieza de música clásica o instrumental y escribe lo que te imagina.',
      'Crea una lista de las 5 canciones que definen quién eres en este momento de tu vida.',
      'Tararea o humea una melodía inventada mientras caminas o haces otra cosa.',
      'Busca un género musical que nunca hayas explorado y escúchalo durante 15 minutos.',
    ],
    affirmations: [
      'La música que me mueve está conectada con mi alma más profunda.',
      'Mi voz es un instrumento sagrado, sin importar el tono.',
      'Me permito vibrar, sentir y ser movida/o por el sonido.',
      'La música es mi idioma cuando las palabras se quedan cortas.',
      'Mi gusto musical es una expresión auténtica de quien soy.',
      'El ritmo que late en mí es el mismo que late en el universo.',
      'Me doy permiso de cantar, crear y celebrar mi frecuencia única.',
    ],
    reflections: [
      '¿Cómo cambió tu energía después de esta experiencia musical?',
      '¿Qué emociones surgieron al escuchar o crear música hoy?',
      '¿Qué canción o ritmo sintió más "como tú" en este momento?',
      '¿Hubo algún momento en que la música te conectó con algo más profundo?',
      '¿Qué parte de ti vibró más intensamente con la música de hoy?',
      '¿Qué le dirías a alguien sobre esta experiencia musical tuya?',
      '¿Qué necesitas escuchar más seguido en tu vida cotidiana?',
    ],
  },
  {
    id: 'movimiento',
    label: 'Movimiento',
    subtitle: 'Tu cuerpo habla tu alma',
    icon: '💃',
    color: '#c45578',
    colorDark: '#5a0a1e',
    question: '¿Qué parte de tu cuerpo lleva tiempo pidiendo ser escuchada?',
    inspirations: [
      'Tu cuerpo recuerda todo lo que tu mente ya olvidó — dale espacio.',
      'Hoy no se trata de moverse bien, sino de moverse verdad.',
      'La danza no necesita espejo ni audiencia para ser sagrada.',
      'El movimiento es el idioma más antiguo que tenemos como seres humanos.',
      'Hoy libera algo a través del cuerpo que no puedes liberar con palabras.',
      'Tu cuerpo es el primer hogar que tuviste — trata de honrarlo hoy.',
      'Cuando el cuerpo se mueve con libertad, el alma respira.',
    ],
    challenges: [
      'Pon música que te guste y mueve el cuerpo durante 15 minutos sin ninguna coreografía.',
      'Haz 5 minutos de movimiento con los ojos cerrados — solo sintiendo.',
      'Intenta un flujo de yoga de 15 minutos enfocándote en tu respiración.',
      'Baila como si nadie te viera (o como si todos estuvieran mirando y te valiera).',
      'Haz una caminata consciente de 15 minutos, prestando atención a cada paso.',
      'Sacude el cuerpo durante 3 minutos como para liberar tensión — luego quédate quieta/o.',
      'Explora el movimiento lento: muévete como si estuvieras bajo el agua durante 10 minutos.',
    ],
    affirmations: [
      'Mi cuerpo es sabio, sensible y merece ser escuchado.',
      'Me muevo para celebrar estar viva/o, no para castigarme.',
      'El movimiento es mi medicina más natural y accesible.',
      'Cuando danzo, me reconecto con la versión más libre de mí.',
      'Mi cuerpo es perfecto para la vida que tengo que vivir.',
      'Me permito sentir el placer de moverme sin juzgar cómo se ve.',
      'Cada respiración y movimiento me anclan más en el presente.',
    ],
    reflections: [
      '¿Qué liberaste en el cuerpo durante este movimiento?',
      '¿Qué parte de tu cuerpo se sintió más viva o más pesada hoy?',
      '¿Qué emociones emergieron cuando dejaste que el cuerpo se expresara?',
      '¿Hubo un momento en que el movimiento se sintió natural y libre?',
      '¿Qué mensaje te dio tu cuerpo hoy que no te había dado antes?',
      '¿Cómo se siente tu mente después de haber movido el cuerpo con intención?',
      '¿Qué tipo de movimiento necesitas más en tu vida cotidiana?',
    ],
  },
  {
    id: 'naturaleza',
    label: 'Naturaleza',
    subtitle: 'Crecer con la tierra',
    icon: '🌿',
    color: '#27ae60',
    colorDark: '#0a3a14',
    question: '¿Cuándo fue la última vez que sentiste la tierra bajo tus pies?',
    inspirations: [
      'Hoy la naturaleza tiene un mensaje específico para ti — solo escúchala.',
      'Eres parte de un sistema vivo que se cuida mutuamente.',
      'Una planta, una hoja, una piedra pueden ser tus maestras hoy.',
      'La naturaleza no se apresura, y sin embargo todo se cumple a tiempo.',
      'Crear con elementos naturales es un acto de cocreación con el universo.',
      'Hoy reconéctate con el ritmo lento y sabio de lo que crece.',
      'Salir afuera —aunque sea un minuto— puede cambiar toda tu perspectiva.',
    ],
    challenges: [
      'Crea un mandala con elementos naturales: hojas, flores, piedras, ramas.',
      'Sienta en el piso o en el jardín y observa durante 15 minutos qué se mueve a tu alrededor.',
      'Cuida o simplemente observa una planta de cerca — ¿qué ves que nunca habías notado?',
      'Fotografía 7 elementos de la naturaleza que encuentres en 15 minutos.',
      'Dibuja o escribe sobre el árbol, flor o planta que más te llame la atención hoy.',
      'Sal descalza/o y camina sobre la tierra o el pasto durante 10 minutos.',
      'Recolecta elementos naturales y crea algo espontáneo con ellos.',
    ],
    affirmations: [
      'Soy parte de la naturaleza — pertenezco a este mundo y a este ciclo.',
      'La tierra me sostiene, me nutre y me recuerda quién soy.',
      'Me reconecto con el ritmo natural de las cosas.',
      'La belleza del mundo natural también vive dentro de mí.',
      'Cuidar la naturaleza es cuidarme a mí misma/o.',
      'Soy tan resiliente y adaptable como cualquier planta que crece.',
      'Cuando me conecto con la naturaleza, encuentro paz sin buscarla.',
    ],
    reflections: [
      '¿Qué mensaje sentiste que la naturaleza tenía para ti hoy?',
      '¿Qué sensación física apareció cuando te conectaste con el mundo natural?',
      '¿Qué paralelo encontraste entre tu vida y algo que observaste en la naturaleza?',
      '¿Hubo algún elemento natural que llamó tu atención de forma especial?',
      '¿Qué cambió en tu perspectiva después de pasar tiempo con lo natural?',
      '¿Cómo puedes traer más naturaleza a tu vida cotidiana?',
      '¿Qué ritmo de la naturaleza quisieras incorporar más en tu día a día?',
    ],
  },
  {
    id: 'fotografia',
    label: 'Fotografía',
    subtitle: 'La belleza que solo tú ves',
    icon: '📸',
    color: '#9b7fda',
    colorDark: '#200a5a',
    question: '¿Qué quieres recordar de este momento de tu vida?',
    inspirations: [
      'Hoy fotografía lo que normalmente pasas por alto — ahí está la magia.',
      'Tu perspectiva visual es completamente única en el mundo.',
      'Una foto no captura la realidad — captura tu forma de ver.',
      'Las imágenes que te detienen a mirar son espejo de tu alma.',
      'Hoy busca la belleza en los lugares menos evidentes.',
      'El encuadre que eliges dice tanto sobre ti como el sujeto que fotografías.',
      'Documenta tu mundo como si fueras a mostrárselo a alguien que nunca ha podido verlo.',
    ],
    challenges: [
      'Fotografía 10 cosas que representen "belleza" según tú hoy — sin límites.',
      'Busca luz interesante en tu entorno y fotografía solo con esa luz durante 15 minutos.',
      'Fotografía desde perspectivas inusuales: desde el suelo, desde arriba, de cerca extremo.',
      'Crea una "historia visual" de tu día con 5 fotografías en secuencia.',
      'Fotografía sombras y patrones durante 15 minutos — nada más.',
      'Toma fotos de manos, texturas, detalles que normalmente ignoras.',
      'Fotografía algo que te haga sentir paz, algo que te haga sentir energía, algo que te haga sentir amor.',
    ],
    affirmations: [
      'Mi perspectiva visual del mundo tiene un valor único e irreplicable.',
      'Noto la belleza porque soy capaz de verla — eso es un don.',
      'Las imágenes que capturo son extensiones de mi visión interior.',
      'Me permito ver lentamente en un mundo que siempre corre.',
      'La belleza que fotografío ya existía — yo solo la hice visible.',
      'Mi ojo artístico se desarrolla cada vez más cuando lo ejercito.',
      'Ver con intención es uno de los actos más meditativos que existen.',
    ],
    reflections: [
      '¿Qué te sorprendió ver a través del lente hoy?',
      '¿Qué imagen capturaste que más te representa en este momento?',
      '¿Hubo algo que no esperabas encontrar bello y resultó serlo?',
      '¿Qué parte de tu perspectiva única emergió en las fotos de hoy?',
      '¿Cómo cambió tu forma de ver el entorno durante este ejercicio?',
      '¿Qué historia quieren contar las fotos que tomaste hoy?',
      '¿Qué quisieras seguir fotografiando y explorando desde hoy?',
    ],
  },
]

// Timer utilities
function fmt(s) {
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`
}

// ─── Main component ───────────────────────────────────────────
export default function CreativeHobbies() {
  const dayIdx = new Date().getDate() % 7

  const [selected, setSelected]       = useState(null)
  const [phase, setPhase]             = useState('choose') // choose | active | reflect
  const [timeLeft, setTimeLeft]       = useState(0)
  const [timerRunning, setTimerRunning] = useState(false)
  const [timerDone, setTimerDone]     = useState(false)
  const [reflection, setReflection]   = useState('')
  const [log, setLog]                 = useState(() => {
    try { return JSON.parse(localStorage.getItem('hobbies_log2') || '[]') } catch { return [] }
  })
  const [showLog, setShowLog]         = useState(false)
  const [timerRef, setTimerRef]       = useState(null)

  // Cleanup timer on unmount
  useEffect(() => () => { if (timerRef) clearInterval(timerRef) }, [timerRef])

  const selectHobby = (hobby) => {
    setSelected(hobby)
    setPhase('active')
    setTimeLeft(15 * 60)
    setTimerRunning(false)
    setTimerDone(false)
    setReflection('')
  }

  const startTimer = () => {
    if (timerRef) clearInterval(timerRef)
    setTimerRunning(true)
    const iv = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          clearInterval(iv)
          setTimerRunning(false)
          setTimerDone(true)
          return 0
        }
        return t - 1
      })
    }, 1000)
    setTimerRef(iv)
  }

  const stopTimer = () => {
    if (timerRef) clearInterval(timerRef)
    setTimerRunning(false)
  }

  const saveReflection = () => {
    const entry = {
      id: Date.now(),
      hobby: selected.label,
      icon: selected.icon,
      color: selected.color,
      challenge: selected.challenges[dayIdx],
      reflection,
      date: new Date().toLocaleDateString('es-MX', { day:'numeric', month:'long' }),
    }
    const updated = [entry, ...log].slice(0, 30)
    setLog(updated)
    localStorage.setItem('hobbies_log2', JSON.stringify(updated))
    setPhase('choose')
    setSelected(null)
    setReflection('')
  }

  const skipToReflect = () => {
    if (timerRef) clearInterval(timerRef)
    setTimerRunning(false)
    setTimerDone(true)
    setPhase('reflect')
  }

  return (
    <div className="mod">
      <div className="mod-hd">
        <span className="mod-icon">🎨</span>
        <h1 className="mod-title">Ritual Creativo</h1>
        <p className="mod-sub">Un espacio sagrado para expresar lo que vive dentro de ti</p>
      </div>

      {/* ══ CHOOSE PHASE ══ */}
      {phase === 'choose' && (
        <div>
          <p style={{
            fontFamily: "'Cinzel',serif",
            fontSize: '1rem', fontWeight: 500,
            color: 'var(--silver-hi)', textAlign: 'center',
            letterSpacing: '0.04em', lineHeight: 1.7,
            marginBottom: 36,
          }}>
            ¿Qué parte de ti quiere<br/>expresarse hoy?
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 14, marginBottom: 36,
          }}>
            {HOBBY_ENERGIES.map(h => (
              <HobbyCard key={h.id} hobby={h} onSelect={() => selectHobby(h)} />
            ))}
          </div>

          {/* Log */}
          {log.length > 0 && (
            <div>
              <button
                onClick={() => setShowLog(s => !s)}
                style={{
                  width: '100%', padding: '12px',
                  background: 'transparent',
                  border: '1px solid var(--border)',
                  borderRadius: 12, cursor: 'pointer',
                  fontFamily: "'Raleway',sans-serif",
                  fontSize: '0.82rem', color: 'var(--silver-dim)',
                  marginBottom: showLog ? 14 : 0,
                }}
              >
                {showLog ? '↑' : '↓'} Mis rituales creativos ({log.length})
              </button>

              {showLog && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, animation: 'fadeUp 0.3s ease' }}>
                  {log.map(e => (
                    <div key={e.id} style={{
                      padding: '14px 18px',
                      background: 'var(--glass-l)',
                      border: '1px solid var(--border)',
                      borderRadius: 12,
                      borderLeft: `3px solid ${e.color}60`,
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: e.reflection ? 8 : 0 }}>
                        <span style={{ fontSize: '1.3rem' }}>{e.icon}</span>
                        <div style={{ flex: 1 }}>
                          <span style={{ fontSize: '0.85rem', color: 'var(--white)', fontWeight: 600 }}>{e.hobby}</span>
                          <span style={{ fontSize: '0.72rem', color: 'var(--silver-dim)', marginLeft: 10 }}>{e.date}</span>
                        </div>
                      </div>
                      {e.reflection && (
                        <p style={{
                          fontSize: '0.78rem', color: 'var(--silver-mid)',
                          fontStyle: 'italic', lineHeight: 1.5,
                          marginLeft: 34,
                        }}>"{e.reflection}"</p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ══ ACTIVE PHASE ══ */}
      {phase === 'active' && selected && (
        <div style={{ animation: 'fadeUp 0.4s ease', maxWidth: 680, margin: '0 auto' }}>
          {/* Back */}
          <button onClick={() => setPhase('choose')} style={backBtnStyle}>
            ← Elegir otra energía
          </button>

          {/* Hobby badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            padding: '10px 20px',
            background: `${selected.color}14`,
            border: `1px solid ${selected.color}40`,
            borderRadius: 100, marginBottom: 28,
          }}>
            <span>{selected.icon}</span>
            <span style={{
              fontFamily: "'Cinzel',serif",
              fontSize: '0.85rem', fontWeight: 700,
              color: 'var(--white)',
            }}>{selected.label}</span>
            <span style={{ fontSize: '0.75rem', color: selected.color }}>
              · {selected.subtitle}
            </span>
          </div>

          {/* Inspiration of the day */}
          <InfoCard
            label="Inspiración del día"
            icon="🌟"
            color={selected.color}
            style={{ marginBottom: 16 }}
          >
            <p style={{ color: 'var(--silver-hi)', fontSize: '0.92rem', lineHeight: 1.7, fontStyle: 'italic' }}>
              {selected.inspirations[dayIdx]}
            </p>
          </InfoCard>

          {/* 15-min challenge */}
          <InfoCard
            label="Reto creativo · 15 minutos"
            icon="⏱️"
            color={selected.color}
            style={{ marginBottom: 16 }}
          >
            <p style={{ color: 'var(--silver)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: 16 }}>
              {selected.challenges[dayIdx]}
            </p>

            {/* Timer */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <div style={{
                fontFamily: "'Cinzel',serif",
                fontSize: '2rem', fontWeight: 700,
                color: timerDone ? '#27ae60' : selected.color,
                textShadow: `0 0 16px ${selected.color}60`,
                minWidth: 90,
              }}>
                {timerDone ? '✓ ¡Listo!' : fmt(timeLeft)}
              </div>
              {!timerDone && !timerRunning && (
                <button
                  onClick={startTimer}
                  style={{
                    padding: '10px 24px', borderRadius: 100,
                    background: `linear-gradient(135deg, ${selected.colorDark}, ${selected.color})`,
                    border: 'none', cursor: 'pointer',
                    fontFamily: "'Raleway',sans-serif",
                    fontSize: '0.84rem', fontWeight: 600,
                    color: 'var(--white)',
                  }}
                >▶ Iniciar timer</button>
              )}
              {timerRunning && (
                <button onClick={stopTimer} style={ghostBtnStyle}>⏸ Pausar</button>
              )}
              {!timerDone && (
                <button onClick={skipToReflect} style={ghostBtnStyle}>
                  Saltar a reflexión →
                </button>
              )}
            </div>
          </InfoCard>

          {/* Affirmation */}
          <InfoCard
            label="Afirmación de esta energía"
            icon="✦"
            color={selected.color}
            style={{ marginBottom: 16 }}
          >
            <p style={{
              fontFamily: "'Cinzel',serif",
              color: 'var(--silver-hi)', fontSize: '0.9rem',
              lineHeight: 1.7, fontStyle: 'italic',
            }}>
              "{selected.affirmations[dayIdx]}"
            </p>
          </InfoCard>

          {/* CTA to reflect */}
          {timerDone && (
            <button
              onClick={() => setPhase('reflect')}
              style={{
                width: '100%', padding: '14px',
                background: `linear-gradient(135deg, ${selected.colorDark}, ${selected.color})`,
                border: 'none', borderRadius: 14, cursor: 'pointer',
                fontFamily: "'Cinzel',serif",
                fontSize: '0.88rem', fontWeight: 600,
                color: 'var(--white)', letterSpacing: '0.08em',
                animation: 'fadeUp 0.4s ease',
              }}
            >🌙 Ir a la reflexión</button>
          )}
        </div>
      )}

      {/* ══ REFLECT PHASE ══ */}
      {phase === 'reflect' && selected && (
        <div style={{ animation: 'fadeUp 0.4s ease', maxWidth: 680, margin: '0 auto' }}>
          {/* Hobby badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 18px',
            background: `${selected.color}14`,
            border: `1px solid ${selected.color}35`,
            borderRadius: 100, marginBottom: 24,
          }}>
            <span>{selected.icon}</span>
            <span style={{ fontSize: '0.8rem', color: 'var(--silver-mid)', fontFamily: "'Raleway',sans-serif" }}>
              {selected.label}
            </span>
          </div>

          <div style={{
            background: `linear-gradient(135deg, ${selected.colorDark}60, ${selected.color}10)`,
            border: `1px solid ${selected.color}30`,
            borderRadius: 18, padding: '32px 30px',
            marginBottom: 20,
          }}>
            <div style={{ fontSize: '2rem', marginBottom: 14 }}>🌙</div>
            <div style={{
              fontFamily: "'Cinzel',serif",
              fontSize: '0.68rem', letterSpacing: '0.22em',
              color: selected.color, textTransform: 'uppercase', marginBottom: 14,
            }}>Pregunta de reflexión</div>
            <p style={{
              fontFamily: "'Cinzel',serif",
              fontSize: 'clamp(0.95rem, 2vw, 1.1rem)',
              color: 'var(--silver-hi)', lineHeight: 1.75,
              fontStyle: 'italic',
            }}>
              "{selected.reflections[dayIdx]}"
            </p>
          </div>

          <textarea
            value={reflection}
            onChange={e => setReflection(e.target.value)}
            placeholder="Escribe desde el corazón... (opcional)"
            className="inp"
            style={{
              minHeight: 130,
              fontStyle: 'italic', lineHeight: 1.75,
              marginBottom: 16,
            }}
          />

          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <button
              onClick={saveReflection}
              style={{
                flex: 1, padding: '13px 24px',
                background: `linear-gradient(135deg, ${selected.colorDark}, ${selected.color})`,
                border: 'none', borderRadius: 100, cursor: 'pointer',
                fontFamily: "'Cinzel',serif",
                fontSize: '0.85rem', fontWeight: 600,
                color: 'var(--white)', letterSpacing: '0.08em',
              }}
            >✦ Completar ritual</button>
            <button onClick={() => setPhase('choose')} style={ghostBtnStyle}>
              Volver al inicio
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Hobby energy card ────────────────────────────────────────
function HobbyCard({ hobby, onSelect }) {
  const [hovered, setHovered] = useState(false)
  const dayIdx = new Date().getDate() % 7

  return (
    <button
      onClick={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        padding: '28px 22px',
        background: hovered
          ? `linear-gradient(155deg, ${hobby.colorDark}90, ${hobby.color}22)`
          : `linear-gradient(155deg, ${hobby.colorDark}60, ${hobby.color}10)`,
        border: `1px solid ${hovered ? hobby.color + '55' : hobby.color + '25'}`,
        borderRadius: 18, cursor: 'pointer',
        textAlign: 'left', position: 'relative', overflow: 'hidden',
        boxShadow: hovered ? `0 8px 32px ${hobby.color}25` : 'none',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
        transition: 'all 0.25s ease',
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${hobby.color}${hovered ? 'cc' : '55'}, transparent)`,
        transition: 'all 0.25s',
      }} />

      <div style={{
        fontSize: '2.2rem', marginBottom: 14,
        filter: hovered ? `drop-shadow(0 0 12px ${hobby.color})` : 'none',
        transition: 'filter 0.25s',
      }}>{hobby.icon}</div>

      <div style={{
        fontFamily: "'Cinzel',serif",
        fontSize: '0.9rem', fontWeight: 700,
        color: 'var(--white)', letterSpacing: '0.04em', marginBottom: 4,
      }}>{hobby.label}</div>

      <div style={{
        fontSize: '0.72rem', color: hovered ? hobby.color : 'var(--silver-dim)',
        fontFamily: "'Raleway',sans-serif", marginBottom: 16,
        transition: 'color 0.25s',
      }}>{hobby.subtitle}</div>

      <div style={{
        padding: '10px 12px',
        background: `${hobby.color}${hovered ? '18' : '0d'}`,
        border: `1px solid ${hobby.color}${hovered ? '30' : '18'}`,
        borderRadius: 10,
        fontSize: '0.72rem', fontStyle: 'italic',
        color: hovered ? 'var(--silver-mid)' : 'var(--silver-dim)',
        fontFamily: "'Raleway',sans-serif", lineHeight: 1.55,
        transition: 'all 0.25s',
      }}>{hobby.question}</div>
    </button>
  )
}

// ─── Info card ────────────────────────────────────────────────
function InfoCard({ label, icon, color, children, style = {} }) {
  return (
    <div style={{
      background: 'var(--glass)', backdropFilter: 'blur(16px)',
      border: `1px solid ${color}25`,
      borderRadius: 16, padding: '22px 24px',
      position: 'relative', overflow: 'hidden',
      ...style,
    }}>
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: `linear-gradient(90deg, transparent, ${color}70, transparent)`,
      }} />
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14,
      }}>
        <span style={{ fontSize: '1rem' }}>{icon}</span>
        <span style={{
          fontFamily: "'Cinzel',serif",
          fontSize: '0.65rem', letterSpacing: '0.2em',
          color: 'var(--silver-dim)', textTransform: 'uppercase',
        }}>{label}</span>
      </div>
      {children}
    </div>
  )
}

// ─── Shared button styles ─────────────────────────────────────
const backBtnStyle = {
  padding: '8px 18px',
  background: 'transparent',
  border: '1px solid var(--border)',
  borderRadius: 100, cursor: 'pointer',
  fontFamily: "'Raleway',sans-serif",
  fontSize: '0.8rem', color: 'var(--silver-dim)',
  marginBottom: 20, display: 'block',
  transition: 'all 0.2s',
}

const ghostBtnStyle = {
  padding: '10px 20px',
  background: 'transparent',
  border: '1px solid var(--border-hi)',
  borderRadius: 100, cursor: 'pointer',
  fontFamily: "'Raleway',sans-serif",
  fontSize: '0.82rem', color: 'var(--silver-mid)',
  transition: 'all 0.2s',
}
