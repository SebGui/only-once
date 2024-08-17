<template>
    <nav class="topNav">
      <router-link to="/" class="topNavLink">Dashboard</router-link> 
      <router-link to="/about" class="topNavLink">About</router-link>
      <div @click="handleLogout">Logout</div>
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
        font-weight: bold;
        color: var(--main-text-color-white);
    }
    nav button, nav .topNavLink {
        margin-left:10px;
        margin-right:10px;
    }
    .topNav {
        background-color: var(--main-bg-color);
    }
    div {
        cursor:pointer;
        margin-left: 10px;
    }
    nav {
      padding: 32.5px;
    }

    nav a {
        text-decoration:none;
        color: var(--main-text-color-white);
    }
    nav a:hover {
        color: var(--main-bg-color-darken);
    }

    nav a.router-link-exact-active {
        color: #2c3e50;
    }
</style>