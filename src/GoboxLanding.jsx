// ============================================================
// GOBOX S.A.S. — Landing Page
// Componente único, sin props requeridos.
// Fase 1: Navbar + Hero + Footer
// Fase 2: ¿Quiénes somos? + Misión y Visión
// Fase 3: ¿Qué hacemos? — Grid de 8 servicios
// Fase 4: Accordions — 4 paneles desplegables
// Fase 5: Nuestro Compromiso + CTA Principal (5 botones)
// Fase 6: Cotizador interactivo de envíos
// ============================================================

import { useState, useEffect, useRef } from 'react'
import {
  // Fase 1
  Box, Menu, X, ChevronDown, MessageCircle, Mail, Phone, Instagram, ArrowDown,
  // Fase 3 — SERVICIOS_OPERATIVOS
  FileText, PackageSearch, Activity, Zap, MapPin, UserCheck, Route, BadgeDollarSign,
  // Fase 4 — ACCORDIONS (lista-iconos)
  Eye, Layers, Radar, HeartHandshake, ShieldCheck,
  Truck, Headphones, TrendingDown,
  // Fase 4 — checks
  Check,
  // Fase 5 — BOTONES_CTA
  Calendar, UserPlus, Calculator,
} from 'lucide-react'
import {
  SITE_CONTENT, CONTACTO, NAV_LINKS,
  SERVICIOS_OPERATIVOS,
  ACCORDIONS,
  COMPROMISO, CTA_SECTION, BOTONES_CTA,
} from './config/content'
import { TARIFAS_CONFIG } from './config/tarifas'

// ── Mapa de íconos para renderizado dinámico ─────────────────
const ICONOS = {
  // Fase 3
  FileText, PackageSearch, Activity, Zap, MapPin, UserCheck, Route, BadgeDollarSign,
  // Fase 4
  Eye, Layers, Radar, HeartHandshake, ShieldCheck, Truck, Headphones, TrendingDown,
  // Fase 5 — CTA buttons
  Mail, MessageCircle, Calendar, UserPlus, Calculator,
}

// ── Tipos de servicio — Cotizador (Fase 6) ───────────────────
const TIPOS_SERVICIO = [
  { id: 'docs-paquetes', label: 'Docs y Paquetes' },
  { id: 'mercancia',     label: 'Mercancía +5 kg' },
  { id: 'carga-aerea',   label: 'Carga Aérea'     },
  { id: 'radicacion',    label: 'Radicación'       },
  { id: 'firma',         label: 'Firma de Docs'    },
]

// Estado inicial de campos por tipo de servicio.
// Cambiar un default: editar solo aquí.
const CAMPOS_INICIALES = {
  'docs-paquetes': { zona: 'N', peso: '1', valorDeclarado: '' },
  'mercancia': {
    tipoEnvio: 'nacional', pesoReal: '', largo: '', ancho: '', alto: '',
    valorDeclarado: '', valorPorKilo: String(TARIFAS_CONFIG.mercancia.valorPorKiloDefault),
  },
  'carga-aerea': { trayecto: 'trayecto1', pesoReal: '', valorDeclarado: '' },
  'radicacion':  { zona: 'N', copias: '0' },
  'firma':       { zona: 'N', copias: '0' },
}

// ── Helpers de texto ─────────────────────────────────────────
const marcar = (texto, clase) =>
  texto.split(/\*\*(.*?)\*\*/g).map((parte, i) =>
    i % 2 === 1 ? <span key={i} className={clase}>{parte}</span> : parte
  )
const destacar = (texto) => marcar(texto, 'text-gold italic font-extrabold')

// ── Formato COP ──────────────────────────────────────────────
const formatCOP = (n) =>
  new Intl.NumberFormat('es-CO', {
    style: 'currency', currency: 'COP', maximumFractionDigits: 0,
  }).format(n)

// ── URL de WhatsApp con mensaje prellenado ────────────────────
const buildWaUrl = (mensaje) =>
  mensaje
    ? `${CONTACTO.whatsappUrl}?text=${encodeURIComponent(mensaje)}`
    : CONTACTO.whatsappUrl

// ── URL mailto: con asunto y cuerpo prellenados ───────────────
const buildMailtoUrl = () =>
  `mailto:${CONTACTO.email}?subject=${encodeURIComponent(CONTACTO.emailSolicitudAsunto)}&body=${encodeURIComponent(CONTACTO.emailSolicitudCuerpo)}`

// ── Estilos de formulario (module level para evitar recalcular) ─
const inputCls = (err) =>
  `w-full rounded-xl border px-4 py-3 text-navy text-sm outline-none transition-all focus:ring-2 focus:ring-gold/30 focus:border-gold ${
    err ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-surface'
  }`
const labelCls = 'block text-navy font-semibold text-sm mb-1.5'
const errCls   = 'mt-1.5 text-red-500 text-xs leading-snug'

// ── Lógica de cálculo — SIEMPRE lee de TARIFAS_CONFIG ────────
const calcularCotizacion = (tipo, campos) => {
  const T = TARIFAS_CONFIG

  if (tipo === 'docs-paquetes') {
    const pesoNum       = Number(campos.peso)
    const valNum        = Number(campos.valorDeclarado)
    const fleteFijo     = T.docsPaquetes[pesoNum][campos.zona]
    const cfgVar        = campos.zona === 'E' ? T.fleteVariableDocs.especial : T.fleteVariableDocs.estandar
    const fleteVariable = Math.max(cfgVar.porcentaje * valNum, cfgVar.minimo)
    return {
      fleteFijo, fleteVariable,
      total: fleteFijo + fleteVariable,
      desglose: [
        { label: 'Flete fijo',     valor: fleteFijo     },
        { label: 'Flete variable', valor: fleteVariable },
      ],
      nota: null, pesoVolumen: null, pesoLiquidar: null,
    }
  }

  if (tipo === 'mercancia') {
    const pr            = Number(campos.pesoReal)
    const pv            = (Number(campos.largo) * Number(campos.ancho) * Number(campos.alto)) / T.constantes.divisorPesoVolumen
    const pl            = Math.max(pr, pv, T.constantes.pesoMinimoMercanciaKg)
    const vk            = Number(campos.valorPorKilo)
    const valNum        = Number(campos.valorDeclarado)
    const fleteFijo     = vk * pl
    const cfgVar        = campos.tipoEnvio === 'local' ? T.fleteVariableMercancia.local : T.fleteVariableMercancia.nacional
    const fleteVariable = Math.max(cfgVar.porcentaje * valNum, cfgVar.minimo)
    const plLabel       = Number.isInteger(pl) ? String(pl) : pl.toFixed(2)
    return {
      fleteFijo, fleteVariable,
      total: fleteFijo + fleteVariable,
      desglose: [
        { label: `Flete fijo (${plLabel} kg × ${formatCOP(vk)})`, valor: fleteFijo },
        { label: 'Flete variable', valor: fleteVariable },
      ],
      nota: T.mercancia.notaAsesor,
      pesoVolumen: pv,
      pesoLiquidar: pl,
    }
  }

  if (tipo === 'carga-aerea') {
    const pr            = Number(campos.pesoReal)
    const cfg           = T.cargaAerea[campos.trayecto]
    const fleteFijo     = pr <= 6
      ? cfg.base6kg
      : cfg.base6kg + (Math.ceil(pr) - 6) * cfg.kgAdicional
    const fleteVariable = Math.max(cfg.varPorcentaje * Number(campos.valorDeclarado), cfg.varMinimo)
    return {
      fleteFijo, fleteVariable,
      total: fleteFijo + fleteVariable,
      desglose: [
        { label: 'Flete fijo',     valor: fleteFijo     },
        { label: 'Flete variable', valor: fleteVariable },
      ],
      nota: null, pesoVolumen: null, pesoLiquidar: null,
    }
  }

  if (tipo === 'radicacion' || tipo === 'firma') {
    const cfg           = tipo === 'radicacion' ? T.radicacionDocs : T.firmaDocs
    const copNum        = Number(campos.copias)
    const fleteFijo     = cfg.primerDocumento[campos.zona]
    const fleteVariable = copNum * cfg.copiaAdicional[campos.zona]
    return {
      fleteFijo, fleteVariable,
      total: fleteFijo + fleteVariable,
      desglose: [
        { label: 'Primer documento', valor: fleteFijo },
        ...(copNum > 0 ? [{ label: `${copNum} copia(s) adicional(es)`, valor: fleteVariable }] : []),
      ],
      nota: null, pesoVolumen: null, pesoLiquidar: null,
    }
  }

  return null
}

// ── Validación de campos antes de calcular ───────────────────
const validarCampos = (tipo, campos) => {
  const T    = TARIFAS_CONFIG
  const errs = {}
  const numOk = (v) => v !== '' && !isNaN(Number(v)) && Number(v) > 0

  if (tipo === 'docs-paquetes') {
    const v = Number(campos.valorDeclarado)
    if (!numOk(campos.valorDeclarado)) {
      errs.valorDeclarado = 'Ingresa el valor declarado del envío'
    } else if (v > T.constantes.valorMaxDeclaradoDocs) {
      errs.valorDeclarado = `Valor máximo para docs/paquetes: ${formatCOP(T.constantes.valorMaxDeclaradoDocs)}`
    }
  }

  if (tipo === 'mercancia') {
    const pr = Number(campos.pesoReal)
    if (!numOk(campos.pesoReal)) {
      errs.pesoReal = 'Ingresa el peso real del envío'
    } else if (pr <= T.constantes.pesoMaximoDocsPaquetesKg) {
      errs.pesoReal = `Para envíos de 1–${T.constantes.pesoMaximoDocsPaquetesKg} kg selecciona "Docs y Paquetes"`
    }
    if (!numOk(campos.largo))          errs.largo          = 'Ingresa el largo'
    if (!numOk(campos.ancho))          errs.ancho          = 'Ingresa el ancho'
    if (!numOk(campos.alto))           errs.alto           = 'Ingresa el alto'
    if (!numOk(campos.valorDeclarado)) errs.valorDeclarado = 'Ingresa el valor declarado'
    if (!numOk(campos.valorPorKilo))   errs.valorPorKilo   = 'Ingresa el valor por kilo'
  }

  if (tipo === 'carga-aerea') {
    const pr = Number(campos.pesoReal)
    if (!numOk(campos.pesoReal)) {
      errs.pesoReal = 'Ingresa el peso del envío'
    } else if (pr > T.constantes.pesoMaxCargaAereaKg) {
      errs.pesoReal = `Peso máximo para carga aérea: ${T.constantes.pesoMaxCargaAereaKg} kg`
    }
    if (!numOk(campos.valorDeclarado)) errs.valorDeclarado = 'Ingresa el valor declarado'
  }

  if (tipo === 'radicacion' || tipo === 'firma') {
    const c = Number(campos.copias)
    if (campos.copias === '' || isNaN(c) || c < 0) {
      errs.copias = 'Ingresa el número de copias adicionales (mínimo 0)'
    }
  }

  return errs
}

// ── Construye mensaje prellenado para WhatsApp ────────────────
const buildMensajeWa = (tipo, campos, resultado) => {
  const tp          = formatCOP(resultado.total)
  const zonaNombre  = TARIFAS_CONFIG.zonas[campos.zona] ?? ''

  switch (tipo) {
    case 'docs-paquetes':
      return `Hola GOBOX, quiero cotizar un envío de documentos/paquetes. Zona: ${zonaNombre}. Peso: ${campos.peso} kg. Valor declarado: ${formatCOP(Number(campos.valorDeclarado))}. Cotización estimada: ${tp}. ¿Pueden confirmar la tarifa final?`

    case 'mercancia': {
      const pl        = (resultado.pesoLiquidar ?? 0)
      const plStr     = Number.isInteger(pl) ? String(pl) : pl.toFixed(1)
      const tipoLabel = campos.tipoEnvio === 'local' ? 'Local' : 'Nacional'
      return `Hola GOBOX, tengo un envío de mercancía. Tipo: ${tipoLabel}. Peso real: ${campos.pesoReal} kg. Dimensiones: ${campos.largo}×${campos.ancho}×${campos.alto} cm. Peso a liquidar: ${plStr} kg. Valor declarado: ${formatCOP(Number(campos.valorDeclarado))}. Cotización estimada: ${tp}.`
    }

    case 'carga-aerea': {
      const tLabel = campos.trayecto === 'trayecto1' ? 'Trayecto 1' : 'Trayecto 2'
      return `Hola GOBOX, necesito carga aérea. ${tLabel}. Peso: ${campos.pesoReal} kg. Valor declarado: ${formatCOP(Number(campos.valorDeclarado))}. Cotización estimada: ${tp}.`
    }

    case 'radicacion':
      return `Hola GOBOX, necesito radicación de documentos. Zona: ${zonaNombre}. Copias adicionales: ${campos.copias}. Cotización estimada: ${tp}.`

    case 'firma':
      return `Hola GOBOX, necesito firma de documentos. Zona: ${zonaNombre}. Copias adicionales: ${campos.copias}. Cotización estimada: ${tp}.`

    default:
      return `Hola GOBOX, me interesa cotizar un envío. Cotización estimada: ${tp}.`
  }
}

// ── Hook: detecta entrada al viewport (una sola vez) ─────────
const useInView = (threshold = 0.12) => {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { setVisible(true); obs.unobserve(entry.target) }
      },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, visible]
}

// Fábrica: devuelve props { className, style } para fade-in + slide-up.
// transition-[opacity,transform] limita la transición a propiedades GPU-aceleradas.
const makeSlide = (visible) => (delay = 0) => ({
  className: `transition-[opacity,transform] duration-700 ease-out ${
    visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
  }`,
  style: { transitionDelay: `${delay}ms` },
})

// ============================================================
export default function GoboxLanding() {
  // — Estado global ─────────────────────────────────────────
  const [menuAbierto,  setMenuAbierto]  = useState(false)
  const [scrolled,     setScrolled]     = useState(false)
  const [panelAbierto, setPanelAbierto] = useState(null)

  // — Estado cotizador (Fase 6) ─────────────────────────────
  const [cotizadorTipo, setCotizadorTipo] = useState('docs-paquetes')
  const [campos,        setCampos]        = useState(CAMPOS_INICIALES['docs-paquetes'])
  const [resultado,     setResultado]     = useState(null)
  const [errores,       setErrores]       = useState({})

  // — Hooks de visibilidad por sección ──────────────────────
  const [nosotrosRef,   nosotrosVisible]   = useInView(0.10)
  const [queHacemosRef, queHacemosVisible] = useInView(0.06)
  const [porQueRef,     porQueVisible]     = useInView(0.08)
  const [compromisoRef, compromisoVisible] = useInView(0.15)
  const [contactoRef,   contactoVisible]   = useInView(0.10)
  const [cotizadorRef,  cotizadorVisible]  = useInView(0.05)

  // — Fábricas de animación ─────────────────────────────────
  const slideNosotros   = makeSlide(nosotrosVisible)
  const slideQueHacemos = makeSlide(queHacemosVisible)
  const slidePorQue     = makeSlide(porQueVisible)
  const slideCompromiso = makeSlide(compromisoVisible)
  const slideContacto   = makeSlide(contactoVisible)
  const slideCotizador  = makeSlide(cotizadorVisible)

  // — Efecto: navbar al scroll ──────────────────────────────
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // — Navegación interna ────────────────────────────────────
  // En mobile: primero cierra el menú (300ms), luego hace scroll.
  // En desktop: scroll inmediato (menú ya está cerrado).
  const irA = (href) => {
    const wasOpen = menuAbierto
    setMenuAbierto(false)
    const scroll = () => document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    wasOpen ? setTimeout(scroll, 320) : scroll()
  }

  // — Toggle accordion ──────────────────────────────────────
  const togglePanel = (i) => setPanelAbierto(prev => prev === i ? null : i)

  // — Cotizador: cambia tipo y resetea estado ───────────────
  const seleccionarTipo = (tipo) => {
    setCotizadorTipo(tipo)
    setCampos(CAMPOS_INICIALES[tipo])
    setResultado(null)
    setErrores({})
  }

  // — Cotizador: actualiza un campo individual ──────────────
  const actualizarCampo = (nombre, valor) => {
    setCampos(prev => ({ ...prev, [nombre]: valor }))
    if (errores[nombre]) setErrores(prev => { const n = { ...prev }; delete n[nombre]; return n })
  }

  // — Cotizador: valida y calcula ───────────────────────────
  const calcular = () => {
    const errs = validarCampos(cotizadorTipo, campos)
    if (Object.keys(errs).length > 0) { setErrores(errs); return }
    setErrores({})
    setResultado(calcularCotizacion(cotizadorTipo, campos))
  }

  // ==========================================================
  return (
    <div className="min-h-screen font-sans">

      {/* ══════════════════════════════════════════════════════
          NAVBAR (Fase 1)
          ══════════════════════════════════════════════════════ */}
      <nav
        aria-label="Navegación principal"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => irA('#inicio')} className="flex items-center gap-2 flex-shrink-0 group" aria-label="Ir al inicio">
              <Box className="w-7 h-7 text-gold transition-transform group-hover:scale-110" strokeWidth={2.5} />
              <span className="text-xl font-bold tracking-wide font-display">
                <span className="text-gold">GO</span>
                <span className={scrolled ? 'text-navy' : 'text-white'}>BOX</span>
              </span>
            </button>
            <ul className="hidden md:flex items-center gap-0.5" role="menubar">
              {NAV_LINKS.map((link) => (
                <li key={link.href} role="none">
                  <button onClick={() => irA(link.href)} role="menuitem"
                    className={`px-3 py-2 text-sm transition-colors rounded-md ${
                      scrolled
                        ? 'text-navy/70 hover:text-navy hover:bg-navy/5'
                        : 'text-white/80 hover:text-gold hover:bg-white/5'
                    }`}>
                    {link.label}
                  </button>
                </li>
              ))}
              <li className="ml-3">
                <a href={buildWaUrl(CONTACTO.mensajeDefault)} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-wp text-white text-sm font-bold rounded-lg hover:bg-[#20bd5a] transition-all hover:scale-105">
                  <MessageCircle className="w-4 h-4" />WhatsApp
                </a>
              </li>
            </ul>
            <button
              className={`md:hidden p-2 rounded-lg transition-colors ${
                scrolled ? 'text-navy hover:bg-navy/5' : 'text-white hover:bg-white/10'
              }`}
              onClick={() => setMenuAbierto(!menuAbierto)}
              aria-label={menuAbierto ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={menuAbierto}>
              {menuAbierto ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        <div className={`md:hidden bg-navy border-t border-white/10 overflow-hidden transition-all duration-300 ease-in-out ${
          menuAbierto ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <ul className="px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button onClick={() => irA(link.href)}
                  className="w-full text-left px-4 py-3 text-white/80 hover:text-gold hover:bg-white/5 rounded-lg transition-colors text-sm">
                  {link.label}
                </button>
              </li>
            ))}
            <li className="pt-2 pb-1">
              <a href={buildWaUrl(CONTACTO.mensajeDefault)} target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-3 bg-gold text-navy font-bold rounded-lg hover:bg-gold-light transition-colors text-sm">
                <MessageCircle className="w-4 h-4" />Contactar por WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </nav>


      {/* ══════════════════════════════════════════════════════
          HERO SECTION (Fase 1)
          ══════════════════════════════════════════════════════ */}
      <section id="inicio" className="relative min-h-screen bg-navy overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy to-navy-dark" />
        <div className="absolute top-0 right-0 w-[28rem] h-[28rem]"
          style={{ background: 'var(--amarillo)', clipPath: 'polygon(100% 0, 100% 65%, 35% 0)', opacity: 0.13 }} />
        <div className="absolute inset-y-0 right-0 w-3/5"
          style={{ background: 'var(--amarillo)', clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 22% 100%)', opacity: 0.045 }} />
        <div className="absolute inset-y-0 right-0 w-2/5"
          style={{ background: 'var(--amarillo)', clipPath: 'polygon(73% 0, 84% 0, 100% 100%, 89% 100%)', opacity: 0.20 }} />
        <div className="absolute bottom-0 left-0 w-52 h-52"
          style={{ background: 'var(--amarillo)', clipPath: 'polygon(0 38%, 62% 100%, 0 100%)', opacity: 0.09 }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-36 md:py-28">
          <div className="max-w-2xl lg:max-w-3xl mx-auto text-center">

            {/* Logo SVG */}
            <div className="anim-fade flex justify-center mb-5">
              <img
                src={import.meta.env.BASE_URL + 'logo-gobox.svg'}
                alt="GOBOX S.A.S. - Logo"
                className="w-28 sm:w-40 h-auto"
                style={{ filter: 'drop-shadow(0 0 12px rgba(255,255,255,0.25))' }}
              />
            </div>

            {/* Eslogan — texto grande y prominente, sin forma de botón */}
            <div className="anim-slide-1 mb-8">
              <p className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-gold leading-tight">
                {SITE_CONTENT.hero.badge}
              </p>
              <div className="h-0.5 w-24 bg-gold/50 rounded-full mx-auto mt-3" />
            </div>

            {/* Título principal */}
            <h1 className="anim-slide-2 font-display text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold text-white leading-tight mb-6">
              {destacar(SITE_CONTENT.hero.titulo)}
            </h1>

            {/* Subtítulo */}
            <p className="anim-slide-3 text-lg sm:text-xl text-white/75 font-medium mb-4 leading-snug">
              {SITE_CONTENT.hero.subtitulo}
            </p>

            {/* Descripción */}
            <p className="anim-slide-4 text-sm sm:text-base text-white/55 leading-relaxed mb-10 max-w-xl mx-auto">
              {SITE_CONTENT.hero.descripcion}
            </p>

            {/* CTAs */}
            <div className="anim-slide-4 flex flex-col sm:flex-row gap-4 justify-center">
              <a href={buildWaUrl(CONTACTO.mensajeDefault)} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold-light transition-all duration-200 hover:scale-105 hover:shadow-[0_8px_32px_rgba(245,184,0,0.35)] text-sm sm:text-base">
                <MessageCircle className="w-5 h-5" />{SITE_CONTENT.hero.cta1Label}
              </a>
              <button onClick={() => irA('#que-hacemos')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-white/35 text-white font-semibold rounded-xl hover:border-gold hover:text-gold transition-all duration-200 hover:scale-105 text-sm sm:text-base">
                {SITE_CONTENT.hero.cta2Label}<ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="anim-fade-slow absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-white/40">
          <span className="text-[10px] uppercase tracking-[0.25em]">Scroll</span>
          <ArrowDown className="w-5 h-5 text-gold animate-bounce" />
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          ¿QUIÉNES SOMOS? (Fase 2)
          ══════════════════════════════════════════════════════ */}
      <section id="nosotros" className="bg-surface py-20 md:py-28">
        <div ref={nosotrosRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div {...slideNosotros(0)}>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-gold" />
              <span className="text-gold text-xs font-bold uppercase tracking-[0.22em]">{SITE_CONTENT.quienesSomos.subtituloChip}</span>
              <div className="h-px w-8 bg-gold" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy mb-3">{SITE_CONTENT.quienesSomos.titulo}</h2>
            <div className="h-1 w-16 bg-gold rounded-full" />
          </div>
          <div className="max-w-3xl mt-10 space-y-5 mb-14">
            <div {...slideNosotros(160)}>
              <p className="text-muted leading-relaxed text-base sm:text-lg">{marcar(SITE_CONTENT.quienesSomos.parrafo1, 'font-semibold text-navy')}</p>
            </div>
            <div {...slideNosotros(270)}>
              <p className="text-muted leading-relaxed text-base sm:text-lg">{marcar(SITE_CONTENT.quienesSomos.parrafo2, 'font-semibold text-navy')}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            <div {...slideNosotros(420)}>
              <div className="relative bg-navy rounded-2xl p-8 sm:p-10 overflow-hidden h-full">
                <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
                  style={{ background: 'var(--amarillo)', clipPath: 'polygon(100% 0, 100% 100%, 0 0)', opacity: 0.09 }} />
                <h3 className="relative z-10 font-display text-xl sm:text-2xl font-bold text-white mb-2 leading-snug">{destacar(SITE_CONTENT.quienesSomos.mision.titulo)}</h3>
                <div className="h-0.5 w-14 bg-gold rounded-full mb-6" />
                <p className="relative z-10 text-white/70 leading-relaxed">{SITE_CONTENT.quienesSomos.mision.texto}</p>
              </div>
            </div>
            <div {...slideNosotros(560)}>
              <div className="flex rounded-2xl overflow-hidden shadow-md h-full">
                <div className="w-1.5 bg-gold flex-shrink-0" />
                <div className="relative flex-1 bg-white p-8 sm:p-10 overflow-hidden">
                  <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
                    style={{ background: 'var(--azul-marino)', clipPath: 'polygon(100% 0, 100% 100%, 0 0)', opacity: 0.04 }} />
                  <h3 className="relative z-10 font-display text-xl sm:text-2xl font-bold text-navy mb-2 leading-snug">{destacar(SITE_CONTENT.quienesSomos.vision.titulo)}</h3>
                  <div className="h-0.5 w-14 bg-gold rounded-full mb-6" />
                  <p className="relative z-10 text-muted leading-relaxed">{SITE_CONTENT.quienesSomos.vision.texto}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          ¿QUÉ HACEMOS? (Fase 3)
          ══════════════════════════════════════════════════════ */}
      <section id="que-hacemos" className="overflow-hidden">
        <div className="bg-white pt-20 md:pt-28 pb-14 md:pb-16">
          <div ref={queHacemosRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div {...slideQueHacemos(0)}>
              <div className="flex items-center gap-3 mb-5">
                <div className="h-px w-8 bg-gold" />
                <span className="text-gold text-xs font-bold uppercase tracking-[0.22em]">{SITE_CONTENT.queHacemos.subtituloChip}</span>
                <div className="h-px w-8 bg-gold" />
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy mb-3">{SITE_CONTENT.queHacemos.titulo}</h2>
              <div className="h-1 w-16 bg-gold rounded-full mb-6" />
              <p className="text-muted text-base sm:text-lg leading-relaxed max-w-2xl">{SITE_CONTENT.queHacemos.intro}</p>
            </div>
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6">
              {SERVICIOS_OPERATIVOS.map((servicio, i) => {
                const Icono = ICONOS[servicio.icono]
                const { className: animClass, style: animStyle } = slideQueHacemos(100 + i * 60)
                return (
                  <div key={servicio.titulo} className={`h-full ${animClass}`} style={animStyle}>
                    <div className="h-full bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 hover:border-gold/25 transition-all duration-300 group cursor-default flex flex-col">
                      <div className="w-12 h-12 rounded-xl bg-gold flex items-center justify-center mb-4 flex-shrink-0 group-hover:scale-110 group-hover:bg-gold-light transition-all duration-300">
                        <Icono className="w-6 h-6 text-navy" strokeWidth={2} />
                      </div>
                      <p className="text-navy font-semibold text-sm leading-snug mb-2">{servicio.titulo}</p>
                      <p className="text-muted text-xs leading-relaxed">{servicio.descripcion}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div
          className={`bg-navy py-10 md:py-12 relative overflow-hidden transition-all duration-700 ease-out ${
            queHacemosVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
          style={{ transitionDelay: '620ms' }}
        >
          <div className="absolute top-0 right-0 h-full w-64 pointer-events-none"
            style={{ background: 'var(--amarillo)', clipPath: 'polygon(80% 0, 100% 0, 100% 100%, 60% 100%)', opacity: 0.06 }} />
          <div className="absolute top-0 left-0 h-full w-40 pointer-events-none"
            style={{ background: 'var(--amarillo)', clipPath: 'polygon(0 0, 30% 0, 0 100%)', opacity: 0.04 }} />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-white/85 text-center text-base sm:text-lg leading-relaxed max-w-3xl mx-auto">
              {SITE_CONTENT.queHacemos.cierre}
            </p>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          ACCORDIONS — Todo lo que necesitas saber (Fase 4)
          ══════════════════════════════════════════════════════ */}
      <section id="por-que-gobox" className="bg-surface py-20 md:py-28">
        <div ref={porQueRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div {...slidePorQue(0)}>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-gold" />
              <span className="text-gold text-xs font-bold uppercase tracking-[0.22em]">{SITE_CONTENT.accordion.subtituloChip}</span>
              <div className="h-px w-8 bg-gold" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy mb-3">{SITE_CONTENT.accordion.titulo}</h2>
            <div className="h-1 w-16 bg-gold rounded-full" />
          </div>
          <div className="mt-10 space-y-3">
            {ACCORDIONS.map((accordion, i) => {
              const abierto = panelAbierto === i
              const { className: animClass, style: animStyle } = slidePorQue(120 + i * 80)
              return (
                <div key={accordion.titulo}
                  className={`bg-white rounded-xl shadow-sm overflow-hidden transition-shadow duration-200 ${abierto ? 'shadow-md' : ''} ${animClass}`}
                  style={{
                    ...animStyle,
                    borderLeft: abierto ? '4px solid var(--amarillo)' : '4px solid transparent',
                    transition: 'border-color 200ms ease, box-shadow 200ms ease, opacity 700ms ease, transform 700ms ease',
                  }}
                >
                  <button onClick={() => togglePanel(i)}
                    className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-gray-50 transition-colors duration-150"
                    aria-expanded={abierto} aria-controls={`accordion-content-${i}`}>
                    <span className={`font-display font-bold text-base sm:text-lg transition-colors duration-200 ${abierto ? 'text-navy' : 'text-navy/80'}`}>
                      {accordion.titulo}
                    </span>
                    <ChevronDown className={`w-5 h-5 text-gold flex-shrink-0 ml-4 transition-transform duration-300 ${abierto ? 'rotate-180' : ''}`} />
                  </button>
                  <div id={`accordion-content-${i}`}
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${abierto ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                    <div className="overflow-hidden">
                      <div className="px-6 pb-6 pt-1">
                        {accordion.tipo === 'lista-iconos' && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                            {accordion.items.map((item) => {
                              const Icono = ICONOS[item.icono]
                              return (
                                <div key={item.titulo} className="flex items-start gap-3 p-4 rounded-xl bg-surface">
                                  <div className="w-9 h-9 rounded-lg bg-gold flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <Icono className="w-4 h-4 text-navy" strokeWidth={2} />
                                  </div>
                                  <div>
                                    <p className="font-semibold text-navy text-sm mb-0.5">{item.titulo}</p>
                                    <p className="text-muted text-xs sm:text-sm leading-relaxed">{item.descripcion}</p>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        )}
                        {accordion.tipo === 'checks' && (
                          <ul className="space-y-3 pt-2">
                            {accordion.items.map((item) => (
                              <li key={item} className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-gold flex items-center justify-center flex-shrink-0">
                                  <Check className="w-3 h-3 text-navy" strokeWidth={3} />
                                </div>
                                <span className="text-navy font-medium text-sm sm:text-base">{item}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                        {accordion.tipo === 'texto-cta' && (
                          <div className="pt-2">
                            <p className="text-muted leading-relaxed text-sm sm:text-base mb-6">{accordion.texto}</p>
                            <a href={buildWaUrl(accordion.ctaMensajeWa ?? '')} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-navy font-bold rounded-xl hover:bg-gold-light transition-all hover:scale-105 text-sm">
                              <MessageCircle className="w-4 h-4" />{accordion.ctaLabel}
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          NUESTRO COMPROMISO (Fase 5 — A)
          ══════════════════════════════════════════════════════ */}
      <section className="bg-navy relative overflow-hidden py-20 md:py-28">
        <div className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none"
          style={{ background: 'var(--amarillo)', clipPath: 'polygon(100% 30%, 100% 100%, 0% 100%)', opacity: 0.07 }} />
        <div className="absolute top-0 left-0 w-48 h-full pointer-events-none"
          style={{ background: 'var(--amarillo)', clipPath: 'polygon(0 0, 60% 0, 20% 100%, 0 100%)', opacity: 0.06 }} />
        <div className="absolute inset-y-0 right-16 w-6 pointer-events-none"
          style={{ background: 'var(--amarillo)', opacity: 0.11, transform: 'skewX(-8deg)' }} />
        <div ref={compromisoRef} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div {...slideCompromiso(0)}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
              {destacar(COMPROMISO.titulo)}
            </h2>
          </div>
          <div {...slideCompromiso(150)}>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed mb-5 max-w-2xl mx-auto">{COMPROMISO.parrafo1}</p>
          </div>
          <div {...slideCompromiso(260)}>
            <p className="text-white/70 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
              {marcar(COMPROMISO.parrafo2, 'font-bold text-gold')}
            </p>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          CTA PRINCIPAL (Fase 5 — B)   id="contacto"
          ══════════════════════════════════════════════════════ */}
      <section id="contacto" className="relative overflow-hidden py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-deep via-navy to-navy-dark" />
        <div className="absolute top-0 right-0 w-[36rem] h-full pointer-events-none"
          style={{ background: 'var(--amarillo)', clipPath: 'polygon(72% 0, 100% 0, 100% 100%, 88% 100%)', opacity: 0.06 }} />
        <div className="absolute bottom-0 left-0 w-80 h-72 pointer-events-none"
          style={{ background: 'var(--amarillo)', clipPath: 'polygon(0 40%, 70% 100%, 0 100%)', opacity: 0.08 }} />
        <div className="absolute top-0 left-1/3 w-8 h-full pointer-events-none"
          style={{ background: 'var(--amarillo)', opacity: 0.07, transform: 'skewX(-14deg)' }} />
        <div ref={contactoRef} className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div {...slideContacto(0)}>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">{CTA_SECTION.titulo}</h2>
            <p className="text-white/60 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto">{CTA_SECTION.subtitulo}</p>
          </div>
          <div {...slideContacto(130)}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-3xl mx-auto">
              {BOTONES_CTA.map((btn, i) => {
                const Icono = ICONOS[btn.icono]
                const wrapClass = i === BOTONES_CTA.length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''
                const baseClass = 'w-full flex items-center justify-center gap-2.5 px-5 py-4 font-bold rounded-xl transition-all duration-200 hover:scale-[1.03] text-sm sm:text-base'
                const colorClass = btn.estilo === 'verde'
                  ? 'bg-wp text-white hover:bg-[#20bd5a] hover:shadow-[0_6px_20px_rgba(37,211,102,0.4)]'
                  : 'bg-gold text-navy hover:bg-gold-light hover:shadow-[0_6px_20px_rgba(245,184,0,0.4)]'
                const contenido = <><Icono className="w-5 h-5 flex-shrink-0" />{btn.texto}</>
                return (
                  <div key={btn.texto} className={wrapClass}>
                    {btn.accion.tipo === 'scroll' ? (
                      <button onClick={() => irA(btn.accion.href)} className={`${baseClass} ${colorClass}`}>{contenido}</button>
                    ) : btn.accion.tipo === 'email' ? (
                      <a href={buildMailtoUrl()} className={`${baseClass} ${colorClass}`}>{contenido}</a>
                    ) : (
                      <a href={buildWaUrl(btn.accion.mensaje)} target="_blank" rel="noopener noreferrer" className={`${baseClass} ${colorClass}`}>{contenido}</a>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
          <div {...slideContacto(250)}>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-white/50 text-sm">
              <a href={CONTACTO.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors">
                <Instagram className="w-4 h-4 text-gold flex-shrink-0" />Instagram · {CONTACTO.instagram}
              </a>
              <a href={CONTACTO.whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors">
                <Phone className="w-4 h-4 text-gold flex-shrink-0" />{CONTACTO.whatsapp}
              </a>
              <a href={`mailto:${CONTACTO.email}`} className="flex items-center gap-2 hover:text-gold transition-colors">
                <Mail className="w-4 h-4 text-gold flex-shrink-0" />{CONTACTO.email}
              </a>
            </div>
          </div>
          <div {...slideContacto(330)}>
            <p className="mt-6 text-white/30 text-sm">{CTA_SECTION.confianza}</p>
          </div>
        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          COTIZADOR (Fase 6)   id="cotizador"
          Todos los números vienen de TARIFAS_CONFIG.
          Cambiar tarifas: editar solo src/config/tarifas.js
          ══════════════════════════════════════════════════════ */}
      <section id="cotizador" className="bg-surface relative overflow-hidden py-20 md:py-28">
        {/* Acento diagonal sutil */}
        <div className="absolute top-0 right-0 h-full w-36 pointer-events-none"
          style={{ background: 'var(--amarillo)', clipPath: 'polygon(78% 0, 100% 0, 100% 100%, 96% 100%)', opacity: 0.06 }} />

        <div ref={cotizadorRef} className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Encabezado */}
          <div {...slideCotizador(0)}>
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-8 bg-gold" />
              <span className="text-gold text-xs font-bold uppercase tracking-[0.22em]">{SITE_CONTENT.cotizador.subtituloChip}</span>
              <div className="h-px w-8 bg-gold" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-navy mb-3">{SITE_CONTENT.cotizador.titulo}</h2>
            <div className="h-1 w-16 bg-gold rounded-full mb-5" />
            <p className="text-muted text-sm sm:text-base leading-relaxed max-w-xl">{SITE_CONTENT.cotizador.descripcion}</p>
          </div>

          {/* Tarjeta de la calculadora */}
          <div {...slideCotizador(130)}>
            <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 sm:p-8">

              {/* ── Selector de tipo de servicio ── */}
              <div className="mb-6">
                <p className="text-navy font-semibold text-sm mb-3">Tipo de servicio</p>
                <div className="flex flex-wrap gap-2">
                  {TIPOS_SERVICIO.map(({ id, label }) => (
                    <button
                      key={id}
                      onClick={() => seleccionarTipo(id)}
                      aria-pressed={cotizadorTipo === id}
                      className={`px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                        cotizadorTipo === id
                          ? 'bg-navy text-gold shadow-sm'
                          : 'bg-surface text-muted hover:bg-gold/10 hover:text-navy'
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              </div>

              <hr className="border-gray-100 mb-6" />

              {/* ── Campos según tipo de servicio ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                {/* ── Docs y Paquetes (1–5 kg) ── */}
                {cotizadorTipo === 'docs-paquetes' && (<>
                  <div className="sm:col-span-2">
                    <label htmlFor="zona" className={labelCls}>Zona de destino</label>
                    <select id="zona" value={campos.zona} onChange={e => actualizarCampo('zona', e.target.value)} className={inputCls(errores.zona)}>
                      {Object.entries(TARIFAS_CONFIG.zonas).map(([k, v]) => (
                        <option key={k} value={k}>{k} — {v}</option>
                      ))}
                    </select>
                    {errores.zona && <p className={errCls}>{errores.zona}</p>}
                  </div>
                  <div>
                    <label htmlFor="peso" className={labelCls}>Peso del envío</label>
                    <select id="peso" value={campos.peso} onChange={e => actualizarCampo('peso', e.target.value)} className={inputCls(errores.peso)}>
                      {[1, 2, 3, 4, 5].map(p => (
                        <option key={p} value={String(p)}>{p} kg</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="valorDeclarado" className={labelCls}>Valor declarado (COP)</label>
                    <input id="valorDeclarado" type="number" min="0" step="1" placeholder="Ej: 150000"
                      value={campos.valorDeclarado} onChange={e => actualizarCampo('valorDeclarado', e.target.value)}
                      className={inputCls(errores.valorDeclarado)} />
                    {errores.valorDeclarado && <p className={errCls}>{errores.valorDeclarado}</p>}
                  </div>
                </>)}

                {/* ── Mercancía (+5 kg) ── */}
                {cotizadorTipo === 'mercancia' && (<>
                  <div className="sm:col-span-2">
                    <label htmlFor="tipoEnvio" className={labelCls}>Tipo de envío</label>
                    <select id="tipoEnvio" value={campos.tipoEnvio} onChange={e => actualizarCampo('tipoEnvio', e.target.value)} className={inputCls()}>
                      <option value="local">Local</option>
                      <option value="nacional">Nacional</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="pesoReal" className={labelCls}>Peso real (kg)</label>
                    <input id="pesoReal" type="number" min="0" step="0.1" placeholder="Ej: 35"
                      value={campos.pesoReal} onChange={e => actualizarCampo('pesoReal', e.target.value)}
                      className={inputCls(errores.pesoReal)} />
                    {errores.pesoReal && <p className={errCls}>{errores.pesoReal}</p>}
                  </div>
                  <div>
                    <label htmlFor="valorDeclaradoM" className={labelCls}>Valor declarado (COP)</label>
                    <input id="valorDeclaradoM" type="number" min="0" step="1" placeholder="Ej: 200000"
                      value={campos.valorDeclarado} onChange={e => actualizarCampo('valorDeclarado', e.target.value)}
                      className={inputCls(errores.valorDeclarado)} />
                    {errores.valorDeclarado && <p className={errCls}>{errores.valorDeclarado}</p>}
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Dimensiones del paquete (cm)</label>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <input type="number" min="0" step="1" placeholder="Largo"
                          value={campos.largo} onChange={e => actualizarCampo('largo', e.target.value)}
                          className={inputCls(errores.largo)} />
                        {errores.largo && <p className={errCls}>{errores.largo}</p>}
                      </div>
                      <div>
                        <input type="number" min="0" step="1" placeholder="Ancho"
                          value={campos.ancho} onChange={e => actualizarCampo('ancho', e.target.value)}
                          className={inputCls(errores.ancho)} />
                        {errores.ancho && <p className={errCls}>{errores.ancho}</p>}
                      </div>
                      <div>
                        <input type="number" min="0" step="1" placeholder="Alto"
                          value={campos.alto} onChange={e => actualizarCampo('alto', e.target.value)}
                          className={inputCls(errores.alto)} />
                        {errores.alto && <p className={errCls}>{errores.alto}</p>}
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="valorPorKilo" className={labelCls}>Valor por kilo (COP)</label>
                    <input id="valorPorKilo" type="number" min="0" step="1"
                      value={campos.valorPorKilo} onChange={e => actualizarCampo('valorPorKilo', e.target.value)}
                      className={inputCls(errores.valorPorKilo)} />
                    {errores.valorPorKilo && <p className={errCls}>{errores.valorPorKilo}</p>}
                  </div>
                </>)}

                {/* ── Carga Aérea ── */}
                {cotizadorTipo === 'carga-aerea' && (<>
                  <div className="sm:col-span-2">
                    <label htmlFor="trayecto" className={labelCls}>Trayecto</label>
                    <select id="trayecto" value={campos.trayecto} onChange={e => actualizarCampo('trayecto', e.target.value)} className={inputCls()}>
                      <option value="trayecto1">
                        Trayecto 1 — base hasta 6 kg: {formatCOP(TARIFAS_CONFIG.cargaAerea.trayecto1.base6kg)}
                      </option>
                      <option value="trayecto2">
                        Trayecto 2 — base hasta 6 kg: {formatCOP(TARIFAS_CONFIG.cargaAerea.trayecto2.base6kg)}
                      </option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="pesoRealA" className={labelCls}>
                      Peso real (kg, máx. {TARIFAS_CONFIG.constantes.pesoMaxCargaAereaKg})
                    </label>
                    <input id="pesoRealA" type="number" min="0" max={TARIFAS_CONFIG.constantes.pesoMaxCargaAereaKg} step="0.1" placeholder="Ej: 15"
                      value={campos.pesoReal} onChange={e => actualizarCampo('pesoReal', e.target.value)}
                      className={inputCls(errores.pesoReal)} />
                    {errores.pesoReal && <p className={errCls}>{errores.pesoReal}</p>}
                  </div>
                  <div>
                    <label htmlFor="valorDeclaradoA" className={labelCls}>Valor declarado (COP)</label>
                    <input id="valorDeclaradoA" type="number" min="0" step="1" placeholder="Ej: 500000"
                      value={campos.valorDeclarado} onChange={e => actualizarCampo('valorDeclarado', e.target.value)}
                      className={inputCls(errores.valorDeclarado)} />
                    {errores.valorDeclarado && <p className={errCls}>{errores.valorDeclarado}</p>}
                  </div>
                </>)}

                {/* ── Radicación de Documentos ── */}
                {cotizadorTipo === 'radicacion' && (<>
                  <div className="sm:col-span-2">
                    <label htmlFor="zonaR" className={labelCls}>Zona de destino</label>
                    <select id="zonaR" value={campos.zona} onChange={e => actualizarCampo('zona', e.target.value)} className={inputCls(errores.zona)}>
                      {Object.entries(TARIFAS_CONFIG.zonas).map(([k, v]) => (
                        <option key={k} value={k}>{k} — {v}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="copias" className={labelCls}>N.° copias adicionales</label>
                    <input id="copias" type="number" min="0" step="1" placeholder="0"
                      value={campos.copias} onChange={e => actualizarCampo('copias', e.target.value)}
                      className={inputCls(errores.copias)} />
                    {errores.copias && <p className={errCls}>{errores.copias}</p>}
                  </div>
                </>)}

                {/* ── Firma de Documentos ── */}
                {cotizadorTipo === 'firma' && (<>
                  <div className="sm:col-span-2">
                    <label htmlFor="zonaF" className={labelCls}>Zona de destino</label>
                    <select id="zonaF" value={campos.zona} onChange={e => actualizarCampo('zona', e.target.value)} className={inputCls(errores.zona)}>
                      {Object.entries(TARIFAS_CONFIG.zonas).map(([k, v]) => (
                        <option key={k} value={k}>{k} — {v}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="copiasF" className={labelCls}>N.° copias adicionales</label>
                    <input id="copiasF" type="number" min="0" step="1" placeholder="0"
                      value={campos.copias} onChange={e => actualizarCampo('copias', e.target.value)}
                      className={inputCls(errores.copias)} />
                    {errores.copias && <p className={errCls}>{errores.copias}</p>}
                  </div>
                </>)}

              </div>

              {/* ── Botón Calcular ── */}
              <button
                onClick={calcular}
                aria-label="Calcular cotización del envío"
                className="mt-6 w-full py-4 bg-gold text-navy font-bold rounded-xl hover:bg-gold-light hover:shadow-[0_6px_20px_rgba(245,184,0,0.35)] transition-all hover:scale-[1.01] text-base"
              >
                Calcular cotización
              </button>

              {/* ── Resultado ── */}
              {resultado && (
                <div className="mt-6 anim-fade">
                  <div className="bg-navy rounded-2xl p-6 sm:p-8">

                    {/* Total */}
                    <p className="text-white/50 text-xs uppercase tracking-widest mb-1">Cotización estimada</p>
                    <p className="font-display text-4xl sm:text-5xl font-extrabold text-gold mb-6 leading-none">
                      {formatCOP(resultado.total)}
                    </p>

                    {/* Desglose */}
                    <div className="h-px bg-white/10 mb-4" />
                    <div className="space-y-2.5 mb-4">
                      {resultado.desglose.map(({ label, valor }) => (
                        <div key={label} className="flex items-center justify-between gap-4">
                          <span className="text-white/60 text-sm">{label}</span>
                          <span className="text-white font-semibold text-sm tabular-nums flex-shrink-0">{formatCOP(valor)}</span>
                        </div>
                      ))}
                    </div>

                    {/* Info de peso volumétrico (solo mercancía) */}
                    {resultado.pesoLiquidar !== null && (
                      <p className="text-white/35 text-xs mb-4 leading-relaxed">
                        Peso volumen: {resultado.pesoVolumen.toFixed(2)} kg
                        {' · '}
                        Peso a liquidar: {Number.isInteger(resultado.pesoLiquidar)
                          ? resultado.pesoLiquidar
                          : resultado.pesoLiquidar.toFixed(2)} kg
                        {' '}(máximo entre peso real, volumétrico y mínimo {TARIFAS_CONFIG.constantes.pesoMinimoMercanciaKg} kg)
                      </p>
                    )}

                    {/* Nota asesor (solo mercancía) */}
                    {resultado.nota && (
                      <p className="text-gold-light/70 text-xs mb-4 leading-relaxed italic">{resultado.nota}</p>
                    )}

                    <div className="h-px bg-white/10 mb-4" />

                    {/* Nota orientativa — siempre visible */}
                    <p className="text-white/35 text-xs mb-5 leading-relaxed">
                      {SITE_CONTENT.cotizador.notaOrientativa}
                    </p>

                    {/* CTA WhatsApp */}
                    <a
                      href={buildWaUrl(buildMensajeWa(cotizadorTipo, campos, resultado))}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full px-6 py-3.5 bg-wp text-white font-bold rounded-xl hover:bg-[#20bd5a] transition-all hover:scale-[1.02] hover:shadow-[0_6px_20px_rgba(37,211,102,0.35)] text-sm"
                    >
                      <MessageCircle className="w-5 h-5 flex-shrink-0" />
                      Solicitar este envío por WhatsApp
                    </a>
                  </div>
                </div>
              )}

            </div>

            {/* Vigencia de tarifas */}
            <p className="text-muted text-xs text-center mt-4">
              Tarifas vigentes: {TARIFAS_CONFIG.vigencia}
            </p>
          </div>

        </div>
      </section>


      {/* ══════════════════════════════════════════════════════
          FOOTER (Fase 1)
          ══════════════════════════════════════════════════════ */}
      <footer className="relative bg-navy-dark text-white overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-gold" />
        <div className="absolute top-0 left-0 w-72 h-28"
          style={{ background: 'var(--amarillo)', clipPath: 'polygon(0 0, 100% 0, 55% 100%, 0 100%)', opacity: 0.08 }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Box className="w-7 h-7 text-gold flex-shrink-0" strokeWidth={2.5} />
                <span className="text-xl font-bold font-display">
                  <span className="text-gold">GO</span><span className="text-white">BOX</span>
                </span>
                <span className="text-white/35 text-sm font-medium">S.A.S.</span>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">{SITE_CONTENT.marca.esloganFooter}</p>
            </div>
            <div>
              <h3 className="text-gold font-semibold text-xs uppercase tracking-widest mb-5">Navegación</h3>
              <ul className="space-y-2.5">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <button onClick={() => irA(link.href)} className="text-white/50 hover:text-gold text-sm transition-colors">
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-gold font-semibold text-xs uppercase tracking-widest mb-5">Contáctanos</h3>
              <ul className="space-y-3">
                <li>
                  <a href={CONTACTO.instagramUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-white/50 hover:text-gold text-sm transition-colors">
                    <Instagram className="w-4 h-4 text-gold flex-shrink-0" />Instagram · {CONTACTO.instagram}
                  </a>
                </li>
                <li>
                  <a href={CONTACTO.whatsappUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2.5 text-white/50 hover:text-gold text-sm transition-colors">
                    <Phone className="w-4 h-4 text-gold flex-shrink-0" />{CONTACTO.whatsapp}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${CONTACTO.email}`}
                    className="flex items-center gap-2.5 text-white/50 hover:text-gold text-sm transition-colors">
                    <Mail className="w-4 h-4 text-gold flex-shrink-0" />{CONTACTO.email}
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-white/30 text-xs">{SITE_CONTENT.footer.derechos}</p>
            <p className="text-white/20 text-xs">Logística inteligente · Colombia</p>
          </div>
        </div>
      </footer>

      {/* ══════════════════════════════════════════════════════
          BOTÓN FLOTANTE WHATSAPP (Fase 7)
          Siempre visible, posición fija, pulso permanente.
          No interfiere con contenido en ningún breakpoint.
          ══════════════════════════════════════════════════════ */}
      <a
        href={buildWaUrl(CONTACTO.mensajeDefault)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contactar por WhatsApp"
        className="wa-pulse fixed bottom-6 right-6 z-50 w-14 h-14 bg-wp rounded-full flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-200"
      >
        <MessageCircle className="w-7 h-7 text-white" strokeWidth={2} />
      </a>

    </div>
  )
}
