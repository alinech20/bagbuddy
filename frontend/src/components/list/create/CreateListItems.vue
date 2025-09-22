<script setup lang="ts">
import { useCategoryStore } from '@/stores/category.ts'
import { storeToRefs } from 'pinia'
import { onMounted } from 'vue'
import { useCategoryService } from '@/services/category.ts'
import SharedButton from '@/components/shared/forms/SharedButton.vue'
import { Icon } from '@iconify/vue'
import SharedCard from '@/components/shared/SharedCard.vue'

defineEmits(['add-category'])

const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)
const { setCategories } = categoryStore

onMounted(async () => {
  if (!categories.value.length) {
    setCategories(await useCategoryService().getCategories())
  }
})
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
        <SharedButton class="category-card__delete-btn">
          <template #icon>
            <Icon class="delete-btn__icon" icon="mdi:trash" />
          </template>
        </SharedButton>
      </template>
      <!--      <div class="d-flex justify-content-between align-items-center">-->
      <!--        <div class="d-flex align-items-center gap-3">-->
      <!--          <Icon :icon="category.icon || 'mdi:folder-outline'" class="font-size-xl" />-->
      <!--          <span class="body-1">{{ category.name }}</span>-->
      <!--        </div>-->
      <!--        <Icon :icon="'mdi:pencil-outline'" class="font-size-lg text-muted" />-->
      <!--      </div>-->
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
      display: flex
      align-items: center
      gap: $spacer-sm

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
      display: flex
      align-items: center
      justify-content: center

      .delete-btn__icon
        path
          fill: var(--on-background)
</style>
