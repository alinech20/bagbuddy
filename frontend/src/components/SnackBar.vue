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
    <div
      v-for="error in errorList"
      :key="error.msg"
      class="snackbar"
      :class="{
        error: error.style === ERROR_SEVERITY.CRITICAL || error.style === ERROR_SEVERITY.ERROR,
        warning: error.style === ERROR_SEVERITY.WARNING,
        info: error.style === ERROR_SEVERITY.INFO,
      }"
    >
      <span class="snackbar__title"> {{ error.title.toUpperCase() }}! </span>
      {{ error.msg }}
    </div>
  </article>
</template>

<style lang="sass">
@import '@/assets/sass/vars/borders'
@import '@/assets/sass/vars/shadows'
@import '@/assets/sass/vars/spacers'
@import '@/assets/sass/vars/typography'

.snackbar-container
  position: absolute
  bottom: 0
  left: 0
  right: 0
  padding: $spacer-sm
  z-index: 10000
  display: flex
  flex-direction: column
  align-items: center

  .snackbar
    width: 100%
    max-width: 460px
    padding: $spacer-md $spacer-lg
    border-radius: $border-radius-sm
    color: var(--on-primary)
    box-shadow: $main-shadow
    animation: fadein 0.3s

    &.error
      background: #d32f2f

    &.warning
      background: #ffa000

    &.info
      background: #1976d2

    &__title
      color: var(--on-primary)
      font-weight: $font-weight-bold

@keyframes fadein
  from
    opacity: 0
    transform: translateY(20px)
  to
    opacity: 1
    transform: translateY(0)
</style>
