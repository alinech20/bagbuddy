<script setup lang="ts">
import AuthMain from '@/components/auth/AuthMain.vue'
import SharedInput from '@/components/shared/forms/SharedInput.vue'
import SharedButton from '@/components/shared/forms/SharedButton.vue'
import { ref } from 'vue'
import { useValidationRules } from '@/composables/useValidationRules.ts'

const email = ref('')
const emailErrors = ref<string[]>([])

const clearAllErrors = () => {
  emailErrors.value = []
}

const rules = useValidationRules()

const validateEmail = () => {
  clearAllErrors()
  rules.emailRules().forEach((rule) => {
    const result = rule(email.value)
    if (typeof result === 'string') emailErrors.value.push(result)
  })
}

const validate = () => {
  validateEmail()

  if (emailErrors.value.length) {
    return false
  }
}

const sendMail = () => {
  if (!validate()) return

  // send email
}
</script>

<template>
  <AuthMain @submit="sendMail">
    <template #title>Password recovery</template>
    <template #subtitle>We'll email you a reset link</template>
    <template #fields>
      <SharedInput
        v-model="email"
        type="email"
        label="Email"
        placeholder="Enter your email"
        :errors="emailErrors"
        @input="clearAllErrors"
        @blur="validateEmail"
      />
    </template>
    <template #actions>
      <SharedButton type="submit" class="btn-primary btn-recovery">Send reset link</SharedButton>
    </template>
  </AuthMain>
</template>

<style lang="sass">
.auth-section
  .auth-section__form
    .btn-recovery
      width: 100%
</style>
