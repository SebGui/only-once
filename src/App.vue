<template>
  <AuthView v-if="!authStore.isLoggedin"/>

  <div v-if="authStore.isLoggedin === true" class="mainContent">
    <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script setup lang="ts">
  //import { storeToRefs } from 'pinia' 
  import useAuthStore from '@/stores/authStore'

  import AuthView from '@/views/AuthView.vue'

  const authStore = useAuthStore()
  //const { isLoggedIn } = storeToRefs(authStore)
</script>

<style>
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
