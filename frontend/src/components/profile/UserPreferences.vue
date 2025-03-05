<script setup lang="ts">
import type { IUser } from '@/types/user.ts'
import { computed, ref } from 'vue'
import { useTextFormatter } from '@/utils/useTextFormatter.ts'

const props = defineProps<{
  user: IUser
}>()

const fieldsToSkip = ['id', 'profile_id', 'created_at', 'updated_at']

const preferences = computed(() => {
  if (!props.user.preferences) return []

  const prefs: any = []
  Object.keys(props.user.preferences).forEach((key, i) => {
    if (!props.user.preferences[key]) return

    prefs.push({
      title: key,
    })

    Object.keys(props.user.preferences[key]).forEach((subKey) => {
      if (fieldsToSkip.includes(subKey)) return
      prefs[i][subKey] = props.user.preferences[key][subKey]
    })
  })
  return prefs
})

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
const tab = ref(null)
</script>

<template>
  <v-tabs
    v-model="tab"
    align-tabs="center"
    density="compact"
    color="primary"
    :items="preferences"
    bg-color="surface"
    center-active
    grow
  >
    <template #tab="{ item }">
      <v-tab
        :text="snakeToWords(item.title)"
        :value="item.title"
        size="small"
        density="compact"
      />
    </template>
    <template #item="{ item }">
      <v-tabs-window-item
        :value="item.title"
        class="pa-4"
        transition="none"
        reverse-transition="none"
      >
        <v-list class="bg-background">
          <v-list-item
            v-for="(value, key) in item"
            :key="key"
            :style="`display: ${key === 'title' ? 'none' : 'initial'}`"
          >
            <v-list-item-title>
              {{ snakeToWords(key) }}: {{ formatValue(value) }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-tabs-window-item>
    </template>
  </v-tabs>

  <!--  <v-card width="360" variant="flat" class="mx-auto" border>-->
  <!--    <template #title>Preferences</template>-->
  <!--    <v-card-text class="bg-background">-->
  <!--      <v-list class="bg-background">-->
  <!--        <section-->
  <!--          class="pref-wrapper"-->
  <!--          v-for="(data, pref) in preferences"-->
  <!--          :key="pref"-->
  <!--        >-->
  <!--          <span class="text-body-1 font-weight-medium">{{-->
  <!--            snakeToWords(pref)-->
  <!--          }}</span>-->
  <!--          <v-list-item v-for="(value, key) in filterItems(data!)" :key="key">-->
  <!--            <v-list-item-title>{{ snakeToWords(key) }}</v-list-item-title>-->
  <!--            <v-list-item-subtitle>-->
  <!--              {{ formatValue(value) }}-->
  <!--            </v-list-item-subtitle>-->
  <!--          </v-list-item>-->
  <!--          <v-divider class="my-4" color="primary" />-->
  <!--        </section>-->
  <!--      </v-list>-->
  <!--    </v-card-text>-->
  <!--  </v-card>-->
</template>

<style lang="sass">
.pref-wrapper:last-of-type
  .v-divider
    display: none
</style>
