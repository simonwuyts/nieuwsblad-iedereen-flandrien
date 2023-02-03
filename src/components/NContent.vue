<template>
  <div
    class="n-content"
    :class="{
      'n-content--noflex': !isFlexible,
      'n-content--display-flex': displayFlex,
    }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{
    isFlexible?: boolean
    displayFlex?: boolean
  }>(),
  {
    isFlexible: true,
  }
)
</script>

<style scoped>
.n-content {
  flex: 1 1 0;
  overflow-y: auto;
  padding: 0 16px 16px;
}

.n-content--noflex {
  flex: none;
  overflow: visible;
}

.n-content--display-flex {
  display: flex;
  flex-direction: column;
}
</style>
