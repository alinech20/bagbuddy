<script setup lang="ts">
defineEmits(['submit'])
</script>

<template>
  <section class="auth-section">
    <slot name="title" />
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

.auth-section
  margin-top: $spacer-md

  &__footer
    text-align: center
    margin-top: $spacer-lg
</style>
