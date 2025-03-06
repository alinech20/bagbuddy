<script setup lang="ts">
import { Icon } from '@iconify/vue'
import router from '@/router'
import { ref } from 'vue'
import { useValidationRules } from '@/composables/useValidationRules.ts'
import { useAuthStore } from '@/stores/auth.ts'

const loginForm = ref()
const { login } = useAuthStore()
const rules = useValidationRules()

const email = ref('')
const emailRules = [rules.emailRules()[0]] // use only "required" rule

const password = ref('')
const passwordRules = [rules.passwordRules()[0]] // use only "required" rule

const goToRegister = () => {
  router.push({ name: 'Register' })
}

const loginUser = () => {
  loginForm.value.validate().then((res: any) => {
    if (!res.valid) return
    login(email.value, password.value)
  })
}
</script>

<template>
  <v-form
    ref="loginForm"
    class="login-form"
    validate-on="submit lazy"
    @submit.prevent="loginUser"
  >
    <v-card max-width="600" width="100%" variant="flat" border>
      <template #title>Login</template>

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
      </v-card-text>
      <v-card-actions class="bg-background">
        <v-btn>Forgot password?</v-btn>
        <v-spacer />
        <v-btn type="submit" class="bg-secondary">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
  <section class="login-form__secondary-actions d-flex mt-6">
    <v-btn size="xsmall" variant="flat" @click="goToRegister"
      >No account? Sign up!
    </v-btn>
    <v-spacer />
    <v-btn size="xsmall" variant="flat">Continue as guest</v-btn>
  </section>
</template>

<style lang="sass">
.login-form__secondary-actions
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
