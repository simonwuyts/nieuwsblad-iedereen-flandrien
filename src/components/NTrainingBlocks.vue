<template>
  <div class="n-training-blocks">
    <div class="n-training-blocks__container">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.n-training-blocks {
  border: 1px solid rgba(0, 0, 104, 10%);
  flex: 1 1 0;
  min-height: 0;
  overflow-y: auto;
  margin-top: 16px;
  padding: 16px 16px 16px 60px;
}

.n-training-blocks__container {
  display: flex;
  flex-direction: column;
  gap: 8px;
  position: relative;
}
</style>
