<script setup lang="ts">
import SharedCard from '@/components/shared/SharedCard.vue'

defineEmits(['submit'])
</script>

<template>
  <SharedCard class="auth-section">
    <h3 v-if="$slots.title" class="auth__title header-5"><slot name="title" /></h3>
    <p v-if="$slots.subtitle" class="auth__subtitle"><slot name="subtitle" /></p>
    <form class="auth-section__form" @submit.prevent="$emit('submit')">
      <slot name="fields" />
      <slot name="actions" />
    </form>
    <div class="auth-section__footer">
      <slot name="footer" />
    </div>
  </SharedCard>
</template>

<style lang="sass">
@import '@/assets/sass/vars/shadows'
@import '@/assets/sass/vars/spacers'
@import '@/assets/sass/vars/typography'

.auth-section
  background-color: white
  margin-top: $spacer-md
  box-shadow: $main-greater-shadow

  .auth__title
    margin: 0 0 $spacer-md
    text-align: center
    font-weight: $font-weight-bold

  .auth__subtitle
    font-size: $font-size-lg
    margin: $spacer-md 0
    text-align: center
    color: var(--text-primary-light)

  &__form
    input
      background-color: var(--input-gray-background)

  &__footer
    text-align: center
    margin-top: $spacer-lg
</style>
