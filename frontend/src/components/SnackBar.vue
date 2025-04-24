<script setup lang="ts">
import { useEventBus } from '@vueuse/core'
import { BUS_EVENTS } from '@/constants.ts'
import type { ISnackBarError } from '@/types/snackbar.ts'
import { ref } from 'vue'
import { ERROR_SEVERITY } from '@/types/errors.ts'

const errorBus = useEventBus<ISnackBarError>(BUS_EVENTS.SNACKBAR)
const errorList = ref<ISnackBarError[]>([])

errorBus.on((error) => {
  errorList.value.push(error)
  setTimeout(() => {
    errorList.value.splice(
      errorList.value.findIndex((e) => e === error),
      1,
    )
  }, error.duration)
})
</script>

<template>
  <article class="snackbar-container" v-if="errorList.length > 0">
    <v-snackbar
      class="ma-2"
      v-for="(error, index) in errorList"
      :key="index"
      :color="error.style === ERROR_SEVERITY.CRITICAL ? 'error' : error.style"
      :model-value="!!error"
    >
      <template #default>
        <span>
          <strong>{{ error.title.toUpperCase() }}!</strong>
        </span>
        {{ error.msg }}
      </template>
    </v-snackbar>
  </article>
</template>

<style lang="sass">
.snackbar-container
  position: absolute
  bottom: 0
  left: 0
  right: 0
  z-index: 10000
  display: flex
  flex-direction: column
  align-items: center
</style>
