<script setup lang="ts">
import { ref } from 'vue'
import OnboardingStep from '@/components/onboarding/OnboardingStep.vue'
import { useUserStore } from '@/stores/user.ts'
import { storeToRefs } from 'pinia'

const emits = defineEmits(['nextStep'])
const { user } = storeToRefs(useUserStore())

const firstName = ref<string>()
const lastName = ref<string>()
const birthDate = ref<string>()
// const country = ref<number>()
const gender = ref<number>()
const genderList = [
  {
    title: 'Male',
    value: 1,
  },
  {
    title: 'Female',
    value: 2,
  },
]

const nextStep = () => {
  user.value.first_name = firstName.value
  user.value.last_name = lastName.value
  user.value.birth_date = birthDate.value
  // user.value.country_id = country.value
  user.value.gender_id = gender.value

  emits('nextStep')
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
        <v-date-input
          persistent-placeholder
          v-model="birthDate"
          label="Birth Date"
        />
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

<style scoped lang="sass"></style>
