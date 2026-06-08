/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // Fuentes — valores únicos aquí; cambiar un nombre = cambia todo
      fontFamily: {
        sans:    ['"DM Sans"',            'ui-sans-serif', 'sans-serif'],
        display: ['"Plus Jakarta Sans"',  'ui-sans-serif', 'sans-serif'],
      },
      // Colores de marca — leen las CSS vars de :root en index.css
      // Cambiar la paleta: editar solo index.css (:root)
      colors: {
        navy:         'var(--azul-marino)',
        'navy-dark':  'var(--azul-marino-oscuro)',
        'navy-deep':  'var(--azul-marino-intenso)',
        gold:         'var(--amarillo)',
        'gold-light': 'var(--amarillo-claro)',
        surface:      'var(--gris-claro)',
        muted:        'var(--gris-medio)',
        wp:           'var(--verde-whatsapp)',
      },
    },
  },
  plugins: [],
}
