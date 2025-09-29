<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/iconify.js'
import SharedCard from '@/components/shared/SharedCard.vue'
import SharedButton from '@/components/shared/forms/SharedButton.vue'
import SharedInput from '../forms/SharedInput.vue'
import { computed, ref } from 'vue'
import { useDebounceFn } from '@vueuse/core'

const props = defineProps<{
  title: string
  items: any[]
}>()

defineEmits(['addItem', 'close'])

const searchTerm = ref<string>('')
function updateSearchTerm(event: Event) {
  const debouncedUpdated = useDebounceFn(() => {
    const target = event.target as HTMLInputElement
    searchTerm.value = target.value
  }, 500)

  debouncedUpdated()
}

const displayItems = computed(() => {
  if (!searchTerm.value) {
    return props.items
  }

  return props.items.filter((item) => item.name.toLowerCase().includes(searchTerm.value.toLowerCase()))
})
</script>

<template>
  <section class="searchable-list">
    <div class="searchable-list__header">
      <Icon icon="mdi:arrow-left" class="searchable-list__back-icon" @click="$emit('close')" />
      <h2 class="searchable-list__title header-6">{{ title }}</h2>
    </div>
    <div class="searchable-list__input-wrapper">
      <Icon icon="mdi:magnify" class="searchable-list__input-icon" />
      <SharedInput class="searchable-list__input" label="Search" placeholder @input="updateSearchTerm" />
    </div>
    <ul class="searchable-list__items">
      <li class="searchable-list__item" v-for="item in displayItems" :key="item.id">
        <SharedCard class="item-card" :icon="item.icon" :title="item.name">
          <template #title-button>
            <SharedButton class="item-card__add-btn">
              <template #icon>
                <Icon class="add-btn__icon" icon="mdi:plus" @click="$emit('addItem', item)" />
              </template>
            </SharedButton>
          </template>
        </SharedCard>
      </li>
    </ul>
  </section>
</template>

<style lang="sass">
@import '@/assets/sass/vars/borders'
@import '@/assets/sass/vars/spacers'
@import '@/assets/sass/vars/typography'

.searchable-list
  position: fixed
  inset: 0
  width: 100%
  height: 100dvh
  overflow-y: auto
  z-index: 10000
  padding: $spacer-md
  background-color: var(--background)

  .searchable-list__header
    display: flex
    align-items: center
    margin-bottom: $spacer-xl
    padding-top: $spacer-sm

    .searchable-list__back-icon
      cursor: pointer
      flex-grow: 0
      flex-shrink: 0
      font-size: $font-size-xl

    .searchable-list__title
      width: calc(100% - #{$font-size-xl})
      text-align: center

  .searchable-list__input-wrapper
    position: relative

    .searchable-list__input-icon
      position: absolute
      top: 50%
      left: $spacer-md
      transform: translateY(-50%)
      font-size: $font-size-xl
      pointer-events: none

      path
        fill: var(--primary)

    .searchable-list__input
      input
        background: white
        padding-left: $spacer-2xl

  .searchable-list__items
    .searchable-list__item
        .item-card
          margin-top: $spacer-sm

          &__add-btn
            border-radius: $border-radius-circle
            padding: $spacer-xs
            height: 32px
            width: 32px
            display: flex
            align-items: center
            justify-content: center

            .add-btn__icon
              path
                fill: var(--on-background)
</style>
