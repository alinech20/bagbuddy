<script setup lang="ts">
import type { IUser } from '@/types/user.ts'
import { computed } from 'vue'
import { useTextFormatter } from '@/utils/useTextFormatter.ts'

const props = defineProps<{
  user: IUser
}>()
const { snakeToWords } = useTextFormatter()

const preferences = computed(() => {
  return {
    ...props.user.preferences,
  }
})

const fieldsToSkip = ['id', 'profile_id', 'created_at', 'updated_at']
const filterItems = (pref: Record<string, any>) => {
  const objToReturn = { ...pref }
  Object.keys(objToReturn).forEach((key) => {
    if (fieldsToSkip.includes(key)) {
      delete objToReturn[key]
    }
  })
  return objToReturn
}

const formatValue = (value: any) => {
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No'
  }
  if (Array.isArray(value)) {
    return value.join(', ')
  }
  return value
}
</script>

<template>
  <v-card width="360" variant="flat" class="mx-auto" border>
    <template #title>Preferences</template>
    <v-card-text class="bg-background">
      <v-list class="bg-background">
        <section
          class="pref-wrapper"
          v-for="(data, pref) in preferences"
          :key="pref"
        >
          <span class="text-body-1 font-weight-medium">{{
            snakeToWords(pref)
          }}</span>
          <v-list-item v-for="(value, key) in filterItems(data!)" :key="key">
            <v-list-item-title>{{ snakeToWords(key) }}</v-list-item-title>
            <v-list-item-subtitle>
              {{ formatValue(value) }}
            </v-list-item-subtitle>
          </v-list-item>
          <v-divider class="my-4" color="primary" />
        </section>
      </v-list>
    </v-card-text>
  </v-card>
</template>

<style lang="sass">
.pref-wrapper:last-of-type
  .v-divider
    display: none
</style>
