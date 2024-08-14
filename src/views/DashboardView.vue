<template>
    <div>
        Dash board

        <button @click="handleLogout">Logout</button>
    </div>
</template>

<script setup lang="ts">
  import useAuthStore from '@/stores/authStore';
  import { onMounted, onUpdated } from 'vue';
  
  const authStore = useAuthStore()
  const handleLogout = () => {
      authStore.logout()
  }
  
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