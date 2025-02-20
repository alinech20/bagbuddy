<script setup lang="ts">
import { ref } from 'vue'
import OnboardingStep from '@/components/onboarding/OnboardingStep.vue'
import { useDateFormat } from '@vueuse/core'
import { useOnboardingLogic } from '@/composables/useOnboardingLogic.ts'

const firstName = ref<string>()
const lastName = ref<string>()
const birthDate = ref<Date>()
// const country = ref<number>()
const gender = ref<string>()
const genderList = ['Male', 'Female']

const { continueOnboarding } = useOnboardingLogic()

const nextStep = () => {
  continueOnboarding({
    firstName: firstName.value,
    lastName: lastName.value,
    birthDate: birthDate.value
      ? useDateFormat(birthDate.value, 'YYYY-MM-DD').value
      : undefined,
    // country: country.value,
    gender: gender.value,
  })
}
</script>

<template>
  <OnboardingStep>
    <template #title> Welcome to BagBuddy!</template>
    <template #description>
      We're excited to have you on board! Let's get started by filling in some
      basic information:
    </template>
    <template #form>
      <v-form>
        <v-text-field v-model="firstName" label="First Name" required />
        <v-text-field v-model="lastName" label="Last Name" required />
        <v-date-input v-model="birthDate" label="Birth Date" />
        <!--            <v-select v-model="country" :items="[]" label="Country" />-->
        <v-select
          v-model="gender"
          :items="genderList"
          label="Gender"
          :list-props="{
            bgColor: 'white',
            density: 'compact',
          }"
        />
      </v-form>
    </template>
    <template #actions>
      <v-btn color="background" variant="flat">Skip</v-btn>
      <v-spacer />
      <v-btn @click="nextStep" color="primary">Next</v-btn>
    </template>
  </OnboardingStep>
</template>
