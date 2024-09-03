<template>
    <VueSpinnerGrid :class="className" :size="size" :color="color" />
</template>

<script setup lang="ts">
  import {defineProps} from 'vue'
  const props = defineProps({
      className: {
          required: true,
          type: String
      },
      size: {
          required: true,
          type: String
      },
      color: {
          required: true,
          type: String
      }
  })
</script>

<style scoped>

</style>