<template>
  <div class="n-header">
    <NLogo class="n-header__logo" />
    <n-button
      v-if="route.name === 'trainingOverview'"
      icon="settings"
      class="n-header__action"
      @click="openSettings"
    />
  </div>
</template>

<script setup lang="ts">
import NButton from '@/components/NButton.vue'
import NLogo from '@/components/NLogo.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

function openSettings() {
  router.push({ name: 'onboarding' })
}
</script>

<style scoped>
.n-header {
  align-items: center;
  background-color: var(--color-nb-dark-blue);
  color: #fff;
  display: flex;
  flex: none;
  justify-content: space-between;
  padding: 8px 16px;
}
</style>
