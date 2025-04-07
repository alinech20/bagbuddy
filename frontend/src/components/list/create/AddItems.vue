<script setup lang="ts">
import { computed, onBeforeMount } from 'vue'
import { storeToRefs } from 'pinia'
import { useItemStore } from '@/stores/item.ts'
import { useItemService } from '@/services/item.ts'
import { useListStore } from '@/stores/list.ts'
import CreateListStep from '@/components/list/create/CreateListStep.vue'
import type { IListItem } from '@/types/items.ts'

const itemStore = useItemStore()
const { items } = storeToRefs(itemStore)
const { setItems } = itemStore
const { newList } = storeToRefs(useListStore())

const chosenCategories = computed(() => {
  return newList.value.categories.filter(
    (c) => !c.subcategories || !c.subcategories.length,
  )
})

const getCategoryItems = (id: number) => {
  return items.value.filter((i) => i.category_id === id)
}

const updateList = (val: IListItem[]) => {
  if (!newList.value.items) newList.value.items = []

  newList.value.items = newList.value.items.filter((item) => {
    return item.category_id !== val[0].category_id
  })

  newList.value.items = newList.value.items.concat(val)
}

onBeforeMount(async () => {
  if (!items.value.length) setItems(await useItemService().getAllItems())
})
</script>

<template>
  <CreateListStep title="Populate" subtitle="...and reiterate">
    <v-card
      v-for="cat in chosenCategories"
      :key="cat.id"
      :title="cat.name"
      subtitle="Select items"
      density="compact"
      variant="tonal"
      color="primary"
      class="mt-2"
    >
      <v-card-text class="bg-background">
        <v-chip-group
          @update:model-value="updateList"
          :model-value="newList.items"
          multiple
          column
        >
          <v-chip
            color="secondary"
            v-for="item in getCategoryItems(cat.id)"
            :key="item.id"
            :value="item"
          >
            <span class="ml-2">{{ item.name }}</span>
          </v-chip>
        </v-chip-group>
      </v-card-text>
    </v-card>
  </CreateListStep>
</template>
