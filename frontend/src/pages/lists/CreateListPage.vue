<script setup lang="ts">
import { ref } from 'vue'
import ListDetails from '@/components/list/create/ListDetails.vue'
import AddCategories from '@/components/list/create/AddCategories.vue'
import AddSubcategories from '@/components/list/create/AddSubcategories.vue'
import AddItems from '@/components/list/create/AddItems.vue'
import { useListStore } from '@/stores/list.ts'

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

const next = () => {
  if (currentStepNo.value < steps.length) {
    return currentStepNo.value++
  }

  saveNewList()
}

const prev = () => {
  if (currentStepNo.value > 1) {
    currentStepNo.value--
  }
}
</script>

<template>
  <v-stepper
    class="w-100"
    elevation="0"
    bg-color="background"
    v-model="currentStepNo"
    prev-text="back"
    :next-text="currentStepNo < steps.length ? 'next' : 'save'"
  >
    <v-stepper-header>
      <v-stepper-item
        v-for="(step, index) in steps"
        :key="index"
        :value="index + 1"
        :title="step.title"
      />
    </v-stepper-header>
    <v-stepper-window :value="currentStepNo">
      <component
        v-if="steps[currentStepNo - 1].component"
        :is="steps[currentStepNo - 1].component"
      />
    </v-stepper-window>
    <v-stepper-actions
      :disabled="false"
      @click:next="next"
      @click:prev="prev"
    />
  </v-stepper>
</template>
