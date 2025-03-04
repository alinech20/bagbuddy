<script setup lang="ts"></script>

<template>
  <v-form class="d-flex justify-center">
    <v-card class="ma-4" max-width="600" width="100%" variant="flat" border>
      <template #title>New packing list</template>
      <v-card-text class="bg-background pt-4">
        <v-text-field label="Name" required></v-text-field>
        <v-textarea class="mt-4" label="Description"></v-textarea>
      </v-card-text>
      <v-card-actions class="bg-background">
        <v-spacer />
        <v-btn type="submit" class="bg-secondary">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>
