<script setup lang="ts">
import { ref } from 'vue'
import OnboardingStep from '@/components/onboarding/OnboardingStep.vue'
import { useDateFormat } from '@vueuse/core'
import { useOnboardingLogic } from '@/composables/useOnboardingLogic.ts'
import SharedInput from '@/components/shared/forms/SharedInput.vue'
import type { IRadioOption } from '@/types/forms.ts'
import SharedRadio from '@/components/shared/forms/SharedRadio.vue'
import SharedButton from '@/components/shared/forms/SharedButton.vue'

const twelveYearsAgo = useDateFormat(
  new Date(new Date().setFullYear(new Date().getFullYear() - 12)),
  'YYYY-MM-DD',
).value

const firstName = ref<string>()
const lastName = ref<string>()
const birthDate = ref<Date | string>(twelveYearsAgo)
// const country = ref<number>()
const gender = ref<string>()
const genderList: Array<IRadioOption> = [
  {
    label: 'Male',
    value: 'Male',
  },
  {
    label: 'Female',
    value: 'Female',
  },
]

const { continueOnboarding } = useOnboardingLogic()

const nextStep = () => {
  continueOnboarding({
    firstName: firstName.value,
    lastName: lastName.value,
    birthDate: birthDate.value ? useDateFormat(birthDate.value, 'YYYY-MM-DD').value : undefined,
    // country: country.value,
    gender: gender.value,
  })
}
</script>

<template>
  <OnboardingStep>
    <template #title> Welcome to BagBuddy!</template>
    <template #description>
      We're excited to have you on board! Let's get started by filling in some basic information:
    </template>
    <template #form>
      <form>
        <SharedInput label="First Name" v-model="firstName" required />
        <SharedInput label="Last Name" v-model="lastName" required />
        <SharedInput label="Birth Date" v-model="birthDate" type="date" :max="twelveYearsAgo" />
        <!--        <SharedSelect label="Country" v-model="country" :options="[]" />-->
        <SharedRadio label="Gender" v-model="gender" :options="genderList" />
      </form>
    </template>
    <template #actions>
      <SharedButton>Skip</SharedButton>
      <SharedButton @click="nextStep" class="btn-primary">Next</SharedButton>
    </template>
  </OnboardingStep>
</template>
