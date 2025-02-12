<script setup lang="ts">
import { Icon } from '@iconify/vue'
import router from '@/router'

const goToLogin = () => {
  router.push({ name: 'Login' })
}
</script>

<template>
  <v-form class="register-form">
    <v-card width="360" variant="flat" border>
      <template #title>Register</template>

      <v-card-text class="bg-background pt-4">
        <v-text-field
          color="primary"
          label="Email"
          type="email"
          variant="outlined"
          density="compact"
          hide-details="auto"
          required
        >
          <template #prepend-inner>
            <Icon class="input-icon" icon="mdi:alternate-email" />
          </template>
        </v-text-field>
        <v-text-field
          class="mt-4"
          color="primary"
          label="Password"
          type="password"
          variant="outlined"
          density="compact"
          hide-details="auto"
          required
        >
          <template #prepend-inner>
            <Icon class="input-icon" icon="mdi:lock" />
          </template>
        </v-text-field>
        <v-text-field
          class="mt-4"
          color="primary"
          label="Confirm password"
          type="password"
          variant="outlined"
          density="compact"
          hide-details="auto"
          required
        >
          <template #prepend-inner>
            <Icon class="input-icon" icon="mdi:lock" />
          </template>
        </v-text-field>
      </v-card-text>
      <v-card-actions class="bg-background d-flex flex-row-reverse">
        <v-btn class="bg-secondary">Register</v-btn>
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
