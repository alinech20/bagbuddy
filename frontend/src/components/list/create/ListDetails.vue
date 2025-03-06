<script setup lang="ts"></script>

<template>
  <v-sheet class="text-center" max-width="600" color="background">
    <h2 class="text-h4">Let's get started!</h2>

    <v-form class="d-flex d-flex flex-column justify-space-between mt-4">
      <h3 class="text-h5">What is this list about?</h3>
      <section class="mt-8">
        <v-text-field label="Name" required />
        <v-textarea class="mt-4" label="Description" />
      </section>
    </v-form>
  </v-sheet>
</template>
