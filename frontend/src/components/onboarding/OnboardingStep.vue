<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useOnboardingStore } from '@/stores/onboarding.ts'
import { useUserStore } from '@/stores/user.ts'
import router from '@/router'
import SharedCard from '@/components/shared/SharedCard.vue'
import { ONBOARDING_STEPS } from '@/types/user.ts'
import ProgressionButtons from '@/components/shared/complex/ProgressionButtons.vue'

const { step } = storeToRefs(useOnboardingStore())
const { updateUserProfile } = useUserStore()

const saveAndSkip = () => {
  updateUserProfile().then(() => {
    router.push({ name: 'My Profile' })
  })
}
</script>

<template>
  <article class="onboarding-step">
    <section class="onboarding-step__section">
      <h1 class="header-1">
        <slot name="title"></slot>
      </h1>
    </section>
    <section class="onboarding-step__section">
      <p class="paragraph-1">
        <slot name="description"></slot>
      </p>
      <SharedCard class="step-card">
        <slot name="form"></slot>
      </SharedCard>
    </section>
    <ProgressionButtons
      class="onboarding-step__section onboarding-step__section--actions"
      :steps="Object.keys(ONBOARDING_STEPS).length / 2"
      :current-step="step"
      allow-skip
      separate-finish
      @skip="saveAndSkip"
      @prev="$emit('prev')"
      @next="$emit('next')"
      @done="$emit('next')"
    />
  </article>
</template>

<style lang="sass">
@import '@/assets/sass/vars/colors'
@import '@/assets/sass/vars/spacers'

.onboarding-step
  padding: $spacer-xl $spacer-md $spacer-md

  .onboarding-step__section
    margin-top: $spacer-xl
    text-align: center

    .step-card
      box-shadow: none
      width: 100%
      text-align: initial
</style>
