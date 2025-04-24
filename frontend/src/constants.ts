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
  CATEGORIES: {
    ALL: 'categories',
  },
  ITEMS: {
    ALL: 'items',
    BY_CATEGORY_ID: 'items/category/{cat_id}',
  },
  LISTS: {
    SAVE: 'lists',
    OWN: 'lists/self',
  },
}

export const PINIA_STORE_KEYS = {
  AUTH: 'auth',
  USER: 'user',
  ONBOARDING: 'onboarding',
  LOADER: 'loader',
  HTTP_REQUESTS: 'http-requests',
  LIST: 'list',
  CATEGORY: 'category',
  ITEM: 'item',
}

export const SNACKBAR_DURATION = 5000

export const BUS_EVENTS = {
  SNACKBAR: 'bus-events:snackbar',
}
