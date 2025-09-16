<script setup lang="ts">
import { useCategoryStore } from '@/stores/category.ts'
import { storeToRefs } from 'pinia'
import { useCategoryService } from '@/services/category.ts'
import { onMounted } from 'vue'
import CreateListStep from '@/components/list/create/CreateListStep.vue'
import { useListStore } from '@/stores/list.ts'
import SharedPill from '@/components/shared/SharedPill.vue'
import type { IListCategory } from '@/types/categories.ts'

const categoryStore = useCategoryStore()
const { categories } = storeToRefs(categoryStore)
const { setCategories } = categoryStore
const { newList } = storeToRefs(useListStore())

const addOrRemoveCategory = (cat: IListCategory) => {
  if (!newList.value.categories) newList.value.categories = []

  const exists = newList.value.categories.find((c) => c.id === cat.id)
  if (exists) {
    newList.value.categories = newList.value.categories.filter((c) => c.id !== cat.id)
  } else {
    newList.value.categories.push(cat)
  }
}

onMounted(async () => {
  if (!categories.value.length) setCategories(await useCategoryService().getCategories())
})
</script>

<template>
  <CreateListStep title="Organize" subtitle="...and categorize">
    <div class="categories-list">
      <!--    <v-chip-group v-model="newList.categories" multiple column>-->
      <SharedPill
        class="categories-list__item primary"
        @selected="addOrRemoveCategory(cat)"
        v-for="cat in categories"
        :key="cat.id"
        selectable
      >
        <span>{{ cat.icon }}</span>
        <span class="ml-2">{{ cat.name }}</span>
      </SharedPill>
    </div>
    <!--    </v-chip-group>-->
  </CreateListStep>
</template>

<style lang="sass">
@import '@/assets/sass/vars/spacers'

.categories-list
  display: flex
  flex-wrap: wrap
  gap: $spacer-xs

  &__item
    cursor: pointer
    flex-shrink: 1
</style>
