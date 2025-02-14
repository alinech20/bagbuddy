<script setup lang="ts">
import OnboardingStep from '@/components/onboarding/OnboardingStep.vue'
import { ref } from 'vue'
import { type IHealthAndSafety, TRANSPORT_TYPES } from '@/types/user.ts'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/user.ts'

const emits = defineEmits(['nextStep'])
const { user } = storeToRefs(useUserStore())

const allergies = ref<boolean>()
const allergiesItems = [
  {
    title: 'Yes',
    value: true,
  },
  {
    title: 'No',
    value: false,
  },
]

const transport = ref<TRANSPORT_TYPES>()
const transportItems = [...Object.keys(TRANSPORT_TYPES)]

const nextStep = () => {
  const health: IHealthAndSafety = {
    allergies: allergies.value,
    preferred_transport: transport.value,
  }

  if (!user.value.preferences) user.value.preferences = {}
  user.value.preferences.health_safety = health

  emits('nextStep')
}
</script>

<template>
  <OnboardingStep>
    <template #title>Health & Safety</template>
    <template #description>
      Let's make sure we cover your health and safety needs:
    </template>
    <template #form>
      <v-form>
        <v-select
          v-model="allergies"
          :items="allergiesItems"
          label="Allergies"
          :list-props="{
            bgColor: 'white',
            density: 'compact',
          }"
        />
        <v-select
          v-model="transport"
          :items="transportItems"
          :list-props="{
            bgColor: 'white',
            density: 'compact',
          }"
          label="Travel type"
        />
      </v-form>
    </template>
    <template #actions>
      <v-btn color="background" variant="flat">Skip</v-btn>
      <v-btn color="secondary">Back</v-btn>
      <v-spacer />
      <v-btn @click="nextStep" color="primary">Next</v-btn>
    </template>
  </OnboardingStep>
</template>

<style scoped lang="sass"></style>
