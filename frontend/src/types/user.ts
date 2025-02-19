import type { TNullable } from '@/types/helpers'
import type { User } from 'firebase/auth'

export enum TRAVEL_FREQUENCY {
  FREQUENTLY = 'Frequently',
  OCCASIONALLY = 'Occasionally',
  RARELY = 'Rarely',
}

export enum TRAVEL_PURPOSES {
  BUSINESS = 'Business',
  LEISURE = 'Leisure',
  ADVENTURE = 'Adventure',
  FAMILY = 'Family',
  SOLO = 'Solo',
}

export enum TRAVEL_DESTINATIONS {
  URBAN = 'Urban',
  RURAL = 'Rural',
  COASTAL = 'Coastal',
  MOUNTAINOUS = 'Mountainous',
}

export interface ITravelPreferences {
  frequency?: TRAVEL_FREQUENCY
  purpose?: TRAVEL_PURPOSES[]
  destinations?: TRAVEL_DESTINATIONS[]
}

export enum TRANSPORT_TYPES {
  PLANE = 'Plane',
  BOAT = 'Boat',
  TRAIN = 'Train',
  CAR = 'Car',
  BIKE = 'Bike',
  WALK = 'Walk',
}

export interface IHealthAndSafety {
  allergies?: boolean
  preferred_transport?: TRANSPORT_TYPES
}

export enum PREFERRED_ACTIVITIES {
  HIKING = 'Hiking',
  SWIMMING = 'Swimming',
  SIGHTSEEING = 'Sightseeing',
}

export enum WEATHER_PREFERENCES {
  FREEZING = 'Freezing',
  COLD = 'Cold',
  MILD = 'Mild',
  WARM = 'Warm',
  HOT = 'Hot',
}

export interface ITravelPersonalization {
  favorite_activities?: PREFERRED_ACTIVITIES[]
  weather_preference?: WEATHER_PREFERENCES
}

export enum TRAVEL_COMPANIONS {
  FAMILY = 'Family',
  FRIENDS = 'Friends',
  PETS = 'Pets',
  NO_ONE = 'No one',
}

export interface IAdditionalDetails {
  travel_companions?: TRAVEL_COMPANIONS[]
  // language_preferences: string
  // notification_preferences: string
}

interface IUserPreferences {
  travel_preferences?: ITravelPreferences
  health_safety?: IHealthAndSafety
  personalization?: ITravelPersonalization
  additional_details?: IAdditionalDetails
}

export enum ONBOARDING_STEPS {
  WELCOME = 1,
  TRAVEL_PREFERENCES = 2,
  HEALTH_SAFETY = 3,
  PERSONALIZATION = 4,
  ADDITIONAL_DETAILS = 5,
}

export interface IUser {
  uid: string
  firebase_data?: User
  email: string
  status_id: number
  country_id?: TNullable<number>
  gender?: TNullable<string>
  first_name?: TNullable<string>
  last_name?: TNullable<string>
  birth_date?: TNullable<string>
  preferences?: TNullable<IUserPreferences>
  id: number
  onboarded: boolean
  created_at: string
  updated_at: string
}
