<template>
    <div>
        Dash board
        <!-- Make Single stat component : 1 number, 1 img/graph, 1 text
              Make a stat type with store -->
    </div>
</template>

<script setup lang="ts">
  import useAuthStore from '@/stores/authStore';
  import { onMounted, onUpdated } from 'vue';
  
  const authStore = useAuthStore()

  
  /* Lifecycles hooks*/
  onMounted(() => {
    authStore.checkLogStatus()
  })
  onUpdated(() => {
    authStore.checkLogStatus()
  })
</script>

<style scoped>

</style>