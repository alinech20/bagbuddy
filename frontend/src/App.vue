<script setup lang="ts">
import { onMounted } from 'vue'

onMounted(() => {
  fetch('http://localhost:3000/api/auth')
    .then((res) => res.json())
    .then((data) => console.log(data))
})
</script>

<template>
  <h1>test</h1>
  fuck
</template>
