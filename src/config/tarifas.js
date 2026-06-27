// ============================================================
// GOBOX S.A.S. — Tarifas Coordinadora (Calculadora)
// Origen: Bogotá D.C.
//
// REGLA: NUNCA hardcodear números en las funciones de cálculo.
// Toda tarifa, porcentaje o constante vive SOLO en este objeto.
// Cambiar un precio = cambiar UN número en UN solo lugar.
// ============================================================

export const TARIFAS_CONFIG = {

  vigencia: "2025-2026",
  origen:   "Bogotá D.C.",

  // ----------------------------------------------------------
  // ZONAS DE DESTINO
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
  // ----------------------------------------------------------
  docsPaquetes: {
    1: { L: 8040,  R: 9330,  N: 15920, Z: 22990, O: 24610, E: 37630 },
    2: { L: 8040,  R: 9330,  N: 15920, Z: 22990, O: 24610, E: 37630 },
    3: { L: 11450, R: 14350, N: 22700, Z: 30000, O: 36500, E: 54850 },
    4: { L: 14490, R: 17510, N: 26130, Z: 36830, O: 44060, E: 58690 },
    5: { L: 14490, R: 17510, N: 26130, Z: 36830, O: 44060, E: 58690 },
  },

  // ----------------------------------------------------------
  // 2) FLETE VARIABLE — Documentos y Paquetes
  // 1% plano sobre el valor declarado, todas las zonas, sin mínimo.
  // ----------------------------------------------------------
  fleteVariableDocs: {
    todas: { porcentaje: 0.01, minimo: 0 },
  },

  // ----------------------------------------------------------
  // 3) FLETE VARIABLE — Mercancía (+5 kg)
  // ----------------------------------------------------------
  fleteVariableMercancia: {
    local:    { porcentaje: 0.006, minimo: 5930 },
    nacional: { porcentaje: 0.01,  minimo: 8930 },
  },

  // ----------------------------------------------------------
  // 4) RADICACIÓN DE DOCUMENTOS [zona]
  // ----------------------------------------------------------
  radicacionDocs: {
    primerDocumento: { L: 11120, R: 13460, N: 24580, Z: 31140, O: 33940, E: 54120 },
    copiaAdicional:  { L: 1500,  R: 1500,  N: 1500,  Z: 1500,  O: 1500,  E: 1500  },
  },

  // ----------------------------------------------------------
  // 5) FIRMA DE DOCUMENTOS [zona]
  // ----------------------------------------------------------
  firmaDocs: {
    primerDocumento: { L: 13900, R: 16800, N: 30700, Z: 38900, O: 42400, E: 67600 },
    copiaAdicional:  { L: 1500,  R: 1500,  N: 1500,  Z: 1500,  O: 1500,  E: 1500  },
  },

  // ----------------------------------------------------------
  // 6) CONSTANTES DE CÁLCULO
  // ----------------------------------------------------------
  constantes: {
    divisorPesoVolumen:        2500,   // (Largo × Ancho × Alto cm) / 2500
    pesoMinimoMercanciaKg:       30,   // mercancía se liquida mínimo 30 kg
    pesoMaximoDocsPaquetesKg:     5,
    aristaMaxDocs12kgCm:         50,
    valorMaxDeclaradoDocs:   200000,
  },

  // ----------------------------------------------------------
  // 7) MERCANCÍA (+5 kg) — valor por kilo
  // ----------------------------------------------------------
  mercancia: {
    valorPorKiloDefault: 1176,
    notaAsesor: "El valor por kilo depende de la ruta origen-destino. Confirma la tarifa exacta con un asesor de GOBOX.",
  },
}
