<script setup lang="ts">
defineEmits(['submit'])
</script>

<template>
  <section class="auth-section">
    <h2 v-if="$slots.title" class="auth__title"><slot name="title" /></h2>
    <p v-if="$slots.subtitle" class="auth__subtitle"><slot name="subtitle" /></p>
    <form class="auth-section__form" @submit.prevent="$emit('submit')">
      <slot name="fields" />
      <slot name="actions" />
    </form>
    <div class="auth-section__footer">
      <slot name="footer" />
    </div>
  </section>
</template>

<style lang="sass">
@import '@/assets/sass/vars/spacers'
@import '@/assets/sass/vars/typography'

.auth-section
  margin-top: $spacer-md

  .auth__title
    font-size: $font-size-2xl
    margin: $spacer-lg 0 $spacer-md
    text-align: center

  .auth__subtitle
    font-size: $font-size-lg
    margin: $spacer-md 0
    text-align: center

  &__footer
    text-align: center
    margin-top: $spacer-lg
</style>
