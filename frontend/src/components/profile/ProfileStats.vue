<script setup lang="ts">
import SharedCard from '../shared/SharedCard.vue'

const stats = [
  {
    label: 'Trips',
    value: 12,
    color: 'var(--primary)',
  },
  {
    label: 'Countries',
    value: 8,
    color: 'var(--secondary)',
  },
  {
    label: 'Plans',
    value: 4,
    color: 'var(--on-background)',
  },
]
</script>

<template>
  <div class="profile__stats">
    <SharedCard class="profile__stat" v-for="stat in stats" :key="stat.label">
      <p class="profile__stat-value header-5" :style="{ color: stat.color }">{{ stat.value }}</p>
      <p class="profile__stat-label paragraph-2">{{ stat.label }}</p>
    </SharedCard>
  </div>
</template>

<style lang="sass">
@import '@/assets/sass/vars/spacers'
@import '@/assets/sass/vars/typography'

.profile__stats
  display: grid
  grid-template-columns: repeat(3, 1fr)
  gap: $spacer-md
  margin: $spacer-xl 0

  .profile__stat
    text-align: center
    box-shadow: none
    background: var(--dirty-background)
    padding: $spacer-lg 0
    text-align: center

    .profile__stat-value
      font-weight: $font-weight-bold

    .profile__stat-label
      color: var(--on-background)
      font-weight: $font-weight-semibold

    .card__title
      display: initial
      justify-content: initial
</style>
