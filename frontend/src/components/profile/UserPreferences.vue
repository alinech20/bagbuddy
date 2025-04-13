<script setup lang="ts">
import type { IUser } from '@/types/user.ts'
import { computed, ref } from 'vue'
import { useTextFormatter } from '@/utils/useTextFormatter.ts'

const props = defineProps<{
  user: IUser
}>()

const preferences = computed(() => {
  return props.user.preferences || []
})

const fieldsToSkip = ['id', 'profile_id', 'created_at', 'updated_at']
const filterItems = (pref: any) => {
  const filtered = { ...pref }
  fieldsToSkip.forEach((field) => {
    if (filtered[field]) delete filtered[field]
  })

  return filtered
}

const formatValue = (value: any): string => {
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No'
  }
  if (Array.isArray(value)) {
    return value.join(', ')
  }
  return value
}

const { snakeToWords } = useTextFormatter()
const panel = ref<string>('')
</script>

<template>
  <article>
    <h3 class="text-h6 mt-4 mb-2 ml-6">Preferences</h3>

    <v-expansion-panels v-model="panel" elevation="2">
      <v-expansion-panel
        v-for="(value, key) in preferences"
        :key="key"
        :title="snakeToWords(key)"
        color="surface"
      >
        <v-expansion-panel-text class="bg-background">
          <v-list bg-color="background">
            <v-list-item v-for="(v, k) in filterItems(value)" :key="k">
              <v-list-item-title>{{ snakeToWords(k) }}</v-list-item-title>
              <v-list-item-subtitle>{{ formatValue(v) }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </article>
</template>
