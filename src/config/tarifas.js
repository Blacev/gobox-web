// ============================================================
// GOBOX S.A.S. — Tarifas Coordinadora (Calculadora Fase 6)
// Fuente: GOBOX_Tarifas_Coordinadora.xlsx › Parametros_Calculadora
//
// REGLA: NUNCA hardcodear números en las funciones de cálculo.
// Toda tarifa, porcentaje o constante vive SOLO en este objeto.
// Cambiar un precio = cambiar UN número en UN solo lugar.
// ============================================================

export const TARIFAS_CONFIG = {

  // Última actualización de tarifas (se muestra en la UI)
  vigencia: "2025",

  // ----------------------------------------------------------
  // ZONAS DE DESTINO
  // código → nombre legible para el <select>
  // ----------------------------------------------------------
  zonas: {
    L: "Local (misma ciudad)",
    R: "Regional (misma región)",
    N: "Nacional (entre regiones principales)",
    Z: "Zonal (zonas intermedias)",
    O: "Otras (poblaciones alejadas)",
    E: "Destinos Especiales (remotos)",
  },

  // ----------------------------------------------------------
  // 1) FLETE FIJO — Documentos y Paquetes (1–5 kg)
  // docsPaquetes[peso_kg][zona] → valor en COP
  // ----------------------------------------------------------
  docsPaquetes: {
    1: { L: 6950,  R: 8400,  N: 15350, Z: 19450, O: 22900, E: 36500 },
    2: { L: 9300,  R: 11350, N: 18900, Z: 24850, O: 30000, E: 45800 },
    3: { L: 11450, R: 14350, N: 22700, Z: 30000, O: 36500, E: 54850 },
    4: { L: 14350, R: 17050, N: 26350, Z: 35950, O: 44400, E: 64050 },
    5: { L: 16750, R: 19650, N: 28950, Z: 41250, O: 50850, E: 73100 },
  },

  // ----------------------------------------------------------
  // 2) FLETE VARIABLE — Documentos y Paquetes
  // estandar → zonas L, R, N, Z, O  |  especial → zona E
  // ----------------------------------------------------------
  fleteVariableDocs: {
    estandar: { porcentaje: 0.01, minimo: 580 },
    especial: { porcentaje: 0.02, minimo: 865 },
  },

  // ----------------------------------------------------------
  // 3) FLETE VARIABLE — Mercancía (+5 kg)
  // ----------------------------------------------------------
  fleteVariableMercancia: {
    local:    { porcentaje: 0.006, minimo: 5930 },
    nacional: { porcentaje: 0.01,  minimo: 8930 },
  },

  // ----------------------------------------------------------
  // 4) CARGA AÉREA (por trayecto)
  // ----------------------------------------------------------
  cargaAerea: {
    trayecto1: { base6kg: 82000,  kgAdicional: 12750, varPorcentaje: 0.02, varMinimo: 790 },
    trayecto2: { base6kg: 153400, kgAdicional: 14600, varPorcentaje: 0.02, varMinimo: 790 },
  },

  // ----------------------------------------------------------
  // 5) RADICACIÓN DE DOCUMENTOS [zona]
  // ----------------------------------------------------------
  radicacionDocs: {
    primerDocumento: { L: 11120, R: 13460, N: 24580, Z: 31140, O: 33940, E: 54120 },
    copiaAdicional:  { L: 1500,  R: 1500,  N: 1500,  Z: 1500,  O: 1500,  E: 1500  },
  },

  // ----------------------------------------------------------
  // 6) FIRMA DE DOCUMENTOS [zona]
  // ----------------------------------------------------------
  firmaDocs: {
    primerDocumento: { L: 13900, R: 16800, N: 30700, Z: 38900, O: 42400, E: 67600 },
    copiaAdicional:  { L: 1500,  R: 1500,  N: 1500,  Z: 1500,  O: 1500,  E: 1500  },
  },

  // ----------------------------------------------------------
  // 7) CONSTANTES DE CÁLCULO
  // ----------------------------------------------------------
  constantes: {
    divisorPesoVolumen:      2500,   // (Largo × Ancho × Alto cm) / 2500
    pesoMinimoMercanciaKg:     30,   // mercancía se liquida mínimo 30 kg
    pesoMaximoDocsPaquetesKg:   5,
    valorMaxDeclaradoDocs:  200000,
    pesoMaxCargaAereaKg:       70,
  },

  // ----------------------------------------------------------
  // 8) MERCANCÍA (+5 kg) — valor por kilo
  // ----------------------------------------------------------
  mercancia: {
    valorPorKiloDefault: 1055,
    notaAsesor: "El valor por kilo depende de la ruta origen-destino. Confirma la tarifa exacta con un asesor de GOBOX.",
  },
}
