<template>
  <p>Reset</p>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { onMounted } from 'vue'

const store = useStore()

onMounted(() => {
  store.reset()
})
</script>
