// ============================================================
// GOBOX S.A.S. — Contenido editable centralizado
// Cambiar textos, contacto o listas: SOLO aquí.
// El JSX nunca tiene texto ni datos hardcodeados sueltos.
// ============================================================

// ------------------------------------------------------------
// DATOS DE CONTACTO
// Un solo lugar para WhatsApp, email e Instagram.
// Todos los botones y el footer leen de aquí.
// ------------------------------------------------------------
export const CONTACTO = {
  instagram:    "@gobox.sas.co",
  instagramUrl: "https://instagram.com/gobox.sas.co",
  whatsapp:     "311 544 0330",
  whatsappUrl:  "https://wa.me/573115440330",
  email:        "Logistica@goboxsas.company",
}

// ------------------------------------------------------------
// LINKS DE NAVEGACIÓN
// Agregar/quitar sección = editar este array.
// Navbar y footer leen de aquí.
// ------------------------------------------------------------
export const NAV_LINKS = [
  { label: "Inicio",          href: "#inicio"       },
  { label: "Nosotros",        href: "#nosotros"     },
  { label: "Servicios",       href: "#que-hacemos"  },
  { label: "¿Por qué GOBOX?", href: "#por-que-gobox"},
  { label: "Cotizador",       href: "#cotizador"    },
  { label: "Contacto",        href: "#contacto"     },
]

// ------------------------------------------------------------
// TEXTOS DEL SITIO
// Frases entre **dobles asteriscos** se renderizan en amarillo
// cursiva en el JSX (función destacar en GoboxLanding.jsx).
// ------------------------------------------------------------
export const SITE_CONTENT = {

  // --- Marca ---
  marca: {
    nombre:        "GOBOX",
    nombreFull:    "GOBOX S.A.S.",
    eslogan:       "Soluciones inteligentes en logística y envíos.",
    esloganFooter: "Logística inteligente para empresas que quieren crecer.",
  },

  // --- Hero ---
  hero: {
    badge:       "Soluciones inteligentes en logística y envíos",
    titulo:      "Tu **aliado estratégico** en logística y **envíos nacionales**",
    subtitulo:   "Simplificamos la logística para que tú te enfoques solo en vender",
    descripcion: "En GOBOX S.A.S. conectamos empresas distribuidoras, comerciantes y emprendedores con una de las principales transportadoras del país, ofreciendo solución logística eficiente, económica y completamente acompañada.",
    cta1Label:   "Solicitar información",
    cta2Label:   "Conoce nuestros servicios",
  },

  // --- ¿Quiénes somos? (Fase 2) ---
  quienesSomos: {
    subtituloChip: "CONÓCENOS",
    titulo:        "¿Quiénes somos?",
    parrafo1:      "GOBOX S.A.S. es una empresa especializada en logística de envíos, enfocada en brindar **soluciones eficientes**, seguras y optimizadas para empresas que necesitan gestionar sus despachos de manera profesional.",
    parrafo2:      "Trabajamos como **aliados estratégicos** de nuestros clientes, encargándonos de toda la gestión logística para que puedan enfocarse en hacer crecer su negocio.",
    mision: {
      titulo: "Nuestra **Misión**",
      texto:  "Brindar soluciones logísticas confiables, eficientes y rentables, garantizando trazabilidad, control y atención personalizada en cada envío.",
    },
    vision: {
      titulo: "Nuestra **Visión**",
      texto:  "Convertirnos en una empresa referente en gestión logística a nivel nacional, destacándonos por nuestra eficiencia operativa, transparencia y servicio al cliente.",
    },
  },

  // --- ¿Qué hacemos? (Fase 3) ---
  queHacemos: {
    subtituloChip: "NUESTRO TRABAJO",
    titulo:        "¿Qué hacemos?",
    intro:         "GOBOX S.A.S. actúa como intermediario logístico entre tu empresa y la transportadora. Nos encargamos de:",
    cierre:        "Gracias a nuestra relación directa con la transportadora, podemos brindar respuestas más rápidas y soluciones más eficientes ante cualquier situación que pueda presentarse.",
  },

  // --- Accordion (Fase 4) ---
  accordion: {
    subtituloChip: "DESCUBRE MÁS",
    titulo:        "Todo lo que necesitas saber",
    cta4Texto:     "Si realizas envíos frecuentes a nivel nacional y buscas una solución más eficiente, económica y respaldada por expertos, GOBOX S.A.S. es el aliado que necesitas. Forma parte de nuestra red y descubre una nueva manera de gestionar la logística de tu negocio.",
    cta4Boton:     "Quiero unirme",
  },

  // --- Nuestro Compromiso (Fase 5) ---
  compromiso: {
    titulo:   "Nuestro **Compromiso**",
    parrafo1: "En GOBOX no solo gestionamos envíos, gestionamos la confianza de nuestros clientes.",
    parrafo2: "Cada guía representa una **responsabilidad**, y cada entrega, nuestro **compromiso cumplido**.",
  },

  // --- CTA Principal (Fase 5) ---
  cta: {
    titulo:    "¿Listo para optimizar la logística de tu negocio?",
    subtitulo: "Da el primer paso y conecta con nuestro equipo.",
    confianza: "GOBOX S.A.S. — Tu socio logístico de confianza.",
  },

  // --- Cotizador (Fase 6) ---
  cotizador: {
    subtituloChip:     "CALCULA TU ENVÍO",
    titulo:            "Cotiza tus envíos en segundos",
    descripcion:       "Estima el costo de tu envío de forma rápida. Esta cotización es orientativa según tarifas vigentes; para la tarifa final, contáctanos.",
    notaOrientativa:   "Cotización orientativa. El valor final puede variar según condiciones del envío. Contáctanos para confirmar.",
  },

  // --- Footer ---
  footer: {
    derechos: `© ${new Date().getFullYear()} GOBOX S.A.S. Todos los derechos reservados.`,
  },
}

// ------------------------------------------------------------
// SERVICIOS OPERATIVOS (Fase 3 — ¿Qué hacemos?)
// Agregar/quitar servicio = editar SOLO este array.
// ------------------------------------------------------------
export const SERVICIOS_OPERATIVOS = [
  { icono: "FileText",        titulo: "Generación de guías de envío"                    },
  { icono: "PackageSearch",   titulo: "Seguimiento permanente de cada paquete"          },
  { icono: "Activity",        titulo: "Monitoreo en tiempo real de los despachos"       },
  { icono: "Zap",             titulo: "Gestión y solución rápida de novedades"          },
  { icono: "MapPin",          titulo: "Actualización de direcciones y datos de entrega" },
  { icono: "UserCheck",       titulo: "Atención personalizada para cada envío"          },
  { icono: "Route",           titulo: "Acompañamiento durante todo el proceso logístico"},
  { icono: "BadgeDollarSign", titulo: "Optimización de costos de transporte"            },
]

// ------------------------------------------------------------
// VENTAJAS (Fase 4 — Accordion 1: ¿Por qué elegir GOBOX?)
// ------------------------------------------------------------
export const VENTAJAS = [
  {
    icono:       "Eye",
    titulo:      "Control total de tus envíos",
    descripcion: "Visibilidad y manejo completo de cada despacho de principio a fin.",
  },
  {
    icono:       "Layers",
    titulo:      "Reducción de carga operativa",
    descripcion: "Nos encargamos de la gestión para que tu equipo libere tiempo y recursos.",
  },
  {
    icono:       "BadgeDollarSign",
    titulo:      "Ahorro en costos logísticos",
    descripcion: "Al formar parte de nuestra red, accedes a condiciones más competitivas para tus envíos nacionales.",
  },
  {
    icono:       "Radar",
    titulo:      "Seguimiento constante",
    descripcion: "Monitoreamos cada envío para garantizar que llegue correctamente a su destino.",
  },
  {
    icono:       "HeartHandshake",
    titulo:      "Atención personalizada",
    descripcion: "Acompañamiento directo y especializado, sin múltiples canales de servicio.",
  },
  {
    icono:       "ShieldCheck",
    titulo:      "Transparencia y organización",
    descripcion: "Procesos claros y ordenados que generan confianza en cada operación.",
  },
]

// ------------------------------------------------------------
// SERVICIOS (Fase 4 — Accordion 2: Nuestros servicios)
// ------------------------------------------------------------
export const SERVICIOS = [
  {
    icono:       "FileText",
    titulo:      "Gestión y emisión de guías",
    descripcion: "Generamos y gestionamos cada guía de envío, con control administrativo y digital de cada despacho, reduciendo errores operativos.",
  },
  {
    icono:       "PackageSearch",
    titulo:      "Seguimiento personalizado",
    descripcion: "Monitoreo constante de cada guía, reportes de estado y alertas ante cualquier incidencia.",
  },
  {
    icono:       "Truck",
    titulo:      "Coordinación de recojos",
    descripcion: "Programación eficiente de recojos, coordinación directa con transportadoras y optimización de tiempos.",
  },
  {
    icono:       "Headphones",
    titulo:      "Atención al cliente y soporte",
    descripcion: "Atención personalizada, gestión de reclamos y soporte continuo.",
  },
  {
    icono:       "TrendingDown",
    titulo:      "Optimización de costos",
    descripcion: "Consolidación estratégica de envíos, negociación con transportadoras y reducción de costos logísticos para nuestros clientes.",
  },
]

// ------------------------------------------------------------
// CLIENTES (Fase 4 — Accordion 3: ¿A quiénes atendemos?)
// ------------------------------------------------------------
export const CLIENTES = [
  "E-commerce",
  "Empresas comerciales",
  "Distribuidores",
  "Importadores",
  "Empresas que manejan envíos recurrentes",
]

// ------------------------------------------------------------
// ALIASES DE CONVENIENCIA — Fase 5
// Los datos viven en SITE_CONTENT; estos exports permiten
// importar directamente sin destructurar SITE_CONTENT.
// ------------------------------------------------------------
export const COMPROMISO  = SITE_CONTENT.compromiso
export const CTA_SECTION = SITE_CONTENT.cta

// ------------------------------------------------------------
// BOTONES CTA (Fase 5 — Sección #contacto)
// Cambiar un botón: editar solo este array.
// accion.tipo: "scroll" (href) | "whatsapp" (mensaje prellenado)
// estilo:      "amarillo" | "verde"
// ------------------------------------------------------------
export const BOTONES_CTA = [
  {
    icono:  "Mail",
    texto:  "Solicitar información",
    accion: { tipo: "scroll", href: "#cotizador" },
    estilo: "amarillo",
  },
  {
    icono:  "Calendar",
    texto:  "Agendar reunión",
    accion: { tipo: "whatsapp", mensaje: "Hola, quiero agendar una reunión con GOBOX S.A.S. para hablar sobre mis necesidades logísticas." },
    estilo: "amarillo",
  },
  {
    icono:  "UserPlus",
    texto:  "Unirme a la red GOBOX",
    accion: { tipo: "whatsapp", mensaje: "Hola, estoy interesado en unirme a la red logística de GOBOX S.A.S." },
    estilo: "amarillo",
  },
  {
    icono:  "Calculator",
    texto:  "Cotizar mis envíos",
    accion: { tipo: "scroll", href: "#cotizador" },
    estilo: "amarillo",
  },
  {
    icono:  "MessageCircle",
    texto:  "Contactar por WhatsApp",
    accion: { tipo: "whatsapp", mensaje: "" },
    estilo: "verde",
  },
]

// ------------------------------------------------------------
// ACCORDIONS (Fase 4 — Sección "Todo lo que necesitas saber")
// Estructura unificada para los 4 paneles desplegables.
// Tipos:
//   "lista-iconos" → items: [{ icono, titulo, descripcion }]
//   "checks"       → items: ["string", ...]
//   "texto-cta"    → texto + ctaLabel (sin items)
//
// Agregar un panel: añadir objeto aquí.
// Agregar un ítem:  editar el array items del panel.
// Zero JSX changes needed.
// ------------------------------------------------------------
export const ACCORDIONS = [

  // ── Panel 1 — ¿Por qué elegir GOBOX? ─────────────────────
  {
    titulo: "¿Por qué elegir GOBOX?",
    tipo:   "lista-iconos",
    items: [
      {
        icono:       "Eye",
        titulo:      "Control total de tus envíos",
        descripcion: "Visibilidad y manejo completo de cada despacho de principio a fin.",
      },
      {
        icono:       "Layers",
        titulo:      "Reducción de carga operativa",
        descripcion: "Nos encargamos de la gestión para que tu equipo libere tiempo y recursos.",
      },
      {
        icono:       "BadgeDollarSign",
        titulo:      "Ahorro en costos logísticos",
        descripcion: "Al formar parte de nuestra red, accedes a condiciones más competitivas para tus envíos nacionales.",
      },
      {
        icono:       "Radar",
        titulo:      "Seguimiento constante",
        descripcion: "Monitoreamos cada envío para garantizar que llegue correctamente a su destino.",
      },
      {
        icono:       "HeartHandshake",
        titulo:      "Atención personalizada",
        descripcion: "Acompañamiento directo y especializado, sin múltiples canales de servicio.",
      },
      {
        icono:       "ShieldCheck",
        titulo:      "Transparencia y organización",
        descripcion: "Procesos claros y ordenados que generan confianza en cada operación.",
      },
    ],
  },

  // ── Panel 2 — Nuestros servicios ─────────────────────────
  {
    titulo: "Nuestros servicios",
    tipo:   "lista-iconos",
    items: [
      {
        icono:       "FileText",
        titulo:      "Gestión y emisión de guías",
        descripcion: "Generamos y gestionamos cada guía de envío, con control administrativo y digital de cada despacho, reduciendo errores operativos.",
      },
      {
        icono:       "PackageSearch",
        titulo:      "Seguimiento personalizado",
        descripcion: "Monitoreo constante de cada guía, reportes de estado y alertas ante cualquier incidencia.",
      },
      {
        icono:       "Truck",
        titulo:      "Coordinación de recojos",
        descripcion: "Programación eficiente de recojos, coordinación directa con transportadoras y optimización de tiempos.",
      },
      {
        icono:       "Headphones",
        titulo:      "Atención al cliente y soporte",
        descripcion: "Atención personalizada, gestión de reclamos y soporte continuo.",
      },
      {
        icono:       "TrendingDown",
        titulo:      "Optimización de costos",
        descripcion: "Consolidación estratégica de envíos, negociación con transportadoras y reducción de costos logísticos para nuestros clientes.",
      },
    ],
  },

  // ── Panel 3 — ¿A quiénes atendemos? ──────────────────────
  {
    titulo: "¿A quiénes atendemos?",
    tipo:   "checks",
    items: [
      "E-commerce",
      "Empresas comerciales",
      "Distribuidores",
      "Importadores",
      "Empresas que manejan envíos recurrentes",
    ],
  },

  // ── Panel 4 — Únete a nuestra red ────────────────────────
  {
    titulo:   "Únete a nuestra red logística",
    tipo:     "texto-cta",
    texto:    "Si realizas envíos frecuentes a nivel nacional y buscas una solución más eficiente, económica y respaldada por expertos, GOBOX S.A.S. es el aliado que necesitas. Forma parte de nuestra red y descubre una nueva manera de gestionar la logística de tu negocio.",
    ctaLabel: "Quiero unirme",
  },
]
