import 'vuetify/styles'
import type { ThemeDefinition } from 'vuetify'
import { createVuetify } from 'vuetify'

const customDefaultTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#f8eee5',
    'on-background': '#0e2a37',
    surface: '#c19d85',
    primary: '#0e2a37',
    secondary: '#92b4cf',
    'on-secondary': '#f8eee5',
    error: '#b00020',
    info: '#2196f3',
    success: '#4caf50',
    warning: '#fbbc00',
  },
}

export default createVuetify({
  theme: {
    defaultTheme: 'customDefaultTheme',
    themes: {
      customDefaultTheme,
    },
  },
})
