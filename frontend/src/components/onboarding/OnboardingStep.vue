<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useOnboardingStore } from '@/stores/onboarding.ts'
import { ONBOARDING_STEPS } from '@/types/user.ts'
import { useUserStore } from '@/stores/user.ts'
import router from '@/router'

const { step } = storeToRefs(useOnboardingStore())
const { updateUserProfile } = useUserStore()

const saveAndSkip = () => {
  updateUserProfile().then(() => {
    router.push({ name: 'My Profile' })
  })
}
</script>

<template>
  <article class="pa-4 pt-8">
    <section class="mt-8 text-center">
      <h1 class="text-h3 font-weight-medium">
        <slot name="title"></slot>
      </h1>
    </section>
    <section class="mt-8 text-center">
      <p class="text-body-1">
        <slot name="description"></slot>
      </p>
      <v-card class="mt-8 bg-background w-100" elevation="4">
        <v-card-text>
          <slot name="form"></slot>
        </v-card-text>
      </v-card>
    </section>
    <section class="d-flex mt-8">
      <slot name="actions">
        <v-btn @click="saveAndSkip" color="background" variant="flat">
          Skip
        </v-btn>
        <v-btn
          class="ml-2"
          v-if="step !== ONBOARDING_STEPS.WELCOME"
          @click="$emit('prev')"
          color="secondary"
        >
          Back
        </v-btn>
        <v-spacer />
        <v-btn
          v-if="step !== Object.keys(ONBOARDING_STEPS).length / 2"
          @click="$emit('next')"
          color="primary"
        >
          Next
        </v-btn>
        <v-btn v-else @click="$emit('next')" color="primary">Finish</v-btn>
      </slot>
    </section>
  </article>
</template>
