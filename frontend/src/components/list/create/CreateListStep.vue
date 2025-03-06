<script setup lang="ts">
defineProps<{
  title: string
  subtitle: string
}>()
</script>

<template>
  <v-sheet class="text-center" max-width="600" color="background">
    <h2 class="text-h4">{{ title }}</h2>

    <section class="d-flex d-flex flex-column justify-space-between mt-4">
      <h3 class="text-h5">{{ subtitle }}</h3>
      <section class="mt-8">
        <slot></slot>
      </section>
    </section>
  </v-sheet>
</template>
