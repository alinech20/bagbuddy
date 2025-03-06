<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useListStore } from '@/stores/list.ts'
import { onMounted, ref } from 'vue'
import ListDetails from '@/components/list/create/ListDetails.vue'
import AddCategories from '@/components/list/create/AddCategories.vue'

const listStore = useListStore()
const { resetCurrentList } = listStore
const { currentList } = storeToRefs(listStore)

const steps = [
  {
    title: 'Name',
    component: ListDetails,
  },
  {
    title: 'Categorize',
    component: AddCategories,
  },
  {
    title: 'Populate',
    component: null,
  },
  {
    title: 'Review',
    component: null,
  },
]

const currentStepNo = ref(1)

const next = () => {
  if (currentStepNo.value < steps.length) {
    currentStepNo.value++
  }
}

const prev = () => {
  if (currentStepNo.value > 1) {
    currentStepNo.value--
  }
}

onMounted(() => resetCurrentList())
</script>

<template>
  <v-stepper
    class="w-100 top-0 left-0"
    elevation="0"
    bg-color="background"
    position="absolute"
    v-model="currentStepNo"
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
    <v-stepper-actions @click:next="next" @click:prev="prev" />
  </v-stepper>
</template>
