<template>
    <div class="floatingForm">
      <h1 v-if="props.isEdit === true">Edit education (under construction)</h1>
      <h1 v-else>Create education (under construction)</h1>
    </div>
</template>

<script setup lang="ts">
  import {defineProps, ref, defineEmits} from 'vue'

  // Props declaration
  const props = defineProps({
      isEdit : {
          required: false,
          type: Boolean
      },
      expID : {
        required: false,
        type: String
      }
  })
</script>

<style scoped>

</style>