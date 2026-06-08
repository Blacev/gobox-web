# DOCUMENTO MAESTRO — Desarrollo Página Web GOBOX S.A.S.

## Instrucciones para Claude Code

> **IMPORTANTE:** Este documento contiene las instrucciones completas para desarrollar la página web de GOBOX S.A.S. Ejecuta **una fase a la vez** en orden secuencial. Al terminar cada fase, muestra el resultado y espera confirmación antes de avanzar a la siguiente. Cada fase construye sobre la anterior.

---

## Contexto del Proyecto

**Empresa:** GOBOX S.A.S.
**Sector:** Tercerización logística de envíos nacionales en Colombia.
**Público objetivo:** Emprendedores, e-commerce, comerciantes, mayoristas, distribuidores e importadores colombianos.
**Tipo de página:** Single-page informativa e interactiva (NO transaccional). Sin backend, sin formularios funcionales, sin pasarelas de pago.
**Tecnología:** React (JSX) con Tailwind CSS. Componente único con export default. Sin props requeridos.
**Idioma:** Español (Colombia).
**Tono:** Profesional, cercano, confiable, orientado a negocios.

---

## Principio de Mantenibilidad (REGLA TRANSVERSAL — aplica a TODAS las fases)

La página debe ser **fácil de modificar y actualizar** por alguien con conocimientos básicos, sin tener que buscar entre el JSX. Para lograrlo:

1. **Contenido centralizado.** Todo el texto, listas y datos editables van en **objetos de configuración al inicio del archivo** (o en una carpeta `src/config/`), NO incrustados directamente en el JSX. Como mínimo, crear:
   - `SITE_CONTENT` → todos los textos (hero, ¿quiénes somos?, misión, visión, compromiso, CTA, etc.).
   - `CONTACTO` → Instagram, WhatsApp, email, número `wa.me`.
   - `SERVICIOS_OPERATIVOS`, `VENTAJAS`, `SERVICIOS`, `CLIENTES` → arrays de objetos `{ icono, titulo, descripcion }` que se renderizan con `.map()`.
   - `TARIFAS_CONFIG` → todas las tarifas de la calculadora (ver Fase 6).
2. **Renderizado por datos.** Las tarjetas, accordions y listas se generan iterando sobre esos arrays con `.map()`. Agregar/quitar un servicio = editar el array, no tocar el JSX.
3. **Colores centralizados.** Definir la paleta como **variables CSS** (`:root { --azul-marino: #1B2A4A; --amarillo: #F5B800; ... }`) o como tokens reutilizables, para cambiar la identidad en un solo lugar.
4. **Un solo número de WhatsApp y datos de contacto**, leídos desde `CONTACTO` en todos los botones y el footer.
5. **Código comentado y ordenado**, con secciones claramente separadas y nombres en español descriptivos.

> Esta regla es prioritaria: cualquier valor que la clienta pueda querer cambiar a futuro (precios, textos, contactos, colores, servicios) debe estar en un lugar único y evidente.

---

## Identidad Visual (basada en el material corporativo oficial de GOBOX)

### Paleta de colores OFICIAL de marca

La identidad de GOBOX combina **azul marino oscuro** con **amarillo/dorado** como color de marca insignia. Esta es la paleta que debe usarse:

| Color | Hex | Uso |
|-------|-----|-----|
| Azul marino oscuro (primario) | `#1B2A4A` / `#14223D` | Fondos de hero, navbar sólido, footer, secciones oscuras, títulos sobre fondo claro |
| Azul marino intenso (variante) | `#0F1B33` | Sombras profundas, gradientes, overlays |
| Amarillo/Dorado (acento principal) | `#F5B800` / `#FFC20E` | Acentos, botones primarios, íconos destacados, subrayados, palabra "GO" del logo, badges |
| Amarillo claro (acento suave) | `#FFD54A` | Hover de elementos amarillos, degradados sutiles |
| Blanco | `#FFFFFF` | Fondos claros, tarjetas, texto sobre fondo oscuro |
| Gris muy claro | `#F4F6F9` | Fondos de sección alternos |
| Gris medio | `#64748B` | Texto secundario, descripciones |
| Verde WhatsApp | `#25D366` | Solo para el botón/flotante de WhatsApp |

> **Regla de oro de la marca:** El contraste **azul marino + amarillo** es la firma visual de GOBOX. El amarillo se usa como acento de alto impacto (no como fondo dominante de grandes áreas), y el azul marino domina los fondos oscuros. El texto de cuerpo sobre fondo claro va en azul marino o gris; nunca en amarillo (mal contraste).

### Lenguaje de diseño característico (firma visual de GOBOX)

El material corporativo usa **cortes diagonales angulares** como elemento de diseño distintivo. Replicar este estilo:
- **Formas diagonales / cortes en ángulo** en los bordes de las secciones (usar `clip-path` con polígonos diagonales, o pseudo-elementos rotados).
- **Bandas/franjas diagonales** amarillas y azul marino que cruzan las secciones.
- **Tarjetas con esquina o borde acentuado en amarillo** (ej. borde izquierdo amarillo grueso, o esquina con triángulo amarillo).
- **Títulos de sección con franja/banda de fondo** (texto blanco o azul sobre banda amarilla o azul marino, en estilo "etiqueta cortada").
- Separadores de sección en diagonal en lugar de líneas rectas horizontales.

### Tipografía
- Usar Google Fonts distintivas y modernas. Sugerencias: **"Plus Jakarta Sans"** o **"Outfit"** para títulos (bold, con carácter), **"DM Sans"** para cuerpo. NO usar Inter, Roboto ni Arial.
- Los títulos pueden ir en **itálica bold** para acercarse al estilo del material corporativo (los títulos del material usan cursiva fuerte tipo "Nuestra **Misión**").

### Logo
- Texto "GOBOX" donde **"GO" va en amarillo** y **"BOX" en azul marino** (sobre fondo claro) o **blanco** (sobre fondo oscuro).
- Opcionalmente acompañar con un ícono de cubo/caja estilizado (lucide-react: `Box` o `Package`) en amarillo a la izquierda del texto, simulando el isotipo "GB" del material oficial.

### Iconografía
- Usar **lucide-react** para todos los íconos. Íconos sobre fondo circular o cuadrado amarillo con símbolo azul marino, o viceversa.

### Estilo general
- Moderno, limpio, profesional, con gradientes azul marino, sombras suaves, bordes redondeados combinados con los cortes diagonales angulares.
- Animaciones de entrada al scroll (fade-in, slide-up).
- Diseño **mobile-first**, perfectamente responsive.

---

## Datos de Contacto Oficiales (usar en footer, CTA y botón de WhatsApp)

| Canal | Dato |
|-------|------|
| Instagram | @gobox.sas.co |
| WhatsApp / Teléfono | 311 544 0330 → link: `https://wa.me/573115440330` |
| Email | Logistica@goboxsas.company |

> El número de WhatsApp ya es real (`573115440330`). Usarlo en el botón flotante y en el CTA de "Contactar por WhatsApp".

---

## FASE 1 — Estructura base y Hero Section

### Objetivo
Crear el componente React principal con la estructura base y la sección Hero completa.

### Instrucciones

1. Crea un componente React funcional con export default.
2. Importa los íconos necesarios de `lucide-react`.
3. Implementa el **Header/Navbar** fijo en la parte superior:
   - Logo "GOBOX" a la izquierda ("GO" amarillo, "BOX" blanco/azul según el fondo) + ícono de cubo amarillo.
   - Menú de navegación a la derecha con links internos: "Inicio", "Nosotros", "Servicios", "¿Por qué GOBOX?", "Contacto".
   - En mobile: menú hamburguesa que despliega un sidebar o dropdown con fondo azul marino.
   - Navbar transparente al inicio; al hacer scroll cambia a fondo **azul marino sólido con blur**.

4. Implementa la **Hero Section**:
   - Ocupar viewport completo o casi completo (min-height: 100vh o 90vh).
   - Fondo **azul marino oscuro** con **elementos diagonales amarillos** (franjas/cortes en las esquinas, estilo material corporativo). Usar `clip-path` o formas absolutas para las diagonales.
   - Contenido:
     - Badge superior con fondo amarillo y texto azul marino: "Soluciones inteligentes en logística y envíos"
     - Título principal (h1, blanco, bold): **"Tu aliado estratégico en logística y envíos nacionales"** — destacar palabras clave en amarillo.
     - Subtítulo (gris claro/blanco): **"Simplificamos la logística para que tú te enfoques solo en vender"**
     - Párrafo descriptivo: "En GOBOX S.A.S. conectamos empresas distribuidoras, comerciantes y emprendedores con una de las principales transportadoras del país, ofreciendo solución logística eficiente, económica y completamente acompañada."
     - Dos botones CTA: "Solicitar información" (primario: fondo amarillo, texto azul marino) y "Conoce nuestros servicios" (secundario: borde amarillo/blanco, texto blanco, transparente).
   - Animaciones de entrada: fade-in escalonado para cada elemento del hero.
   - Indicador de scroll animado (flecha amarilla con bounce) en la parte inferior.

5. Implementa el **Footer**:
   - Fondo azul marino oscuro.
   - Logo "GOBOX S.A.S." ("GO" amarillo).
   - Eslogan: "Logística inteligente para empresas que quieren crecer."
   - Datos de contacto: Instagram @gobox.sas.co · WhatsApp 311 544 0330 · Logistica@goboxsas.company (con íconos amarillos).
   - Links de sección y año actual dinámico.
   - Detalle decorativo: franja diagonal amarilla superior.

### Estado del componente
- `useState`: menú mobile abierto/cerrado, posición de scroll para el navbar.
- `useEffect`: listener de scroll.

### Resultado esperado
Página con navbar responsive, hero impactante en azul marino + amarillo con diagonales, y footer con contacto. Secciones intermedias vacías (se llenan después).

---

## FASE 2 — Sección "¿Quiénes somos?" + Misión y Visión

### Objetivo
Agregar la sección institucional con la presentación de la empresa, misión y visión (contenido del material corporativo).

### Instrucciones

1. Crear sección **"¿Quiénes somos?"** con `id="nosotros"`. Fondo gris muy claro o blanco.
2. Encabezado:
   - Subtítulo pequeño en amarillo: "CONÓCENOS"
   - Título: "¿Quiénes somos?"
3. Párrafos de presentación:
   - "GOBOX S.A.S. es una empresa especializada en logística de envíos, enfocada en brindar **soluciones eficientes**, seguras y optimizadas para empresas que necesitan gestionar sus despachos de manera profesional."
   - "Trabajamos como **aliados estratégicos** de nuestros clientes, encargándonos de toda la gestión logística para que puedan enfocarse en hacer crecer su negocio."
   - (Resaltar en azul marino bold las frases marcadas.)

4. Debajo, dos tarjetas lado a lado (en mobile apiladas): **Misión** y **Visión**, en estilo del material corporativo (título con la segunda palabra en amarillo cursiva, subrayado amarillo):

   - **Nuestra _Misión_** (tarjeta con fondo azul marino, texto blanco, acento amarillo)
     "Brindar soluciones logísticas confiables, eficientes y rentables, garantizando trazabilidad, control y atención personalizada en cada envío."

   - **Nuestra _Visión_** (tarjeta blanca con borde/acento amarillo, texto azul marino)
     "Convertirnos en una empresa referente en gestión logística a nivel nacional, destacándonos por nuestra eficiencia operativa, transparencia y servicio al cliente."

5. Animaciones de entrada al scroll (fade-in + slide-up) con delay escalonado.

### Resultado esperado
Sección institucional con presentación de la empresa y tarjetas de Misión/Visión en el estilo visual de marca.

---

## FASE 3 — Sección "¿Qué hacemos?" (servicios operativos)

### Objetivo
Mostrar los servicios operativos de GOBOX en un grid de tarjetas.

### Instrucciones

1. Crear sección **"¿Qué hacemos?"** con `id="que-hacemos"`.
2. Encabezado:
   - Subtítulo pequeño amarillo: "NUESTRO TRABAJO"
   - Título: "¿Qué hacemos?"
   - Línea: "GOBOX S.A.S. actúa como intermediario logístico entre tu empresa y la transportadora. Nos encargamos de:"

3. Grid de 8 tarjetas con los servicios operativos. Cada tarjeta: ícono (lucide-react) + título.

   | Servicio | Ícono sugerido |
   |----------|---------------|
   | Generación de guías de envío | FileText |
   | Seguimiento permanente de cada paquete | PackageSearch |
   | Monitoreo en tiempo real de los despachos | Activity |
   | Gestión y solución rápida de novedades | Zap |
   | Actualización de direcciones y datos de entrega | MapPin |
   | Atención personalizada para cada envío | UserCheck |
   | Acompañamiento durante todo el proceso logístico | Route |
   | Optimización de costos de transporte | BadgeDollarSign |

4. Layout: Desktop 4 columnas · Tablet 2 columnas · Mobile 1 columna.

5. Diseño de tarjeta (estilo marca):
   - Fondo blanco, sombra suave, borde redondeado.
   - **Ícono sobre fondo circular o cuadrado amarillo** con símbolo en azul marino.
   - Opcional: borde superior o izquierdo en amarillo (acento angular).
   - Hover: elevación + sombra más pronunciada + el borde/ícono se intensifica.
   - Animación de entrada al viewport con delay escalonado.

6. Texto de cierre debajo del grid (puede ir en una banda azul marino con texto blanco):
   "Gracias a nuestra relación directa con la transportadora, podemos brindar respuestas más rápidas y soluciones más eficientes ante cualquier situación que pueda presentarse."

7. Implementar **Intersection Observer** (hook `useInView`) para las animaciones.

### Resultado esperado
Grid de tarjetas de servicios animadas con la estética azul marino + amarillo.

---

## FASE 4 — Secciones Accordion (Botones Desplegables)

### Objetivo
Implementar las secciones de información expandible con accordions.

### Instrucciones

1. Crear sección con `id="por-que-gobox"`. Encabezado:
   - Subtítulo amarillo: "DESCUBRE MÁS"
   - Título: "Todo lo que necesitas saber"

2. Implementar 4 paneles accordion:
   - Botón con título + chevron amarillo que rota al abrir.
   - Contenido expandible con animación suave (max-height / transición).
   - Solo un panel abierto a la vez. Estado con `useState`.
   - Panel activo con **borde izquierdo amarillo** y/o título resaltado.

3. **Accordion 1 — "¿Por qué elegir GOBOX?"** (6 ventajas, según material corporativo)
   - **Control total de tus envíos** (Eye / Monitor) — "Visibilidad y manejo completo de cada despacho de principio a fin."
   - **Reducción de carga operativa** (Layers / Briefcase) — "Nos encargamos de la gestión para que tu equipo libere tiempo y recursos."
   - **Ahorro en costos logísticos** (BadgeDollarSign / PiggyBank) — "Al formar parte de nuestra red, accedes a condiciones más competitivas para tus envíos nacionales."
   - **Seguimiento constante** (Radar / MapPin) — "Monitoreamos cada envío para garantizar que llegue correctamente a su destino."
   - **Atención personalizada** (HeartHandshake / Users) — "Acompañamiento directo y especializado, sin múltiples canales de servicio."
   - **Transparencia y organización** (ShieldCheck / ClipboardCheck) — "Procesos claros y ordenados que generan confianza en cada operación."

4. **Accordion 2 — "Nuestros servicios"** (5 servicios, según material corporativo)
   - **Gestión y emisión de guías** (FileText) — "Generamos y gestionamos cada guía de envío, con control administrativo y digital de cada despacho, reduciendo errores operativos."
   - **Seguimiento personalizado** (Navigation / PackageSearch) — "Monitoreo constante de cada guía, reportes de estado y alertas ante cualquier incidencia."
   - **Coordinación de recojos** (Truck / CalendarClock) — "Programación eficiente de recojos, coordinación directa con transportadoras y optimización de tiempos."
   - **Atención al cliente y soporte** (Headphones / LifeBuoy) — "Atención personalizada, gestión de reclamos y soporte continuo."
   - **Optimización de costos** (TrendingDown / Calculator) — "Consolidación estratégica de envíos, negociación con transportadoras y reducción de costos logísticos para nuestros clientes."

5. **Accordion 3 — "¿A quiénes atendemos?"** (perfil de clientes, según material corporativo)
   Lista con check amarillo:
   - E-commerce
   - Empresas comerciales
   - Distribuidores
   - Importadores
   - Empresas que manejan envíos recurrentes

6. **Accordion 4 — "Únete a nuestra red logística"**
   "Si realizas envíos frecuentes a nivel nacional y buscas una solución más eficiente, económica y respaldada por expertos, GOBOX S.A.S. es el aliado que necesitas. Forma parte de nuestra red y descubre una nueva manera de gestionar la logística de tu negocio."
   - Botón CTA: "Quiero unirme" → `https://wa.me/573115440330`.

### Diseño de accordions
- Paneles con fondo blanco / gris muy claro, bordes sutiles.
- Panel activo con borde izquierdo amarillo.
- Animación suave (300ms ease). Chevron rota 180° al abrir.

### Resultado esperado
4 paneles desplegables funcionales y animados con todo el contenido del material corporativo.

---

## FASE 5 — Sección "Nuestro Compromiso" + CTA Principal

### Objetivo
Agregar el bloque de compromiso de marca y la sección de llamados a la acción con los 5 botones principales.

### Instrucciones

#### A) Bloque "Nuestro Compromiso" (del material corporativo)
1. Banda/sección con fondo azul marino y diagonal amarilla.
2. Título: "Nuestro **Compromiso**" (segunda palabra en amarillo).
3. Texto:
   - "En GOBOX no solo gestionamos envíos, gestionamos la confianza de nuestros clientes."
   - "Cada guía representa una **responsabilidad**, y cada entrega, nuestro **compromiso cumplido**."

#### B) Sección CTA Principal
1. Crear sección CTA con `id="contacto"`.
2. Diseño: fondo azul marino con elementos diagonales amarillos decorativos. Contenido centrado.
3. Encabezado:
   - Título: "¿Listo para optimizar la logística de tu negocio?"
   - Subtítulo: "Da el primer paso y conecta con nuestro equipo."

4. Implementar los **5 botones CTA** en grid responsivo:

   | Botón | Ícono | Estilo | Acción |
   |-------|-------|--------|--------|
   | Solicitar información | Info / Mail | Primario (fondo amarillo, texto azul marino) | visual o link |
   | Agendar reunión | Calendar | Primario amarillo | visual o link |
   | Unirme a la red GOBOX | UserPlus | Primario amarillo | visual o link |
   | Cotizar mis envíos | Calculator | Primario amarillo | scroll a la sección Calculadora (`#cotizador`) |
   | Contactar por WhatsApp | MessageCircle | Verde WhatsApp `#25D366` | `https://wa.me/573115440330` (target _blank) |

5. Layout: Desktop fila de 5 o grid 3+2 · Tablet 2 columnas · Mobile columna única.
6. Cada botón: grande y táctil (min-height 48px), ícono + texto, hover con escala sutil y cambio de sombra, bordes redondeados.
7. Debajo, datos de contacto directos: Instagram @gobox.sas.co · WhatsApp 311 544 0330 · Logistica@goboxsas.company.
8. Texto de confianza: "GOBOX S.A.S. — Tu socio logístico de confianza."

### Resultado esperado
Bloque de compromiso de marca + sección CTA impactante con los 5 botones, en la paleta azul marino + amarillo.

---

## FASE 6 — Calculadora de Cotizaciones de Envíos

### Objetivo
Agregar una **calculadora interactiva de cotizaciones** que estime el costo de un envío según las tarifas reales de Coordinadora usadas por GOBOX. Es una herramienta **informativa/orientativa**: calcula y muestra en pantalla, NO procesa pagos, NO genera guías, NO envía datos a ningún servidor. Todo el cálculo ocurre en el cliente (frontend).

> 📌 **Fuente de datos:** Todas las tarifas, porcentajes y constantes salen del archivo `GOBOX_Tarifas_Coordinadora.xlsx` (hoja `Parametros_Calculadora`). **Estos valores DEBEN vivir en un único objeto de configuración** (`TARIFAS_CONFIG`) al inicio del archivo (o en `src/config/tarifas.js`), para que actualizar un precio sea cambiar UN número en UN solo lugar. Ver "Principio de Mantenibilidad" al inicio del documento.

### 6.1 — Objeto de configuración `TARIFAS_CONFIG`

Crear este objeto con TODOS los valores del Excel. Cada bloque corresponde a una tabla de la hoja `Parametros_Calculadora`:

```js
const TARIFAS_CONFIG = {
  // Última actualización de tarifas (mostrar en la UI para transparencia)
  vigencia: "2025",

  // Zonas de destino (código → nombre legible para el select)
  zonas: {
    L: "Local (misma ciudad / poblaciones locales)",
    R: "Regional (misma región geográfica)",
    N: "Nacional (entre regiones principales)",
    Z: "Zonal (zonas intermedias)",
    O: "Otras (poblaciones alejadas)",
    E: "Destinos Especiales (remotos)",
  },

  // 1) FLETE FIJO — Documentos y Paquetes 1–5 kg [peso_kg][zona]
  docsPaquetes: {
    1: { L: 6950,  R: 8400,  N: 15350, Z: 19450, O: 22900, E: 36500 },
    2: { L: 9300,  R: 11350, N: 18900, Z: 24850, O: 30000, E: 45800 },
    3: { L: 11450, R: 14350, N: 22700, Z: 30000, O: 36500, E: 54850 },
    4: { L: 14350, R: 17050, N: 26350, Z: 35950, O: 44400, E: 64050 },
    5: { L: 16750, R: 19650, N: 28950, Z: 41250, O: 50850, E: 73100 },
  },
  // 2) FLETE VARIABLE — Documentos y Paquetes
  fleteVariableDocs: {
    estandar:  { porcentaje: 0.01, minimo: 580 },  // zonas L,R,N,Z,O
    especial:  { porcentaje: 0.02, minimo: 865 },  // zona E
  },

  // 3) FLETE VARIABLE — Mercancía (+5 kg)
  fleteVariableMercancia: {
    local:    { porcentaje: 0.006, minimo: 5930 },
    nacional: { porcentaje: 0.01,  minimo: 8930 }, // Nacional/RE/RA/TE
  },

  // 4) CARGA AÉREA (por trayecto)
  cargaAerea: {
    trayecto1: { base6kg: 82000,  kgAdicional: 12750, varPorcentaje: 0.02, varMinimo: 790 },
    trayecto2: { base6kg: 153400, kgAdicional: 14600, varPorcentaje: 0.02, varMinimo: 790 },
  },

  // 5) RADICACIÓN DE DOCUMENTOS [zona]
  radicacionDocs: {
    primerDocumento: { L: 11120, R: 13460, N: 24580, Z: 31140, O: 33940, E: 54120 },
    copiaAdicional:  { L: 1500,  R: 1500,  N: 1500,  Z: 1500,  O: 1500,  E: 1500 },
  },

  // 6) FIRMA DE DOCUMENTOS [zona]
  firmaDocs: {
    primerDocumento: { L: 13900, R: 16800, N: 30700, Z: 38900, O: 42400, E: 67600 },
    copiaAdicional:  { L: 1500,  R: 1500,  N: 1500,  Z: 1500,  O: 1500,  E: 1500 },
  },

  // 7) CONSTANTES DE CÁLCULO
  constantes: {
    divisorPesoVolumen: 2500,       // (Largo×Ancho×Alto cm) / 2500
    pesoMinimoMercanciaKg: 30,      // mercancía se liquida mínimo 30 kg
    pesoMaximoDocsPaquetesKg: 5,
    valorMaxDeclaradoDocs: 200000,
    pesoMaxCargaAereaKg: 70,
    pesoXlRealKg: 50,
    pesoXlVolumenKg: 80,
    aristaXlCm: 150,
  },

  // Mercancía (+5 kg): el "valor por kilo" depende de la ruta origen-destino
  // y NO viene tabulado en el Excel (solo el ejemplo Medellín→Bogotá = $1.055).
  // Por eso, para mercancía el usuario ingresa el valor por kilo o se deriva
  // una cotización aproximada y se invita a confirmar con asesor.
  mercancia: {
    valorPorKiloDefault: 1055,      // valor de ejemplo (editable); idealmente input del usuario
    notaAsesor: "El valor por kilo depende de la ruta. Confirma la tarifa exacta con un asesor.",
  },
};
```

### 6.2 — Tipos de servicio (selector principal)

La calculadora arranca con un selector de **tipo de servicio**, y según la elección muestra los campos relevantes:

| Tipo de servicio | Inputs que se muestran | Cálculo |
|------------------|------------------------|---------|
| **Documentos y Paquetes (1–5 kg)** | Zona destino, Peso (1–5 kg), Valor declarado | Flete Fijo (tabla `docsPaquetes[peso][zona]`) + Flete Variable (`max(% × declarado, mínimo)`; usar `especial` si zona = E, si no `estandar`) |
| **Mercancía (+5 kg)** | Zona/tipo (local o nacional), Peso real (kg), Dimensiones L×A×Al (cm), Valor declarado, Valor por kilo (editable, prellenado con default) | Peso volumen = `(L×A×Al)/2500`; Peso a liquidar = `max(pesoReal, pesoVolumen, 30)`; Flete Fijo = `valorPorKilo × pesoLiquidar`; Flete Variable = `max(% × declarado, mínimo)` según local/nacional. Mostrar nota de asesor. |
| **Carga Aérea** | Trayecto (1 o 2), Peso real (kg, máx 70), Valor declarado | Si peso ≤ 6: base. Si peso ≥ 7: `base6kg + (ceil(peso) − 6) × kgAdicional`. Flete Variable = `max(2% × declarado, 790)`. Total = Fijo + Variable |
| **Radicación de Documentos** | Zona destino, N.º de copias adicionales | `primerDocumento[zona] + copiasAdicionales × copiaAdicional[zona]` |
| **Firma de Documentos** | Zona destino, N.º de copias adicionales | `primerDocumento[zona] + copiasAdicionales × copiaAdicional[zona]` |

> El **Flete Total = Flete Fijo + Flete Variable** en todos los casos que tienen flete variable (Documentos/Paquetes, Mercancía, Carga Aérea). Radicación y Firma solo tienen el costo de la tabla.

### 6.3 — Implementación

1. Crear sección **"Cotiza tus envíos"** con `id="cotizador"`, ubicada justo después de la sección CTA / antes del footer. Encabezado:
   - Subtítulo amarillo: "CALCULA TU ENVÍO"
   - Título: "Cotiza tus envíos en segundos"
   - Descripción: "Estima el costo de tu envío de forma rápida. Esta cotización es orientativa según tarifas vigentes; para la tarifa final, contáctanos."

2. **Función de cálculo:** implementar `calcularCotizacion(tipoServicio, params)` que lea de `TARIFAS_CONFIG` y devuelva `{ fleteFijo, fleteVariable, total, desglose, nota }`. Funciones auxiliares puras y bien separadas por tipo de servicio. **Nunca hardcodear números dentro de las funciones**: siempre leer de `TARIFAS_CONFIG`.

3. **Formulario dinámico:** un select de tipo de servicio + los inputs correspondientes (selects de zona generados desde `TARIFAS_CONFIG.zonas`, inputs numéricos para peso/dimensiones/valor declarado).

4. **Resultado:** al presionar "Calcular cotización":
   - Tarjeta destacada (fondo azul marino, cifra grande en amarillo) con el **Flete Total** formateado en COP (`$ 45.855`).
   - Desglose: Flete Fijo + Flete Variable (y peso liquidado / peso volumen cuando aplique a mercancía).
   - Nota: "Cotización orientativa. El valor final puede variar según condiciones del envío. Contáctanos para confirmar." (Más la `notaAsesor` cuando sea mercancía.)
   - Botón "Solicitar este envío por WhatsApp" → `https://wa.me/573115440330?text=...` con un resumen prellenado (tipo de servicio, zona/destino, peso, valor estimado).

5. **Validaciones:**
   - No calcular con campos vacíos, peso ≤ 0, o copias negativas.
   - Documentos/Paquetes: peso entre 1 y 5 kg (enteros); si supera 5 kg, sugerir cambiar a "Mercancía".
   - Documentos: validar `valorMaxDeclaradoDocs` ($200.000) y mostrar aviso si se excede.
   - Carga Aérea: peso máx 70 kg.
   - Mensajes de error claros y amables bajo cada campo.
   - Formatear todo en COP con separadores de miles (usar `Intl.NumberFormat('es-CO', { style:'currency', currency:'COP', maximumFractionDigits:0 })`).

6. **Diseño (paleta de marca):**
   - Contenedor blanco sobre fondo gris claro, con acento amarillo y detalle diagonal.
   - Inputs/selects limpios, bordes redondeados, focus amarillo/azul marino.
   - Botón "Calcular" primario amarillo con texto azul marino.
   - Animación suave al mostrar el resultado (fade-in / slide-up).
   - Totalmente responsive (inputs apilados en mobile).
   - Mostrar discretamente "Tarifas vigentes: {TARIFAS_CONFIG.vigencia}".

7. **Estado:** `useState` para tipo de servicio, inputs y resultado. Cálculo en cliente, sin fetch ni APIs.

### Resultado esperado
Calculadora funcional con 5 tipos de servicio, que aplica las tarifas reales del Excel desde un único objeto `TARIFAS_CONFIG` fácilmente editable, muestra el desglose y permite continuar por WhatsApp.

### Verificación con ejemplos del Excel
Comprobar que el cálculo coincide con los ejemplos oficiales:
- **Mercancía** Medellín→Bogotá, valor/kilo $1.055, peso a liquidar 35 kg, declarado $200.000 → Flete Fijo $36.925 + Variable $8.930 = **$45.855**.
- **Documentos/Paquetes**: 2 kg a zona Nacional → Fijo $18.900 + Variable `max(1%×declarado, $580)`.

---

## FASE 7 — Pulido Final, Animaciones y Responsive

### Objetivo
Revisión completa, ajustes de diseño, animaciones globales y pruebas de responsividad.

### Instrucciones

1. **Responsividad:** verificar TODAS las secciones en mobile (320–480px), tablet (768px), desktop (1024px+) y desktop grande (1440px+). El texto nunca se desborda; los botones son táctiles; el navbar mobile funciona.

2. **Diagonales responsive:** asegurar que los cortes diagonales (clip-path) se vean bien en todos los anchos y no rompan el layout en mobile (reducir el ángulo o desactivar diagonales muy agresivas en pantallas pequeñas si es necesario).

3. **Animaciones globales:** todas las secciones con animación de entrada al scroll (fade-in + slide-up), una sola vez, suaves (500–700ms ease-out). Accordions con transición fluida.

4. **Smooth scroll:** links de navegación con scroll suave (`scrollIntoView({ behavior: 'smooth' })`). En mobile, cerrar el menú antes de hacer scroll.

5. **Detalles de diseño:** consistencia de colores (azul marino + amarillo), espaciado y tipografía. Contraste adecuado (nunca texto amarillo sobre blanco para cuerpo). Footer con separación clara. **Botón flotante de WhatsApp** fijo en esquina inferior derecha (verde, ícono WhatsApp, animación pulse sutil, link `https://wa.me/573115440330`).

6. **Accesibilidad:** `aria-label` en botones, `aria-expanded` en accordions, contraste correcto, cuerpo mínimo 16px.

7. **Performance:** sin imágenes externas pesadas; animaciones con `transform` y `opacity`.

8. **Calculadora:** verificar que los cálculos coinciden con el Excel, que el formato de moneda (COP) es correcto, que las validaciones funcionan y que el botón de WhatsApp arma bien el mensaje prellenado.

### Resultado esperado
Página completa, pulida, responsive, con animaciones fluidas, navegación funcional y botón flotante de WhatsApp.

---

## Resumen de la Estructura Final

```
┌─────────────────────────────────────┐
│   NAVBAR (azul marino, blur)        │
│  GOBOX  Inicio Nosotros Servicios.. │
├─────────────────────────────────────┤
│           HERO SECTION              │
│  Azul marino + diagonales amarillas │
│   Título + Subtítulo + CTAs         │
├─────────────────────────────────────┤
│        ¿QUIÉNES SOMOS?             │
│   Presentación + Misión + Visión   │
├─────────────────────────────────────┤
│         ¿QUÉ HACEMOS?              │
│   Grid de 8 servicios operativos   │
├─────────────────────────────────────┤
│    ACCORDION (4 paneles)            │
│   1. ¿Por qué elegir GOBOX? (6)    │
│   2. Nuestros servicios (5)        │
│   3. ¿A quiénes atendemos?         │
│   4. Únete a nuestra red           │
├─────────────────────────────────────┤
│   NUESTRO COMPROMISO + CTA          │
│   5 botones de acción              │
├─────────────────────────────────────┤
│        CALCULADORA / COTIZADOR      │
│   Inputs + resultado estimado      │
│   (lógica del Excel)               │
├─────────────────────────────────────┤
│   FOOTER (azul marino + contacto)   │
└─────────────────────────────────────┘
  [🟢 WhatsApp flotante]
```

---

## Contenido Textual Completo (Referencia Rápida)

**Eslogan:** "Soluciones inteligentes en logística y envíos."
**Cierre/Footer:** "Logística inteligente para empresas que quieren crecer."

**Hero**
- Título: "Tu aliado estratégico en logística y envíos nacionales"
- Subtítulo: "Simplificamos la logística para que tú te enfoques solo en vender"
- Descripción: "En GOBOX S.A.S. conectamos empresas distribuidoras, comerciantes y emprendedores con una de las principales transportadoras del país, ofreciendo solución logística eficiente, económica y completamente acompañada."

**¿Quiénes somos?**
- "GOBOX S.A.S. es una empresa especializada en logística de envíos, enfocada en brindar soluciones eficientes, seguras y optimizadas para empresas que necesitan gestionar sus despachos de manera profesional."
- "Trabajamos como aliados estratégicos de nuestros clientes, encargándonos de toda la gestión logística para que puedan enfocarse en hacer crecer su negocio."

**Misión:** "Brindar soluciones logísticas confiables, eficientes y rentables, garantizando trazabilidad, control y atención personalizada en cada envío."

**Visión:** "Convertirnos en una empresa referente en gestión logística a nivel nacional, destacándonos por nuestra eficiencia operativa, transparencia y servicio al cliente."

**Cierre "¿Qué hacemos?":** "Gracias a nuestra relación directa con la transportadora, podemos brindar respuestas más rápidas y soluciones más eficientes ante cualquier situación que pueda presentarse."

**Únete a la red:** "Si realizas envíos frecuentes a nivel nacional y buscas una solución más eficiente, económica y respaldada por expertos, GOBOX S.A.S. es el aliado que necesitas. Forma parte de nuestra red y descubre una nueva manera de gestionar la logística de tu negocio."

**Nuestro Compromiso:** "En GOBOX no solo gestionamos envíos, gestionamos la confianza de nuestros clientes. Cada guía representa una responsabilidad, y cada entrega, nuestro compromiso cumplido."

**CTA:** "¿Listo para optimizar la logística de tu negocio?" / "Da el primer paso y conecta con nuestro equipo."

---

## Notas Técnicas para Claude Code

- **Framework:** React JSX con Tailwind CSS. Un solo archivo `.jsx` con export default, sin props requeridos.
- **Estado:** `useState` y `useEffect`.
- **Librerías:** `lucide-react` para íconos. Tailwind para estilos.
- **Diagonales:** usar `clip-path: polygon(...)` para los cortes angulares; definir colores de marca como variables CSS o clases Tailwind arbitrarias (ej. `bg-[#1B2A4A]`, `text-[#F5B800]`).
- **NO usar:** localStorage, sessionStorage, APIs externas, fetch, backend, formularios con submit, bases de datos.
- **Fonts:** cargar Google Fonts vía `@import` en `<style>` dentro del componente.
- **WhatsApp:** `https://wa.me/573115440330` (número real).
- **Todos los textos en español.** No traducir al inglés.
- **Scroll:** `scrollIntoView({ behavior: 'smooth' })` para navegación interna.
- **Animaciones al scroll:** hook `useInView` con `IntersectionObserver`.
