<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useOnboardingStore } from '@/stores/onboarding.ts'
import { useUserStore } from '@/stores/user.ts'
import router from '@/router'
import SharedCard from '@/components/shared/SharedCard.vue'

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
    <section class="onboarding-step__section onboarding-step__section--actions">
      <slot name="actions">
        <!--        <v-btn @click="saveAndSkip" color="background" variant="flat"> Skip </v-btn>-->
        <!--        <v-btn class="ml-2" v-if="step !== ONBOARDING_STEPS.WELCOME" @click="$emit('prev')" color="secondary">-->
        <!--          Back-->
        <!--        </v-btn>-->
        <!--        <v-spacer />-->
        <!--        <v-btn v-if="step !== Object.keys(ONBOARDING_STEPS).length / 2" @click="$emit('next')" color="primary">-->
        <!--          Next-->
        <!--        </v-btn>-->
        <!--        <v-btn v-else @click="$emit('next')" color="primary">Finish</v-btn>-->
      </slot>
    </section>
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

    &--actions
      text-align: initial
      display: flex
      justify-content: space-between

    .step-card
      box-shadow: none
      width: 100%
      text-align: initial
</style>
