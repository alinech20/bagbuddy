<script setup lang="ts">
import OnboardingStep from '@/components/onboarding/OnboardingStep.vue'
import { TRAVEL_COMPANIONS } from '@/types/user.ts'
import { ref } from 'vue'
import { useOnboardingStore } from '@/stores/onboarding.ts'
import { useOnboardingLogic } from '@/composables/useOnboardingLogic.ts'
import SharedSelect from '@/components/shared/forms/SharedSelect.vue'

const companions = ref<TRAVEL_COMPANIONS[]>([])
const companionsItems = [...Object.values(TRAVEL_COMPANIONS)]

const { goBack } = useOnboardingStore()
const { continueOnboarding } = useOnboardingLogic()

const nextStep = () => {
  continueOnboarding({
    travel_companions: companions.value,
  })
}
</script>

<template>
  <OnboardingStep @next="nextStep" @prev="goBack">
    <template #title>Additional Details</template>
    <template #description> Almost there! Just a few more things:</template>
    <template #form>
      <form>
        <SharedSelect
          v-model="companions"
          :options="companionsItems"
          label="Who do you usually travel with?"
          multiple
        />
      </form>
    </template>
  </OnboardingStep>
</template>
