<template>
  <NTitleBar
    :subtitle="`Week ${store.currentWeekNumber} - ${subtitle}`"
    :title="training.name"
  >
    <template #left>
      <n-button type="subtle" icon="chevron_left" @click="backToOverview" />
    </template>
  </NTitleBar>
  <NContent>
    <p v-if="training.description">{{ description }}</p>
    <NTrainingBlocks>
      <NTrainingBlock
        v-for="(block, index) in blocks"
        :key="`${block.label}${index}`"
        :block="block"
      />
    </NTrainingBlocks>
  </NContent>
  <NFooterBar>
    <NButton icon="play_arrow">Start training</NButton>
    <NButton icon="play_arrow">Voltooi training</NButton>
  </NFooterBar>
</template>

<script setup lang="ts">
import NContent from '@/components/NContent.vue'
import NFooterBar from '@/components/NFooterBar.vue'
import NTrainingBlock from '@/components/NTrainingBlock.vue'
import NTrainingBlocks from '@/components/NTrainingBlocks.vue'
import NTitleBar from '@/components/NTitleBar.vue'
import NButton from '@/components/NButton.vue'
import { generateTrainingBlocks, getTraining } from '@/lib/training-helpers'
import { useStore } from '@/store'
import { TrainingId } from '@/types'
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps<{
  trainingId: TrainingId
  subtitle?: string
}>()

const store = useStore()
const router = useRouter()

onMounted(() => {
  store.fetchFirestoreUserData()
})

const training = getTraining(props.trainingId)

const blocks = computed(() => {
  return generateTrainingBlocks(
    props.trainingId,
    store.baseValue,
    store.firestoreUserData?.zoneType
  )
})

function backToOverview() {
  router.push({ name: 'trainingOverview' })
}
</script>
