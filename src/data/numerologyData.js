// ============================================================
//  ASUMO — Numerology Data
//  Números 1-9 + maestros 11 y 22
// ============================================================

// ── Calculation helpers ────────────────────────────────────────
function sumDigits(n) {
  return String(Math.abs(n)).split('').reduce((s, d) => s + Number(d), 0)
}
function isMaster(n) { return n === 11 || n === 22 }
function reduce(n) {
  if (isMaster(n)) return n
  while (n > 9) {
    n = sumDigits(n)
    if (isMaster(n)) return n
  }
  return n
}

export function calcLifePath(day, month, year) {
  const d = reduce(day)
  const m = reduce(month)
  const y = reduce(sumDigits(year))   // reduce year digit by digit
  const total = d + m + y
  if (isMaster(total)) return total
  return reduce(total)
}

export function calcDailyNumber(date = new Date()) {
  const str = `${date.getDate()}${date.getMonth() + 1}${date.getFullYear()}`
  const sum = str.split('').reduce((s, d) => s + Number(d), 0)
  return reduce(sum)
}

// ── Number data ───────────────────────────────────────────────
export const NUMEROLOGY = {
  1: {
    name: 'El Iniciador',
    essence: 'Liderazgo y originalidad',
    symbol: '☀️',
    color: '#e8634a',
    colorDark: '#6a1500',
    meaning: 'Eres la semilla de toda creación — una pionera/o que abre caminos donde no los había. Tu energía es solar: brillante, directa y sin rodeos. Viniste a este mundo a desarrollar una identidad única y a liderar desde la autenticidad, no desde el ego.',
    purpose: 'Ser un catalizador del cambio. Tu sola presencia inspira a otros a atreverse a actuar.',
    strengths: ['Liderazgo natural', 'Originalidad', 'Determinación', 'Valentía', 'Visión clara'],
    challenges: ['Impaciencia', 'Tendencia al individualismo', 'Dificultad para pedir ayuda'],
    affirmations: [
      'Soy la autora/or de mi historia y la escribo con valentía.',
      'Confío en mi capacidad de iniciar lo que otros aún no imaginan.',
      'Mi independencia es mi fortaleza más profunda.',
      'Lidero con el corazón y el mundo responde.',
      'Soy el origen de algo extraordinario.',
      'Mi singularidad es mi don más valioso.',
      'Cada paso que doy abre camino para quien viene después.',
    ],
    todayMessage: 'Hoy la energía te invita a tomar la iniciativa.',
  },
  2: {
    name: 'El Armonizador',
    essence: 'Cooperación y sensibilidad',
    symbol: '🌙',
    color: '#4f9eff',
    colorDark: '#0a2560',
    meaning: 'Eres la luna entre las estrellas. Sientes lo que otros no dicen, construyes puentes donde hay distancia. Tu superpoder es la empatía y la capacidad de encontrar armonía en los opuestos. Viniste a aprender el arte de la colaboración y la paz profunda.',
    purpose: 'Ser puente entre mundos, personas e ideas. Crear armonía donde existe tensión.',
    strengths: ['Empatía profunda', 'Diplomacia', 'Intuición', 'Paciencia', 'Cooperación'],
    challenges: ['Dificultad para poner límites', 'Dependencia emocional', 'Indecisión'],
    affirmations: [
      'Mi sensibilidad es mi fortaleza, no mi debilidad.',
      'Merezco tanto como doy.',
      'Creo paz primero en mí, luego a mi alrededor.',
      'Confío en mi intuición — siempre sabe antes.',
      'Mis relaciones son sagradas y las cuido con amor.',
      'Poner límites es un acto de amor hacia mí misma/o.',
      'Soy un puente de luz entre las personas que amo.',
    ],
    todayMessage: 'Hoy la energía pide escuchar más de lo que se habla.',
  },
  3: {
    name: 'El Creador',
    essence: 'Expresión y creatividad',
    symbol: '✨',
    color: '#f0c040',
    colorDark: '#5a3c00',
    meaning: 'Eres pura magia creativa. Tienes el don de la expresión en todas sus formas: palabras, arte, música, humor. Tu misión es crear, comunicar y elevar el espíritu humano con una chispa que solo tú posees.',
    purpose: 'Expresarte auténticamente y usar tu creatividad para inspirar y elevar a quienes te rodean.',
    strengths: ['Creatividad', 'Expresión artística', 'Optimismo', 'Carisma', 'Comunicación'],
    challenges: ['Dispersión', 'Dificultad para completar proyectos', 'Superficialidad potencial'],
    affirmations: [
      'Mi creatividad es un canal divino que fluye libremente.',
      'Expreso mi verdad con alegría y sin miedo.',
      'El mundo necesita lo que solo yo puedo crear.',
      'Mi voz tiene poder y merece ser escuchada.',
      'La alegría que traigo al mundo es un regalo genuino.',
      'Me permito jugar, crear y equivocarme con gracia.',
      'Cada expresión mía es una contribución valiosa.',
    ],
    todayMessage: 'Hoy la energía celebra tu expresión libre y auténtica.',
  },
  4: {
    name: 'El Constructor',
    essence: 'Estabilidad y trabajo',
    symbol: '🏔️',
    color: '#27ae60',
    colorDark: '#0a3a1a',
    meaning: 'Eres la tierra firme sobre la que se construyen imperios. La persona en quien todos confían, la que pone las bases, la que aparece cuando es necesario. Tu energía es la de quien sabe que los grandes logros requieren paciencia, disciplina y presencia constante.',
    purpose: 'Construir estructuras sólidas — materiales o espirituales — que perduren más allá de ti.',
    strengths: ['Disciplina', 'Confiabilidad', 'Organización', 'Persistencia', 'Pragmatismo'],
    challenges: ['Rigidez', 'Resistencia al cambio', 'Workaholismo'],
    affirmations: [
      'Construyo mi vida con paciencia y propósito genuino.',
      'Mi confiabilidad es un regalo para quienes me rodean.',
      'Cada paso lento es un paso que perdura.',
      'Merezco descansar sin culpa.',
      'Mi disciplina nace del amor, no del miedo.',
      'Lo que construyo tiene valor eterno.',
      'Soy el fundamento sobre el que florece lo mejor.',
    ],
    todayMessage: 'Hoy la energía fortalece lo que estás construyendo.',
  },
  5: {
    name: 'El Aventurero',
    essence: 'Libertad y cambio',
    symbol: '🦋',
    color: '#a855f7',
    colorDark: '#2d0a6a',
    meaning: 'Eres el viento que no se detiene. Un alma libre y curiosa que necesita la variedad para vivir plenamente. Tu misión es experimentar la vida en toda su riqueza y enseñar a otros que hay más formas de vivir de las que se imaginan.',
    purpose: 'Ser explorador de la experiencia humana y mensajero de la libertad.',
    strengths: ['Adaptabilidad', 'Curiosidad', 'Versatilidad', 'Energía', 'Apertura mental'],
    challenges: ['Impulsividad', 'Dificultad para comprometerse', 'Inconstancia'],
    affirmations: [
      'Abrazo el cambio como mi aliado más fiel.',
      'Mi libertad no me aleja — me acerca a lo real.',
      'Cada experiencia nueva me hace más yo.',
      'Confío en el proceso aunque no vea el destino.',
      'Mi curiosidad es un don que enriquece al mundo.',
      'Me permito cambiar de opinión — eso es sabiduría.',
      'Soy libre y también soy completa/o.',
    ],
    todayMessage: 'Hoy la energía te invita a abrirte a algo nuevo.',
  },
  6: {
    name: 'El Cuidador',
    essence: 'Amor y responsabilidad',
    symbol: '💚',
    color: '#00bcd4',
    colorDark: '#003f50',
    meaning: 'Eres el corazón del hogar. Das, cuidas, creas belleza y armonía donde pisas. Tu misión más profunda es aprender que cuidarte a ti misma/o es el acto más generoso que puedes hacer por quienes amas.',
    purpose: 'Crear espacios de amor incondicional donde todos puedan sanar y crecer.',
    strengths: ['Compasión', 'Responsabilidad', 'Amor incondicional', 'Sentido estético', 'Protección'],
    challenges: ['Tendencia a sacrificarse', 'Control disfrazado de ayuda', 'Perfeccionismo'],
    affirmations: [
      'Me cuido a mí misma/o primero para poder dar más.',
      'Mi amor es abundante y no necesita agotarme.',
      'Creo belleza simplemente siendo quien soy.',
      'Tengo derecho a recibir tanto como doy.',
      'Mi hogar interior es paz, y desde allí construyo.',
      'Cuidar no es controlar — es confiar y acompañar.',
      'Soy amor en forma humana.',
    ],
    todayMessage: 'Hoy la energía te pide que te des el mismo amor que das.',
  },
  7: {
    name: 'El Buscador',
    essence: 'Sabiduría e introspección',
    symbol: '🔮',
    color: '#9b7fda',
    colorDark: '#200a5a',
    meaning: 'Eres el más espiritual y misterioso de los números. Un buscador nato que pregunta lo que otros temen preguntar y ve lo que otros no pueden ver. Tu camino es hacia adentro — la verdad que buscas en el mundo siempre llevará a la verdad que hay en ti.',
    purpose: 'Profundizar en los misterios de la existencia y compartir tu sabiduría como faro para otros.',
    strengths: ['Inteligencia analítica', 'Intuición espiritual', 'Profundidad', 'Sabiduría', 'Investigación'],
    challenges: ['Aislamiento', 'Desconfianza', 'Dificultad para conectar emocionalmente'],
    affirmations: [
      'La soledad que busco es sagrada, no es vacío.',
      'Mis preguntas son tan valiosas como las respuestas.',
      'Confío en la sabiduría que viene de adentro.',
      'Me abro a la conexión sin perder mi profundidad.',
      'Lo que no veo todavía está por revelarse.',
      'Soy un canal de sabiduría para este mundo.',
      'Mi mente es un universo y lo exploro con amor.',
    ],
    todayMessage: 'Hoy la energía te invita a la reflexión profunda.',
  },
  8: {
    name: 'El Manifestador',
    essence: 'Poder y abundancia',
    symbol: '♾️',
    color: '#c9a227',
    colorDark: '#4a3000',
    meaning: 'Eres la energía del poder material y espiritual. Tienes la capacidad innata de transformar visiones en realidades concretas. Tu misión es aprender que el verdadero poder no viene de tener, sino de ser.',
    purpose: 'Manifestar abundancia en todos los niveles y usarla como herramienta de transformación.',
    strengths: ['Capacidad de manifestación', 'Liderazgo ejecutivo', 'Visión estratégica', 'Resiliencia', 'Ambición'],
    challenges: ['Materialismo', 'Controlismo', 'Dificultad para confiar'],
    affirmations: [
      'Soy un canal de abundancia en todas sus formas.',
      'El poder que tengo lo uso para elevar a los demás.',
      'Merezco el éxito que creo con mis propias manos.',
      'Confío en la abundancia del universo.',
      'Mi riqueza interior es la fuente de toda mi riqueza exterior.',
      'Construyo imperios con amor y propósito.',
      'El poder real nace de quien soy, no de lo que tengo.',
    ],
    todayMessage: 'Hoy la energía amplifica tu poder de manifestación.',
  },
  9: {
    name: 'El Sabio Compasivo',
    essence: 'Humanidad y finalización',
    symbol: '🌸',
    color: '#c45578',
    colorDark: '#5a0a1e',
    meaning: 'Eres el más completo de todos los números. Un alma antigua que lleva en sí la sabiduría de muchas experiencias. Tu misión es servir a la humanidad desde un lugar de compasión profunda, sabiendo soltar lo que ya no sirve.',
    purpose: 'Completar ciclos, servir con amor incondicional y elevar la conciencia colectiva.',
    strengths: ['Compasión universal', 'Sabiduría', 'Generosidad', 'Idealismo', 'Creatividad espiritual'],
    challenges: ['Dificultad para soltar', 'Sacrificio excesivo', 'Melancolía'],
    affirmations: [
      'Suelto lo que fue con gratitud y amor.',
      'Mi compasión comienza siempre por mí misma/o.',
      'Soy más que mis experiencias pasadas.',
      'Sirvo desde la abundancia, no desde el vacío.',
      'Cada final en mi vida es el inicio de algo más bello.',
      'Soy un canal de amor para la humanidad.',
      'Mi sabiduría es un regalo que comparto con gracia.',
    ],
    todayMessage: 'Hoy la energía pide que sueltes y confíes en el proceso.',
  },
  11: {
    name: 'El Iluminador',
    essence: 'Intuición e inspiración espiritual',
    symbol: '⚡',
    color: '#c8b0ff',
    colorDark: '#2a0860',
    isMaster: true,
    meaning: 'El 11 es un número maestro — una de las vibraciones más elevadas. Eres un canal intuitivo con una conexión directa a lo espiritual. Tu sensibilidad puede parecer una carga, pero es en realidad tu mayor don. Viniste a inspirar, a iluminar, a recordar que existe algo más grande.',
    purpose: 'Iluminar el camino espiritual de los demás siendo un ejemplo vivo de intuición vivida.',
    strengths: ['Intuición excepcional', 'Inspiración espiritual', 'Sensibilidad elevada', 'Visión', 'Carisma magnético'],
    challenges: ['Ansiedad', 'Hipersensibilidad', 'Desequilibrio entre el mundo espiritual y el físico'],
    affirmations: [
      'Mi sensibilidad es mi superpoder más sagrado.',
      'Confío en lo que percibo aunque no pueda explicarlo.',
      'Soy un canal de luz para este mundo.',
      'Me anclo en mi cuerpo mientras vuelo en mi espíritu.',
      'Mi visión llega antes que las palabras — y eso es suficiente.',
      'Soy llamada/o a iluminar, no a cargar con la oscuridad.',
      'Mi intuición es el idioma del universo dentro de mí.',
    ],
    todayMessage: 'Hoy tu intuición tiene mensajes importantes para ti.',
  },
  22: {
    name: 'El Constructor Maestro',
    essence: 'Manifestación a gran escala',
    symbol: '🏛️',
    color: '#e8c547',
    colorDark: '#3a2a00',
    isMaster: true,
    meaning: 'El 22 es el número maestro constructor. Tienes la capacidad única de tomar los sueños más grandes y convertirlos en realidades concretas — no solo para ti, sino para el beneficio de muchos. Es el número de quienes dejan legados que trascienden su propia vida.',
    purpose: 'Construir estructuras que sirvan a la humanidad: proyectos, sistemas, comunidades, legados.',
    strengths: ['Manifestación masiva', 'Visión práctica y espiritual', 'Liderazgo', 'Determinación', 'Servicio'],
    challenges: ['Presión por el potencial', 'Exceso de responsabilidad', 'Perfeccionismo paralizante'],
    affirmations: [
      'Construyo desde el amor, no desde el miedo al fracaso.',
      'Mi visión es grande porque mi alma lo es.',
      'Soy un puente entre el sueño y la realidad.',
      'Me permito construir de a poco lo que durará siempre.',
      'El legado que creo comienza con cómo trato a otros hoy.',
      'Soy suficientemente grande para el sueño que llevo.',
      'Mi potencial no es una carga — es una invitación.',
    ],
    todayMessage: 'Hoy la energía maestra sostiene tus construcciones más grandes.',
  },
}

// Short home-card messages by daily number
export const DAILY_HOME_PHRASES = {
  1:  'Inicia. Sé la primera chispa.',
  2:  'Escucha. Crea puentes con amor.',
  3:  'Expresa. Tu alegría es sagrada.',
  4:  'Construye. Un paso a la vez.',
  5:  'Muévete. Algo nuevo te llama.',
  6:  'Cuida. Primero a ti misma/o.',
  7:  'Reflexiona. Las respuestas están adentro.',
  8:  'Manifiesta. Hoy el universo escucha.',
  9:  'Suelta. Confía en el proceso.',
  11: 'Intuye. Eres canal de luz.',
  22: 'Construye grande. Tu visión importa.',
}
