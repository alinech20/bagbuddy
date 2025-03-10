<script setup lang="ts">
import CreateListStep from '@/components/list/create/CreateListStep.vue'
import { storeToRefs } from 'pinia'
import { useListStore } from '@/stores/list.ts'
import { computed, ref } from 'vue'
import type { IListCategory } from '@/types/categories.ts'

const { newList } = storeToRefs(useListStore())

const topLevelCategories = computed(() => {
  return newList.value.categories.filter((cat) => cat.parent_id === null)
})

const topLevelCategoriesWithSubcategories = computed(() => {
  return topLevelCategories.value.filter((cat) => cat.subcategories.length)
})

const subcategories = ref<IListCategory[]>(
  newList.value.categories.filter((cat) => cat.parent_id) || [],
)

const updateList = (val: IListCategory[]) => {
  subcategories.value = subcategories.value
    .filter((subcat) => {
      return subcat.parent_id !== val[0].parent_id
    })
    .concat(val)

  newList.value.categories = newList.value.categories
    .filter((cat) => {
      return cat.parent_id === null
    })
    .concat(subcategories.value)
}
</script>

<template>
  <CreateListStep title="Structure">
    <v-card
      v-for="cat in topLevelCategoriesWithSubcategories"
      :key="cat.id"
      :title="cat.name"
      subtitle="Select subcategories"
      density="compact"
      variant="tonal"
      color="primary"
      class="mt-2"
    >
      <v-card-text class="bg-background">
        <v-chip-group
          @update:model-value="updateList"
          :model-value="subcategories"
          multiple
          column
        >
          <v-chip
            color="secondary"
            v-for="subcat in cat.subcategories"
            :key="subcat.id"
            :value="subcat"
          >
            <span class="ml-2">{{ subcat.name }}</span>
          </v-chip>
        </v-chip-group>
      </v-card-text>
    </v-card>
  </CreateListStep>
</template>

<style scoped lang="sass"></style>
