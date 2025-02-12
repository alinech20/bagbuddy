<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <v-form class="login-form">
    <v-card width="360" variant="flat" border>
      <template #title>Login</template>

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
      </v-card-text>
      <!--      <v-divider />-->
      <v-card-actions class="bg-background">
        <v-btn>Forgot password?</v-btn>
        <v-spacer />
        <v-btn class="bg-secondary">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
  <section class="login-form__secondary-actions d-flex mt-6">
    <v-btn size="xsmall" variant="flat">No account? Sign up!</v-btn>
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
    cursor: pointer

    &:hover
      text-decoration: underline
</style>
