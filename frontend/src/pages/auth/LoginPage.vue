<script setup lang="ts">
import AuthMain from '@/components/auth/AuthMain.vue'
import { ref } from 'vue'
import SharedInput from '@/components/shared/forms/SharedInput.vue'
import SharedButton from '@/components/shared/forms/SharedButton.vue'
import { useValidationRules } from '@/composables/useValidationRules.ts'
import { useAuthStore } from '@/stores/auth.ts'

const rules = useValidationRules()

const email = ref('')
const password = ref('')

const emailErrors = ref<string[]>([])
const passwordErrors = ref<string[]>([])

const clearErrors = (field: 'email' | 'password') => {
  if (field === 'email') {
    emailErrors.value = []
  } else if (field === 'password') {
    passwordErrors.value = []
  }
}

const validateEmail = () => {
  clearErrors('email')
  const emailValid = rules.emailRules()[0](email.value)
  if (typeof emailValid === 'string') emailErrors.value.push(emailValid)
}

const validatePassword = () => {
  clearErrors('password')
  const passwordValid = rules.passwordRules()[0](password.value)
  if (typeof passwordValid === 'string') passwordErrors.value.push(passwordValid)
}

const validate = () => {
  validateEmail()
  validatePassword()

  if (emailErrors.value.length || passwordErrors.value.length) {
    return false
  }
}

const loginUser = () => {
  if (!validate()) return

  useAuthStore().login(email.value, password.value)
}
</script>

<template>
  <AuthMain @submit="loginUser">
    <template #title>Let's get packing!</template>
    <template #fields>
      <SharedInput
        label="Email"
        type="email"
        name="email"
        v-model="email"
        @blur="validateEmail"
        @focus="clearErrors('email')"
        :errors="emailErrors"
      />
      <SharedInput
        label="Password"
        type="password"
        name="password"
        v-model="password"
        @blur="validatePassword"
        @focus="clearErrors('password')"
        :errors="passwordErrors"
      />
    </template>
    <template #actions>
      <SharedButton type="submit" class="btn-primary btn-login">Login</SharedButton>
    </template>
    <template #footer>
      <p class="register-invitation">
        Don't have an account? <router-link :to="{ name: 'Register' }">Sign up</router-link>
      </p>
      <p class="forgot-password">
        Forgot password? <router-link :to="{ name: 'Forgot Password' }">Recover it here</router-link>
      </p>
    </template>
  </AuthMain>
</template>

<style lang="sass">
@import '@/assets/sass/vars/colors'
@import '@/assets/sass/vars/spacers'
@import '@/assets/sass/vars/typography'

.auth-section
  .auth-section__form
    .btn-login
      width: 100%

  .register-invitation
    color: var(--surface)

  .forgot-password
    color: var(--surface)
    margin-top: $spacer-md
    font-size: $font-size-md
</style>
