<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  selectable?: boolean
}>()

const emit = defineEmits(['selected'])

const selected = ref(false)
const select = () => {
  if (!props.selectable) return

  selected.value = !selected.value
  emit('selected')
}
</script>

<template>
  <div class="pill" :class="{ selected: selected }" @click="select">
    <span class="pill__icon" v-if="$slots['icon-before']">
      <slot name="icon-before" />
    </span>
    <slot />
  </div>
</template>

<style lang="sass">
@import '@/assets/sass/vars/borders'
@import '@/assets/sass/vars/spacers'
@import '@/assets/sass/vars/typography'

.pill
  padding: $spacer-xs $spacer-md
  border-radius: $border-radius-pill
  font-size: $font-size-md
  display: flex
  align-items: center
  justify-content: space-between
  width: fit-content

  &.primary
    background-color: var(--dirty-background)
    color: var(--primary)

  &__icon
    display: flex
    font-size: $font-size-lg
    padding-right: $spacer-sm
</style>
