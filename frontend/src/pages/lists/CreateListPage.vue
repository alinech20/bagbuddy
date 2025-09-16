<script setup lang="ts">
import { ref } from 'vue'
import ListDetails from '@/components/list/create/ListDetails.vue'
import AddCategories from '@/components/list/create/AddCategories.vue'
import AddSubcategories from '@/components/list/create/AddSubcategories.vue'
import AddItems from '@/components/list/create/AddItems.vue'
import { useListStore } from '@/stores/list.ts'
import ProgressionButtons from '@/components/shared/complex/ProgressionButtons.vue'

const { saveNewList } = useListStore()

const steps = [
  {
    title: 'Name',
    component: ListDetails,
  },
  {
    title: 'Organize',
    component: AddCategories,
  },
  {
    title: 'Structure',
    component: AddSubcategories,
  },
  {
    title: 'Populate',
    component: AddItems,
  },
]

const currentStepNo = ref(1)
const lastAction = ref<'next' | 'prev' | ''>('')

const next = () => {
  if (currentStepNo.value < steps.length) {
    lastAction.value = 'next'
    return currentStepNo.value++
  }

  saveNewList()
}

const prev = () => {
  if (currentStepNo.value > 1) {
    lastAction.value = 'prev'
    currentStepNo.value--
  }
}
</script>

<template>
  <section class="create-list">
    <div class="create-list-current-step">
      <div class="create-list-current-step__number">
        {{ currentStepNo }}
      </div>
      <span class="create-list-current-step__title">
        {{ steps[currentStepNo - 1].title }}
      </span>
    </div>
    <component v-if="steps[currentStepNo - 1].component" :is="steps[currentStepNo - 1].component" />
    <ProgressionButtons :steps="steps.length" :current-step="currentStepNo" @prev="prev" @next="next" />
  </section>
</template>

<style lang="sass">
@import '@/assets/sass/vars/borders'
@import '@/assets/sass/vars/colors'
@import '@/assets/sass/vars/spacers'
@import '@/assets/sass/vars/typography'

.create-list
  padding: $spacer-md

  .create-list-current-step
    margin-bottom: $spacer-md
    font-size: $font-size-sm
    text-align: center

    &__number
      display: inline-block
      border-radius: $border-radius-circle
      background: var(--dirty-background)
      width: 24px
      height: 24px
      text-align: center
      line-height: 24px
      margin-right: $spacer-sm
</style>
