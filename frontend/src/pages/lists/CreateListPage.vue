<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import SharedCard from '@/components/shared/SharedCard.vue'
import SearchableList from '@/components/shared/complex/SearchableList.vue'
import CreateListBasicInfo from '@/components/list/create/CreateListBasicInfo.vue'
import CreateListItems from '@/components/list/create/CreateListItems.vue'
import type { IListCategory } from '@/types/categories'
import type { IItem } from '@/types/items'
import { useCategoryStore } from '@/stores/category'
import { storeToRefs } from 'pinia'
import type { IList } from '@/types/list'
import { useUserStore } from '@/stores/user'
import { useCategoryService } from '@/services/category'

type TListProps = IListCategory | IItem
type TListType = 'category' | 'subcategory' | 'item'

const categoryStore = useCategoryStore()
const { setCategories } = categoryStore
const { subcategories, topLevelCategories } = storeToRefs(categoryStore)
function getSubcategoriesOfCategory(id: number) {
  return subcategories.value.filter((sub) => sub.parent_id! === id)
}

const searchableListTitle = ref<string>()
const showSearchableList = computed(() => !!searchableListTitle.value)
const typeOfList = ref<TListType>()

const list = ref<IList>({
  owner: storeToRefs(useUserStore()).user.value!,
  name: '',
  categories: [] as IListCategory[],
  items: [] as IItem[],
} as IList)

const addToList = (item: TListProps) => {
  if (!typeOfList.value) return

  switch (typeOfList.value) {
    case 'category':
      if (list.value.categories.find((cat) => cat.id === item.id)) return
      list.value.categories.push(item as IListCategory)
      break
    case 'subcategory':
      if (list.value.categories.find((cat) => cat.id === item.id)) return
      list.value.categories.push(item as IListCategory)
      break
    // case 'item':
    //   if (list.value.items.find((i) => i.id === item.id)) return
    //   list.value.items.push(item as IItem)
    //   break
  }
}

const searchableListItems = ref<TListProps[]>([])
const filteredSearchableListItems = computed(() => {
  switch (typeOfList.value) {
    case 'category':
      return searchableListItems.value.filter((cat) => !list.value.categories?.find((c) => c.id === cat.id))
    case 'subcategory':
      return searchableListItems.value.filter((cat) => !list.value.categories?.find((c) => c.id === cat.id))
    // case 'item':
    //   return searchableListItems.value.filter((i) => !list.value.items?.find((it) => it.id === i.id))
    default:
      return searchableListItems.value
  }
})

function openSearchableList(type: TListType, catId?: number) {
  typeOfList.value = type

  switch (typeOfList.value) {
    case 'category':
      searchableListTitle.value = 'Add Category'
      searchableListItems.value.length = 0
      searchableListItems.value.push(...topLevelCategories.value)
      break
    case 'subcategory':
      if (!catId) return

      searchableListTitle.value = 'Add Subcategory'
      searchableListItems.value.length = 0
      searchableListItems.value.push(...getSubcategoriesOfCategory(catId))
      break
    case 'item':
      searchableListTitle.value = 'Add Item'
      break
  }
}

onMounted(async () => {
  setCategories(await useCategoryService().getCategories())
})
</script>

<template>
  <section class="create-list">
    <SharedCard class="create-list__basic-details create-list-section">
      <CreateListBasicInfo />
    </SharedCard>
    <CreateListItems
      :list="list"
      @add-category="openSearchableList('category')"
      @add-subcategory="openSearchableList('subcategory', $event)"
      class="create-list-section"
    />
    <SearchableList
      v-if="showSearchableList"
      @close="searchableListTitle = undefined"
      :title="searchableListTitle!"
      :items="filteredSearchableListItems"
      @add-item="addToList"
    />
  </section>
</template>

<style lang="sass">
@import '@/assets/sass/vars/borders'
@import '@/assets/sass/vars/shadows'
@import '@/assets/sass/vars/spacers'

.create-list
  input
    padding: $spacer-sm $spacer-md
    border-radius: $border-radius-md

  .card
    box-shadow: $main-tighter-shadow
    background-color: white
    padding: $spacer-md

  &-section:not(:first-child)
    margin-top: $spacer-lg

  &__title
    text-align: center

  &__trip-dates
    display: flex
    justify-content: space-between
    gap: $spacer-md
</style>
