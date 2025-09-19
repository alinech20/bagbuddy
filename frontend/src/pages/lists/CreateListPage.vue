<script setup lang="ts">
import CreateList from '@/components/list/create/CreateList.vue'
import { ref } from 'vue'
import type { IList } from '@/types/list.ts'
import { useUserStore } from '@/stores/user.ts'
import { storeToRefs } from 'pinia'

const { user } = storeToRefs(useUserStore())

// const { saveNewList } = useListStore()
const list = ref<IList>({
  owner: user.value,
} as IList)
</script>

<template>
  <CreateList :list="list" />
</template>
