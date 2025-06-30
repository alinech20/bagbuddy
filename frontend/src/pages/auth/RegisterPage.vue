<script setup lang="ts">
import SharedButton from '@/components/shared/forms/SharedButton.vue'
import SharedInput from '@/components/shared/forms/SharedInput.vue'
import AuthMain from '@/components/auth/AuthMain.vue'
import { useValidationRules } from '@/composables/useValidationRules.ts'
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth.ts'

const rules = useValidationRules()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')

const emailErrors = ref<string[]>([])
const passwordErrors = ref<string[]>([])
const confirmPasswordErrors = ref<string[]>([])

const clearAllErrors = () => {
  emailErrors.value = []
  passwordErrors.value = []
  confirmPasswordErrors.value = []
}

const clearErrors = (field: 'email' | 'password' | 'confirm') => {
  if (field === 'email') {
    emailErrors.value = []
  } else if (field === 'password') {
    passwordErrors.value = []
  } else if (field === 'confirm') {
    confirmPasswordErrors.value = []
  }
}

const validateEmail = () => {
  rules.emailRules().forEach((rule) => {
    const result = rule(email.value)
    if (typeof result === 'string') emailErrors.value.push(result)
  })
}

const validatePassword = () => {
  rules.passwordRules().forEach((rule) => {
    const result = rule(password.value)
    if (typeof result === 'string') passwordErrors.value.push(result)
  })
}

const validateConfirmPassword = () => {
  if (confirmPassword.value !== password.value) {
    confirmPasswordErrors.value.push('Passwords do not match')
  }
}

const validate = () => {
  clearAllErrors()
  validateEmail()
  validatePassword()
  validateConfirmPassword()

  if (emailErrors.value.length || passwordErrors.value.length || confirmPasswordErrors.value.length) {
    return false
  }
}

const registerUser = () => {
  if (!validate()) return
  useAuthStore().register(email.value, password.value)
}
</script>

<template>
  <AuthMain @submit="registerUser">
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
      <SharedInput
        label="Confirm Password"
        type="password"
        name="confirmPassword"
        v-model="confirmPassword"
        @blur="validateConfirmPassword"
        @focus="clearErrors('confirm')"
        :errors="confirmPasswordErrors"
      />
    </template>
    <template #actions>
      <SharedButton type="submit" class="btn-primary btn-register">Register</SharedButton>
    </template>
    <template #footer>
      <p class="login-invitation">Already have an account? <router-link :to="{ name: 'Login' }">Login</router-link></p>
      <p class="continue-guest">Continue as guest</p>
    </template>
  </AuthMain>
</template>

<style lang="sass">
@import '@/assets/sass/vars/colors'
@import '@/assets/sass/vars/spacers'
@import '@/assets/sass/vars/typography'

.auth-section
  .auth-section__form
    .btn-register
      width: 100%

  .login-invitation
    color: var(--surface)

  .continue-guest
    margin-top: $spacer-md
    font-size: $font-size-md
</style>
