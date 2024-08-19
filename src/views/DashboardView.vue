<template>
    <div>
        <h2>Dashboard</h2>
        <!-- Make Single stat component : 1 number, 1 img/graph, 1 text
              Make a stat type with store -->
        <StatsList />
    </div>
</template>

<script setup lang="ts">
  //import useAuthStore from '@/stores/authStore';
  //import { onMounted, onUpdated } from 'vue';
  import StatsList from '@/components/StatsList.vue';
  
  //const authStore = useAuthStore()

  
  /* Lifecycles hooks*/
  /*onMounted(() => {
    authStore.checkLogStatus()
  })
  onUpdated(() => {
    authStore.checkLogStatus()
  })*/
</script>

<style scoped>

</style>