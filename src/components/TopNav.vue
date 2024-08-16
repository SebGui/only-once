<template>
    <nav>
      <router-link to="/" class="topNavLink">Home</router-link> |
      <router-link to="/about" class="topNavLink">About</router-link>
      <button @click="handleLogout">Logout</button>
    </nav>
</template>

<script setup lang="ts">
  import useAuthStore from '@/stores/authStore';
  
  const authStore = useAuthStore()
  const handleLogout = () => {
      authStore.logout()
  }
</script>

<style scoped>
    nav {
        display: flex;
        justify-content: flex-end;
        align-items: baseline;
    }
    nav button, nav .topNavLink {
        margin-left:10px;
        margin-right:10px;
    }
</style>