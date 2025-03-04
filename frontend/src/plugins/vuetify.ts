import { VDateInput } from 'vuetify/labs/VDateInput'
import 'vuetify/styles'
import type { ThemeDefinition } from 'vuetify'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import '@mdi/font/css/materialdesignicons.css'

const customDefaultTheme: ThemeDefinition = {
  dark: false,
  colors: {
    background: '#f8eee5',
    'on-background': '#0e2a37',
    surface: '#c19d85',
    primary: '#0e2a37',
    secondary: '#5e9fd3',
    'on-secondary': '#f8eee5',
    error: '#b00020',
    info: '#2196f3',
    success: '#4caf50',
    warning: '#fbbc00',
  },
}

export default createVuetify({
  components: {
    VDateInput,
  },
  theme: {
    defaultTheme: 'customDefaultTheme',
    themes: {
      customDefaultTheme,
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  defaults: {
    VTextField: {
      bgColor: 'white',
      color: 'primary',
      variant: 'outlined',
      density: 'compact',
      hideDetails: 'auto',
    },
    VTextarea: {
      bgColor: 'white',
      color: 'primary',
      variant: 'outlined',
      density: 'compact',
      hideDetails: 'auto',
    },
    VSelect: {
      color: 'primary',
      variant: 'outlined',
      density: 'compact',
      hideDetails: 'auto',
    },
    VDateInput: {
      variant: 'outlined',
      density: 'compact',
      hideDetails: 'auto',
    },
    VDatePicker: {
      bgColor: 'white',
      color: 'primary',
      variant: 'outlined',
      density: 'compact',
      hideDetails: 'auto',
    },
  },
})
