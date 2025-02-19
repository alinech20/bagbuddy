<script setup lang="ts">
import { Icon } from '@iconify/vue'
import router from '@/router'
import { ref } from 'vue'
import { useValidationRules } from '@/composables/useValidationRules.ts'
import { useAuthStore } from '@/stores/auth.ts'

const registerForm = ref()
const { register } = useAuthStore()
const rules = useValidationRules()

const email = ref('')
const emailRules = rules.emailRules()

const password = ref('')
const passwordRules = rules.passwordRules()

const confirmPassword = ref('')
const confirmPasswordRules = [
  (v: string) => !!v || 'Confirm password is required',
  (v: string) => v === password.value || 'Passwords do not match',
]

const goToLogin = () => {
  router.push({ name: 'Login' })
}

const registerUser = () => {
  registerForm.value.validate().then((res: any) => {
    if (!res.valid) return
    register(email.value, password.value)
  })
}
</script>

<template>
  <v-form
    ref="registerForm"
    class="register-form"
    validate-on="submit lazy"
    @submit.prevent="registerUser"
  >
    <v-card width="360" variant="flat" border>
      <template #title>Register</template>

      <v-card-text class="bg-background pt-4">
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="Email"
          type="text"
        >
          <template #prepend-inner>
            <Icon class="input-icon" icon="mdi:alternate-email" />
          </template>
        </v-text-field>
        <v-text-field
          v-model="password"
          :rules="passwordRules"
          class="mt-4"
          label="Password"
          type="password"
        >
          <template #prepend-inner>
            <Icon class="input-icon" icon="mdi:lock" />
          </template>
        </v-text-field>
        <v-text-field
          v-model="confirmPassword"
          :rules="confirmPasswordRules"
          class="mt-4"
          label="Confirm password"
          type="password"
        >
          <template #prepend-inner>
            <Icon class="input-icon" icon="mdi:lock" />
          </template>
        </v-text-field>
      </v-card-text>
      <v-card-actions class="bg-background d-flex flex-row-reverse">
        <v-btn type="submit" class="bg-secondary">Register</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
  <section class="register-form__secondary-actions d-flex mt-6">
    <v-btn size="xsmall" variant="flat" @click="goToLogin"
      >Already have an account? Login
    </v-btn>
    <v-spacer />
    <v-btn size="xsmall" variant="flat">Continue as guest</v-btn>
  </section>
</template>

<style scoped lang="sass">
.register-form__secondary-actions
  button
    color: var(--v-primary-base)
    font-size: 0.75rem
    text-transform: none
    padding: 0
    margin: 0
    border: none
    background: none

    &:hover
      text-decoration: underline
</style>
