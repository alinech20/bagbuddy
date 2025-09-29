<script setup lang="ts">
import { computed } from 'vue'
import SharedButton from '@/components/shared/forms/SharedButton.vue'
import { Icon } from '@iconify/vue'
import SharedCard from '@/components/shared/SharedCard.vue'
import type { IList } from '@/types/list'

const props = defineProps<{
  list: IList
}>()

defineEmits(['add-category', 'add-subcategory'])

const categories = computed(() => props.list.categories.filter((cat) => !cat.parent_id) || [])
const removeCategory = (id: number) => {
  props.list.categories = props.list.categories?.filter((cat) => cat.id !== id && cat.parent_id !== id)
}

const subcategories = (catId: number) =>
  computed(() => props.list.categories.filter((cat) => cat.parent_id === catId) || [])
</script>

<template>
  <section class="add-items">
    <div class="add-items__title">
      <h3 class="header-6">Categories</h3>
      <SharedButton class="add-category-btn btn-secondary" @click="$emit('add-category')">
        <template #icon-before>
          <Icon :icon="'mdi:plus'" class="add-category__icon" />
        </template>
        Add Category
      </SharedButton>
    </div>
    <SharedCard class="category-card" v-for="cat in categories" :key="cat.id" :icon="cat.icon" :title="cat.name">
      <template #title-button>
        <SharedButton class="category-card__delete-btn" @click="removeCategory(cat.id)">
          <template #icon>
            <Icon class="delete-btn__icon" icon="mdi:trash" />
          </template>
        </SharedButton>
      </template>
      {{ subcategories(cat.id).value.map((sub) => sub.name) }}
      <template #actions v-if="cat.subcategories && cat.subcategories.length">
        <SharedButton class="category-card__add-subcategory-btn" @click="$emit('add-subcategory', cat.id)">
          <template #icon-before>
            <Icon :icon="'mdi:plus'" class="add-subcategory__icon" />
          </template>
          Add Subcategory
        </SharedButton>
      </template>
    </SharedCard>
  </section>
</template>

<style lang="sass">
@import '@/assets/sass/vars/borders'
@import '@/assets/sass/vars/spacers'
@import '@/assets/sass/vars/typography'

.add-items
  .add-items__title
    display: flex
    justify-content: space-between
    align-items: center
    margin-bottom: $spacer-sm

    .add-category-btn
      padding: $spacer-sm $spacer-md
      border-radius: $border-radius-pill
      font-size: $font-size-sm

      .add-category__icon
        font-size: $font-size-lg

        path
          fill: white

  .category-card
    margin-top: $spacer-sm

    &__delete-btn
      border-radius: $border-radius-circle
      padding: $spacer-xs
      height: 32px
      width: 32px

      .delete-btn__icon
        path
          fill: var(--on-background)

    &__add-subcategory-btn
      padding: $spacer-xs
      border-radius: $border-radius-pill
      font-size: $font-size-sm
      font-weight: $font-weight-regular

      *
        color: var(--secondary)

      &:hover
        background-color: transparent

        *
          color: var(--secondary-hover)
</style>
