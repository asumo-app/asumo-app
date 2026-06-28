// ============================================================
//  ASUMO — Zodiac Deep Data
//  Elemento · Planeta · Cristales · Colores · Autoconocimiento
// ============================================================

const DAYS = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo']

export const ZODIAC_DEEP = {

  // ═══════════════════════════════ ARIES ════════════════════════════════
  aries: {
    element: {
      icon: '🔥', name: 'Fuego',
      essence: 'El fuego en Aries es el primer chispazo de la creación: puro, valiente e impaciente por existir. No es el fuego que calienta lentamente — es la llama que estalla de golpe y lo ilumina todo en un instante.',
      daily: ['Inicia tu día con movimiento físico antes de tocar el teléfono — tu fuego necesita un canal.', 'Cuando sientas bloqueo, escribe sin parar durante 5 minutos sin filtro.', 'Actúa primero en la cosa que más te da miedo hacer hoy.'],
      personality: 'Tu fuego te hace directa/o, apasionada/o e incapaz de fingir calma cuando algo te importa de verdad. Te cuesta esperar porque tu energía siempre está un paso adelante de la realidad.',
      exercise: { title: 'Ritual del Fuego Aries', steps: ['Enciende una vela roja (o naranja) en la mañana.','Escribe en un papel: "Hoy actúo sobre [algo concreto]."','Mantén la vela encendida mientras tomas tu primer café o agua. Deja que el fuego te recuerde tu intención.'] },
    },
    planet: {
      what: 'Marte es el guerrero del sistema solar. Es el planeta de la acción, el deseo, la fuerza física y la voluntad de avanzar sin pedir permiso.',
      whyRules: 'Aries es el primer signo, el que inicia. Marte es el planeta que actúa sin dudar. Ambos comparten la misma esencia: directa, valiente, sin rodeos ni reflexiones largas.',
      energyGift: 'Marte te da una reserva de energía casi inagotable cuando estás motivada/o, la capacidad de tomar decisiones rápidas y el coraje de empezar lo que otros solo imaginan.',
      retrograde: 'Cuando Marte retrograda (cada ~2 años), puedes sentir tu impulso frenado o convertido en frustración sin salida. Es momento de revisar acciones pasadas y soltar lo que actúas desde el ego en lugar del alma.',
    },
    crystals: [
      { name:'Cornalina', emoji:'🔴', color:'#e25822', properties:'Activa el coraje, reduce el miedo a actuar y energiza el cuerpo.', howToHold:'Sostenla en la mano derecha al meditar o antes de una decisión importante.', bodyPlacement:'Sobre el chakra raíz (base de la columna) para anclar tu energía de fuego.', moonCleansing:'Déjala bajo la luna llena una noche entera, idealmente sobre tierra o hierba.', bestFor:['Cuando necesitas valentía para actuar','Antes de conversaciones difíciles o confrontaciones'], affirmation:'Esta piedra activa mi valentía innata y me ancla en mi poder de Aries.' },
      { name:'Jaspe Rojo', emoji:'🟥', color:'#c0392b', properties:'Estabiliza la energía impulsiva, aporta resistencia y ayuda a terminar lo que se empieza.', howToHold:'Llévalo en el bolsillo o en la muñeca como accesorio durante el día.', bodyPlacement:'Sobre el abdomen, zona de voluntad y acción.', moonCleansing:'Limpiarlo con agua con sal marina durante 10 minutos, luego dejar secar al sol.', bestFor:['Para canalizar la energía sin quemarla','Para completar proyectos que empezaste con entusiasmo'], affirmation:'Mi fuego tiene dirección. Mi energía fluye con propósito claro y firme.' },
    ],
    colors: {
      sacred: { name:'Rojo carmesí', hex:'#b01e2e', why:'El rojo carmesí es la frecuencia de Marte — acción, deseo y voluntad. Lleva en sí la sangre del guerrero que va hacia lo que quiere.', clothing:'Úsalo cuando necesitas confianza para liderar, tomar una decisión difícil o hacer valer tu lugar.', decor:'Un objeto rojo en tu espacio de trabajo activa tu energía productiva sin abrumarte.' },
      weekly: [
        { day:'Lunes', color:'Naranja', hex:'#e8834a', intention:'Arranca la semana con toda tu energía. Activa tu coraje para el primer paso.' },
        { day:'Martes', color:'Rojo', hex:'#c44569', intention:'Martes es el día de Marte, tu planeta. Vístete de tu color más poderoso.' },
        { day:'Miércoles', color:'Amarillo vivo', hex:'#f0c040', intention:'Conecta tu fuego con la comunicación. Di lo que piensas con claridad.' },
        { day:'Jueves', color:'Dorado', hex:'#c9a227', intention:'Expande tu visión. Piensa en grande sin limitarte.' },
        { day:'Viernes', color:'Rosa coral', hex:'#e8836a', intention:'Tu fuego también puede amar con suavidad. Conecta con los tuyos.' },
        { day:'Sábado', color:'Carmesí oscuro', hex:'#7a1a1a', intention:'Descansa con profundidad. El fuego también necesita recargarse.' },
        { day:'Domingo', color:'Blanco brillante', hex:'#f0f4ff', intention:'Limpia tu energía. Prepara la llama para la semana que viene.' },
      ],
    },
    selfKnowledge: [
      { q:'¿En qué momento de tu vida sentiste que tu valentía te llevó más lejos de lo que esperabas?', context:'Recuerda ese momento con detalle. ¿Qué sentiste justo antes de actuar?' },
      { q:'¿Hay proyectos o sueños que empezaste con mucho fuego pero nunca terminaste? ¿Qué te detuvo?', context:'No te juzgues. Solo obsérvalo con curiosidad.' },
      { q:'¿Cómo manejas la espera? ¿Qué pasa en tu interior cuando las cosas no ocurren a tu ritmo?', context:'El Aries profundo aprende que la impaciencia es información, no una orden.' },
      { q:'¿Cuándo fue la última vez que actuaste por instinto puro y te fue bien? ¿Y cuándo no?', context:'Busca el patrón entre los dos. Ahí está tu sabiduría.' },
      { q:'¿Qué parte de ti todavía tiene miedo de ser tan directa/o y apasionada/o como realmente eres?', context:'El miedo a tu propia intensidad es el reto más profundo de Aries.' },
    ],
  },

  // ═══════════════════════════════ TAURO ════════════════════════════════
  tauro: {
    element: {
      icon: '🌿', name: 'Tierra',
      essence: 'La tierra en Tauro es la más fértil y paciente. No crece a tropiezos — construye despacio, con raíces profundas que nada puede desarraigar. Es el suelo sobre el que florecen los imperios.',
      daily: ['Toca algo con tus manos cada día: tierra, arcilla, plantas, masa. Tu elemento te nutre físicamente.', 'Come con conciencia plena al menos una vez al día — saborear es un acto sagrado de Tauro.', 'Crea un rincón en tu hogar que sea solo para la belleza: flores, velas, texturas que amas.'],
      personality: 'Tu tierra te da una estabilidad que los demás envidan y buscan. Eres el ancla de todos. Pero también puede volverse terquedad cuando el cambio toca tu puerta.',
      exercise: { title: 'Conexión con la Tierra Tauro', steps: ['Sal descalza/o y pisa tierra real durante 5 minutos.','Siente el peso de tu cuerpo sobre el suelo. Respira lento.','Escribe tres cosas que estás construyendo con paciencia en tu vida.'] },
    },
    planet: {
      what: 'Venus es la diosa del amor, la belleza, el placer y el valor material. Rige todo lo que hace que valga la pena vivir: el arte, la sensualidad, las relaciones y el dinero.',
      whyRules: 'Tauro busca lo bello, lo confiable y lo duradero. Venus le da la capacidad de encontrar placer en lo cotidiano y de construir relaciones y riqueza con paciencia.',
      energyGift: 'Venus te da un gusto estético natural, la capacidad de atraer lo que deseas sin forzarlo y una sensualidad que transforma lo ordinario en sagrado.',
      retrograde: 'Cuando Venus retrograda (~cada 18 meses), las relaciones y el dinero entran en revisión. Pueden volver personas del pasado. Es tiempo de reevaluar qué valoras de verdad, no de tomar decisiones nuevas.',
    },
    crystals: [
      { name:'Cuarzo Rosa', emoji:'🌸', color:'#e8b4c8', properties:'Activa el amor propio, atrae relaciones sanas y abre el corazón con suavidad.', howToHold:'Sostenlo sobre el pecho (corazón) en momentos de estrés emocional.', bodyPlacement:'Sobre el chakra corazón para recibir y dar amor en equilibrio.', moonCleansing:'Limpiarlo bajo la luna llena, dejándolo toda la noche afuera o en una ventana.', bestFor:['Cuando necesitas darte amor a ti misma/o','Para atraer relaciones basadas en ternura y respeto'], affirmation:'Me doy el amor que le daría a quien más quiero. Merezco belleza y ternura.' },
      { name:'Malaquita', emoji:'💚', color:'#1a7a3c', properties:'Atrae abundancia, libera patrones de escasez y protege tu energía.', howToHold:'Sostenla en la mano izquierda (receptiva) en meditaciones de abundancia.', bodyPlacement:'Sobre el plexo solar para transformar la energía del miedo a la falta.', moonCleansing:'NO uses agua para limpiarla. Usa humo de sahumerio o luz solar por 1 hora.', bestFor:['Para trabajo con la abundancia y el dinero','Cuando sientes que no hay suficiente de algo'], affirmation:'La abundancia me pertenece. Estoy abierta/o a recibir todo lo que merezco.' },
    ],
    colors: {
      sacred: { name:'Verde esmeralda', hex:'#1a7a3c', why:'El verde esmeralda es Venus en la tierra: vida que crece, abundancia natural, la prueba de que la paciencia da frutos.', clothing:'Úsalo cuando necesitas sentirte enraizada/o, abundante o en proceso de crear algo importante.', decor:'Plantas reales, cojines verdes o una pared de tono tierra llenan tu hogar de energía Venus.' },
      weekly: [
        { day:'Lunes', color:'Crema', hex:'#f5f0dc', intention:'Comienza la semana con calma y presencia. La tierra no corre.' },
        { day:'Martes', color:'Verde musgo', hex:'#5a7a3a', intention:'Trabaja con paciencia lo que construyes a largo plazo.' },
        { day:'Miércoles', color:'Amarillo mostaza', hex:'#c9a227', intention:'Comunica lo que valoras. Tu voz tiene peso y belleza.' },
        { day:'Jueves', color:'Dorado rojizo', hex:'#c9762a', intention:'Expande tu visión de la abundancia. Piensa sin límites.' },
        { day:'Viernes', color:'Rosa pálido', hex:'#e8b4c8', intention:'Viernes de Venus, tu planeta. Date un placer sensorial hoy.' },
        { day:'Sábado', color:'Marrón tierra', hex:'#8b5a2b', intention:'Conéctate con tu cuerpo. Descansa o crea algo con las manos.' },
        { day:'Domingo', color:'Blanco marfil', hex:'#f0ece0', intention:'Limpia tu espacio y tu mente. Prepara terreno fértil.' },
      ],
    },
    selfKnowledge: [
      { q:'¿Qué significa para ti la estabilidad? ¿Es algo que tienes o algo que buscas constantemente?', context:'Tauro teme perder lo que construyó. ¿Ese miedo te limita o te impulsa?' },
      { q:'¿En qué áreas de tu vida eres más terco/a? ¿Esa terquedad te protege o te encierra?', context:'La resistencia al cambio es la sombra más honesta de Tauro.' },
      { q:'¿Qué placeres cotidianos te hacen sentir plenamente viva/o? ¿Con qué frecuencia te los das?', context:'El placer consciente es espiritual para Tauro, no un capricho.' },
      { q:'¿Qué valor o posesión perderías sin que el mundo se acabara? ¿Qué te dice eso?', context:'Aquí aparece qué tan apegada/o estás a lo material.' },
      { q:'¿Hay algo que sabes que necesitas dejar ir pero sigues sosteniendo porque lo conoces?', context:'La fidelidad a lo familiar es bella — y también puede ser una prisión.' },
    ],
  },

  // ═══════════════════════════════ GÉMINIS ══════════════════════════════
  geminis: {
    element: {
      icon: '💨', name: 'Aire',
      essence: 'El aire en Géminis es el más inquieto y curioso: cambia de dirección en un instante, transporta ideas de un lugar a otro y nunca permanece quieto. Es el viento que conecta mundos.',
      daily: ['Escribe o dibuja ideas libremente cada mañana durante 10 minutos — el aire necesita moverse.', 'Cambia de ambiente cuando te estanques mentalmente: el movimiento es tu medicina.', 'Lee, escucha o aprende algo nuevo cada día aunque sea por 15 minutos.'],
      personality: 'Tu aire te hace brillante para la comunicación, la adaptabilidad y el pensamiento rápido. El reto es que tu mente puede volar tan lejos que se desconecta de lo que siente el cuerpo.',
      exercise: { title: 'Meditación del Viento Géminis', steps: ['Siéntate afuera o abre una ventana. Siente el aire en tu piel.','Observa tus pensamientos como nubes que pasan — sin atraparlos.','Escribe tres ideas que "volaron" por tu mente esta semana. ¿Alguna merece aterrizar?'] },
    },
    planet: {
      what: 'Mercurio es el mensajero de los dioses — rige la mente, la comunicación, los viajes cortos, el lenguaje y el pensamiento lógico.',
      whyRules: 'Géminis vive en la mente y en el intercambio de ideas. Mercurio le da la velocidad y agilidad para conectar conceptos y personas que normalmente no se cruzan.',
      energyGift: 'Mercurio te da una mente que nunca se aburre, la capacidad de ver múltiples perspectivas y el don de explicar cosas complejas de forma sencilla y brillante.',
      retrograde: 'Mercurio retrograda 3-4 veces por año. Para Géminis, esto puede traer caos en comunicaciones, tecnología o planes. Es tiempo de revisar, no firmar ni iniciar cosas nuevas.',
    },
    crystals: [
      { name:'Citrino', emoji:'🟡', color:'#f0c040', properties:'Clarifica la mente, ahuyenta la indecisión y aporta optimismo y foco.', howToHold:'Sostenlo en la mano mientras tomas decisiones o trabajas con ideas.', bodyPlacement:'Sobre el plexo solar para conectar mente y acción.', moonCleansing:'No necesita limpieza frecuente — se autolimpia. Puedes dejarlo al sol brevemente.', bestFor:['Para decidir entre varias opciones','Cuando la mente está en mil lugares y necesita enfocarse'], affirmation:'Mi mente es clara, brillante y enfocada. Elijo con sabiduría.' },
      { name:'Celestita', emoji:'🔵', color:'#90bcd4', properties:'Calma la mente hiperactiva, facilita la comunicación auténtica y conecta con la intuición.', howToHold:'Sostenla entre ambas manos en momentos de ansiedad mental.', bodyPlacement:'Sobre la garganta para expresarte con claridad y autenticidad.', moonCleansing:'Déjala bajo la luna llena o nueva — es muy sensible a la luz lunar.', bestFor:['Cuando tu mente no para y necesitas calmarla','Para conversaciones importantes que requieren verdad'], affirmation:'Mi mente se calma y mi verdad fluye con claridad y gracia.' },
    ],
    colors: {
      sacred: { name:'Amarillo brillante', hex:'#f0c040', why:'El amarillo es Mercurio puro — luz intelectual, claridad mental, la energía de quien conecta ideas y personas.', clothing:'Úsalo cuando necesitas brillar en presentaciones, conversaciones importantes o cuando necesitas claridad mental.', decor:'Elementos amarillos en tu escritorio o sala activan la creatividad y la fluidez del pensamiento.' },
      weekly: [
        { day:'Lunes', color:'Turquesa claro', hex:'#40bcd4', intention:'Comienza la semana con mente abierta. Deja entrar ideas nuevas.' },
        { day:'Martes', color:'Amarillo limón', hex:'#f0e040', intention:'Activa tu comunicación. Di lo que piensas con claridad hoy.' },
        { day:'Miércoles', color:'Amarillo dorado', hex:'#f0c040', intention:'Miércoles es el día de Mercurio, tu planeta. Aprende algo nuevo.' },
        { day:'Jueves', color:'Celeste', hex:'#87ceeb', intention:'Expande tu mente más allá de lo conocido. Lee, explora, curiosea.' },
        { day:'Viernes', color:'Verde menta', hex:'#98d8c8', intention:'Conecta con quienes te nutren intelectual y emocionalmente.' },
        { day:'Sábado', color:'Lavanda', hex:'#c8a8d8', intention:'Calma el ruido mental. El descanso también es información.' },
        { day:'Domingo', color:'Blanco', hex:'#f0f4ff', intention:'Limpia ideas viejas. Prepara espacio mental para la semana.' },
      ],
    },
    selfKnowledge: [
      { q:'¿Cuántas conversaciones simultáneas llevas en tu cabeza en este momento? ¿Cuál merece más atención?', context:'La mente Géminis es un tablero de ajedrez. ¿Cuántas piezas mueves a la vez?' },
      { q:'¿Hay algo importante que sabes pero que te cuesta decir en voz alta? ¿Por qué?', context:'La dualidad Géminis a veces conoce la verdad antes de estar lista para vivirla.' },
      { q:'¿Con cuál de tus "versiones" te llevas mejor? ¿La pública o la privada?', context:'Los Géminis genuinos saben que tienen más de dos facetas. Todas son reales.' },
      { q:'¿En qué situación empezaste algo con entusiasmo y luego te aburriste? ¿Qué te dice eso de ti?', context:'El aburrimiento en Géminis no es flojera — es información sobre si algo te nutre de verdad.' },
      { q:'¿Cuándo fue la última vez que te quedaste callada/o cuando tenías algo importante que decir?', context:'Tu voz es tu poder más genuino. ¿Cuándo y por qué la silencias?' },
    ],
  },

  // ════════════════════════════════ CÁNCER ══════════════════════════════
  cancer: {
    element: {
      icon: '💧', name: 'Agua',
      essence: 'El agua en Cáncer es la más íntima y protectora — es el mar que guarda en su profundidad memorias, emociones y secretos que nadie más conoce. Fluye con la luna y siente todo sin filtros.',
      daily: ['Cuida tu entorno hogareño con intención — tu espacio es una extensión de tu alma.', 'Date permiso de sentir sin justificar tus emociones a nadie.', 'Conecta con el agua físicamente: un baño largo, el mar, o simplemente beber agua con consciencia.'],
      personality: 'Tu agua te hace profundamente empática/o, intuitiva/o y capaz de sentir lo que otros no dicen. El reto es que tu mar interior puede volverse tormenta cuando no tienes un refugio seguro.',
      exercise: { title: 'Baño de Purificación Cáncer', steps: ['Llena la tina o dúchate con agua tibia. Agrega sal marina si puedes.','Visualiza que el agua lleva consigo todo lo que no es tuyo — emociones ajenas, preocupaciones acumuladas.','Al salir, date cuenta de una cosa que sientes que ES tuya y merece cuidado hoy.'] },
    },
    planet: {
      what: 'La Luna es el astro de las emociones, la memoria, los ciclos, el inconsciente y el vínculo con la madre y el hogar. Es el espejo del alma.',
      whyRules: 'Cáncer vive desde las emociones y los lazos profundos. La Luna, que cambia de fase pero nunca deja de estar, es la perfecta regente de un signo que necesita sentirse en casa.',
      energyGift: 'La Luna te da una intuición extraordinaria, la capacidad de nutrir a otros con profundidad y la habilidad de sentir los ciclos de tu vida como si pudieras leer el tiempo.',
      retrograde: 'La Luna no retrograda, pero sus fases afectan a Cáncer intensamente. La luna nueva es tu momento de sembrar y la luna llena de soltar lo que ya cumplió su ciclo.',
    },
    crystals: [
      { name:'Piedra de Luna', emoji:'🌙', color:'#d0e0f0', properties:'Conecta con la intuición, equilibra las emociones y amplifica la energía lunar de Cáncer.', howToHold:'Sostenla cuando necesitas calma o intuición. Excelente en meditaciones nocturnas.', bodyPlacement:'Sobre el corazón o la frente para ampliar la percepción emocional e intuitiva.', moonCleansing:'Esta piedra se potencia con la luna llena. Déjala afuera toda la noche.', bestFor:['En días de luna llena para amplificar tu intuición','Cuando estás emocionalmente desbordada/o y necesitas calma'], affirmation:'Confío en lo que siento. Mis emociones son mi guía, no mi prisión.' },
      { name:'Selenita', emoji:'⬜', color:'#e8f0f8', properties:'Purifica la energía del ambiente, calma el sistema nervioso y limpia emociones acumuladas.', howToHold:'No la toques con agua — se disuelve. Sostenla suavemente o colócala en tu altar.', bodyPlacement:'Sobre la coronilla o junto a tu cama para un sueño más profundo y sereno.', moonCleansing:'La selenita se limpia a sí misma. Solo déjala bajo la luna si quieres potenciarla.', bestFor:['Para limpiar espacios de energías densas','Antes de dormir para calmar la mente emocional'], affirmation:'Mi espacio y mi mente están limpios, calmados y seguros.' },
    ],
    colors: {
      sacred: { name:'Plateado perla', hex:'#c8d8f0', why:'El plateado es el color de la Luna — intuición, maternidad, emociones profundas y la belleza de lo que brilla sin gritar.', clothing:'Úsalo cuando necesitas conectar con tu intuición o cuando quieres sentirte envuelta/o en calma y suavidad.', decor:'Telas plateadas, espejos y elementos blancos nacarados en tu hogar crean un refugio de paz lunar.' },
      weekly: [
        { day:'Lunes', color:'Plateado', hex:'#c8d8f0', intention:'Lunes de la Luna. Conecta con lo que sientes sin juzgarlo.' },
        { day:'Martes', color:'Blanco perla', hex:'#f0f4ff', intention:'Protege tu energía. No todo lo que sientes es tuyo.' },
        { day:'Miércoles', color:'Azul pálido', hex:'#87ceeb', intention:'Exprésale algo que sientes a alguien que importa.' },
        { day:'Jueves', color:'Verde agua', hex:'#90d8c0', intention:'Nutre tu cuerpo con algo que te haga bien profundamente.' },
        { day:'Viernes', color:'Rosa pálido', hex:'#f0c8d8', intention:'Abre el corazón. El amor también es un tipo de hogar.' },
        { day:'Sábado', color:'Gris niebla', hex:'#a8b8c8', intention:'Descansa. Tu cuerpo emocional necesita silencio.' },
        { day:'Domingo', color:'Azul luna', hex:'#708090', intention:'Prepara un espacio interior de calma para la semana.' },
      ],
    },
    selfKnowledge: [
      { q:'¿Qué significa "sentirte en casa"? ¿Hay personas, lugares o situaciones donde sientes eso?', context:'Para Cáncer, el hogar es un estado interior antes que un lugar físico.' },
      { q:'¿De quién aprendiste a cuidar a los demás? ¿Ese aprendizaje te nutre o te agota?', context:'El cuidado heredado puede ser un don o un peso. ¿Cuál es tuyo?' },
      { q:'¿Cuándo fue la última vez que alguien te cuidó a ti? ¿Cómo te sentiste recibiéndolo?', context:'Cáncer cuida con facilidad pero a veces olvida que también necesita ser cuidada/o.' },
      { q:'¿Hay emociones del pasado que todavía cargas como si fueran actuales?', context:'La memoria de Cáncer es profunda. No siempre distingue entre el recuerdo y el presente.' },
      { q:'¿Qué parte de ti proteges tan fuerte que ni tú misma/o te das permiso de verla?', context:'La concha del cangrejo protege. Pero también puede encerrar.' },
    ],
  },

  // ════════════════════════════════ LEO ═════════════════════════════════
  leo: {
    element: {
      icon: '🔥', name: 'Fuego',
      essence: 'El fuego en Leo es el más radiante y generoso de todos — es el sol que no puede evitar brillar. No pide atención, simplemente irradia vida, calidez y luz sobre todo lo que toca.',
      daily: ['Expresa algo creativamente cada día aunque sea pequeño — tu fuego necesita crear.', 'Celebra un logro tuyo, por mínimo que parezca. El reconocimiento propio alimenta la llama.', 'Da reconocimiento genuino a alguien hoy — los Leo que brillan también iluminan a otros.'],
      personality: 'Tu fuego te hace magnética/o, generosa/o y naturalmente líder. El reto es que cuando no te sientes vista/o o valorada/o, la llama puede convertirse en drama o en ego herido.',
      exercise: { title: 'Ritual Solar de Leo', steps: ['A la hora del mediodía (o cuando salga el sol), párate ante una ventana o afuera.','Recibe el sol en tu cara durante un minuto con los ojos cerrados.','Di en voz alta o mentalmente: "Soy luz. Merezco brillar. Lo que doy vuelve a mí multiplicado."'] },
    },
    planet: {
      what: 'El Sol no es un planeta en sentido estricto — es la estrella de nuestro sistema, la fuente de toda la vida, la luz sin la cual nada puede existir.',
      whyRules: 'Leo es el corazón del zodíaco — el signo que irradia vida, creatividad y calidez. El Sol es exactamente eso: el centro, la fuente, la identidad más pura.',
      energyGift: 'El Sol te da una presencia natural que hace que las personas te noten, la capacidad de dar calor emocional genuino y el don de crear desde el corazón con entusiasmo contagioso.',
      retrograde: 'El Sol no retrograda. Sin embargo, cuando el Sol (que rige Leo) está en tensión con otros planetas, puedes sentir que tu luz se opaca o que tu ego se activa para compensar inseguridades profundas.',
    },
    crystals: [
      { name:'Citrino dorado', emoji:'✨', color:'#f0c040', properties:'Amplifica la confianza, atrae el éxito y conecta con la energía solar de Leo.', howToHold:'Sostenlo en la mano derecha al meditar sobre proyectos creativos o metas importantes.', bodyPlacement:'Sobre el plexo solar, el centro del poder personal y la confianza.', moonCleansing:'Limpiarlo brevemente bajo el sol de la mañana (no sol directo intenso por largo tiempo).', bestFor:['Cuando necesitas confianza y reconocimiento','Para manifestar proyectos creativos o de liderazgo'], affirmation:'Mi brillo es un regalo para el mundo. Merezco brillar sin disculparme.' },
      { name:'Ámbar', emoji:'🟠', color:'#c9762a', properties:'Aporta calidez, alegría y reconexión con el niño/a interior de Leo.', howToHold:'Sostenlo cuando necesitas alegría genuina o cuando sientes que tu fuego está bajo.', bodyPlacement:'Sobre el corazón para reconectar con la generosidad y el amor propios de Leo.', moonCleansing:'Limpiarlo con luz solar suave o humo de sahumerio dulce como canela.', bestFor:['Cuando te sientes apagada/o o no reconocida/o','Para reconectar con la alegría y el juego del niño/a interior'], affirmation:'Mi corazón es cálido y mi alegría es contagiosa. Soy suficientemente brillante.' },
    ],
    colors: {
      sacred: { name:'Dorado solar', hex:'#c9a227', why:'El dorado es el Sol mismo — la frecuencia del éxito, la realeza, la abundancia y la luz que no puede ocultarse.', clothing:'Úsalo en días importantes, presentaciones, fechas en que quieres ser recordada/o. Leo con dorado es imparable.', decor:'Un detalle dorado en tu espacio (un marco, una vela, un espejo) activa la energía de reconocimiento y abundancia.' },
      weekly: [
        { day:'Lunes', color:'Naranja brillante', hex:'#e8834a', intention:'Enciende la semana con entusiasmo. Haz que el lunes valga.' },
        { day:'Martes', color:'Dorado', hex:'#c9a227', intention:'Reconócete a ti misma/o en algo. No esperes validación externa.' },
        { day:'Miércoles', color:'Amarillo solar', hex:'#f0c040', intention:'Comunica lo que creas con orgullo. Tu voz merece ser escuchada.' },
        { day:'Jueves', color:'Naranja dorado', hex:'#e8a030', intention:'Expande tu visión de lo que mereces. Piensa como el sol.' },
        { day:'Viernes', color:'Rosa dorado', hex:'#e8b870', intention:'Celebra la semana. Date un placer que merezca ser celebrado.' },
        { day:'Sábado', color:'Carmesí cálido', hex:'#c44569', intention:'Crea algo. Leo necesita expresarse al menos una vez por semana.' },
        { day:'Domingo', color:'Crema dorado', hex:'#f0e4c0', intention:'Recárgarte de sol interior. Prepárate para brillar la semana siguiente.' },
      ],
    },
    selfKnowledge: [
      { q:'¿Cuándo sientes que realmente brillas? ¿Qué condiciones necesitas para sentirte en tu elemento?', context:'Leo no siempre sabe cuándo su luz es mayor — busca esos momentos con honestidad.' },
      { q:'¿Qué tan seguido buscas validación externa? ¿Qué pasa dentro de ti cuando no llega?', context:'La diferencia entre el ego de Leo y su corazón está en de dónde viene la confianza.' },
      { q:'¿Hay algo que hayas creado o logrado que nunca te has dado el mérito de celebrar plenamente?', context:'Leo da reconocimiento fácilmente a otros. ¿Cuándo fue la última vez que te lo diste a ti?' },
      { q:'¿En qué área de tu vida sientes que tu luz está apagada o frenada? ¿Por qué crees que es?', context:'El fuego de Leo puede apagarse. Pero siempre tiene las brasas para volver.' },
      { q:'¿Qué significaría para ti liderar desde el corazón en lugar de desde el escenario?', context:'El Leo profundo descubre que el liderazgo más poderoso no necesita audiencia.' },
    ],
  },

  // ═══════════════════════════════ VIRGO ════════════════════════════════
  virgo: {
    element: {
      icon: '🌿', name: 'Tierra',
      essence: 'La tierra en Virgo es la más analítica y refinada — es el campo que se prepara con cuidado, que sabe exactamente qué semilla va en qué lugar. Es el arte de la perfección aplicada a lo cotidiano.',
      daily: ['Crea una pequeña rutina de orden en tu espacio cada mañana — el orden externo calma tu tierra.', 'Practica la imperfección intencional: deja algo "lo suficientemente bueno" hoy.', 'Reconoce una tarea que completaste bien y deja de mejorarla por hoy.'],
      personality: 'Tu tierra te hace precisa/o, servicial y con una capacidad de análisis que pocas personas tienen. El reto es que tu estándar puede ser tan alto que nadie — incluida/o tú — puede cumplirlo.',
      exercise: { title: 'Ritual de Gratitud Virgo', steps: ['Al final del día, escribe 3 cosas pequeñas que hiciste bien hoy (no las perfectas — las que salieron suficientemente bien).','Lee tu lista en voz alta.','Agrega al final: "Hoy fue suficiente. Yo soy suficiente."'] },
    },
    planet: {
      what: 'Mercurio en su faceta de Virgo es el analista, el que clasifica, mejora y perfecciona. No es el Mercurio veloz de Géminis — es el Mercurio meticuloso que cuida cada detalle.',
      whyRules: 'Virgo vive en la búsqueda del orden perfecto dentro del caos. Mercurio le da las herramientas para analizar, mejorar y comunicar con precisión lo que observa.',
      energyGift: 'Mercurio te da una mente analítica excepcional, la capacidad de ver lo que nadie más nota y el don de mejorar sistemas, procesos y personas con una gentileza que pocos tienen.',
      retrograde: 'Mercurio retrógrado puede ser especialmente frustrante para Virgo porque afecta la comunicación y los detalles — tu zona de control. Es tiempo de revisar lo que no estás diciendo directamente.',
    },
    crystals: [
      { name:'Jade', emoji:'🟢', color:'#1a7a3c', properties:'Armoniza la energía excesivamente crítica, atrae la prosperidad y ayuda a confiar en el proceso.', howToHold:'Sostenlo cuando sientes que la mente analítica te está abrumando.', bodyPlacement:'Sobre el corazón para suavizar el juicio propio y ajeno.', moonCleansing:'Limpiarlo bajo la luna llena o con agua fresca corriente.', bestFor:['Cuando tu crítica interna está muy activa','Para confiar más en el proceso sin necesitar controlar cada paso'], affirmation:'Confío en el proceso. No necesito controlarlo todo para que salga bien.' },
      { name:'Fluorita', emoji:'🟣', color:'#9b7fda', properties:'Organiza la mente, reduce la ansiedad por los detalles y aporta claridad mental.', howToHold:'Sostenla en las dos manos cuando sientes que tienes demasiado en la mente.', bodyPlacement:'Sobre la frente (tercer ojo) para ordenar el caos mental.', moonCleansing:'Bajo la luna llena o con agua fría. Evita el sol directo prolongado.', bestFor:['Para proyectos que requieren orden y foco mental','Cuando estás en un bucle de análisis y no puedes decidir'], affirmation:'Mi mente es ordenada y clara. Confío en mi capacidad de discernir.' },
    ],
    colors: {
      sacred: { name:'Verde tierra', hex:'#5a7a3a', why:'El verde tierra de Virgo es la perfección de la naturaleza — el color que demuestra que el orden sin artificios es posible y hermoso.', clothing:'Úsalo cuando quieres sentirte enraizada/o, profesional y confiable. Es tu color de trabajo con propósito.', decor:'Plantas naturales, fibras de lino y madera en tu espacio crean el ambiente donde Virgo prospera.' },
      weekly: [
        { day:'Lunes', color:'Verde sage', hex:'#8ab880', intention:'Empieza la semana con una lista priorizada. Lo ordenado calma tu tierra.' },
        { day:'Martes', color:'Gris pizarra', hex:'#708090', intention:'Trabaja en algo que requiere atención al detalle. Hoy eres imparable.' },
        { day:'Miércoles', color:'Verde claro', hex:'#a8d8a0', intention:'Comunica con precisión algo que llevas tiempo queriendo decir.' },
        { day:'Jueves', color:'Ocre', hex:'#c9a050', intention:'Mira el panorama más grande. No todo necesita perfección hoy.' },
        { day:'Viernes', color:'Rosa nude', hex:'#e0c8b8', intention:'Date un placer sin analizar si lo mereces. Solo disfruta.' },
        { day:'Sábado', color:'Tierra marrón', hex:'#8b5a3a', intention:'Organiza un espacio de tu casa. La limpieza física es meditación para Virgo.' },
        { day:'Domingo', color:'Blanco', hex:'#f0f4f0', intention:'Mente en blanco. No planifiques todavía. Solo descansa.' },
      ],
    },
    selfKnowledge: [
      { q:'¿A quién le exiges más perfección: a ti misma/o o a los demás? ¿Qué te dice eso?', context:'La crítica de Virgo casi siempre empieza adentro antes de salir.' },
      { q:'¿Hay algo que llevas tiempo queriendo hacer pero no empiezas porque "no es el momento perfecto"?', context:'La espera de Virgo a veces es sabiduría. Y a veces es parálisis disfrazada de prudencia.' },
      { q:'¿Cuándo fue la última vez que te dijiste "buen trabajo" sin agregar un "pero"?', context:'El reconocimiento sin condiciones es el antídoto de la autoexigencia de Virgo.' },
      { q:'¿Qué parte de tu vida tienes más ordenada en el exterior pero más caótica en el interior?', context:'Virgo organiza afuera lo que no puede controlar adentro.' },
      { q:'¿Qué servicio o ayuda das a otros que jamás te pides a ti misma/o?', context:'El amor de Virgo por los demás a veces es más generoso que el amor por sí misma/o.' },
    ],
  },

  // ═══════════════════════════════ LIBRA ════════════════════════════════
  libra: {
    element: {
      icon: '💨', name: 'Aire',
      essence: 'El aire en Libra es el más armonioso — es la brisa que busca equilibrio, que no empuja demasiado en ninguna dirección. Es el viento que crea belleza cuando pasa por las cuerdas.',
      daily: ['Crea algo bello en tu entorno hoy aunque sea pequeño — flores, una mesa ordenada, una playlist.', 'Cuando sientas la indecisión, pregúntate: "¿Qué quiero yo, independientemente de lo que quieren los demás?"', 'Conecta con una persona que te nutra intelectual y emocionalmente hoy.'],
      personality: 'Tu aire te da encanto natural, diplomacia y la capacidad de ver todas las perspectivas al mismo tiempo. El reto es que ver todos los lados puede paralizarte a la hora de elegir uno.',
      exercise: { title: 'Ritual de Equilibrio Libra', steps: ['Toma una hoja. Dibuja una balanza en el centro.','En un lado escribe lo que das en tus relaciones. En el otro, lo que recibes.','Observa sin juicio: ¿están equilibradas? ¿Qué quieres ajustar?'] },
    },
    planet: {
      what: 'Venus en Libra es la Venus de las relaciones, la belleza, el arte y la justicia. Es el amor romántico, la armonía entre personas y la búsqueda de lo que es bello y justo.',
      whyRules: 'Libra vive para las relaciones y la belleza. Venus le da el magnetismo para atraer y el gusto refinado para crear armonía en cualquier entorno.',
      energyGift: 'Venus te da un sentido estético extraordinario, la capacidad de hacer que las personas se sientan cómodas y vistas, y el don de mediar y encontrar acuerdos donde otros solo ven conflicto.',
      retrograde: 'Venus retrógrada toca directamente a Libra. Pueden reaparecer relaciones del pasado o cuestionarse relaciones actuales. Es tiempo de revisar qué tipo de amor mereces, no de tomar decisiones impulsivas.',
    },
    crystals: [
      { name:'Cuarzo Rosa', emoji:'🌸', color:'#e8b4c8', properties:'Equilibra el dar y recibir amor, suaviza los juicios propios y atrae relaciones basadas en igualdad.', howToHold:'Sostenlo sobre el pecho cuando necesitas recordar que mereces recibir tanto como das.', bodyPlacement:'Sobre el chakra corazón, que en Libra es el centro de toda la experiencia.', moonCleansing:'Bajo luna llena, especialmente en luna llena en Libra.', bestFor:['Para trabajar el equilibrio en relaciones','Cuando sientes que das más de lo que recibes'], affirmation:'Doy y recibo amor en equilibrio. Merezco lo que doy.' },
      { name:'Lapislázuli', emoji:'🔵', color:'#2c5f8a', properties:'Ayuda a Libra a decir su verdad aunque pueda crear conflicto, y abre la comunicación honesta.', howToHold:'Sostenlo cerca de la garganta cuando necesitas ser directa/o aunque sea incómodo.', bodyPlacement:'Sobre la garganta para activar la comunicación auténtica sobre la diplomática.', moonCleansing:'Bajo la luna llena. Evitar agua si tiene polvo en la superficie.', bestFor:['Para conversaciones donde temes el conflicto','Para decir un "no" que llevas tiempo evitando'], affirmation:'Mi verdad es un regalo. La digo con amor y sin miedo al conflicto.' },
    ],
    colors: {
      sacred: { name:'Rosa suave', hex:'#f0b8c8', why:'El rosa de Libra es Venus en su expresión más tierna — amor, belleza, armonía y la certeza de que el mundo puede ser un lugar bello.', clothing:'Úsalo cuando quieres proyectar suavidad, atractivo natural o en situaciones sociales donde quieres conectar.', decor:'Flores frescas, colores pastel y elementos simétricos en tu espacio activan la armonía venusiana.' },
      weekly: [
        { day:'Lunes', color:'Rosa claro', hex:'#f0b8c8', intention:'Comienza la semana con intención de equilibrio. ¿Qué necesitas balancear?' },
        { day:'Martes', color:'Coral', hex:'#e8836a', intention:'Actúa sobre algo que llevas postergando por miedo al conflicto.' },
        { day:'Miércoles', color:'Lavanda', hex:'#c8a8d8', intention:'Comunica algo con diplomacia Y honestidad al mismo tiempo.' },
        { day:'Jueves', color:'Dorado rosado', hex:'#e8c4a0', intention:'Expande tu concepto de lo que mereces en tus relaciones.' },
        { day:'Viernes', color:'Rosa profundo', hex:'#c87890', intention:'Viernes de Venus. Date o comparte algo hermoso hoy.' },
        { day:'Sábado', color:'Azul pálido', hex:'#b0c8e8', intention:'Descansa en paz. No tienes que mediar ni equilibrar nada hoy.' },
        { day:'Domingo', color:'Blanco perla', hex:'#f0f0f8', intention:'Prepara tu espacio interior para recibir la semana con gracia.' },
      ],
    },
    selfKnowledge: [
      { q:'¿Cuándo dices que "no importa" cuando en realidad sí importa? ¿Por qué evitas el conflicto?', context:'La indecisión de Libra a veces es una forma de no tener que confrontar.' },
      { q:'¿Hay una relación en tu vida donde el equilibrio se rompió y aún no lo has nombrado?', context:'Libra siente el desequilibrio mucho antes de hablarlo.' },
      { q:'¿Qué elección importante llevas postergando por intentar considerar todas las perspectivas?', context:'Ver todo lo que hay que ver puede ser parálisis. ¿Cuándo decides por ti?' },
      { q:'¿Qué harías si no tuvieras miedo de disgustar a alguien importante para ti?', context:'El Libra profundo descubre que su paz interior depende de eso exactamente.' },
      { q:'¿En qué momento te has traicionado a ti misma/o para mantener la armonía en una relación?', context:'El precio silencioso de la diplomacia a veces es la autenticidad.' },
    ],
  },

  // ═══════════════════════════════ ESCORPIO ═════════════════════════════
  escorpio: {
    element: {
      icon: '💧', name: 'Agua',
      essence: 'El agua en Escorpio es la más profunda y transformadora de todas — es el océano abismal donde la luz no llega, donde las cosas mueren y renacen, donde se guardan los secretos más poderosos.',
      daily: ['Dedica tiempo al silencio profundo cada día. Tu agua necesita profundidad, no solo movimiento.', 'Observa una emoción intensa que sientas hoy sin actuar sobre ella inmediatamente.', 'Investiga o aprende algo que nadie más en tu entorno sabe. El conocimiento secreto nutre a Escorpio.'],
      personality: 'Tu agua te hace magnética/o, intuitiva/o y capaz de ver lo que nadie más ve. El reto es que tus emociones pueden acumularse hasta la implosión si no tienen una salida.',
      exercise: { title: 'Ritual de Transformación Escorpio', steps: ['Escribe en un papel algo que quieras soltar — un resentimiento, un miedo, un patrón.','Quema el papel de forma segura o rómpelo en pedazos pequeños.','Di: "Transformo esto en sabiduría. Lo que fue ya cumplió su ciclo."'] },
    },
    planet: {
      what: 'Plutón es el planeta de la muerte, la transformación y el renacimiento. Rige las cosas ocultas, el poder profundo, la psicología y todo lo que se transforma radicalmente.',
      whyRules: 'Escorpio es el signo que muere y renace. Plutón le da el poder de ir al fondo de cualquier cosa — relación, herida, patrón — y salir transformado/a.',
      energyGift: 'Plutón te da una percepción extraordinaria del poder, la psicología humana y las motivaciones ocultas. También te da la capacidad de sobrevivir lo que destruiría a otros.',
      retrograde: 'Plutón retrograda varios meses cada año. Para Escorpio, este período trae transformaciones internas profundas — revisión del poder propio, sombras que piden ser vistas y heridas que piden sanar.',
    },
    crystals: [
      { name:'Obsidiana', emoji:'⚫', color:'#1a1a1a', properties:'Protege de energías externas, revela la sombra propia y facilita la transformación profunda.', howToHold:'Sostenla cuando entras en trabajos de introspección profunda o cuando sientes que necesitas protección.', bodyPlacement:'Sobre el chakra raíz para proteger tu energía fundamental y trabajar la sombra.', moonCleansing:'Bajo la luna nueva, que es ideal para la introspección y el inicio de transformaciones.', bestFor:['Para trabajar la sombra y los miedos profundos','Para protegerte en entornos de energía densa o manipuladora'], affirmation:'Enfrento mi sombra con valentía. Lo que conozco no puede controlarme.' },
      { name:'Granate', emoji:'🔴', color:'#8b0000', properties:'Activa la pasión con propósito, la fuerza vital y la confianza en el propio poder.', howToHold:'Sostenlo cuando necesitas reconectar con tu fuerza y determinación propias.', bodyPlacement:'Sobre el chakra sacro para reconectar con el deseo, la vitalidad y la creatividad profunda.', moonCleansing:'Bajo la luna llena, especialmente en luna llena en Escorpio.', bestFor:['Para reconectar con la fuerza propia después de un período difícil','Para activar la pasión por un proyecto o relación'], affirmation:'Soy poder transformador. Lo que me destruyó me hizo más fuerte.' },
    ],
    colors: {
      sacred: { name:'Granate profundo', hex:'#5a0a1e', why:'El granate de Escorpio es el color de la sangre que da vida, del fuego bajo el agua — transformación, pasión profunda y poder que no necesita anunciarse.', clothing:'Úsalo cuando quieres proyectar poder silencioso, en situaciones donde el impacto importa más que las palabras.', decor:'Elementos oscuros, metálicos y profundos en tu espacio crean el ambiente donde Escorpio puede pensar con claridad.' },
      weekly: [
        { day:'Lunes', color:'Negro', hex:'#0a0a0a', intention:'Inicia la semana con intención poderosa. Escorpio no empieza sin propósito.' },
        { day:'Martes', color:'Granate', hex:'#5a0a1e', intention:'Actúa desde tu poder más profundo, no desde la reacción.' },
        { day:'Miércoles', color:'Ciruela', hex:'#4a1a4a', intention:'Investiga algo que llevas tiempo queriendo entender mejor.' },
        { day:'Jueves', color:'Burdeos', hex:'#7a1a2a', intention:'Transforma una situación que llevas resistiendo.' },
        { day:'Viernes', color:'Rojo oscuro', hex:'#8b0000', intention:'Conecta con tu deseo más auténtico. ¿Qué quieres de verdad?' },
        { day:'Sábado', color:'Gris oscuro', hex:'#2a2a3a', intention:'Tiempo para la introspección profunda. Deja que emerja lo que necesita.' },
        { day:'Domingo', color:'Negro azulado', hex:'#1a1a3a', intention:'Descansa en el silencio. La transformación sucede en lo oscuro.' },
      ],
    },
    selfKnowledge: [
      { q:'¿Cuál es tu mayor miedo que nadie conoce? ¿Qué dice de ti ese miedo?', context:'Escorpio conoce los miedos ajenos pero a veces huye de los propios.' },
      { q:'¿Hay alguien a quien aún no has perdonado (incluyéndote a ti misma/o)? ¿Qué sientes al nombrarlo?', context:'El perdón de Escorpio no es olvido — es soltar el veneno de la herida.' },
      { q:'¿En qué situación de tu vida sientes que tienes más poder del que usas?', context:'Escorpio tiene más poder del que admite, y a veces lo retiene por miedo.' },
      { q:'¿Qué parte de ti te das miedo a ti misma/o? ¿Qué harías si la abrazaras en lugar de esconderla?', context:'La sombra de Escorpio es también su superpoder no activado.' },
      { q:'¿Hay una transformación que sabes que necesitas hacer pero la estás retrasando?', context:'Escorpio sabe cuándo algo muere antes de dejarlo ir. ¿Qué necesita morir hoy?' },
    ],
  },

  // ═══════════════════════════════ SAGITARIO ════════════════════════════
  sagitario: {
    element: {
      icon: '🔥', name: 'Fuego',
      essence: 'El fuego en Sagitario es el más libre y expansivo — es el fuego del viajero, la llama que ilumina el horizonte y que no puede quedarse quieta sin que el alma se apague.',
      daily: ['Aprende algo nuevo o explora un tema que no conoces — tu fuego necesita expansión intelectual.', 'Muévete: camina, viaja aunque sea a un lugar cercano. El movimiento es tu medicina.', 'Di una verdad hoy que normalmente guardas para no incomodar.'],
      personality: 'Tu fuego te hace optimista, filósofa/o y libre por naturaleza. El reto es que el amor a la libertad puede convertirse en huida cuando las cosas se ponen profundas o comprometidas.',
      exercise: { title: 'Ritual del Arquero Sagitario', steps: ['Escribe un sueño o meta que sientes que está "muy lejos" de ti ahora mismo.','Cierra los ojos. Imagina que eres el arquero y esa meta es la diana.','Escribe: "Mi flecha vuela hacia [meta]. El camino ya está en movimiento."'] },
    },
    planet: {
      what: 'Júpiter es el planeta de la expansión, la abundancia, la sabiduría y la suerte. Es el planeta más grande del sistema solar y su energía lo abarca todo.',
      whyRules: 'Sagitario busca el sentido, la expansión y la verdad. Júpiter es el maestro que dice "más, más grande, más lejos" — exactamente lo que Sagitario necesita para florecer.',
      energyGift: 'Júpiter te da un optimismo casi inquebrantable, la capacidad de encontrar sentido en cualquier situación y la suerte de estar en el lugar correcto cuando las oportunidades llegan.',
      retrograde: 'Júpiter retrograda varios meses al año. Para Sagitario, es tiempo de reflexión interna — revisar qué creencias limitantes llevan disfrazadas de filosofía y qué verdad personal necesita más honestidad.',
    },
    crystals: [
      { name:'Lapislázuli', emoji:'🔵', color:'#2c5f8a', properties:'Expande la sabiduría, activa la verdad y conecta con el propósito más elevado.', howToHold:'Sostenlo durante meditaciones o cuando buscas claridad sobre tu camino.', bodyPlacement:'Sobre la frente (tercer ojo) para expandir la visión y el entendimiento.', moonCleansing:'Bajo la luna llena, especialmente en luna llena en Sagitario.', bestFor:['Para encontrar dirección cuando te sientes perdida/o','Para activar la sabiduría antes de enseñar, escribir o hablar'], affirmation:'Mi verdad se expande hacia el horizonte. Soy una buscadora/or de sabiduría.' },
      { name:'Turquesa', emoji:'🩵', color:'#40bcd4', properties:'Protege en los viajes, aporta comunicación auténtica y conecta el corazón con la mente.', howToHold:'Úsala como joya o sostenla cuando hablas en público o antes de viajes.', bodyPlacement:'Sobre la garganta para comunicar tu verdad con claridad y sin miedo.', moonCleansing:'Con agua fresca corriente o bajo la luna llena.', bestFor:['Antes de viajes largos o cambios importantes','Para comunicar con autenticidad sin perder la diplomacia'], affirmation:'Mi verdad me protege. Voy hacia donde mi alma necesita ir sin miedo.' },
    ],
    colors: {
      sacred: { name:'Azul cobalto', hex:'#1a3a7a', why:'El azul cobalto de Sagitario es la profundidad del cielo infinito — la promesa de que siempre hay más horizonte, más conocimiento, más posibilidad.', clothing:'Úsalo cuando vas a aprender, enseñar o cuando necesitas recordar que el mundo es más grande de lo que parece.', decor:'Mapas, libros, objetos de viaje y elementos azules en tu espacio activan la energía expansiva de Júpiter.' },
      weekly: [
        { day:'Lunes', color:'Azul cobalto', hex:'#1a3a7a', intention:'Empieza la semana mirando el horizonte. ¿Hacia dónde apuntas esta semana?' },
        { day:'Martes', color:'Turquesa', hex:'#40bcd4', intention:'Actúa hacia algo que expanda tu mundo hoy.' },
        { day:'Miércoles', color:'Violeta', hex:'#6b21a8', intention:'Busca sabiduría. Lee, escucha, aprende algo que no sabías.' },
        { day:'Jueves', color:'Dorado', hex:'#c9a227', intention:'Jueves de Júpiter, tu planeta. Piensa en grande sin limitarte.' },
        { day:'Viernes', color:'Verde turquesa', hex:'#20a090', intention:'Celebra la libertad que tienes. Muévete hacia lo que amas.' },
        { day:'Sábado', color:'Índigo', hex:'#4a3a8a', intention:'Reflexiona sobre qué verdad necesitas vivir más plenamente.' },
        { day:'Domingo', color:'Azul cielo', hex:'#87ceeb', intention:'Expande tu mente sin agenda. La curiosidad también es descanso.' },
      ],
    },
    selfKnowledge: [
      { q:'¿Hay algo de lo que has estado huyendo bajo el disfraz de "buscar libertad"?', context:'La flecha de Sagitario siempre apunta lejos. A veces es sabiduría. A veces, es huida.' },
      { q:'¿Cuál es tu verdad más incómoda sobre ti misma/o que a veces niegas con optimismo?', context:'Sagitario puede usar el positivismo para no ver lo que duele.' },
      { q:'¿Hay un compromiso — contigo misma/o o con otra persona — que llevas evitando por miedo a perder tu libertad?', context:'El Sagitario profundo descubre que el compromiso correcto no ata — libera.' },
      { q:'¿Qué conocimiento o filosofía llevas años aprendiendo pero todavía no has aplicado en tu vida?', context:'Saber sin vivir es la trampa del arquero que colecciona flechas pero no dispara.' },
      { q:'¿Si supieras que no puedes huir, ¿qué parte de tu vida enfrentarías primero?', context:'La valentia de Sagitario es hacia afuera. ¿Qué pasa cuando apunta hacia adentro?' },
    ],
  },

  // ═══════════════════════════════ CAPRICORNIO ══════════════════════════
  capricornio: {
    element: {
      icon: '🌿', name: 'Tierra',
      essence: 'La tierra en Capricornio es la más antigua y resistente — es la roca de la montaña, formada bajo presión durante milenios. No crece rápido. Pero lo que construye nunca cae.',
      daily: ['Haz una sola tarea importante hoy con foco total, en lugar de muchas a medias.', 'Reconoce un avance en algún proyecto de largo plazo, aunque sea pequeño.', 'Date permiso de descansar sin asociarlo a productividad. El descanso también construye.'],
      personality: 'Tu tierra te da una disciplina y resistencia que pocas personas tienen. El reto es que puedes convertir la vida en una montaña que escalar en lugar de un jardín donde vivir.',
      exercise: { title: 'Ritual de la Montaña Capricornio', steps: ['Escribe el proyecto o meta más importante de tu vida ahora mismo.','Debajo, escribe el paso más pequeño posible que puedes dar esta semana.','Hazlo. Solo ese. La montaña se escala paso a paso.'] },
    },
    planet: {
      what: 'Saturno es el planeta de la disciplina, la responsabilidad, el tiempo, las estructuras y las lecciones que no tienen atajos. Es el maestro más exigente del sistema solar.',
      whyRules: 'Capricornio construye para el largo plazo. Saturno le da la paciencia, la estructura y la seriedad para que lo que construye sea real, duradero y valioso.',
      energyGift: 'Saturno te da una capacidad de trabajo y persistencia excepcionales, la habilidad de crear estructuras que otros no pueden mantener y la sabiduría de que el tiempo siempre da la razón.',
      retrograde: 'Saturno retrograda varios meses al año. Para Capricornio, es tiempo de revisar qué estructuras de tu vida necesitan ser desmanteladas — qué estás construyendo por deber y no por amor.',
    },
    crystals: [
      { name:'Ónix negro', emoji:'⚫', color:'#1a1a1a', properties:'Aporta fuerza en momentos de presión extrema, protege la energía y ancla la determinación.', howToHold:'Sostenlo cuando enfrentas desafíos que requieren toda tu fortaleza.', bodyPlacement:'Sobre el chakra raíz para anclar y fortalecer la base de todo lo que construyes.', moonCleansing:'Bajo la luna nueva, el momento ideal para los nuevos comienzos de Capricornio.', bestFor:['En momentos de máxima presión o responsabilidad','Para protegerte de las energías que drenan tu fuerza'], affirmation:'Soy roca, soy montaña. Lo que construyo está hecho para durar.' },
      { name:'Cuarzo Ahumado', emoji:'🔲', color:'#5a5a5a', properties:'Libera el estrés acumulado, transforma la energía densa y conecta el trabajo con el propósito.', howToHold:'Sostenlo al final del día para soltar la tensión acumulada y descansar realmente.', bodyPlacement:'Sobre el chakra raíz o las plantas de los pies para limpiar la energía de la jornada.', moonCleansing:'Bajo la luna llena o con agua con sal marina.', bestFor:['Al final de días de mucha presión o trabajo','Para transformar la exigencia propia en compasión'], affirmation:'Mi trabajo tiene propósito. Suelto lo que no sirve y conservo lo que construye.' },
    ],
    colors: {
      sacred: { name:'Negro grafito', hex:'#1a1a2e', why:'El negro de Capricornio es la solidez de la noche eterna — la profundidad del poder que no necesita brillar para ser real.', clothing:'Úsalo cuando quieres ser tomada/o en serio, en situaciones de liderazgo o cuando necesitas proyectar solidez.', decor:'Elementos de madera oscura, piedra natural y líneas limpias en tu espacio crean el ambiente de Capricornio.' },
      weekly: [
        { day:'Lunes', color:'Gris oscuro', hex:'#2a2a3a', intention:'Inicia la semana con estrategia. Capricornio no actúa sin plan.' },
        { day:'Martes', color:'Negro', hex:'#0a0a1a', intention:'Trabaja en lo más difícil de tu lista. Hoy tienes la resistencia.' },
        { day:'Miércoles', color:'Gris pizarra', hex:'#4a5060', intention:'Comunica tus límites con claridad y sin disculpas.' },
        { day:'Jueves', color:'Marrón oscuro', hex:'#4a3020', intention:'Trabaja en algo que construyes para el largo plazo.' },
        { day:'Viernes', color:'Verde oscuro', hex:'#1a3a2a', intention:'Celebra algo que lograste esta semana. Mereces reconocimiento.' },
        { day:'Sábado', color:'Gris claro', hex:'#8a9aaa', intention:'Descansa de verdad. El descanso también es parte de la construcción.' },
        { day:'Domingo', color:'Blanco cálido', hex:'#f0ece0', intention:'Prepara la semana siguiente con calma. La preparación es también trabajo.' },
      ],
    },
    selfKnowledge: [
      { q:'¿Qué estás construyendo que te genera orgullo genuino más allá del reconocimiento de otros?', context:'El Capricornio profundo construye para sí misma/o, no solo para demostrar.' },
      { q:'¿Cuándo fue la última vez que descansaste sin sentir culpa? ¿Qué necesitarías para hacerlo hoy?', context:'El descanso de Capricornio es también su reto más profundo.' },
      { q:'¿Hay metas que alcanzaste y que, al llegar, no te hicieron tan feliz como esperabas? ¿Qué te dice eso?', context:'A veces la montaña no era el destino correcto, pero la seguimos escalando igual.' },
      { q:'¿Qué parte de tu vida construyes por deber, tradición o miedo al fracaso, en lugar de por amor?', context:'La disciplina de Capricornio es poderosa cuando sirve al alma, no al ego.' },
      { q:'¿Si supieras que el éxito ya está garantizado, ¿seguirías eligiendo el mismo camino?', context:'Aquí aparece si el esfuerzo es vocación o compensación.' },
    ],
  },

  // ════════════════════════════════ ACUARIO ═════════════════════════════
  acuario: {
    element: {
      icon: '💨', name: 'Aire',
      essence: 'El aire en Acuario es el más visionario e impredecible — es el viento eléctrico que viene del futuro, que trae ideas que el mundo todavía no está listo para recibir pero que necesita urgentemente.',
      daily: ['Conecta con personas que piensan diferente a ti hoy — el aire de Acuario necesita fricción intelectual.', 'Cuestiona una norma o creencia que todos asumen como verdad.', 'Contribuye con algo — aunque sea pequeño — a algo más grande que tú misma/o.'],
      personality: 'Tu aire te hace brillante para innovar, visionar y conectar ideas que nadie más ha unido. El reto es que tu mente puede estar tan en el futuro que te pierdes del presente y de las personas que te rodean.',
      exercise: { title: 'Ritual Visionario Acuario', steps: ['Escribe una idea que crees que el mundo necesita pero aún no existe.','Pregúntate: ¿qué pequeño paso podría dar yo para que esa idea se acerque a existir?','Escribe: "Soy el puente entre el futuro y el presente."'] },
    },
    planet: {
      what: 'Urano es el planeta de la revolución, la originalidad, lo inesperado y el cambio radical. Rige la tecnología, el pensamiento fuera de lo establecido y la libertad total.',
      whyRules: 'Acuario es el signo del futuro, el que rompe lo que ya no sirve. Urano le da el impulso de transgredir lo establecido y la visión para ver lo que viene antes que nadie.',
      energyGift: 'Urano te da una originalidad que es genuinamente única, la capacidad de ver conexiones que otros no ven y la valentía de ir en contra de la corriente cuando eso sirve al bien mayor.',
      retrograde: 'Urano retrograda varios meses al año. Para Acuario, es tiempo de revisar en qué cosas eres rebelde por hábito o miedo al compromiso, y en qué cosas tu revolución tiene verdadero propósito.',
    },
    crystals: [
      { name:'Amatista', emoji:'🟣', color:'#9b7fda', properties:'Activa la intuición, calma la mente hiperactiva y conecta el pensamiento brillante con la sabiduría espiritual.', howToHold:'Sostenla cuando meditas o cuando necesitas bajar de la mente al cuerpo.', bodyPlacement:'Sobre la coronilla para conectar la inteligencia de Acuario con la visión espiritual.', moonCleansing:'Bajo la luna llena. Es una de las piedras que más se beneficia de la luna.', bestFor:['Para bajar del plano intelectual al emocional','Para activar la intuición en decisiones complejas'], affirmation:'Mi mente visionaria está en paz. Confío en la sabiduría que viene de adentro.' },
      { name:'Labradorita', emoji:'🌊', color:'#4a6a8a', properties:'Protege la energía del visionario, activa la magia interior y ayuda a materializar lo que se imagina.', howToHold:'Sostenla cuando trabajas en proyectos creativos o innovadores.', bodyPlacement:'Sobre el plexo solar para conectar la visión con la acción concreta.', moonCleansing:'Bajo la luna llena o nueva, ambas funcionan.', bestFor:['Para transformar ideas en proyectos concretos','Para protegerte cuando tu energía es demasiado accesible a los demás'], affirmation:'Mis ideas tienen el poder de transformar el mundo. Las cuido y las materializo.' },
    ],
    colors: {
      sacred: { name:'Azul eléctrico', hex:'#0099cc', why:'El azul eléctrico de Acuario es Urano visible — la frecuencia del futuro, de la innovación, de la mente que está un paso adelante de su tiempo.', clothing:'Úsalo cuando quieres llamar la atención por tus ideas, en presentaciones innovadoras o cuando necesitas destacar tu originalidad.', decor:'Elementos modernos, tecnológicos y en colores azules eléctricos o plateados activan la energía uraniana.' },
      weekly: [
        { day:'Lunes', color:'Azul eléctrico', hex:'#0099cc', intention:'Empieza la semana con una idea que nadie más ha tenido.' },
        { day:'Martes', color:'Turquesa eléctrico', hex:'#00bcd4', intention:'Actúa de forma diferente en algo rutinario. Rompe el patrón.' },
        { day:'Miércoles', color:'Lavanda brillante', hex:'#9b7fda', intention:'Comparte una visión que llevas guardando por miedo a parecer rara/o.' },
        { day:'Jueves', color:'Azul cobalto', hex:'#1a3a7a', intention:'Expande tu pensamiento más allá de lo convencional.' },
        { day:'Viernes', color:'Celeste', hex:'#87ceeb', intention:'Conecta con personas que te desafían intelectualmente.' },
        { day:'Sábado', color:'Gris plateado', hex:'#a8b8c8', intention:'Descansa la mente. Los visionarios también necesitan parar.' },
        { day:'Domingo', color:'Blanco hielo', hex:'#e8f0f8', intention:'Limpia la mente de ideas acumuladas. Prepara espacio para nuevas.' },
      ],
    },
    selfKnowledge: [
      { q:'¿Hay algo que defiendes públicamente pero que en privado no vives? ¿Qué te dice esa brecha?', context:'Acuario puede amar la humanidad en abstracto y olvidarse de las personas concretas.' },
      { q:'¿Cuándo tu independencia se ha convertido en soledad que no querías? ¿Cómo lo manejaste?', context:'La distancia emocional de Acuario es su mayor fortaleza y su dolor más profundo.' },
      { q:'¿Hay personas a quienes tratas más como ideas que como seres humanos? ¿Qué pasa cuando lo reconoces?', context:'El reto de Acuario es bajar del plano de las ideas al plano del corazón.' },
      { q:'¿Qué convención o norma has roto en tu vida? ¿Estás orgullosa/o de haberlo hecho?', context:'No toda transgresión es revolucionaria. ¿La tuya sirvió a algo real?' },
      { q:'¿Qué harías si pudieras contribuir a algo más grande que tú misma/o sin necesitar el reconocimiento?', context:'El Acuario profundo descubre que la mayor revolución empieza dentro.' },
    ],
  },

  // ════════════════════════════════ PISCIS ══════════════════════════════
  piscis: {
    element: {
      icon: '💧', name: 'Agua',
      essence: 'El agua en Piscis es la más profunda e ilimitada — es el océano sin fondo donde todos los mundos se disuelven, donde la realidad y el sueño son la misma cosa.',
      daily: ['Dedica tiempo a la creatividad o al arte cada día aunque sea 10 minutos — tu agua necesita expresarse.', 'Practica poner un límite pequeño cada día para no disolverte en las emociones ajenas.', 'Conecta con lo espiritual: meditación, naturaleza, música que eleva — lo que sea que te conecte con algo más grande.'],
      personality: 'Tu agua te hace profundamente compasiva/o, intuitiva/o y creativa/o. El reto es que tus límites son tan permeables que puedes absorber todo lo que no es tuyo.',
      exercise: { title: 'Visualización del Océano Piscis', steps: ['Cierra los ojos. Imagina que eres el océano — inmenso, profundo, ilimitado.','Siente qué emociones o energías son del océano (tuyas) y cuáles son barcos ajenos que pasan.','Di: "Lo que es mío, lo conservo. Lo que es ajeno, lo suelto con amor."'] },
    },
    planet: {
      what: 'Neptuno es el planeta de los sueños, la espiritualidad, la compasión ilimitada, la ilusión y la disolución de fronteras. Es el místico del sistema solar.',
      whyRules: 'Piscis vive en el límite entre lo real y lo espiritual. Neptuno le da la capacidad de conectar con dimensiones que otros no perciben y de sentir la unidad de todo lo que existe.',
      energyGift: 'Neptuno te da una sensibilidad espiritual excepcional, la capacidad de crear arte que toca el alma y la compasión de quien sabe que todo está conectado.',
      retrograde: 'Neptuno retrograda varios meses al año. Para Piscis, es tiempo de ver con más claridad lo que normalmente está envuelto en niebla — ilusiones en relaciones o situaciones que evitabas enfrentar.',
    },
    crystals: [
      { name:'Piedra de Luna', emoji:'🌙', color:'#d0e0f0', properties:'Amplifica la intuición espiritual, equilibra las emociones y conecta con los ciclos naturales.', howToHold:'Sostenla en meditaciones nocturnas o cuando tu intuición necesita claridad.', bodyPlacement:'Sobre el chakra corona o corazón para ampliar la percepción espiritual y emocional.', moonCleansing:'Esta piedra se potencia intensamente con la luna llena. Déjala afuera toda la noche.', bestFor:['Para trabajo espiritual, sueños lúcidos o meditación profunda','Cuando necesitas confiar en tu intuición en lugar de analizarla'], affirmation:'Confío en lo que siento. Mi intuición es un puente hacia la verdad profunda.' },
      { name:'Amatista', emoji:'🟣', color:'#9b7fda', properties:'Protege de energías externas, eleva la conciencia y ayuda a Piscis a mantener sus límites espirituales.', howToHold:'Sostenla cuando estás expuesta/o a muchas energías ajenas o en espacios muy concurridos.', bodyPlacement:'Sobre la coronilla o el tercer ojo para elevar la percepción y proteger tu campo energético.', moonCleansing:'Bajo la luna llena, especialmente en luna llena en Piscis.', bestFor:['Para protegerte de absorber emociones ajenas','Para profundizar en la práctica espiritual o creativa'], affirmation:'Mi energía es mía. Soy pura, protegia y en paz con lo que soy.' },
    ],
    colors: {
      sacred: { name:'Azul océano', hex:'#2a5a8a', why:'El azul océano de Piscis es Neptuno mismo — la profundidad sin fondo del mar, donde la realidad y el sueño se convierten en uno solo.', clothing:'Úsalo cuando quieres sentirte conectada/o con lo espiritual, en ceremonias o en momentos de introspección profunda.', decor:'Agua corriente, cristales, telas suaves en azules y lavandas en tu espacio crean el ambiente donde Piscis puede soñar y crear.' },
      weekly: [
        { day:'Lunes', color:'Azul lavanda', hex:'#9090c0', intention:'Inicia la semana conectándote con lo que te inspira espiritualmente.' },
        { day:'Martes', color:'Azul océano', hex:'#2a5a8a', intention:'Actúa desde la compasión, incluyendo contigo misma/o.' },
        { day:'Miércoles', color:'Verde agua', hex:'#80c0a0', intention:'Exprésate creativamente hoy. Escribe, pinta, canta, lo que sea.' },
        { day:'Jueves', color:'Lavanda', hex:'#c8a8d8', intention:'Conéctate con tu propósito espiritual más allá de lo cotidiano.' },
        { day:'Viernes', color:'Rosa pastel', hex:'#f0b8d0', intention:'Ábrete al amor con límites claros. El amor sin límites agota.' },
        { day:'Sábado', color:'Gris perla', hex:'#b0b8c8', intention:'Descansa entre los mundos. Deja que el sueño sea tu maestra.' },
        { day:'Domingo', color:'Blanco nacarado', hex:'#e8eff8', intention:'Limpia tu campo energético. Empieza la semana desde la pureza.' },
      ],
    },
    selfKnowledge: [
      { q:'¿Cuáles emociones que sientes ahora mismo son realmente tuyas y cuáles son de otras personas?', context:'Piscis absorbe sin querer. Aprender a distinguir es su práctica más importante.' },
      { q:'¿Hay algo que idealizas tanto que te impide verlo como realmente es? ¿Una persona, una situación, tú misma/o?', context:'Neptuno crea velos hermosos. A veces esconden la verdad que necesitas ver.' },
      { q:'¿Qué límites se te hace más difícil poner? ¿Qué sientes cuando lo intentas?', context:'Los límites de Piscis no son muros — son las orillas que le dan forma al océano.' },
      { q:'¿Cuándo fue la última vez que creaste algo desde un lugar de completa libertad?', context:'La creatividad de Piscis es su forma más auténtica de conectar con su alma.' },
      { q:'¿Hay una verdad espiritual o intuición que llevas tiempo sabiendo pero que no has actuado sobre ella?', context:'Piscis sabe mucho antes de actuar. ¿Qué espera esa sabiduría de ti?' },
    ],
  },
}
