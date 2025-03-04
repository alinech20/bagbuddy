export const API = {
  TIMEOUT: 10000,
  BASE_URL: '/api/',
  AUTH: {
    LOGIN: 'auth/login',
    LOGOUT: 'auth/logout',
    SIGNUP_EMAIL_PASSWORD: 'auth/signup_email_password',
  },
  PROFILE: {
    OWN: 'profile/self',
  },
}

export const PINIA_STORE_KEYS = {
  AUTH: 'auth',
  USER: 'user',
  ONBOARDING: 'onboarding',
  LOADER: 'loader',
  HTTP_REQUESTS: 'http-requests',
}

export const SNACKBAR_DURATION = 5000

export const BUS_EVENTS = {
  SNACKBAR: 'bus-events:snackbar',
}
