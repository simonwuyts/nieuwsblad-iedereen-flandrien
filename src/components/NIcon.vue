<template>
  <span v-if="name" class="material-symbols-rounded">{{ name }}</span>
</template>

<script setup lang="ts">
defineProps<{
  name?: string
}>()
</script>
